import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { companyInfo, socialMedia } from '../data/mock';

const HeroSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('https://www.soundjay.com/nature/sounds/forest-1.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Floating leaves data - now avocados
  const floatingItems = [
    { id: 1, size: 80, left: '5%', top: '10%', delay: '0s', duration: '12s' },
    { id: 2, size: 60, left: '15%', top: '60%', delay: '2s', duration: '15s' },
    { id: 3, size: 100, left: '75%', top: '20%', delay: '4s', duration: '18s' },
    { id: 4, size: 70, left: '85%', top: '70%', delay: '1s', duration: '14s' },
    { id: 5, size: 50, left: '45%', top: '80%', delay: '3s', duration: '16s' },
  ];

  return (
    <section
      id="beranda"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Parallax Background Layers */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translateY(${scrollY * 0.3}px) scale(${1 + scrollY * 0.0003})`,
        }}
      />
      
      {/* Second Parallax Layer - Large Avocado Right */}
      <div
        className="absolute z-5 hidden lg:block"
        style={{
          right: '-5%',
          top: '10%',
          width: '45%',
          height: '80%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1601039641847-7857b994d704?w=800&q=80)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.25,
          transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * 0.05}px)`,
        }}
      />
      
      {/* Third Parallax Layer - Avocado Left */}
      <div
        className="absolute z-5 hidden lg:block"
        style={{
          left: '-8%',
          bottom: '5%',
          width: '35%',
          height: '70%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80)',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.2,
          transform: `translateY(${scrollY * -0.1}px) rotate(${scrollY * 0.02}deg)`,
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 gradient-hero" />
      
      {/* Animated Pattern Overlay */}
      <div className="absolute inset-0 z-15 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="leafPattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path
                d="M50 10 Q60 30 50 50 Q40 30 50 10"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                className="animate-pulse-soft"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#leafPattern)" />
        </svg>
      </div>

      {/* Floating Avocados Animation - Smaller decorative */}
      <div className="absolute inset-0 z-20 overflow-hidden pointer-events-none">
        {floatingItems.map((item) => (
          <div
            key={item.id}
            className="absolute animate-float"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            <div 
              className="rounded-full bg-[#567d46]/40 backdrop-blur-sm"
              style={{
                width: item.size,
                height: item.size,
                boxShadow: '0 8px 32px rgba(45, 90, 39, 0.3)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Noise Texture */}
      <div className="absolute inset-0 z-25 noise-overlay pointer-events-none" />

      {/* Content */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-[#c4a962] animate-pulse" />
            Kebun Alpukat Premium Sukakami
          </span>
        </div>

        {/* Main Title */}
        <h1 
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
        >
          <span className="block">Selamat Datang di</span>
          <span className="text-gradient-gold">{companyInfo.name}</span>
        </h1>

        {/* Subtitle */}
        <p 
          className="text-xl sm:text-2xl text-white/80 max-w-2xl mx-auto mb-10 font-light animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
        >
          {companyInfo.description}
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up opacity-0"
          style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
        >
          <a
            href={socialMedia.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group px-8 py-4 bg-white text-[#2d5a27] rounded-full font-semibold text-lg hover:bg-[#f7f5f2] transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center gap-2"
          >
            Pesan Alpukat
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
          <a
            href="#produk"
            onClick={(e) => handleSmoothScroll(e, 'produk')}
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Lihat Produk
          </a>
        </div>

        {/* Stats */}
        <div 
          className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto animate-fade-in-up opacity-0"
          style={{ animationDelay: '1s', animationFillMode: 'forwards' }}
        >
          {[
            { value: '5+', label: 'Tahun Pengalaman' },
            { value: '1000+', label: 'Pelanggan Puas' },
            { value: '50+', label: 'Hektar Kebun' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-white/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="absolute bottom-8 right-8 z-40 flex gap-2">
        <button
          onClick={toggleAudio}
          className="p-3 rounded-full glass hover:bg-white/20 transition-all duration-300 group"
          aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          ) : (
            <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
          )}
        </button>
        {isPlaying && (
          <button
            onClick={toggleMute}
            className="p-3 rounded-full glass hover:bg-white/20 transition-all duration-300 group"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? (
              <VolumeX className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            ) : (
              <Volume2 className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
            )}
          </button>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
        <a 
          href="#tentang" 
          onClick={(e) => handleSmoothScroll(e, 'tentang')}
          className="text-white/60 hover:text-white transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
