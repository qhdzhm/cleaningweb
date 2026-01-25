"use client";

import { useState } from "react";

export default function Calculator() {
  // 状态管理
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(1);
  const [frequency, setFrequency] = useState("fortnightly");
  const [extras, setExtras] = useState({
    oven: false,
    windows: false,
    fridge: false,
  });

  // 价格逻辑 (Hobart 2026 市场参考)
  const BASE_PRICE = 60;      // 基础费 (含厨房/客厅)
  const PRICE_PER_BED = 20;   // 每卧室
  const PRICE_PER_BATH = 35;  // 每浴室
  const PRICE_OVEN = 80;      // 烤箱深度清洁
  const PRICE_WINDOWS = 40;   // 室内窗户
  const PRICE_FRIDGE = 40;    // 冰箱内部

  // 计算总价
  const calculatePrice = () => {
    let subtotal = BASE_PRICE + (bedrooms * PRICE_PER_BED) + (bathrooms * PRICE_PER_BATH);

    // 加上额外项
    if (extras.oven) subtotal += PRICE_OVEN;
    if (extras.windows) subtotal += PRICE_WINDOWS;
    if (extras.fridge) subtotal += PRICE_FRIDGE;

    // 频率折扣
    let discount = 1;
    if (frequency === "weekly") discount = 0.85;      // 15% off
    if (frequency === "fortnightly") discount = 0.90; // 10% off

    return subtotal * discount;
  };

  const finalPrice = calculatePrice();

  // 生成模糊区间 (保护定价策略)
  const minPrice = Math.floor(finalPrice * 0.95);
  const maxPrice = Math.ceil(finalPrice * 1.10);

  // 生成 WhatsApp 链接
  const whatsappMessage = encodeURIComponent(
    `Hi! I'd like to get a quote for cleaning:\n` +
    `- ${bedrooms} bedroom(s)\n` +
    `- ${bathrooms} bathroom(s)\n` +
    `- Frequency: ${frequency}\n` +
    `${extras.oven ? '- Oven cleaning\n' : ''}` +
    `${extras.windows ? '- Window cleaning\n' : ''}` +
    `${extras.fridge ? '- Fridge cleaning\n' : ''}` +
    `Estimated: $${minPrice}-$${maxPrice}`
  );

  return (
    <section id="quote-calculator" className="py-20 px-4 bg-gradient-to-br from-teal-50 via-cyan-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            INSTANT PRICING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Get Your Estimate in Seconds
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No phone calls needed. Adjust the options below to see your estimated price instantly.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left - Calculator */}
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-slate-100">
            {/* 房间选择 */}
            <div className="space-y-6 mb-8">
              {/* Bedrooms */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  How many bedrooms?
                </label>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                  <button 
                    onClick={() => setBedrooms(Math.max(1, bedrooms - 1))} 
                    className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xl transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    <span className="font-bold text-2xl text-slate-800 w-8 text-center">{bedrooms}</span>
                  </div>
                  <button 
                    onClick={() => setBedrooms(Math.min(6, bedrooms + 1))} 
                    className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-xl transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Bathrooms */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  How many bathrooms?
                </label>
                <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl">
                  <button 
                    onClick={() => setBathrooms(Math.max(1, bathrooms - 1))} 
                    className="w-10 h-10 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xl transition-colors flex items-center justify-center"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                    <span className="font-bold text-2xl text-slate-800 w-8 text-center">{bathrooms}</span>
                  </div>
                  <button 
                    onClick={() => setBathrooms(Math.min(4, bathrooms + 1))} 
                    className="w-10 h-10 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-bold text-xl transition-colors flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* 频率选择 */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                How often? <span className="text-teal-600 font-normal">(Save with regular cleans!)</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'weekly', label: 'Weekly', discount: '15% OFF' },
                  { id: 'fortnightly', label: 'Fortnightly', discount: '10% OFF' },
                  { id: 'once', label: 'One-off', discount: null },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFrequency(f.id)}
                    className={`py-3 px-2 text-sm font-semibold rounded-xl border-2 transition-all ${
                      frequency === f.id 
                        ? 'bg-teal-500 text-white border-teal-500 shadow-lg shadow-teal-500/25' 
                        : 'bg-white text-slate-600 border-slate-200 hover:border-teal-400'
                    }`}
                  >
                    {f.label}
                    {f.discount && (
                      <span className={`block text-xs mt-0.5 ${frequency === f.id ? 'text-teal-100' : 'text-emerald-600'}`}>
                        {f.discount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 额外项 */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Add extras <span className="text-slate-400 font-normal">(optional)</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={extras.oven}
                      onChange={(e) => setExtras({...extras, oven: e.target.checked})} 
                      className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                    />
                    <span className="text-slate-700 font-medium">Oven Deep Clean</span>
                  </div>
                  <span className="text-teal-600 font-semibold">+$80</span>
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={extras.windows}
                      onChange={(e) => setExtras({...extras, windows: e.target.checked})} 
                      className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                    />
                    <span className="text-slate-700 font-medium">Interior Windows</span>
                  </div>
                  <span className="text-teal-600 font-semibold">+$40</span>
                </label>
                <label className="flex items-center justify-between p-3 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={extras.fridge}
                      onChange={(e) => setExtras({...extras, fridge: e.target.checked})} 
                      className="w-5 h-5 text-teal-600 rounded border-slate-300 focus:ring-teal-500" 
                    />
                    <span className="text-slate-700 font-medium">Fridge Inside & Out</span>
                  </div>
                  <span className="text-teal-600 font-semibold">+$40</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right - Price Display & CTA */}
          <div className="lg:sticky lg:top-32">
            {/* Price Card */}
            <div className="bg-gradient-to-br from-teal-500 to-cyan-600 p-6 md:p-8 rounded-2xl shadow-2xl text-white mb-6">
              <p className="text-teal-100 font-medium uppercase tracking-wide text-sm mb-2">
                Your Estimated Price
              </p>
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-5xl md:text-6xl font-extrabold">${minPrice}</span>
                <span className="text-3xl md:text-4xl font-bold text-teal-200">-</span>
                <span className="text-5xl md:text-6xl font-extrabold">${maxPrice}</span>
              </div>
              <p className="text-teal-100 text-sm">
                *Final price confirmed after quick inspection
              </p>

              {/* Summary */}
              <div className="mt-6 pt-6 border-t border-teal-400/30 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-teal-100">Bedrooms</span>
                  <span className="font-semibold">{bedrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-100">Bathrooms</span>
                  <span className="font-semibold">{bathrooms}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-teal-100">Frequency</span>
                  <span className="font-semibold capitalize">{frequency}</span>
                </div>
                {(extras.oven || extras.windows || extras.fridge) && (
                  <div className="flex justify-between">
                    <span className="text-teal-100">Extras</span>
                    <span className="font-semibold">
                      {[
                        extras.oven && 'Oven',
                        extras.windows && 'Windows',
                        extras.fridge && 'Fridge'
                      ].filter(Boolean).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <a 
                href="tel:0478759693"
                className="flex items-center justify-center gap-3 w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call to Book: 0478 759 693
              </a>
              <a 
                href={`https://wa.me/61478759693?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="mt-6 flex items-center justify-center gap-4 text-sm text-slate-500">
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>No obligation</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Free quotes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
