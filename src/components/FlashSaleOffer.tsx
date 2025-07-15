import React, { useState, useEffect } from 'react';
import { Clock, MessageCircle, Zap, Gift, Users, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface FlashSaleOfferProps {
  onWhatsAppClaim: (offerCode: string) => void;
}

export const FlashSaleOffer: React.FC<FlashSaleOfferProps> = ({ onWhatsAppClaim }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [spotsRemaining, setSpotsRemaining] = useState(5);
  const [claimedCount, setClaimedCount] = useState(50);

  // Calculate end time (48 hours from now)
  const getEndTime = () => {
    const now = new Date();
    const endTime = new Date(now.getTime() + (48 * 60 * 60 * 1000));
    return endTime;
  };

  useEffect(() => {
    const endTime = getEndTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;
      
      if (distance > 0) {
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Simulate dynamic spots remaining
  useEffect(() => {
    const spotsTimer = setInterval(() => {
      if (Math.random() > 0.8 && spotsRemaining > 1) {
        setSpotsRemaining(prev => prev - 1);
        setClaimedCount(prev => prev + 1);
      }
    }, 25000);

    return () => clearInterval(spotsTimer);
  }, [spotsRemaining]);

  const handleClaimOffer = () => {
    onWhatsAppClaim('SMARTSECURE');
    // ✅ Track the WhatsApp click as a Lead
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  };

  const formatTime = (time: number) => {
    return time.toString().padStart(2, '0');
  };

  return (
    <section className="relative py-6 sm:py-8 bg-gradient-to-r from-red-600 via-red-700 to-red-800 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center bg-yellow-400 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full font-bold text-xs sm:text-sm mb-3 animate-pulse">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
            LIMITED TIME FLASH SALE
          </div>
          
          <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white mb-2">
            🔥 FLASH SALE ENDS IN:
          </h2>
          
          {/* Countdown Timer */}
          <div className="flex justify-center items-center space-x-1 sm:space-x-2 md:space-x-4 mb-4">
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 text-center min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-red-300">
                {formatTime(timeLeft.hours)}
              </div>
              <div className="text-xs md:text-sm text-white/80">HOURS</div>
            </div>
            <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">:</div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 text-center min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-red-300">
                {formatTime(timeLeft.minutes)}
              </div>
              <div className="text-xs md:text-sm text-white/80">MINS</div>
            </div>
            <div className="text-white text-lg sm:text-xl md:text-2xl font-bold">:</div>
            <div className="bg-black/30 backdrop-blur-sm rounded-lg p-2 sm:p-3 md:p-4 text-center min-w-[50px] sm:min-w-[60px] md:min-w-[80px]">
              <div className="text-lg sm:text-xl md:text-3xl font-bold text-red-300 animate-pulse">
                {formatTime(timeLeft.seconds)}
              </div>
              <div className="text-xs md:text-sm text-white/80">SECS</div>
            </div>
          </div>
        </motion.div>

        {/* Offer Details */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 shadow-2xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            {/* Left Side - Offer Details */}
            <div>
              <div className="mb-4 sm:mb-6">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark-800 mb-4">
                  Complete Smart Home Security Bundle
                </h3>
                
                {/* Pricing */}
                <div className="flex flex-wrap items-center space-x-2 sm:space-x-4 mb-4">
                  <span className="text-base sm:text-lg text-dark-500 line-through">₦876,000</span>
                  <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-600">₦720,000</span>
                  <div className="bg-green-100 text-green-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-bold">
                    SAVE 17.8%
                  </div>
                </div>
                
                <div className="text-base sm:text-lg text-dark-600 mb-4">
                  <strong>You Save: ₦156,000</strong>
                </div>

                {/* Bundle Contents */}
                <div className="bg-primary-50 rounded-xl p-3 sm:p-4 mb-4">
                  <h4 className="font-bold text-dark-800 mb-3 flex items-center text-sm sm:text-base">
                    <Gift className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-primary-600" />
                    INCLUDES:
                  </h4>
                  <ul className="space-y-1 sm:space-y-2 text-xs sm:text-sm text-dark-700">
                    <li>✅ Premium Smart Door Lock (₦153,000 value)</li>
                    <li>✅ 4x Dual-Lens CCTV Security Cameras (₦452,000 value)</li>
                    <li>✅ Smart Projector with Remote Control (₦141,000 value)</li>
                    <li>✅ Bonus: Smart Glass Lock or Smart Socket/Switch Kit (₦122,000 value)</li>
                    <li>✅ FREE Delivery</li>
                    <li className="text-red-600 font-medium">❌ Installation not included (Paid separately)</li>
                  </ul>
                  <div className="mt-2 sm:mt-3 text-xs sm:text-sm font-bold text-primary-600">
                    Total Bundle Value: ₦876,000
                  </div>
                </div>

                {/* Promo Code */}
                <div className="bg-yellow-100 border-2 border-yellow-300 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-medium text-dark-700">Exclusive Promo Code:</span>
                    <span className="bg-yellow-400 text-black px-2 sm:px-3 py-1 rounded font-bold text-sm sm:text-lg">
                      SMARTSECURE
                    </span>
                  </div>
                </div>

                {/* Warranty & Support */}
                <div className="flex items-center justify-between text-xs sm:text-sm text-dark-600 bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center">
                    <span className="mr-2">🛡️</span>
                    <span className="font-medium">5-Year Product Warranty</span>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">☎️</span>
                    <span className="font-medium">24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Urgency & CTA */}
            <div className="text-center">
              {/* Urgency Elements */}
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                <div className="bg-red-100 border border-red-300 rounded-lg p-3">
                  <div className="flex items-center justify-center text-red-700 font-bold text-sm sm:text-base">
                    <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Only {spotsRemaining} bundles remaining!
                  </div>
                </div>
                
                <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                  <div className="flex items-center justify-center text-green-700 font-medium text-sm sm:text-base">
                    <Users className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Join {claimedCount}+ smart homeowners who secured this deal
                  </div>
                </div>
              </div>

              {/* Main CTA Button */}
              <button
                onClick={handleClaimOffer}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-4 sm:px-6 rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl mb-3 sm:mb-4 group touch-target"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
                🎯 Claim Your Offer Now
              </button>

              <div className="text-xs sm:text-sm text-dark-500 mb-3 sm:mb-4">
                Chat on WhatsApp with pre-filled promo code
              </div>

              {/* Additional Trust Elements */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                  <div className="text-base sm:text-lg font-bold text-dark-800">5-Year</div>
                  <div className="text-xs sm:text-sm text-dark-600">Warranty</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-2 sm:p-3">
                  <div className="text-base sm:text-lg font-bold text-dark-800">24/7</div>
                  <div className="text-xs sm:text-sm text-dark-600">Support</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Urgency Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-4 sm:mt-6 text-center"
        >
          <div className="inline-flex items-center bg-black/20 backdrop-blur-sm text-white px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
            <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 animate-pulse" />
            This offer expires in {formatTime(timeLeft.hours)}h {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
          </div>
        </motion.div>
      </div>
    </section>
  );
};