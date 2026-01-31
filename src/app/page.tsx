import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatWeClean from "@/components/WhatWeClean";
import CleaningPlans from "@/components/CleaningPlans";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
// import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        {/* Hero - 介绍服务 + 右侧图片 */}
        <HeroSection />
        
        {/* Services Overview - 我们提供什么服务 (Regular, Commercial, Airbnb) */}
        <CleaningPlans />
        
        {/* Why Choose Us - 为什么选择我们 (Tech-Enabled, Eco-Friendly) */}
        <WhyChooseUs />

        {/* Detailed Checklist - 具体清洁内容 (Tabbed Interface) */}
        <WhatWeClean />
        
        {/* How It Works - 预约流程 */}
        <HowItWorks />
        
        {/* Testimonials section removed until we have real reviews */}
        
        {/* CTA Section - 联系我们 + 图片 */}
        <CTASection />
        
        {/* Footer */}
        <Footer />
      </main>
    </>
  );
}
