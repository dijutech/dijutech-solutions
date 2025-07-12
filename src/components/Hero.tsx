import React from 'react';
import { Shield, Phone, Play, Star, Users, Award, Truck, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
  onWhatsAppClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWhatsAppClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://bing.com/th/id/BCO.d80a0f22-9c96-487f-ac0b-b9823f02f5f1.png')] bg-cover sm:bg-center bg-right opacity-60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40"></div>
      </div>
      
      {/* Play Button Overlay */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
      >
        <button className="bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-4 md:p-6 hover:bg-white/30 transition-all duration-300 group">
          <Play className="w-6 h-6 md:w-8 md:h-8 text-white ml-1 group-hover:scale-110 transition-transform" />
        </button>
      </motion.div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="bg-primary-500/20 backdrop-blur-sm border border-primary-400/30 rounded-full px-4 py-2 text-sm font-medium">
            <Shield className="w-4 h-4 inline mr-2" />
            Nigeria's #1 Smart Home Provider
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
        >
          Secure Your Home with 
          <span className="text-primary-400 block mt-2">Smart Technology</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto px-4"
        >
          Premium Smart Locks, CCTV & Home Automation Solutions with Professional Installation
        </motion.p>

        {/* Service Benefits */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 max-w-4xl mx-auto"
        >
          <div className="bg-green-600/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
            <Truck className="w-5 h-5" />
            <span className="font-bold text-lg">FREE DELIVERY</span>
          </div>
          
          <div className="bg-blue-600/90 backdrop-blur-sm rounded-full px-6 py-3 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-semibold">Installation Service: ₦25,000</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
        >
          <button 
            onClick={onWhatsAppClick}
            className="w-full sm:w-auto bg-primary-500 hover:bg-primary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 shadow-lg touch-target"
          >
            <Phone className="w-5 h-5" />
            Get Your Free Quote
          </button>
          
          {/* Customer Photos and Stats */}
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white overflow-hidden"
              >
                <img 
                  src="/src/images/hr-pr-3.jpg" 
                  alt="Happy Customer 1"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.9, type: "spring" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white overflow-hidden"
              >
                <img 
                  src="/src/images/he_per.jpg" 
                  alt="Happy Customer 2"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.0, type: "spring" }}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-3 border-white overflow-hidden"
              >
                <img 
                  src="/src/images/her-p.jpg" 
                  alt="Happy Customer 3"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
            <div className="text-left">
              <div className="text-sm sm:text-base font-semibold">2,500+ Happy Customers</div>
              <div className="flex items-center text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-white text-sm ml-1">4.9/5</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-2xl mx-auto mb-8"
        >
          <div className="flex items-center justify-center space-x-2 text-primary-400">
            <Award className="w-5 h-5" />
            <span className="text-sm font-medium">5+ Years Experience</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <Users className="w-5 h-5" />
            <span className="text-sm font-medium">2.5K+ Installations</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-yellow-400">
            <Star className="w-5 h-5" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
        </motion.div>

        {/* Additional Service Information */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-green-400 mb-2">FREE</div>
              <div className="text-sm text-gray-300">
                <div className="font-semibold">Delivery Nationwide</div>
                <div>Same-day in Lagos</div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400 mb-2">₦25,000</div>
              <div className="text-sm text-gray-300">
                <div className="font-semibold">Professional Installation</div>
                <div>Certified technicians</div>
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">5 YEARS</div>
              <div className="text-sm text-gray-300">
                <div className="font-semibold">Product Warranty</div>
                <div>Full coverage included</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};