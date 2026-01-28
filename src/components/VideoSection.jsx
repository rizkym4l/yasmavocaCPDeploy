import React, { useEffect, useRef, useState } from 'react';
import { Play, Youtube, Eye, Clock, X } from 'lucide-react';
import { socialMedia } from '../data/mock';

// Mock video data - bisa diganti dengan video asli nanti
const videos = [
  {
    id: 1,
    title: "Proses Panen Alpukat Miki di Kebun Yasmavoca",
    description: "Lihat bagaimana tim kami memanen alpukat dengan hati-hati untuk menjaga kualitas terbaik.",
    thumbnail: "https://images.unsplash.com/photo-1601039641847-7857b994d704?w=600&q=80",
    youtubeId: "hX5wI6kprdE", // placeholder - ganti dengan ID video asli
    duration: "5:32",
    views: "12.5K",
    featured: true,
  },
  {
    id: 2,
    title: "Tour Kebun Alpukat 50 Hektar",
    description: "Jelajahi kebun alpukat kami yang luas di kawasan sejuk Sukiran, Sukabumi.",
    thumbnail: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8:15",
    views: "8.2K",
    featured: false,
  },
  {
    id: 3,
    title: "Tips Memilih Alpukat Matang Sempurna",
    description: "Cara mudah memilih alpukat yang siap santap dengan tekstur creamy.",
    thumbnail: "https://images.unsplash.com/photo-1519162808019-7de1683fa2ad?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "3:45",
    views: "25.1K",
    featured: false,
  },
  {
    id: 4,
    title: "Resep Smoothie Alpukat Segar",
    description: "Buat smoothie alpukat lezat dengan alpukat Miki premium dari Yasmavoca.",
    thumbnail: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=600&q=80",
    youtubeId: "dQw4w9WgXcQ",
    duration: "4:20",
    views: "18.7K",
    featured: false,
  },
];

const VideoCard = ({ video, index, isVisible, onPlay }) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-[#1e1919]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
        
        {/* Play Button */}
        <button
          onClick={() => onPlay(video)}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg">
            <Play className="w-7 h-7 text-[#2d5a27] ml-1" fill="#2d5a27" />
          </div>
        </button>
        
        {/* Duration Badge */}
        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-white text-xs font-medium flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {video.duration}
        </div>
        
        {/* Featured Badge */}
        {video.featured && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-[#c4a962] rounded-full text-white text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-5">
        <h3 className="font-semibold text-[#1e1919] mb-2 line-clamp-2 group-hover:text-[#2d5a27] transition-colors duration-300">
          {video.title}
        </h3>
        <p className="text-sm text-[#736c64] mb-3 line-clamp-2">
          {video.description}
        </p>
        
        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-[#736c64]">
          <span className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            {video.views} views
          </span>
        </div>
      </div>
    </div>
  );
};

const FeaturedVideo = ({ video, isVisible, onPlay }) => {
  return (
    <div
      className={`relative rounded-3xl overflow-hidden transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Large Thumbnail */}
      <div className="relative aspect-[16/9] lg:aspect-[21/9] overflow-hidden bg-[#1e1919]">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-[#c4a962] rounded-full text-white text-xs font-semibold mb-4">
              <Youtube className="w-4 h-4" />
              Video Pilihan
            </span>
            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3">
              {video.title}
            </h3>
            <p className="text-white/80 mb-6 max-w-xl hidden sm:block">
              {video.description}
            </p>
            
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={() => onPlay(video)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#2d5a27] rounded-full font-semibold hover:bg-[#f7f5f2] transition-all duration-300 hover:scale-105"
              >
                <Play className="w-5 h-5" fill="#2d5a27" />
                Tonton Sekarang
              </button>
              
              <div className="flex items-center gap-4 text-white/70 text-sm">
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {video.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {video.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VideoModal = ({ video, isOpen, onClose }) => {
  if (!isOpen || !video) return null;
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
      onClick={onClose}
    >
      {/* Close Button */}
      <button 
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        onClick={onClose}
      >
        <X className="w-6 h-6" />
      </button>
      
      {/* Video Container */}
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

const VideoSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handlePlayVideo = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  const featuredVideo = videos.find(v => v.featured);
  const otherVideos = videos.filter(v => !v.featured);

  return (
    <>
      <section
        id="video"
        ref={sectionRef}
        className="relative section-padding overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #f7f5f2 0%, #ffffff 50%, #f7f5f2 100%)'
        }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-20 right-0 w-80 h-80 bg-[#2d5a27]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#c4a962]/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-12">
            <span 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-600 text-sm font-medium mb-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Youtube className="w-4 h-4" />
              Video & Konten
            </span>
            <h2 
              className={`font-display text-4xl sm:text-5xl font-bold text-[#1e1919] mb-6 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Jelajahi <span className="text-[#2d5a27]">Kebun Kami</span>
            </h2>
            <p 
              className={`text-[#736c64] text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Tonton video-video menarik tentang proses budidaya, panen, dan tips seputar alpukat dari kebun Yasmavoca.
            </p>
          </div>

          {/* Featured Video */}
          {featuredVideo && (
            <div className="mb-10">
              <FeaturedVideo 
                video={featuredVideo} 
                isVisible={isVisible} 
                onPlay={handlePlayVideo}
              />
            </div>
          )}

          {/* Video Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherVideos.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                index={index}
                isVisible={isVisible}
                onPlay={handlePlayVideo}
              />
            ))}
          </div>

          {/* CTA to YouTube Channel */}
          <div 
            className={`mt-12 text-center transition-all duration-1000 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <a
              href={socialMedia.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#FF0000] text-white rounded-full font-semibold hover:bg-[#cc0000] transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25"
            >
              <Youtube className="w-5 h-5" />
              Subscribe Channel Kami
            </a>
            <p className="mt-4 text-sm text-[#736c64]">
              Dapatkan update video terbaru seputar kebun & tips alpukat
            </p>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <VideoModal 
        video={selectedVideo} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </>
  );
};

export default VideoSection;
