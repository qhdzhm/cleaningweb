"use client";

import Image from "next/image";
import { useState } from "react";

type ServiceType = "residential" | "commercial" | "airbnb";

export default function WhatWeClean() {
  const [activeTab, setActiveTab] = useState<ServiceType>("residential");

  const services = {
    residential: {
      title: "Home Cleaning Checklist",
      description: "Our standard maintenance clean covers all the essential areas of your home.",
      image: "/images/what-we-clean-new.png",
      badge: "Chemical-Free",
      areas: [
        {
          title: "Kitchen",
          color: "from-teal-500 to-cyan-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          ),
          items: ["Benchtops & splashback wiped", "Stovetop cleaned", "Sink & tapware polished", "Exterior of appliances", "Floor vacuumed & mopped"]
        },
        {
          title: "Bathroom",
          color: "from-cyan-500 to-blue-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          ),
          items: ["Shower, bath & screen descaled", "Toilet sanitized inside & out", "Vanity & mirror polished", "Tapware shined", "Floor mopped"]
        },
        {
          title: "Living & Bedrooms",
          color: "from-indigo-500 to-purple-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
            </svg>
          ),
          items: ["All surfaces dusted", "Mirrors polished", "Cobwebs removed", "Carpets vacuumed", "Hard floors mopped"]
        }
      ]
    },
    commercial: {
      title: "Office & Retail Cleaning",
      description: "Create a productive, professional environment for your team and clients.",
      image: "/images/hero-cleaning.jpg", 
      badge: "After-Hours",
      areas: [
        {
          title: "Workstations",
          color: "from-blue-500 to-indigo-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          ),
          items: ["Desks wiped down", "Monitors & keyboards dusted", "Chairs vacuumed", "Phones sanitized", "Bins emptied & lined"]
        },
        {
          title: "Common Areas",
          color: "from-teal-500 to-emerald-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          items: ["Reception area detailing", "Kitchenette cleaning", "Meeting rooms organized", "Floors vacuumed & mopped", "Door handles sanitized"]
        },
        {
          title: "Restrooms",
          color: "from-cyan-500 to-blue-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          ),
          items: ["Toilets & urinals sanitized", "Sinks & mirrors polished", "Consumables restocked", "Floors mopped & disinfected", "Air freshened"]
        }
      ]
    },
    airbnb: {
      title: "Airbnb & Turnover Checklist",
      description: "Hotel-standard preparation for your next guest. We help you get 5-star reviews.",
      image: "/images/what-we-clean.jpg",
      badge: "Hotel-Grade",
      areas: [
        {
          title: "Changeover",
          color: "from-rose-500 to-pink-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ),
          items: ["Bed linen changed", "Towels replaced", "Laundry started (if onsite)", "Welcome pack presentation", "Damage check & report"]
        },
        {
          title: "Kitchen & Dining",
          color: "from-amber-500 to-orange-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          ),
          items: ["Fridge emptied & wiped", "Dishes washed & put away", "Coffee/Tea station restocked", "Oven checked", "Surfaces sanitized"]
        },
        {
          title: "Deep Clean Items",
          color: "from-purple-500 to-indigo-500",
          icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          ),
          items: ["Inside drawers checked", "Under furniture vacuumed", "Windows spot cleaned", "High dusting", "Skirting boards wiped"]
        }
      ]
    }
  };

  const activeData = services[activeTab];

  return (
    <section id="what-we-clean" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            DETAILED CHECKLIST
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            What We Clean
          </h2>
          
          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button 
              onClick={() => setActiveTab("residential")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === "residential" 
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Residential
            </button>
            <button 
              onClick={() => setActiveTab("commercial")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === "commercial" 
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Office / Commercial
            </button>
            <button 
              onClick={() => setActiveTab("airbnb")}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                activeTab === "airbnb" 
                  ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25 scale-105" 
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              Airbnb / End of Lease
            </button>
          </div>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto animate-fadeIn">
            {activeData.description}
          </p>
        </div>

        {/* Content - Card Grid Layout */}
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Card with Image Background */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white min-h-[200px] flex items-center p-8 lg:p-12">
            <div className="absolute inset-0 z-0">
               <Image 
                src={activeData.image}
                alt={activeData.title}
                fill 
                className="object-cover opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/40"></div>
            </div>
            
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-500/20 text-teal-300 rounded-full text-sm font-semibold mb-3 border border-teal-500/30">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {activeData.badge}
              </div>
              <h3 className="text-3xl font-bold mb-2">{activeData.title}</h3>
              <p className="text-slate-200 text-lg">{activeData.description}</p>
            </div>
          </div>

          {/* 3-Column Grid for Checklist Areas */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeData.areas.map((area, index) => (
              <div 
                key={index} 
                className="flex flex-col h-full p-6 bg-white rounded-2xl border-2 border-slate-100 hover:border-teal-100 hover:shadow-xl hover:shadow-teal-500/5 transition-all group"
              >
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-50">
                  <div className={`w-12 h-12 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                    {area.icon}
                  </div>
                  <h3 className="font-bold text-xl text-slate-800">{area.title}</h3>
                </div>
                
                <ul className="space-y-3 flex-grow">
                  {area.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="mt-1 w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      </div>
                      <span className="text-sm font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="text-center">
            <p className="inline-flex items-center gap-2 px-5 py-2 bg-slate-50 text-slate-600 rounded-full text-sm font-medium border border-slate-200">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Need something specific? We can customize any checklist to meet your exact requirements.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
