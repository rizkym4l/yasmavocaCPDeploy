import React, { useState, useEffect } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { companyInfo, socialMedia } from '../data/mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#beranda' },
    { name: 'Tentang', href: '#tentang' },
    { name: 'Produk', href: '#produk' },
    { name: 'Video', href: '#video' },
    { name: 'Kontak', href: '#kontak' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
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
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#beranda" className="flex items-center gap-3 group">
            <div className={`p-2 rounded-full transition-all duration-300 ${
              isScrolled ? 'bg-[#2d5a27]' : 'bg-white/20 backdrop-blur-sm'
            }`}>
              <Leaf className={`w-6 h-6 transition-colors duration-300 ${
                isScrolled ? 'text-white' : 'text-white'
              }`} />
            </div>
            <span className={`font-display text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-[#2d5a27]' : 'text-white'
            }`}>
              {companyInfo.name}
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`font-medium transition-all duration-300 hover:scale-105 ${
                  isScrolled
                    ? 'text-[#1e1919] hover:text-[#2d5a27]'
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                isScrolled
                  ? 'bg-[#2d5a27] text-white hover:bg-[#1e3d1a]'
                  : 'bg-white text-[#2d5a27] hover:bg-white/90'
              }`}
            >
              Pesan Sekarang
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled ? 'text-[#2d5a27]' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className={`rounded-2xl p-4 ${
            isScrolled ? 'bg-[#f7f5f2]' : 'glass'
          }`}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block py-3 px-4 rounded-xl font-medium transition-colors duration-300 ${
                  isScrolled
                    ? 'text-[#1e1919] hover:bg-[#2d5a27]/10'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {link.name}
              </a>
            ))}
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 py-3 px-4 rounded-xl font-semibold text-center bg-[#2d5a27] text-white"
            >
              Pesan Sekarang
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
