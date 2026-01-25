export default function CleaningPlans() {
  const plans = [
    {
      name: "Weekly",
      frequency: "Every week",
      description: "Best for busy families who want a consistently clean home",
      popular: false,
      benefits: ["Most thorough coverage", "Less buildup between cleans", "Best value per clean"]
    },
    {
      name: "Fortnightly",
      frequency: "Every 2 weeks",
      description: "Perfect balance of cleanliness and budget",
      popular: true,
      benefits: ["Most popular choice", "Great for couples & small families", "Manageable between cleans"]
    },
    {
      name: "Monthly",
      frequency: "Every 4 weeks",
      description: "Ideal for smaller homes or light usage",
      popular: false,
      benefits: ["Budget-friendly option", "Good for tidy households", "Flexible scheduling"]
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-teal-50/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
            FLEXIBLE SCHEDULING
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Choose Your Cleaning Frequency
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Pick a schedule that suits your lifestyle. Change or pause anytime — no lock-in contracts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-6 rounded-3xl border-2 transition-all ${
                plan.popular 
                  ? "bg-white border-teal-500 shadow-xl shadow-teal-500/10" 
                  : "bg-white border-slate-200 hover:border-teal-300 hover:shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 pt-2">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">{plan.name}</h3>
                <p className="text-teal-600 font-medium">{plan.frequency}</p>
              </div>

              <p className="text-slate-600 text-center mb-6">
                {plan.description}
              </p>

              <ul className="space-y-3 mb-6">
                {plan.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-teal-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`block w-full py-3 text-center font-semibold rounded-xl transition-all ${
                  plan.popular
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/25"
                    : "bg-slate-100 text-slate-700 hover:bg-teal-500 hover:text-white"
                }`}
              >
                Get a Quote
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-slate-500 mt-8">
          Custom pricing based on your home size and specific needs. 
          <a href="#contact" className="text-teal-600 font-medium hover:underline ml-1">Contact us for a free quote.</a>
        </p>
      </div>
    </section>
  );
}
