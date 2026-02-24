import React, { useEffect, useRef, useState } from 'react';
import { Leaf, Award, Truck, Shield, MapPin } from 'lucide-react';
import { companyInfo, features } from '../data/mock';

const iconMap = { Leaf, Award, Truck, Shield };

const useInView = (threshold = 0.18) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
};

const AboutSection = () => {
  const [sectionRef, inView] = useInView();

  const fade = (delay = 0, dir = 'up') => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : dir === 'left' ? 'translateX(-40px)' : dir === 'right' ? 'translateX(40px)' : 'translateY(32px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section
      id="tentang"
      ref={sectionRef}
      className="relative bg-[#f9f8f4] overflow-hidden py-24 lg:py-32"
    >
      {/* subtle top line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="mb-16 lg:mb-20 max-w-2xl" style={fade(0)}>
          {/* label pill */}
          <span
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-5"
            style={{ background: 'rgba(90,158,64,0.1)', color: '#5a9e40', border: '1px solid rgba(90,158,64,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#5a9e40]" />
            Tentang Kami
          </span>

          <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111e0c] leading-tight mb-4">
            Cerita Kebun{' '}
            <span className="text-[#2d5a27]">Yasmavoca</span>
          </h2>

          {/* thin accent line */}
          <div
            className="w-16 h-1 rounded-full mb-5"
            style={{ background: 'linear-gradient(90deg, #2d5a27, #9fd350)' }}
          />

          <p className="text-[#736c64] text-base leading-relaxed">
            Dari lahan 2 hektar di Sukiran, kami tumbuh menjadi produsen alpukat premium terpercaya di Jawa Barat.
          </p>
        </div>

        {/* ── Main Grid ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">

          {/* Image side */}
          <div style={fade(0.12, 'left')}>
            <div className="relative">
              {/* Est badge */}
              <span
                className="absolute -top-4 -left-4 z-10 px-5 py-2.5 rounded-full text-white text-sm font-semibold shadow-lg"
                style={{ background: 'linear-gradient(135deg, #c4a962, #d4bc7a)' }}
              >
                Est. 2018
              </span>

              <div className="rounded-3xl overflow-hidden shadow-2xl" style={{ aspectRatio: '4/5' }}>
                <img
                  src="https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&q=80"
                  alt="Kebun Alpukat Yasmavoca"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111e0c]/40 to-transparent" />
              </div>

              {/* Floating stat card */}
              <div
                className="absolute -bottom-6 -right-4 lg:-right-8 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4"
                style={{ minWidth: '200px' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #2d5a27, #5a9e40)' }}>
                  <Leaf className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#2d5a27]">100%</p>
                  <p className="text-xs text-[#736c64]">Alpukat Segar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Text side */}
          <div style={fade(0.24, 'right')} className="lg:pt-8">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#111e0c] mb-6">
              Dari Kebun Langsung ke Meja Anda
            </h3>

            <div className="space-y-4 text-[#736c64] leading-relaxed mb-8">
              {companyInfo.history.split('\n\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Location pill */}
            <div
              className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl"
              style={{ background: 'rgba(45,90,39,0.06)', border: '1px solid rgba(45,90,39,0.12)' }}
            >
              <div className="w-9 h-9 rounded-full bg-[#2d5a27] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#111e0c] text-sm">{companyInfo.address}</p>
                <p className="text-xs text-[#736c64]">800 mdpl — Ketinggian Ideal</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={i}
                className="group p-6 bg-white rounded-2xl border border-[#ece9e0] hover:border-[#2d5a27]/30 hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
                style={fade(0.1 + i * 0.08)}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'rgba(45,90,39,0.08)' }}
                >
                  <Icon className="w-6 h-6 text-[#2d5a27]" />
                </div>
                <h4 className="font-semibold text-[#111e0c] mb-2">{feature.title}</h4>
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
