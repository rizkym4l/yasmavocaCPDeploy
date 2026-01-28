import React, { useEffect, useRef, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { products, socialMedia } from '../data/mock';

const ProductCard = ({ product, index, isVisible }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Best Seller':
        return 'bg-[#c4a962] text-white';
      case 'Premium':
        return 'bg-[#2d5a27] text-white';
      case 'Organik':
        return 'bg-emerald-500 text-white';
      case 'Hemat':
        return 'bg-amber-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div
      className={`product-card group bg-white rounded-3xl overflow-hidden shadow-sm transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-[#f7f5f2]">
        <img
          src={product.image}
          alt={product.name}
          className="product-image w-full h-full object-cover"
        />
        
        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${getBadgeColor(product.badge)}`}>
            {product.badge}
          </span>
        )}

        {/* Quick Action */}
        <div className="absolute inset-0 bg-[#2d5a27]/0 group-hover:bg-[#2d5a27]/20 transition-all duration-300 flex items-center justify-center">
          <a
            href={socialMedia.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-white text-[#2d5a27] rounded-full font-semibold opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center gap-2 hover:bg-[#2d5a27] hover:text-white"
          >
            <ShoppingBag className="w-4 h-4" />
            Pesan
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-bold text-[#1e1919] mb-2 group-hover:text-[#2d5a27] transition-colors duration-300">
          {product.name}
        </h3>
        <p className="text-[#736c64] text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        {/* Weight Info */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs px-2 py-1 bg-[#f7f5f2] rounded-lg text-[#736c64]">
            {product.weight}
          </span>
        </div>

        {/* Price */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-[#736c64] mb-1">Harga per gram</p>
            <p className="text-2xl font-bold text-[#2d5a27]">
              {formatPrice(product.pricePerGram)}
              <span className="text-sm font-normal text-[#736c64]">/gr</span>
            </p>
          </div>
          {product.stock && (
            <span className="flex items-center gap-1 text-xs text-emerald-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Tersedia
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="produk"
      ref={sectionRef}
      className="relative section-padding bg-white overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f7f5f2] to-transparent" />
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-[#2d5a27]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-[#c4a962]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span 
            className={`inline-block px-4 py-2 rounded-full bg-[#2d5a27]/10 text-[#2d5a27] text-sm font-medium mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Produk Kami
          </span>
          <h2 
            className={`font-display text-4xl sm:text-5xl font-bold text-[#1e1919] mb-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Koleksi Alpukat <span className="text-[#2d5a27]">Premium</span>
          </h2>
          <p 
            className={`text-[#736c64] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            Pilihan alpukat Miki terbaik dengan berbagai ukuran dan harga. Semua dipetik langsung dari kebun kami.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA Banner */}
        <div 
          className={`mt-16 relative rounded-3xl overflow-hidden transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="absolute inset-0 bg-[#2d5a27]" />
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="ctaPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <circle cx="20" cy="20" r="1" fill="white" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#ctaPattern)" />
            </svg>
          </div>
          
          <div className="relative p-8 sm:p-12 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
              Butuh Pesanan Khusus?
            </h3>
            <p className="text-white/80 mb-6 max-w-xl mx-auto">
              Untuk pembelian grosir atau pesanan dalam jumlah besar, hubungi kami langsung via WhatsApp untuk penawaran spesial.
            </p>
            <a
              href={socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#2d5a27] rounded-full font-semibold hover:bg-[#f7f5f2] transition-all duration-300 hover:scale-105"
            >
              Hubungi via WhatsApp
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
