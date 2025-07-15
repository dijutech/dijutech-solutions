import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  phoneNumber = '2349137487240',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 1000);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleWhatsAppClick = () => {
    // ✅ Track the WhatsApp click as a Lead
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }

    const message = encodeURIComponent(
      "Hi! I'm interested in DijuTech Solutions smart home products. Can you help me get a quote?"
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {/* Tooltip */}
        {showTooltip && (
          <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-lg p-3 w-48 transform transition-all duration-300">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm font-semibold text-gray-800">Need Help?</span>
              <button
                onClick={() => setShowTooltip(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 mb-2">
              Chat with us on WhatsApp for instant support!
            </p>
            <div className="absolute bottom-[-6px] right-4 w-3 h-3 bg-white transform rotate-45 border-r border-b border-gray-200"></div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={handleWhatsAppClick}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className={`bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group ${
            animate ? 'animate-bounce' : ''
          }`}
          style={{ backgroundColor: '#25D366' }}
        >
          <MessageCircle className="w-7 h-7 group-hover:scale-110 transition-transform" />
        </button>

        {/* Pulse Animation */}
        <div
          className="absolute inset-0 rounded-full bg-green-500 opacity-20 animate-ping"
          style={{ backgroundColor: '#25D366' }}
        ></div>
      </div>
    </div>
  );
};
