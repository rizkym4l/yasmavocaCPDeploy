import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, ArrowRight, Leaf, Award, Truck, Shield } from 'lucide-react';
import { companyInfo, socialMedia } from '../data/mock';

/* ─── Intersection Observer hook ─── */
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.2, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

/* ─── Animated counter ─── */
const useCounter = (target, active, duration = 1800) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
};

/* ─── Fade-in wrapper ─── */
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const [ref, inView] = useInView();
  const transforms = {
    up: 'translateY(40px)',
    left: 'translateX(-40px)',
    right: 'translateX(40px)',
    none: 'none',
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : transforms[direction],
        transition: `opacity 0.75s ease, transform 0.75s ease`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Main Component ─── */
const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [statsRef, statsInView] = useInView();

  const yearsCount = useCounter(5, statsInView);
  const satisfactionCount = useCounter(100, statsInView);
  const hectaresCount = useCounter(50, statsInView);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const smoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 80, behavior: 'smooth' });
    }
  };

  const partners = ['Petani Sukabumi', 'Agro Fresh', 'Green Market', 'Organic Indonesia', 'Farm Direct'];

  const stats = [
    {
      value: satisfactionCount,
      suffix: '%',
      label: 'Kepuasan Pelanggan',
      desc: 'Kami menghadirkan alpukat segar yang dipercaya oleh ribuan pelanggan di seluruh Indonesia.',
    },
    {
      value: yearsCount,
      suffix: '+',
      label: 'Tahun Pengalaman',
      desc: 'Berpengalaman sejak 2018, kami terus berinovasi dalam budidaya alpukat Miki premium.',
    },
    {
      value: hectaresCount,
      suffix: '+',
      label: 'Hektar Kebun',
      desc: 'Lahan luas di dataran tinggi Sukabumi dengan ketinggian 800 mdpl yang ideal.',
    },
  ];

  const featureCards = [
    { icon: <Leaf className="w-5 h-5" />, title: '100% Fresh', desc: 'Dipetik langsung dari kebun' },
    { icon: <Award className="w-5 h-5" />, title: 'Kualitas Premium', desc: 'Seleksi ketat grade A' },
    { icon: <Truck className="w-5 h-5" />, title: 'Pengiriman Cepat', desc: 'Ke seluruh Indonesia' },
    { icon: <Shield className="w-5 h-5" />, title: 'Garansi Segar', desc: 'Uang kembali jika tidak sesuai' },
  ];

  /* transition helper */
  const t = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : 'translateY(32px)',
    transition: `opacity 0.8s ease, transform 0.8s ease`,
    transitionDelay: `${delay}s`,
  });

  return (
    <>
      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section
        id="beranda"
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Parallax BG */}
        <div
          className="absolute inset-0 z-0 will-change-transform"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1920&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${scrollY * 0.35}px) scale(${1 + scrollY * 0.00025})`,
          }}
        />

        {/* Dark gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(180deg, rgba(12,28,8,0.80) 0%, rgba(20,46,12,0.72) 55%, rgba(10,22,6,0.90) 100%)',
          }}
        />

        {/* Subtle grid lines */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* ── Main content ── */}
        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center pt-32 pb-40">

          {/* Badge */}
          <div style={t(0.1)}>
            <span
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium mb-8 tracking-wide"
              style={{
                background: 'rgba(255,255,255,0.10)',
                backdropFilter: 'blur(14px)',
                color: 'rgba(255,255,255,0.88)',
                border: '1px solid rgba(255,255,255,0.18)',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-[#9fd350] animate-pulse" />
              Kebun Alpukat Premium Sukabumi
            </span>
          </div>

          {/* Heading */}
          <div style={t(0.28)}>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-[1.08] mb-6">
              Tumbuh Bersama
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #9fd350 0%, #c5e87a 50%, #9fd350 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Alpukat Premium
              </span>
              <br />
              Sukabumi
            </h1>
          </div>

          {/* Subtitle */}
          <div style={t(0.46)}>
            <p className="text-lg sm:text-xl text-white/65 max-w-xl mx-auto mb-12 font-light leading-relaxed">
              {companyInfo.description}
            </p>
          </div>

          {/* CTA */}
          <div style={t(0.60)}>
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 px-9 py-4 rounded-full font-semibold text-base text-white transition-all duration-300 hover:scale-105 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, #4f8c25 0%, #6fb032 100%)',
                boxShadow: '0 8px 32px rgba(79,140,37,0.45)',
              }}
            >
              {/* shimmer sweep */}
              <span
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)',
                  backgroundSize: '200% 100%',
                  animation: 'heroBtnShimmer 2.8s ease-in-out infinite',
                }}
              />
              Jelajahi Kebun Kami
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Feature pills */}
          <div style={t(0.76)} className="mt-14 flex flex-wrap justify-center gap-3">
            {featureCards.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm text-white/70"
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <span className="text-[#9fd350]">{f.icon}</span>
                {f.title}
              </div>
            ))}
          </div>
        </div>

        {/* ── Partner logos bar ── */}
        <div
          className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden"
          style={t(0.95)}
        >
          <div
            style={{
              background: 'rgba(255,255,255,0.06)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid rgba(255,255,255,0.10)',
            }}
          >
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-center gap-8 flex-wrap">
              {partners.map((p, i) => (
                <span
                  key={i}
                  className="text-white/40 text-sm font-medium tracking-wider uppercase flex items-center gap-2 hover:text-white/70 transition-colors duration-300 cursor-default"
                >
                  <span className="w-1 h-1 rounded-full bg-white/25" />
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-30 hero-scroll-indicator">
          <a
            href="#tentang"
            onClick={(e) => smoothScroll(e, 'tentang')}
            className="text-white/40 hover:text-white/80 transition-colors duration-300 flex flex-col items-center gap-1"
          >
            <span className="text-[10px] uppercase tracking-widest text-white/30">Scroll</span>
            <ChevronDown className="w-6 h-6" />
          </a>
        </div>
      </section>

      {/* ═══════════════════════ INNOVATING SECTION ═══════════════════════ */}
      <section className="bg-white py-28 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24 items-start">

            {/* Left: heading + images */}
            <div>
              <FadeIn direction="left" delay={0}>
                <p className="text-[#9fd350] text-sm font-semibold uppercase tracking-[0.18em] mb-4">
                  Tentang Kami
                </p>
                <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111e0c] leading-tight mb-6">
                  INOVASI MASA DEPAN
                  <br />
                  <span className="text-[#2d5a27]">PERKEBUNAN</span>
                </h2>
                <p className="text-[#736c64] leading-relaxed max-w-md">
                  {companyInfo.name} menggabungkan kearifan petani lokal dengan pendekatan modern untuk
                  menghasilkan alpukat terbaik. Kami berkomitmen menyehatkan Indonesia satu buah alpukat
                  pada satu waktu.
                </p>
              </FadeIn>

              {/* Image grid */}
              <FadeIn direction="left" delay={0.18} className="mt-10">
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="rounded-2xl overflow-hidden group"
                    style={{ aspectRatio: '4/3', boxShadow: '0 12px 40px rgba(45,90,39,0.15)' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=500&q=80"
                      alt="Kebun alpukat"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div
                    className="rounded-2xl overflow-hidden group mt-8"
                    style={{ aspectRatio: '4/3', boxShadow: '0 12px 40px rgba(45,90,39,0.15)' }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=500&q=80"
                      alt="Panen alpukat"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right: animated stats */}
            <div ref={statsRef} className="flex flex-col gap-10 lg:pt-20">
              {stats.map((s, i) => (
                <FadeIn key={i} direction="right" delay={i * 0.14}>
                  <div className="flex items-start gap-6 group">
                    {/* Number */}
                    <div
                      className="text-6xl sm:text-7xl font-bold leading-none tabular-nums shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #2d5a27, #5a9e40)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {s.value}
                      {s.suffix}
                    </div>

                    {/* Text */}
                    <div className="pt-2">
                      <div className="font-semibold text-[#111e0c] text-lg mb-1.5">{s.label}</div>
                      <div className="text-[#736c64] text-sm leading-relaxed">{s.desc}</div>
                    </div>
                  </div>

                  {/* Divider */}
                  {i < stats.length - 1 && (
                    <div
                      className="mt-10 h-px"
                      style={{ background: 'linear-gradient(90deg, #e8f0e2, transparent)' }}
                    />
                  )}
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;
