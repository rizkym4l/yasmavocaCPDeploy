import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Phone, Mail, Clock, ChevronDown } from 'lucide-react';
import { companyInfo, socialMedia } from '../data/mock';

/* ── Social Icons ── */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);
const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);
const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);
const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
  </svg>
);

/* ── Accordion Item ── */
const FaqItem = ({ q, a, index, inView }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border-b border-[#ece9e0] last:border-0"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(20px)',
        transition: `opacity 0.65s ease ${0.08 * index}s, transform 0.65s ease ${0.08 * index}s`,
      }}
    >
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="font-medium text-[#111e0c] group-hover:text-[#2d5a27] transition-colors duration-200 text-sm sm:text-base">
          {q}
        </span>
        <span
          className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: open ? '#2d5a27' : 'rgba(45,90,39,0.08)',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        >
          <ChevronDown className={`w-4 h-4 transition-colors duration-300 ${open ? 'text-white' : 'text-[#2d5a27]'}`} />
        </span>
      </button>

      <div
        style={{
          maxHeight: open ? '240px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.38s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <p className="text-[#736c64] text-sm leading-relaxed pb-5">{a}</p>
      </div>
    </div>
  );
};

/* ── Intersection hook ── */
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return [ref, inView];
};

const faqs = [
  {
    q: 'Jenis solusi pertanian apa yang Yasmavoca tawarkan?',
    a: 'Kami menyediakan alpukat Miki premium dalam berbagai ukuran—reguler, super, jumbo, dan organik—untuk konsumsi rumahan maupun kebutuhan grosir dan bisnis kuliner.',
  },
  {
    q: 'Bagaimana cara mulai memesan alpukat Yasmavoca?',
    a: 'Cukup hubungi kami via WhatsApp di nomor yang tertera, pilih produk dan jumlah yang diinginkan, dan tim kami akan membantu proses pemesanan hingga pengiriman.',
  },
  {
    q: 'Apakah produk Yasmavoca ramah lingkungan?',
    a: 'Ya! Kami memiliki lini alpukat organik yang ditanam tanpa pestisida kimia. Selain itu, praktik bertani kami mengutamakan keberlanjutan lahan dan ekosistem sekitar kebun.',
  },
  {
    q: 'Apakah Yasmavoca menyediakan layanan pengiriman?',
    a: 'Kami melayani pengiriman ke seluruh Indonesia dengan packaging khusus yang menjaga kesegaran alpukat. Tersedia pengiriman reguler maupun ekspres.',
  },
];

const contactItems = [
  { icon: MapPin, label: 'Alamat', value: companyInfo.address },
  { icon: Phone, label: 'Telepon', value: companyInfo.phone },
  { icon: Mail, label: 'Email', value: companyInfo.email },
  { icon: Clock, label: 'Jam Operasional', value: 'Setiap Hari, 08:00–17:00 WIB' },
];

const socialLinks = [
  { name: 'WhatsApp', href: socialMedia.whatsapp, icon: WhatsAppIcon },
  { name: 'Instagram', href: socialMedia.instagram, icon: InstagramIcon },
  { name: 'YouTube', href: socialMedia.youtube, icon: YouTubeIcon },
  { name: 'TikTok', href: socialMedia.tiktok, icon: TikTokIcon },
];

const ContactSection = () => {
  const [sectionRef, inView] = useInView();

  const fade = (delay = 0, dir = 'up') => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : dir === 'left' ? 'translateX(-32px)' : dir === 'right' ? 'translateX(32px)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <section
      id="kontak"
      ref={sectionRef}
      className="relative bg-white overflow-hidden py-24 lg:py-32"
    >
      {/* top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, #d4e8c8, transparent)' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section header ── */}
        <div className="mb-16" style={fade(0)}>
          <p className="text-[#5a9e40] text-sm font-semibold uppercase tracking-[0.18em] mb-3">
            Hubungi Kami
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-[#111e0c] leading-tight">
              PUNYA PERTANYAAN? KAMI{' '}
              <span className="text-[#2d5a27]">SIAP MEMBANTU.</span>
            </h2>
            <p className="text-[#736c64] max-w-xs text-sm leading-relaxed lg:text-right">
              Tim kami siap menjawab setiap pertanyaan dan membantu proses pemesanan.
            </p>
          </div>
        </div>

        {/* ── Two columns ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Left: FAQ accordion */}
          <div style={fade(0.1, 'left')}>
            <h3 className="font-semibold text-[#111e0c] mb-2">Pertanyaan Umum</h3>
            <p className="text-[#736c64] text-sm mb-8">Temukan jawaban atas pertanyaan yang sering ditanyakan.</p>

            <div className="rounded-2xl border border-[#ece9e0] bg-[#f9f8f4] px-6 divide-y-0">
              {faqs.map((item, i) => (
                <FaqItem key={i} q={item.q} a={item.a} index={i} inView={inView} />
              ))}
            </div>
          </div>

          {/* Right: Contact info + WhatsApp CTA */}
          <div style={fade(0.22, 'right')} className="flex flex-col gap-8">

            {/* Contact cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-[#ece9e0] bg-[#f9f8f4] hover:border-[#2d5a27]/25 hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#2d5a27] flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-[#736c64] text-xs mb-0.5">{item.label}</p>
                      <p className="text-[#111e0c] font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social media */}
            <div>
              <p className="text-sm font-semibold text-[#111e0c] mb-4">Ikuti Kami</p>
              <div className="flex flex-wrap gap-3">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <a
                      key={s.name}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#ece9e0] bg-[#f9f8f4] text-[#736c64] hover:bg-[#2d5a27] hover:text-white hover:border-[#2d5a27] transition-all duration-300 text-sm font-medium"
                    >
                      <Icon />
                      {s.name}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* WhatsApp CTA card */}
            <div
              className="relative rounded-2xl p-7 overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #1e3d1a 0%, #2d5a27 60%, #4a7c43 100%)' }}
            >
              {/* glow */}
              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl opacity-20"
                style={{ background: '#9fd350' }} />

              <div className="relative">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-3">Cara Tercepat</p>
                <h4 className="font-display text-xl font-bold text-white mb-3">
                  Pesan Langsung via WhatsApp
                </h4>
                <p className="text-white/65 text-sm leading-relaxed mb-6">
                  Dapatkan alpukat segar dalam hitungan jam. Tim kami siap melayani setiap hari mulai pukul 08.00 WIB.
                </p>

                <a
                  href={socialMedia.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full py-3.5 bg-white text-[#2d5a27] rounded-xl font-semibold text-sm hover:bg-[#f7f5f2] hover:scale-[1.02] transition-all duration-300"
                >
                  <WhatsAppIcon />
                  Chat WhatsApp Sekarang
                </a>

                {/* social proof */}
                <div className="mt-5 flex items-center gap-3 text-white/45 text-xs">
                  <div className="flex -space-x-2">
                    {['A', 'B', 'C'].map((l) => (
                      <div key={l} className="w-7 h-7 rounded-full border-2 border-[#2d5a27] bg-white/15 flex items-center justify-center text-white text-[10px] font-bold">
                        {l}
                      </div>
                    ))}
                  </div>
                  1000+ pelanggan puas telah memesan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
