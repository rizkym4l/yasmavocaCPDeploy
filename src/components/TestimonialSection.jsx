import React, { useEffect, useRef, useState } from 'react';
import { Star } from 'lucide-react';
import { testimonials } from '../data/mock';

const useInView = (threshold = 0.15) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const TestimonialCard = ({ testimonial, delay, inView }) => (
  <div
    className="group flex flex-col bg-white rounded-2xl p-7 border border-[#ece9e0] hover:border-[#2d5a27]/25 hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(32px)',
      transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
    }}
  >
    {/* Stars */}
    <div className="flex gap-1 mb-5">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-[#c4a962] text-[#c4a962]" />
      ))}
    </div>

    {/* Quote text */}
    <p className="text-[#1e1919] leading-relaxed flex-1 mb-6 text-[15px]">
      "{testimonial.text}"
    </p>

    {/* Divider */}
    <div className="h-px bg-[#ece9e0] mb-5" />

    {/* Author */}
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
        style={{ background: 'linear-gradient(135deg, #2d5a27, #5a9e40)' }}
      >
        {testimonial.name.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-[#111e0c] text-sm">{testimonial.name}</p>
        <p className="text-xs text-[#736c64]">{testimonial.location}</p>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const [sectionRef, inView] = useInView();

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  /* aggregate stats */
  const avgRating = (testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f9f8f4] overflow-hidden py-24 lg:py-32"
    >
      {/* subtle lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header row ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16" style={fade(0)}>
          <div>
            <p className="text-[#5a9e40] text-sm font-semibold uppercase tracking-[0.18em] mb-3">
              Testimoni
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111e0c] leading-tight">
              Apa Kata{' '}
              <span className="text-[#2d5a27]">Pelanggan</span>
            </h2>
          </div>

          {/* Rating summary */}
          <div
            className="flex items-center gap-5 px-7 py-5 rounded-2xl self-start lg:self-auto"
            style={{ background: 'white', border: '1px solid #ece9e0' }}
          >
            <div>
              <p className="text-5xl font-bold text-[#2d5a27]">{avgRating}</p>
              <div className="flex gap-0.5 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 fill-[#c4a962] text-[#c4a962]" />
                ))}
              </div>
            </div>
            <div className="h-12 w-px bg-[#ece9e0]" />
            <div>
              <p className="text-xl font-bold text-[#111e0c]">1000+</p>
              <p className="text-xs text-[#736c64] mt-0.5">Pelanggan Puas</p>
            </div>
          </div>
        </div>

        {/* ── Cards ── */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={i}
              testimonial={t}
              delay={0.1 + i * 0.12}
              inView={inView}
            />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 px-7 py-5 rounded-2xl"
          style={{ background: 'linear-gradient(135deg, #2d5a27, #4a7c43)', ...fade(0.36) }}
        >
          <p className="text-white font-semibold text-sm sm:text-base text-center sm:text-left">
            Ingin merasakan alpukat premium Yasmavoca sendiri?
          </p>
          <a
            href="https://wa.me/6282125991276"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-2.5 bg-white text-[#2d5a27] rounded-full text-sm font-semibold hover:bg-[#f7f5f2] hover:scale-105 transition-all duration-300"
          >
            Pesan Sekarang →
          </a>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
