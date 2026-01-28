import React, { useEffect, useRef, useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/mock';

const TestimonialCard = ({ testimonial, index, isVisible }) => {
  return (
    <div
      className={`group relative bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Quote Icon */}
      <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#c4a962] rounded-full flex items-center justify-center shadow-lg">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-[#c4a962] text-[#c4a962]" />
        ))}
      </div>

      {/* Text */}
      <p className="text-[#1e1919] text-lg mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>

      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2d5a27] to-[#4a7c43] flex items-center justify-center text-white font-bold text-lg">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="font-semibold text-[#1e1919]">{testimonial.name}</p>
          <p className="text-sm text-[#736c64]">{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
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
      ref={sectionRef}
      className="relative section-padding overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #ffffff 0%, #f7f5f2 100%)'
      }}
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-[#2d5a27]/10 rounded-full blur-xl animate-float" />
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-[#c4a962]/10 rounded-full blur-xl animate-float-reverse" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className={`inline-block px-4 py-2 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] text-sm font-medium mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Testimoni
          </span>
          <h2 
            className={`font-display text-4xl sm:text-5xl font-bold text-[#1e1919] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Apa Kata <span className="text-[#2d5a27]">Pelanggan</span>
          </h2>
          <p 
            className={`text-[#736c64] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni dari mereka yang sudah mencoba alpukat Yasmavoca.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              testimonial={testimonial}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
