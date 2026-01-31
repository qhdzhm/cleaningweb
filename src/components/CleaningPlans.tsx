export default function CleaningPlans() {
  const services = [
    {
      title: "Regular House Cleaning",
      subtitle: "Weekly • Fortnightly • Monthly",
      description: "Keep your home pristine with our recurring maintenance cleans. We handle the chores so you get your weekends back.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      benefits: ["Kitchen & bathrooms sanitized", "Dusting & vacuuming throughout", "Chemical-free products"],
      highlight: true
    },
    {
      title: "Airbnb & End of Lease",
      subtitle: "Turnover • Bond Clean • Deep Clean",
      description: "Specialized cleaning for property managers and hosts. We ensure 5-star reviews and full bond returns.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      benefits: ["Linen change & staging", "Restocking amenities", "Checklist-based reporting"],
      highlight: false
    },
    {
      title: "Commercial & Office",
      subtitle: "Retail • Office • Strata",
      description: "Professional cleaning for your workspace. We work after-hours to minimize disruption to your business.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      benefits: ["Desk & workstation sanitizing", "Bin liner replacement", "Kitchenette & washroom deep clean"],
      highlight: false
    }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-teal-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-cyan-100 text-cyan-700 rounded-full text-sm font-semibold mb-4">
            OUR SERVICES
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Professional Cleaning for Every Space
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            From cozy homes to busy offices, we bring the same eco-friendly, chemical-free standard to every job.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-3xl border-2 transition-all flex flex-col ${
                service.highlight 
                  ? "bg-white border-teal-500 shadow-xl shadow-teal-500/10" 
                  : "bg-white border-slate-100 hover:border-teal-300 hover:shadow-lg"
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                service.highlight 
                  ? "bg-gradient-to-br from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/30" 
                  : "bg-teal-50 text-teal-600"
              }`}>
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-800 mb-2">{service.title}</h3>
              <p className="text-teal-600 font-medium mb-4 text-sm uppercase tracking-wide">{service.subtitle}</p>
              
              <p className="text-slate-600 mb-8 flex-grow">
                {service.description}
              </p>

              <div className="space-y-4 mb-8">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-600 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>

              <a
                href="#contact"
                className={`block w-full py-3.5 text-center font-bold rounded-xl transition-all ${
                  service.highlight
                    ? "bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600 shadow-lg shadow-teal-500/25"
                    : "bg-slate-50 text-slate-700 hover:bg-teal-500 hover:text-white"
                }`}
              >
                Book Now
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
