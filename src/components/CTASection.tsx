"use client";

import { useState, useMemo } from "react";
import { supabase, type Booking } from "@/lib/supabase";

export default function CTASection() {
  const [activeTab, setActiveTab] = useState<"residential" | "commercial">("residential");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    serviceType: "office", // office, retail, airbnb
    message: "",
    bedrooms: 2,
    bathrooms: 1,
    frequency: "fortnightly",
    extras: {
      oven: false,
      windows: false,
      fridge: false,
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  // 价格逻辑 (Hobart 2026 市场参考)
  const BASE_PRICE = 60;      // 基础费 (含厨房/客厅)
  const PRICE_PER_BED = 20;   // 每卧室
  const PRICE_PER_BATH = 35;  // 每浴室
  const PRICE_OVEN = 80;      // 烤箱深度清洁
  const PRICE_WINDOWS = 40;   // 室内窗户
  const PRICE_FRIDGE = 40;    // 冰箱内部

  // 计算价格
  const { minPrice, maxPrice } = useMemo(() => {
    let subtotal = BASE_PRICE + (formData.bedrooms * PRICE_PER_BED) + (formData.bathrooms * PRICE_PER_BATH);

    // 加上额外项
    if (formData.extras.oven) subtotal += PRICE_OVEN;
    if (formData.extras.windows) subtotal += PRICE_WINDOWS;
    if (formData.extras.fridge) subtotal += PRICE_FRIDGE;

    // 频率折扣
    let discount = 1;
    if (formData.frequency === "weekly") discount = 0.85;      // 15% off
    if (formData.frequency === "fortnightly") discount = 0.90; // 10% off

    const finalPrice = subtotal * discount;

    // 模糊区间 (保护定价策略)
    return {
      minPrice: Math.floor(finalPrice * 0.95),
      maxPrice: Math.ceil(finalPrice * 1.10)
    };
  }, [formData.bedrooms, formData.bathrooms, formData.frequency, formData.extras]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 构建 Supabase 数据
    const bookingData: Booking = {
      customer_name: formData.name,
      customer_phone: formData.phone,
      customer_email: formData.email || undefined,
      service_category: activeTab,
      notes: formData.message || undefined,
    };

    // 根据不同类型补充数据
    if (activeTab === "residential") {
      bookingData.bedrooms = formData.bedrooms;
      bookingData.bathrooms = formData.bathrooms;
      bookingData.frequency = formData.frequency;
      bookingData.extras = formData.extras;
      bookingData.estimated_price_min = minPrice;
      bookingData.estimated_price_max = maxPrice;
    } else {
      bookingData.service_subtype = formData.serviceType;
      bookingData.company_name = formData.companyName || undefined;
    }

    try {
      // 1. 先存入 Supabase 数据库
      const { data: savedBooking, error: dbError } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select()
        .single();

      if (dbError) {
        console.error('Supabase error:', dbError);
        throw dbError;
      }

      console.log('✅ Booking saved to database:', savedBooking);

      // 2. 再发邮件通知（保持原有逻辑）
      let emailBody = {};
      
      if (activeTab === "residential") {
        const extrasArray = [];
        if (formData.extras.oven) extrasArray.push("Oven Deep Clean (+$80)");
        if (formData.extras.windows) extrasArray.push("Interior Windows (+$40)");
        if (formData.extras.fridge) extrasArray.push("Fridge Inside & Out (+$40)");
        const extrasString = extrasArray.length > 0 ? extrasArray.join(", ") : "None";

        emailBody = {
          subject: `New Home Cleaning Quote - Est. $${minPrice}-$${maxPrice}`,
          type: "Residential Home Cleaning",
          details: `${formData.bedrooms} Bed, ${formData.bathrooms} Bath`,
          frequency: formData.frequency,
          extras: extrasString,
          estimated_price: `$${minPrice} - $${maxPrice}`,
        };
      } else {
        emailBody = {
          subject: `New Commercial/Airbnb Inquiry from ${formData.name}`,
          type: formData.serviceType === "airbnb" ? "Airbnb Turnover" : "Commercial/Office Cleaning",
          company: formData.companyName || "N/A",
          details: "Requires Custom Quote",
        };
      }

      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "1e9599d5-9e74-4c7d-85f4-66841f2a2e99",
          from_name: "NaturePure Website",
          name: formData.name,
          email: formData.email || "Not provided",
          phone: formData.phone,
          message: formData.message || "No message",
          booking_id: savedBooking.id, // 把订单ID也发过去
          ...emailBody
        }),
      });

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        serviceType: "office",
        message: "",
        bedrooms: 2,
        bathrooms: 1,
        frequency: "fortnightly",
        extras: { oven: false, windows: false, fridge: false }
      });
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus("error");
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-50 via-teal-50/30 to-cyan-50/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            INSTANT QUOTE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Ready for a Cleaner Home?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select your options below to see your estimated price instantly. No phone calls needed!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Price Display & Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Price Card */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 rounded-2xl shadow-xl text-white">
              <p className="text-teal-100 font-medium uppercase tracking-wide text-sm mb-2">
                Your Estimated Price
              </p>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl md:text-5xl font-extrabold">${minPrice}</span>
                <span className="text-2xl md:text-3xl font-bold text-teal-200">-</span>
                <span className="text-4xl md:text-5xl font-extrabold">${maxPrice}</span>
              </div>
              <p className="text-teal-100 text-sm mb-4">
                *Final price confirmed after quick inspection
              </p>

              {/* Summary */}
              <div className="pt-4 border-t border-teal-400/30 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-100">Bedrooms</span>
                  <span className="font-semibold">{formData.bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-100">Bathrooms</span>
                  <span className="font-semibold">{formData.bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-100">Frequency</span>
                  <span className="font-semibold capitalize">{formData.frequency}</span>
                </div>
                {(formData.extras.oven || formData.extras.windows || formData.extras.fridge) && (
                  <div className="flex justify-between">
                    <span className="text-teal-100">Extras</span>
                    <span className="font-semibold text-right">
                      {[
                        formData.extras.oven && 'Oven',
                        formData.extras.windows && 'Windows',
                        formData.extras.fridge && 'Fridge'
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Standard Clean Includes
              </h3>
              <ul className="space-y-2">
                {["Kitchen cleaning", "Bathroom cleaning", "Vacuuming all floors", "Mopping hard floors", "Dusting surfaces"].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <a 
              href="tel:0478759693"
              className="flex items-center gap-4 p-4 bg-white rounded-xl hover:bg-teal-50 transition-colors group border border-slate-100"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-slate-500">Prefer to call?</p>
                <p className="text-lg font-bold text-slate-800">0478 759 693</p>
              </div>
            </a>
          </div>

          {/* Right - Quote Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100">
              
              {/* Tabs */}
              <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
                <button
                  type="button"
                  onClick={() => setActiveTab("residential")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "residential"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Home Cleaning
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("commercial")}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${
                    activeTab === "commercial"
                      ? "bg-white text-teal-600 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  Commercial & Airbnb
                </button>
              </div>

              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Thank You!</h3>
                  <p className="text-slate-600 mb-4">We&apos;ve received your request and will be in touch shortly.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus("idle")}
                    className="text-teal-600 font-medium hover:underline"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <>
                  {activeTab === "residential" ? (
                    /* Residential Form Content */
                    <div className="mb-6 animate-fadeIn">
                      <h3 className="font-semibold text-slate-800 mb-4">1. Customize your clean</h3>
                      
                      {/* Bedrooms & Bathrooms */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Bedrooms */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Bedrooms</label>
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, bedrooms: Math.max(1, formData.bedrooms - 1)})} 
                              className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg transition-colors flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="font-bold text-xl text-slate-800">{formData.bedrooms}</span>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, bedrooms: Math.min(6, formData.bedrooms + 1)})} 
                              className="w-9 h-9 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg transition-colors flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Bathrooms */}
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Bathrooms</label>
                          <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl">
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, bathrooms: Math.max(1, formData.bathrooms - 1)})} 
                              className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-lg transition-colors flex items-center justify-center"
                            >
                              −
                            </button>
                            <span className="font-bold text-xl text-slate-800">{formData.bathrooms}</span>
                            <button 
                              type="button"
                              onClick={() => setFormData({...formData, bathrooms: Math.min(4, formData.bathrooms + 1)})} 
                              className="w-9 h-9 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-lg transition-colors flex items-center justify-center"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Frequency */}
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Frequency <span className="text-teal-600 font-normal">(Save with regular cleans!)</span>
                        </label>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { id: 'weekly', label: 'Weekly', discount: '-15%' },
                            { id: 'fortnightly', label: 'Fortnightly', discount: '-10%' },
                            { id: 'monthly', label: 'Monthly', discount: null },
                            { id: 'one-off', label: 'One-off', discount: null },
                          ].map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setFormData({...formData, frequency: f.id})}
                              className={`py-2.5 px-2 text-xs sm:text-sm font-semibold rounded-xl border-2 transition-all ${
                                formData.frequency === f.id 
                                  ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/25' 
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                              }`}
                            >
                              {f.label}
                              {f.discount && (
                                <span className={`block text-xs ${formData.frequency === f.id ? 'text-teal-100' : 'text-emerald-600'}`}>
                                  {f.discount}
                                </span>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Extras */}
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Add extras <span className="text-slate-400 font-normal">(optional)</span>
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                          <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${formData.extras.oven ? 'bg-teal-50 border-teal-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={formData.extras.oven}
                                onChange={(e) => setFormData({...formData, extras: {...formData.extras, oven: e.target.checked}})} 
                                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                              />
                              <span className="text-sm text-slate-700">Oven</span>
                            </div>
                            <span className="text-xs text-teal-600 font-semibold">+$80</span>
                          </label>
                          <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${formData.extras.windows ? 'bg-teal-50 border-teal-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={formData.extras.windows}
                                onChange={(e) => setFormData({...formData, extras: {...formData.extras, windows: e.target.checked}})} 
                                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                              />
                              <span className="text-sm text-slate-700">Windows</span>
                            </div>
                            <span className="text-xs text-teal-600 font-semibold">+$40</span>
                          </label>
                          <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border-2 transition-all ${formData.extras.fridge ? 'bg-teal-50 border-teal-500' : 'bg-slate-50 border-transparent hover:border-slate-200'}`}>
                            <div className="flex items-center gap-2">
                              <input 
                                type="checkbox" 
                                checked={formData.extras.fridge}
                                onChange={(e) => setFormData({...formData, extras: {...formData.extras, fridge: e.target.checked}})} 
                                className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                              />
                              <span className="text-sm text-slate-700">Fridge</span>
                            </div>
                            <span className="text-xs text-teal-600 font-semibold">+$40</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* Commercial/Airbnb Form Content */
                    <div className="mb-6 animate-fadeIn">
                      <h3 className="font-semibold text-slate-800 mb-4">1. Business Details</h3>
                      
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Service Type</label>
                        <div className="grid grid-cols-3 gap-2">
                          {['office', 'airbnb', 'retail'].map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => setFormData({...formData, serviceType: type})}
                              className={`py-2.5 px-2 text-sm font-semibold rounded-xl border-2 capitalize transition-all ${
                                formData.serviceType === type 
                                  ? 'bg-teal-500 text-white border-teal-500' 
                                  : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company / Property Name</label>
                        <input
                          type="text"
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none"
                          placeholder="e.g. Seaside Airbnb or Tech Corp"
                        />
                      </div>
                    </div>
                  )}

                  {/* Contact Details (Shared) */}
                  <div className="mb-6 pt-6 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-800 mb-4">2. Your Contact Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Your Name *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                        />
                      </div>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                      <textarea
                        rows={2}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 outline-none resize-none"
                        placeholder="Any specific requirements?"
                      />
                    </div>
                  </div>

                  {submitStatus === "error" && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                      Something went wrong. Please try again or call us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      activeTab === "residential" 
                        ? `Get Instant Quote ($${minPrice}-$${maxPrice})`
                        : "Request Custom Quote"
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
