"use client";

import { useState } from "react";

export default function CTASection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    bedrooms: "2",
    bathrooms: "1",
    frequency: "fortnightly"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // 使用 Web3Forms - 免费无限制
      // 你需要在 https://web3forms.com/ 注册获取 access_key
      // 将下面的 YOUR_ACCESS_KEY_HERE 替换为你的 key
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: "1e9599d5-9e74-4c7d-85f4-66841f2a2e99",
          subject: `New Quote Request from ${formData.name}`,
          from_name: "NaturePure Cleaning Website",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          frequency: formData.frequency,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
          bedrooms: "2",
          bathrooms: "1",
          frequency: "fortnightly"
        });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    }
    
    setIsSubmitting(false);
  };

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-br from-slate-50 to-teal-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            GET A FREE QUOTE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Ready for a Cleaner Home?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Fill out the form below and we&apos;ll get back to you within a few hours with a free quote.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left - Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Info Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                Standard Maintenance Clean
              </h3>
              <p className="text-sm text-slate-600 mb-4">Every clean includes:</p>
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
              <div className="mt-4 pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-500">
                  * Deep cleaning, oven cleaning, window cleaning available as add-ons
                </p>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="space-y-3">
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
                  <p className="text-sm text-slate-500">Call or text us</p>
                  <p className="text-lg font-bold text-slate-800">0478 759 693</p>
                </div>
              </a>

            </div>

            <div className="flex items-center gap-2 text-slate-500 text-sm">
              <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>Serving <strong className="text-slate-700">Hobart</strong> & surrounds</span>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-slate-100">
              {submitStatus === "success" ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">Thank You!</h3>
                  <p className="text-slate-600 mb-4">We&apos;ve received your request and will get back to you soon.</p>
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
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        placeholder="John Smith"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                        placeholder="0400 000 000"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Home Details */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
                    <div>
                      <label htmlFor="bedrooms" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Bedrooms
                      </label>
                      <select
                        id="bedrooms"
                        value={formData.bedrooms}
                        onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                        className="w-full px-2 sm:px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all bg-white text-sm sm:text-base"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5+">5+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="bathrooms" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Bathrooms
                      </label>
                      <select
                        id="bathrooms"
                        value={formData.bathrooms}
                        onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                        className="w-full px-2 sm:px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all bg-white text-sm sm:text-base"
                      >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="frequency" className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
                        Frequency
                      </label>
                      <select
                        id="frequency"
                        value={formData.frequency}
                        onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                        className="w-full px-2 sm:px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all bg-white text-sm sm:text-base"
                      >
                        <option value="weekly">Weekly</option>
                        <option value="fortnightly">Fortnightly</option>
                        <option value="monthly">Monthly</option>
                        <option value="one-off">One-off</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
                      Additional Notes
                    </label>
                    <textarea
                      id="message"
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all resize-none"
                      placeholder="Any special requests or details about your home..."
                    />
                  </div>

                  {submitStatus === "error" && (
                    <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm">
                      Something went wrong. Please try again or contact us directly.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Get My Free Quote
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>

                  <p className="text-xs text-slate-500 text-center mt-4">
                    We&apos;ll respond within a few hours. No spam, ever.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
