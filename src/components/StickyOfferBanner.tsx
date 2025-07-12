import React, { useState, useEffect } from 'react';
import { X, MessageCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StickyOfferBannerProps {
  onWhatsAppClaim: (offerCode: string) => void;
}

export const StickyOfferBanner: React.FC<StickyOfferBannerProps> = ({ onWhatsAppClaim }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const endTime = new Date(Date.now() + (48 * 60 * 60 * 1000));
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;
      
      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const formatTime = (time: number) => time.toString().padStart(2, '0');

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg"
      >
        <div className="max-w-6xl mx-auto px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <Clock className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse flex-shrink-0" />
                <span className="text-xs sm:text-sm font-bold whitespace-nowrap">
                  FLASH SALE: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
                </span>
              </div>
              
              <div className="hidden sm:block text-xs sm:text-sm truncate">
                Save ₦156,000 on Smart Home Bundle
              </div>
              <div className="sm:hidden text-xs truncate">
                Save ₦156K
              </div>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <button
                onClick={() => onWhatsAppClaim('FLASH48')}
                className="bg-green-600 hover:bg-green-700 text-white px-2 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-bold flex items-center gap-1 transition-all duration-300 hover:scale-105 touch-target"
              >
                <MessageCircle className="w-3 h-3" />
                <span className="hidden sm:inline">Claim Now</span>
                <span className="sm:hidden">Claim</span>
              </button>
              
              <button
                onClick={() => setIsVisible(false)}
                className="text-white/80 hover:text-white p-1 touch-target"
                aria-label="Close banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};