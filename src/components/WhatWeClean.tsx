import Image from "next/image";

export default function WhatWeClean() {
  const mainAreas = [
    {
      title: "Kitchen",
      items: ["Benchtops & splashback wiped", "Stovetop cleaned", "Sink & tapware polished", "Exterior of appliances", "Floor mopped"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      color: "from-teal-500 to-cyan-500"
    },
    {
      title: "Bathroom",
      items: ["Shower, bath & screen", "Toilet inside & out", "Vanity & mirror", "Tapware polished", "Floor mopped"],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      color: "from-cyan-500 to-blue-500"
    },
  ];

  const generalTasks = [
    {
      title: "Vacuuming",
      items: ["All carpeted areas", "Rugs and mats", "Stairs & hallways"],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: "Mopping",
      items: ["All hard floors", "Entryway & hallways", "Tiled areas"],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
        </svg>
      )
    },
    {
      title: "Dusting",
      items: ["All surfaces", "Skirting boards", "Window sills"],
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      )
    },
  ];

  return (
    <section id="services" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-semibold mb-4">
            OUR SERVICE
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            Standard Maintenance Clean
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Every visit includes a thorough clean of your kitchen, bathroom, vacuuming, mopping, 
            and dusting — keeping your home fresh and tidy.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left - Image */}
          <div className="relative lg:sticky lg:top-32">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-100 to-teal-100 border-2 border-white shadow-xl">
              <Image 
                src="/images/what-we-clean-new.png" 
                alt="Clean modern home interior" 
                fill 
                className="object-cover"
              />
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Chemical-Free</p>
                  <p className="text-sm text-slate-500">Water + Microfibre</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="space-y-6">
            {/* Main Areas - Kitchen & Bathroom */}
            <div className="grid sm:grid-cols-2 gap-4">
              {mainAreas.map((area, index) => (
                <div 
                  key={index} 
                  className="p-5 bg-slate-50 rounded-2xl hover:bg-teal-50 transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 bg-gradient-to-br ${area.color} rounded-xl flex items-center justify-center text-white shadow-md`}>
                      {area.icon}
                    </div>
                    <h3 className="font-bold text-lg text-slate-800">{area.title}</h3>
                  </div>
                  <ul className="space-y-2">
                    {area.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-4 h-4 text-teal-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* General Tasks - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {generalTasks.map((task, index) => (
                <div 
                  key={index} 
                  className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl hover:from-teal-50 hover:to-cyan-50 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-teal-600 shadow-sm group-hover:bg-teal-500 group-hover:text-white transition-colors flex-shrink-0">
                      {task.icon}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">{task.title}</h3>
                  </div>
                  <ul className="space-y-1">
                    {task.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-slate-600">
                        <svg className="w-3 h-3 text-teal-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Not Included Note */}
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <p className="text-sm text-amber-800">
                <strong>Not included:</strong> Inside oven, inside fridge, inside windows, laundry folding, 
                dishes, or decluttering. These can be added as extras upon request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
