import React, { useEffect, useRef, useState } from 'react';
import { Play, Youtube, Eye, Clock, X, ArrowRight } from 'lucide-react';
import { socialMedia } from '../data/mock';

const videos = [
  {
    id: 1,
    title: 'Proses Panen Alpukat Miki di Kebun Yasmavoca',
    description: 'Lihat bagaimana tim kami memanen alpukat dengan hati-hati untuk menjaga kualitas terbaik.',
    thumbnail: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=700&q=80',
    youtubeId: 'hX5wI6kprdE',
    duration: '5:32',
    views: '12.5K',
    featured: true,
    tag: 'Proses Panen',
  },
  {
    id: 2,
    title: 'Tour Kebun Alpukat 50 Hektar',
    description: 'Jelajahi kebun alpukat kami yang luas di kawasan sejuk Sukiran, Sukabumi.',
    thumbnail: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?w=500&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '8:15',
    views: '8.2K',
    featured: false,
    tag: 'Kebun Tour',
  },
  {
    id: 3,
    title: 'Tips Memilih Alpukat Matang Sempurna',
    description: 'Cara mudah memilih alpukat yang siap santap dengan tekstur creamy.',
    thumbnail: 'https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=500&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '3:45',
    views: '25.1K',
    featured: false,
    tag: 'Tips & Trik',
  },
  {
    id: 4,
    title: 'Resep Smoothie Alpukat Segar',
    description: 'Buat smoothie alpukat lezat dengan alpukat Miki premium dari Yasmavoca.',
    thumbnail: 'https://images.unsplash.com/photo-1590005354167-6da97870c757?w=500&q=80',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '4:20',
    views: '18.7K',
    featured: false,
    tag: 'Resep',
  },
];

