import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { products, socialMedia } from '../data/mock';

const useInView = (threshold = 0.1) => {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
};

const badgeStyles = {
  'Best Seller': { bg: '#c4a962', text: 'white' },
  'Premium':     { bg: '#2d5a27', text: 'white' },
  'Organik':     { bg: '#22c55e', text: 'white' },
  'Hemat':       { bg: '#f59e0b', text: 'white' },
};

const ProductCard = ({ product, delay, inView }) => {
  const fmt = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  const badge = badgeStyles[product.badge];

  return (
    <div
      className="group bg-white rounded-2xl border border-[#ece9e0] overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s, box-shadow 0.4s ease, translateY 0.4s ease`,
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#f9f8f4]" style={{ aspectRatio: '4/3' }}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-600"
          style={{ transition: 'transform 0.6s ease' }}
        />

        {/* Badge */}
        {product.badge && badge && (
          <span
            className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold"
            style={{ background: badge.bg, color: badge.text }}
          >
            {product.badge}
          </span>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-[#111e0c]/0 group-hover:bg-[#111e0c]/25 transition-all duration-400 flex items-center justify-center">
          <a
            href={socialMedia.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-[#2d5a27] rounded-full font-semibold text-sm opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#2d5a27] hover:text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            Pesan
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Weight tag */}
        <span
          className="inline-block px-2.5 py-1 rounded-lg text-xs text-[#736c64] mb-3"
          style={{ background: '#f9f8f4', border: '1px solid #ece9e0' }}
        >
          {product.weight}
        </span>

        <h3 className="font-display font-bold text-[#111e0c] mb-1.5 group-hover:text-[#2d5a27] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-[#736c64] text-sm mb-4 line-clamp-2">{product.description}</p>

        {/* Price row */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[10px] text-[#736c64] uppercase tracking-wide mb-0.5">Harga / gram</p>
            <p className="text-xl font-bold text-[#2d5a27]">
              {fmt(product.pricePerGram)}
              <span className="text-xs font-normal text-[#736c64]">/gr</span>
            </p>
          </div>
          {product.stock && (
            <span className="flex items-center gap-1.5 text-xs text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Tersedia
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const [sectionRef, inView] = useInView();

  const fade = (delay = 0) => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : 'translateY(24px)',
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="produk"
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 lg:py-32"
    >
      {/* subtle top / bottom border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Header ── */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14" style={fade(0)}>
          <div>
            <p className="text-[#5a9e40] text-sm font-semibold uppercase tracking-[0.18em] mb-3">
              Produk Kami
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111e0c] leading-tight">
              Koleksi Alpukat{' '}
              <span className="text-[#2d5a27]">Premium</span>
            </h2>
          </div>
          <p className="text-[#736c64] max-w-sm text-sm leading-relaxed lg:text-right">
            Pilihan alpukat Miki terbaik dengan berbagai ukuran dan harga. Semua dipetik langsung dari kebun kami.
          </p>
        </div>

        {/* ── Grid ── */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {products.map((p, i) => (
            <ProductCard
              key={p.id}
              product={p}
              delay={0.06 + i * 0.07}
              inView={inView}
            />
          ))}
        </div>

        {/* ── CTA Banner ── */}
        <div
          className="relative rounded-3xl overflow-hidden"
          style={fade(0.45)}
        >
          {/* BG image */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1400&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          {/* overlay */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(12,28,8,0.92) 0%, rgba(45,90,39,0.82) 100%)' }}
          />

          {/* dot pattern */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative px-8 sm:px-12 py-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#9fd350] text-xs uppercase tracking-widest mb-2">Grosir & Khusus</p>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-2">
                Butuh Pesanan Khusus?
              </h3>
              <p className="text-white/65 text-sm max-w-md">
                Untuk pembelian grosir atau jumlah besar, hubungi kami langsung untuk penawaran spesial.
              </p>
            </div>
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-[#2d5a27] bg-white hover:bg-[#f7f5f2] hover:scale-105 transition-all duration-300 text-sm"
            >
              Hubungi via WhatsApp
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
