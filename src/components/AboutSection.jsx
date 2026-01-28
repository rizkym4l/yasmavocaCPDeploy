import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Award, Truck, Shield } from 'lucide-react';
import { companyInfo, features } from '../data/mock';

const iconMap = {
  Leaf,
  Award,
  Truck,
  Shield,
};

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative section-padding bg-[#f7f5f2] overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2d5a27]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#c4a962]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className={`inline-block px-4 py-2 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] text-sm font-medium mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Tentang Kami
          </span>
          <h2 
            className={`font-display text-4xl sm:text-5xl font-bold text-[#1e1919] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Cerita Kebun <span className="text-[#2d5a27]">Yasmavoca</span>
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
          {/* Image Side */}
          <div 
            className={`relative transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80"
                alt="Kebun Alpukat Yasmavoca"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2d5a27]/40 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs animate-float-slow">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#2d5a27]/10 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-[#2d5a27]" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2d5a27]">100%</p>
                  <p className="text-sm text-[#736c64]">Alpukat Segar</p>
                </div>
              </div>
            </div>

            {/* Decorative Badge */}
            <div className="absolute -top-4 -left-4 bg-[#c4a962] text-white rounded-full px-6 py-3 shadow-lg">
              <span className="font-semibold">Est. 2018</span>
            </div>
          </div>

          {/* Text Side */}
          <div 
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <h3 className="font-display text-3xl font-bold text-[#1e1919] mb-6">
              Dari Kebun Langsung ke Meja Anda
            </h3>
            
            <div className="prose prose-lg text-[#736c64] mb-8">
              {companyInfo.history.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-3 p-4 bg-[#2d5a27]/5 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-[#2d5a27] flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-[#1e1919]">{companyInfo.address}</p>
                <p className="text-sm text-[#736c64]">800 mdpl - Ketinggian Ideal</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={index}
                className={`group p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${600 + index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-[#2d5a27]/10 flex items-center justify-center mb-4 group-hover:bg-[#2d5a27] transition-colors duration-300">
                  <Icon className="w-7 h-7 text-[#2d5a27] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-semibold text-lg text-[#1e1919] mb-2">{feature.title}</h4>
                <p className="text-[#736c64] text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
