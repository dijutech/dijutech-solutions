import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';

interface PersistentWhatsAppButtonProps {
  phoneNumber?: string;
  onPaymentChat?: () => void;
}

export const PersistentWhatsAppButton: React.FC<PersistentWhatsAppButtonProps> = ({ 
  phoneNumber = '2349137487240', 
  onPaymentChat 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 8000);

    return () => clearInterval(timer);
  }, []);

  const handleMainClick = () => {
    if (onPaymentChat) {
      onPaymentChat();
    } else {
      const message = encodeURIComponent("Hi! I'm interested in DijuTech Solutions smart home products. Can you help me?");
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handlePaymentHelp = () => {
    const message = encodeURIComponent("Hi! I need help with payment options for my smart home order. Can you assist me?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowQuickActions(false);
  };

  const handleGeneralSupport = () => {
    const message = encodeURIComponent("Hi! I have questions about your smart home products and services. Can you help?");
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
    setShowQuickActions(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Quick Actions Menu */}
        {showQuickActions && (
          <div className="absolute bottom-20 right-0 bg-white rounded-2xl shadow-2xl p-4 w-64 transform transition-all duration-300 animate-in slide-in-from-bottom-2">
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-gray-800 text-sm">Quick Actions</span>
              <button 
                onClick={() => setShowQuickActions(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={handlePaymentHelp}
                className="w-full text-left p-3 rounded-xl hover:bg-green-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200">
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">Payment Help</div>
                    <div className="text-xs text-gray-500">Get assistance with payment</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={handleGeneralSupport}
                className="w-full text-left p-3 rounded-xl hover:bg-blue-50 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200">
                    <Phone className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">General Support</div>
                    <div className="text-xs text-gray-500">Ask about products & services</div>
                  </div>
                </div>
              </button>
            </div>
            
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>
        )}

        {/* Tooltip */}
        {showTooltip && !showQuickActions && (
          <div className="absolute bottom-20 right-0 bg-white rounded-xl shadow-2xl p-4 w-56 transform transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-800">Need Help?</span>
              <button 
                onClick={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-3">
              Chat with us on WhatsApp for instant support with payments and orders!
            </p>
            <div className="flex space-x-2">
              <button
                onClick={handleMainClick}
                className="flex-1 bg-green-600 text-white text-xs py-2 px-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                Chat Now
              </button>
              <button
                onClick={() => {
                  setShowTooltip(false);
                  setShowQuickActions(true);
                }}
                className="flex-1 bg-gray-100 text-gray-700 text-xs py-2 px-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                More Options
              </button>
            </div>
            <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>
        )}

        {/* Main WhatsApp Button */}
        <button
          onClick={handleMainClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center justify-center group relative ${
            animate ? 'animate-bounce' : ''
          }`}
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="w-8 h-8 group-hover:scale-110 transition-transform" />
          
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">1</span>
          </div>
        </button>

        {/* Pulse Animation Rings */}
        <div className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping" style={{ backgroundColor: '#25D366' }}></div>
        <div className="absolute inset-2 rounded-full bg-green-500 opacity-10 animate-ping animation-delay-1000" style={{ backgroundColor: '#25D366' }}></div>

        {/* Quick Access Button */}
        <button
          onClick={() => setShowQuickActions(!showQuickActions)}
          className="absolute -top-2 -left-2 w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
        >
          <span className="text-xs font-bold">?</span>
        </button>
      </div>
    </div>
  );
};