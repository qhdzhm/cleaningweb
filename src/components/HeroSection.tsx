import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative pt-44 pb-20 px-4 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/50 to-teal-50/30"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-32 left-10 w-72 h-72 bg-gradient-to-br from-cyan-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-200/30 to-cyan-200/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-teal-200/50 shadow-sm mb-6">
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
              <span className="text-sm font-medium text-slate-600">Chemical-Free · Eco-Friendly</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 mb-6 leading-tight">
              <span className="block">Regular Home</span>
              <span className="block bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Cleaning Service
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-4">
              Keep your home consistently clean and fresh with our reliable weekly, 
              fortnightly, or monthly cleaning service.
            </p>
            
            <p className="text-lg text-slate-500 mb-8">
              We use only water and premium microfibre — no harsh chemicals.
              <br />
              <span className="text-teal-600 font-medium">Safe for your family. Better for the planet.</span>
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-4 mb-8 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Fully Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Same Cleaner</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>Local Team</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="tel:0478759693"
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-xl transition-all border-2 border-slate-200 hover:border-slate-300 shadow-lg hover:shadow-xl"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span>0478 759 693</span>
              </a>
              <a
                href="#quote-calculator"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-xl shadow-teal-500/25 hover:shadow-2xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
              >
                Get Instant Quote
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Location */}
            <div className="mt-8 inline-flex items-center gap-2 text-slate-500">
              <svg className="w-5 h-5 text-teal-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <span>Serving <strong className="text-slate-700">Hobart</strong> & Surrounding Areas</span>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-2xl lg:rounded-3xl overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 border-2 border-white shadow-xl lg:shadow-2xl">
              <Image 
                src="/images/hero-cleaning.jpg" 
                alt="Clean and modern living room" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-3 -left-3 lg:-bottom-4 lg:-left-4 bg-white rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-3 lg:p-4 border border-slate-100">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg lg:rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 lg:w-6 lg:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800 text-sm lg:text-base">100%</p>
                  <p className="text-xs lg:text-sm text-slate-500">Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