/* ── Intersection hook ── */
const useInView = (threshold = 0.12) => {
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

/* ── Modal ── */
const VideoModal = ({ video, isOpen, onClose }) => {
  useEffect(() => {
    const esc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [onClose]);

  if (!isOpen || !video) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92" onClick={onClose}>
      <button
        className="absolute top-5 right-5 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      <div
        className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

/* ── Article / Video Card ── */
const VideoCard = ({ video, delay, inView, onPlay }) => (
  <div
    className="group cursor-pointer"
    style={{
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(28px)',
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}
    onClick={() => onPlay(video)}
  >
    {/* Image */}
    <div className="relative rounded-2xl overflow-hidden mb-4" style={{ aspectRatio: '16/10' }}>
      <img
        src={video.thumbnail}
        alt={video.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
      />
      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-300" />

      {/* Play btn */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg"
        >
          <Play className="w-5 h-5 text-[#2d5a27] ml-0.5" fill="#2d5a27" />
        </div>
      </div>

      {/* Tag */}
      <span
        className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold text-white"
        style={{ background: 'rgba(45,90,39,0.85)', backdropFilter: 'blur(8px)' }}
      >
        {video.tag}
      </span>

      {/* Duration */}
      <div className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded bg-black/70 text-white text-xs">
        <Clock className="w-3 h-3" />
        {video.duration}
      </div>
    </div>

    {/* Text */}
    <h3 className="font-semibold text-[#111e0c] mb-1.5 group-hover:text-[#2d5a27] transition-colors duration-300 line-clamp-2">
      {video.title}
    </h3>
    <p className="text-sm text-[#736c64] line-clamp-2 mb-2">{video.description}</p>
    <div className="flex items-center gap-1 text-xs text-[#9bba8a]">
      <Eye className="w-3.5 h-3.5" />
      {video.views} penonton
    </div>
  </div>
);

/* ── Main Component ── */
const VideoSection = () => {
  const [sectionRef, inView] = useInView();
  const [selected, setSelected] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const featured = videos.find((v) => v.featured);
  const others = videos.filter((v) => !v.featured);

  const open = (v) => { setSelected(v); setModalOpen(true); };
  const close = () => { setModalOpen(false); setSelected(null); };

  const fade = (delay = 0, dir = 'up') => ({
    opacity: inView ? 1 : 0,
    transform: inView ? 'none' : dir === 'left' ? 'translateX(-36px)' : dir === 'right' ? 'translateX(36px)' : 'translateY(28px)',
    transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s`,
  });

  return (
    <>
      <section
        id="video"
        ref={sectionRef}
        className="relative overflow-hidden py-24 lg:py-32"
        style={{ background: 'linear-gradient(180deg, #111e0c 0%, #162510 60%, #0e1a0a 100%)' }}
      >
        {/* grid texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* glow blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #2d5a27, transparent)' }} />
        <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #5a9e40, transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">

          {/* ── Section header ── */}
          <div className="mb-16" style={fade(0)}>
            <p className="text-[#9fd350] text-sm font-semibold uppercase tracking-[0.18em] mb-3">
              Video & Konten
            </p>
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white leading-tight max-w-xl">
                DIMANA TEKNOLOGI BERTEMU
                <span className="text-[#9fd350]"> ALAM</span>
              </h2>
              <p className="text-white/55 max-w-sm text-sm leading-relaxed lg:text-right">
                Teknologi modern dan kearifan lokal berpadu untuk menghasilkan alpukat terbaik. Saksikan prosesnya.
              </p>
            </div>
          </div>

          {/* ── Featured Video (Two-col) ── */}
          {featured && (
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20 pb-20"
              style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>

              {/* Left: text */}
              <div style={fade(0.1, 'left')}>
                <span
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-white mb-6"
                  style={{ background: 'rgba(196,169,98,0.25)', border: '1px solid rgba(196,169,98,0.4)' }}
                >
                  <Youtube className="w-3.5 h-3.5 text-[#c4a962]" />
                  Video Pilihan
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                  {featured.title}
                </h3>
                <p className="text-white/60 mb-8 leading-relaxed">
                  {featured.description}
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => open(featured)}
                    className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105"
                    style={{ background: 'linear-gradient(135deg, #4f8c25, #6fb032)', boxShadow: '0 6px 24px rgba(79,140,37,0.35)' }}
                  >
                    <Play className="w-5 h-5" fill="white" />
                    Tonton Sekarang
                  </button>
                  <div className="flex items-center gap-4 text-white/40 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />{featured.views}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />{featured.duration}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: thumbnail */}
              <div style={fade(0.22, 'right')}>
                <div
                  className="relative rounded-3xl overflow-hidden cursor-pointer group"
                  style={{ aspectRatio: '16/9', boxShadow: '0 24px 64px rgba(0,0,0,0.5)' }}
                  onClick={() => open(featured)}
                >
                  <img
                    src={featured.thumbnail}
                    alt={featured.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-2xl"
                      style={{ background: 'rgba(255,255,255,0.92)' }}
                    >
                      <Play className="w-9 h-9 text-[#2d5a27] ml-1" fill="#2d5a27" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── Video cards grid ── */}
          <div>
            <div className="flex items-center justify-between mb-10" style={fade(0.1)}>
              <h3 className="font-display text-xl font-bold text-white">Video Lainnya</h3>
              <a
                href={socialMedia.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#9fd350] hover:text-white transition-colors duration-300"
              >
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {others.map((v, i) => (
                <VideoCard
                  key={v.id}
                  video={v}
                  delay={0.18 + i * 0.1}
                  inView={inView}
                  onPlay={open}
                />
              ))}
            </div>
          </div>

          {/* ── YouTube CTA ── */}
          <div
            className="mt-16 text-center"
            style={fade(0.3)}
          >
            <a
              href={socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ background: 'linear-gradient(135deg, #cc0000, #ff2222)', boxShadow: '0 8px 28px rgba(204,0,0,0.3)' }}
            >
              <Youtube className="w-5 h-5" />
              Subscribe Channel Kami
            </a>
            <p className="mt-3 text-sm text-white/35">
              Dapatkan update video terbaru seputar kebun &amp; tips alpukat
            </p>
          </div>
        </div>
      </section>

      <VideoModal video={selected} isOpen={modalOpen} onClose={close} />
    </>
  );
};

export default VideoSection;
