"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPromo, setShowPromo] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "#services", label: "Services" },
    { href: "#what-we-clean", label: "Checklist" },
    { href: "#contact", label: "Get Quote" },
  ];

  return (
    <>
      {/* Promo Banner - Grand Opening Special */}
      {showPromo && (
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 text-white py-3 px-4 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center justify-center gap-3 flex-1 text-center">
              {/* Sparkle Icon */}
              <svg className="w-5 h-5 animate-pulse hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <span className="font-bold text-lg px-3 py-1 bg-white/20 rounded-lg backdrop-blur-sm">
                  🎉 GRAND OPENING SPECIAL
                </span>
                <span className="font-semibold text-base sm:text-lg">
                  20% OFF Your First Clean!
                </span>
                <span className="hidden md:inline text-sm bg-white/10 px-3 py-1 rounded-full">
                  Limited Time Only
                </span>
              </div>

              {/* Sparkle Icon */}
              <svg className="w-5 h-5 animate-pulse hidden sm:block" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowPromo(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close promo banner"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header 
        className={`fixed ${showPromo ? 'top-[52px]' : 'top-0'} left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? "bg-white/98 backdrop-blur-md shadow-lg" 
            : "bg-white/95 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              {/* Custom Water Drop Logo */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-teal-500 to-cyan-600 rounded-2xl rotate-45 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <svg 
                    className="w-7 h-7 text-white -rotate-45" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8zm0 18c-3.35 0-6-2.57-6-6.2 0-2.34 1.95-5.44 6-9.14 4.05 3.7 6 6.79 6 9.14 0 3.63-2.65 6.2-6 6.2z"/>
                    <circle cx="12" cy="14" r="3" opacity="0.4"/>
                  </svg>
                </div>
                {/* Zero Badge */}
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm">
                  0
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  NaturePure
                </span>
                <span className="text-xs text-slate-500 font-medium tracking-wide">
                  CHEMICAL-FREE CLEANING
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-slate-600 hover:text-teal-600 font-medium transition-colors rounded-lg hover:bg-teal-50/50"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right Side - Desktop */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Phone */}
              <a
                href="tel:0478759693"
                className="flex items-center gap-2 text-slate-700 hover:text-teal-600 transition-colors group"
              >
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-teal-100 rounded-xl flex items-center justify-center transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">Call Us</span>
                  <span className="font-bold text-sm">0478 759 693</span>
                </div>
              </a>

              {/* CTA Button */}
              <a
                href="#contact"
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-teal-500/25 hover:shadow-xl hover:shadow-teal-500/30 hover:-translate-y-0.5"
              >
                Free Quote
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2.5 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div 
            className={`lg:hidden overflow-hidden transition-all duration-300 ${
              isMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
            }`}
          >
            <div className="pt-4 border-t border-slate-100">
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-4 py-3 text-slate-600 hover:bg-teal-50 rounded-xl font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
              
              {/* Mobile Phone & CTA */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
                <a
                  href="tel:0478759693"
                  className="flex items-center justify-center gap-3 px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Call 0478 759 693
                </a>
                <a
                  href="#contact"
                  className="flex items-center justify-center px-4 py-3.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white rounded-xl font-semibold shadow-lg shadow-teal-500/25"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get a Free Quote
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
