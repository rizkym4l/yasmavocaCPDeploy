import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { companyInfo, socialMedia } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);

      // track active section
      const ids = ['beranda', 'tentang', 'produk', 'video', 'kontak'];
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', id: 'beranda' },
    { name: 'Tentang', id: 'tentang' },
    { name: 'Produk', id: 'produk' },
    { name: 'Video', id: 'video' },
    { name: 'Kontak', id: 'kontak' },
  ];

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 72, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: isScrolled
          ? 'rgba(255,255,255,0.97)'
          : 'transparent',
        backdropFilter: isScrolled ? 'blur(20px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.06)' : 'none',
        boxShadow: isScrolled ? '0 2px 24px rgba(0,0,0,0.06)' : 'none',
        padding: isScrolled ? '0' : '0',
      }}
    >
      {/* top hero fade – only visible when transparent */}
      {!isScrolled && (
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, transparent 100%)' }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div
          className="flex items-center justify-between transition-all duration-500"
          style={{ height: isScrolled ? '64px' : '76px' }}
        >

          {/* ── Logo ── */}
          <a
            href="#beranda"
            onClick={(e) => scrollTo(e, 'beranda')}
            className="flex items-center gap-2.5 group"
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:scale-105"
              style={{
                background: isScrolled
                  ? 'linear-gradient(135deg, #2d5a27, #4a7c43)'
                  : 'rgba(255,255,255,0.2)',
                backdropFilter: isScrolled ? 'none' : 'blur(10px)',
                border: isScrolled ? 'none' : '1px solid rgba(255,255,255,0.25)',
              }}
            >
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span
              className="font-display text-xl font-bold transition-colors duration-300"
              style={{ color: isScrolled ? '#111e0c' : 'white' }}
            >
              {companyInfo.name}
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollTo(e, link.id)}
                  className="relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 group"
                  style={{
                    color: isScrolled
                      ? isActive ? '#2d5a27' : '#4a4a4a'
                      : isActive ? 'white' : 'rgba(255,255,255,0.72)',
                    background: isScrolled && isActive ? 'rgba(45,90,39,0.08)' : 'transparent',
                  }}
                >
                  {link.name}
                  {/* active dot */}
                  {isActive && (
                    <span
                      className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: isScrolled ? '#2d5a27' : '#9fd350' }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* ── CTA + Mobile toggle ── */}
          <div className="flex items-center gap-3">
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={
                isScrolled
                  ? { background: 'linear-gradient(135deg, #2d5a27, #4a7c43)', color: 'white', boxShadow: '0 4px 16px rgba(45,90,39,0.25)' }
                  : { background: 'rgba(255,255,255,0.15)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(12px)' }
              }
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: isScrolled ? '#9fd350' : '#9fd350' }}
              />
              Pesan Sekarang
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300"
              style={{
                background: isScrolled ? 'rgba(45,90,39,0.08)' : 'rgba(255,255,255,0.15)',
                color: isScrolled ? '#2d5a27' : 'white',
              }}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div
          style={{
            maxHeight: isMobileMenuOpen ? '360px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.35s cubic-bezier(0.4,0,0.2,1)',
          }}
        >
          <div
            className="mb-4 rounded-2xl overflow-hidden"
            style={{
              background: isScrolled ? '#f9f8f4' : 'rgba(12,28,8,0.85)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => scrollTo(e, link.id)}
                  className="flex items-center justify-between px-5 py-3.5 text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isScrolled
                      ? isActive ? '#2d5a27' : '#4a4a4a'
                      : isActive ? '#9fd350' : 'rgba(255,255,255,0.75)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {link.name}
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9fd350]" />
                  )}
                </a>
              );
            })}
            <div className="px-4 py-4">
              <a
                href={socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #2d5a27, #4a7c43)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#9fd350]" />
                Pesan Sekarang
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
