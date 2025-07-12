import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Maximize2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  title?: string;
}

interface MediaGalleryProps {
  productId: string;
  productName: string;
  media: MediaItem[];
  className?: string;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  productName,
  media,
  className = ''
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightboxVideoRef = useRef<HTMLVideoElement>(null);

  // Touch handling for mobile swipe
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  useEffect(() => {
    // Preload first few images
    media.slice(0, 3).forEach(item => {
      if (item.type === 'image') {
        const img = new Image();
        img.onload = () => {
          setLoadedImages(prev => new Set([...prev, item.id]));
        };
        img.src = item.src;
      }
    });
  }, [media]);

  useEffect(() => {
    // Auto-scroll to current item
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const itemWidth = container.clientWidth;
      container.scrollTo({
        left: currentIndex * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev > 0 ? prev - 1 : media.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev < media.length - 1 ? prev + 1 : 0));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setShowLightbox(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setShowLightbox(false);
    setIsPlaying(false);
    document.body.style.overflow = 'unset';
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause();
    }
  };

  const handleVideoPlay = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      if (isPlaying) {
        ref.current.pause();
      } else {
        ref.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (ref: React.RefObject<HTMLVideoElement>) => {
    if (ref.current) {
      ref.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleImageLoad = (itemId: string) => {
    setLoadedImages(prev => new Set([...prev, itemId]));
  };

  const renderMediaItem = (item: MediaItem, index: number, isLightbox = false) => {
    const currentVideoRef = isLightbox ? lightboxVideoRef : videoRef;
    
    if (item.type === 'video') {
      return (
        <div className="relative group">
          <video
            ref={index === currentIndex ? currentVideoRef : undefined}
            className="w-full h-full object-contain"
            poster={item.thumbnail}
            muted={isMuted}
            playsInline
            preload="metadata"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src={item.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Video Controls Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
            <button
              onClick={() => handleVideoPlay(currentVideoRef)}
              className="w-16 h-16 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
              {isPlaying ? (
                <div className="w-4 h-4 bg-gray-800 rounded-sm"></div>
              ) : (
                <Play className="w-6 h-6 text-gray-800 ml-1" />
              )}
            </button>
          </div>
          
          {/* Mute Toggle */}
          <button
            onClick={() => toggleMute(currentVideoRef)}
            className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </div>
      );
    }

    return (
      <div className="relative group">
        {!loadedImages.has(item.id) && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={item.src}
          alt={item.alt}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            loadedImages.has(item.id) ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => handleImageLoad(item.id)}
          loading="lazy"
          srcSet={`${item.src}?w=400 400w, ${item.src}?w=800 800w`}
          sizes="(max-width: 768px) 400px, 800px"
        />
        
        {/* Expand Icon */}
        <button
          onClick={() => openLightbox(index)}
          className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
          aria-label="View fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>
    );
  };

  return (
    <>
      <div className={`relative ${className}`}>
        {/* Main Gallery Container */}
        <div className="relative aspect-video bg-gray-100 rounded-xl overflow-hidden">
          {/* Media Slider */}
          <div
            ref={scrollContainerRef}
            className="flex h-full overflow-x-auto scrollbar-hide snap-x snap-mandatory"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {media.map((item, index) => (
              <div
                key={item.id}
                className="flex-shrink-0 w-full h-full snap-center cursor-pointer object-cover"
                onClick={() => openLightbox(index)}
              >
                {renderMediaItem(item, index)}
              </div>
            ))}
          </div>

          {/* Navigation Arrows - Desktop */}
          <div className="hidden md:block">
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous media"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
            
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next media"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
          </div>

          {/* Media Type Indicator */}
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            {media[currentIndex]?.type === 'video' && (
              <div className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                <Play className="w-3 h-3 mr-1" />
                VIDEO
              </div>
            )}
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center mt-4 space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'bg-blue-600 w-6'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to media ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-2 bg-gray-200 rounded-full h-1 overflow-hidden">
          <div
            className="bg-blue-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentIndex + 1) / media.length) * 100}%` }}
          />
        </div>

        {/* Media Counter */}
        <div className="text-center mt-2 text-sm text-gray-600">
          {currentIndex + 1} of {media.length}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {showLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-full w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute -top-12 right-0 w-10 h-10 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors z-10"
                aria-label="Close lightbox"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Lightbox Content */}
              <div className="bg-black rounded-lg overflow-hidden aspect-video">
                {renderMediaItem(media[lightboxIndex], lightboxIndex, true)}
              </div>

              {/* Lightbox Navigation */}
              <button
                onClick={() => setLightboxIndex(prev => (prev > 0 ? prev - 1 : media.length - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Previous media"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setLightboxIndex(prev => (prev < media.length - 1 ? prev + 1 : 0))}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/30 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Next media"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Lightbox Info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="text-lg font-semibold mb-1">{productName}</h3>
                <p className="text-sm text-gray-300">
                  {media[lightboxIndex]?.title || media[lightboxIndex]?.alt}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">
                    {lightboxIndex + 1} of {media.length}
                  </span>
                  <div className="flex space-x-1">
                    {media.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setLightboxIndex(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index === lightboxIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        aria-label={`Go to media ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};