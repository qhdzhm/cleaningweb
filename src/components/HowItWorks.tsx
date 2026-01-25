export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Get a Free Quote",
      description: "Tell us about your home — size, number of rooms, and any specific needs. We'll give you an honest, upfront quote.",
    },
    {
      number: "2", 
      title: "Book Your Clean",
      description: "Choose a day and time that works for you. Pick weekly, fortnightly, or monthly. You can change anytime.",
    },
    {
      number: "3",
      title: "We Clean, You Relax",
      description: "Our cleaner arrives on time with all equipment. Come home to a fresh, chemical-free clean space.",
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-teal-600 to-cyan-600 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-white/20 text-white rounded-full text-sm font-semibold mb-4">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Getting Started is Easy
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Book your first clean in minutes. No long forms, no complicated process.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-white/20"></div>
              )}
              
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-colors">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-5 shadow-lg">
                  <span className="text-2xl font-bold bg-gradient-to-br from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-white/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-slate-50 text-teal-600 font-semibold rounded-xl text-lg transition-colors shadow-xl"
          >
            Get Your Free Quote
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
