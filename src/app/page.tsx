import HeroSection from "@/components/HeroSection";
import Calculator from "@/components/Calculator";
import WhatWeClean from "@/components/WhatWeClean";
import CleaningPlans from "@/components/CleaningPlans";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero - 介绍服务 + 右侧图片 */}
      <HeroSection />
      
      {/* Calculator - 即时报价计算器 */}
      <Calculator />
      
      {/* What We Clean - 我们清洁什么 + 左侧图片 */}
      <WhatWeClean />
      
      {/* Cleaning Plans - 清洁频率选择 */}
      <CleaningPlans />
      
      {/* Why Choose Us - 为什么选择我们 (包含 Chemical-Free 详细解释) */}
      <WhyChooseUs />
      
      {/* How It Works - 预约流程 */}
      <HowItWorks />
      
      {/* Testimonials - 客户评价 */}
      <Testimonials />
      
      {/* CTA Section - 联系我们 + 图片 */}
      <CTASection />
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
