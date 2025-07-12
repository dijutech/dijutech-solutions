import React from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onWhatsAppClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onWhatsAppClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in DijuTech Solutions smart home products. Can you help me get a quote?"
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleNavClick = (href: string) => {
    if (href.startsWith('#')) {
      // Handle anchor links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Handle external links
      window.location.href = href;
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Products', href: '#products' },
    { name: 'Services', href: '#services' },
    { name: 'Delivery', href: '#delivery' },
    { name: 'Support', href: '#support' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Text */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-shrink-0 cursor-pointer group"
            onClick={handleLogoClick}
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-dark-800 hover:text-primary-600 transition-colors duration-300">
              <span className="text-primary-600">Diju</span>
              <span className="text-dark-800 group-hover:text-primary-700">Tech</span>
            </h1>
            <p className="text-xs text-dark-500 -mt-1 hidden sm:block">Smart Home Solutions</p>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item.href)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-dark-700 hover:text-primary-600 font-medium transition-colors duration-300 relative group py-2 px-1"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </nav>

          {/* Desktop Contact Info */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-dark-600">
              <Phone className="w-4 h-4" />
              <span className="text-sm font-medium">+234 913 748 7240</span>
            </div>
            <button
              onClick={handleWhatsAppContact}
              className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
            >
              Get Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-dark-700 hover:bg-gray-100 transition-colors touch-target"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200 shadow-lg"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="block w-full text-left text-dark-700 hover:text-primary-600 font-medium py-2 transition-colors touch-target"
                >
                  {item.name}
                </motion.button>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-dark-600 mb-3">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+234 913 748 7240</span>
                </div>
                <div className="flex items-center space-x-2 text-dark-600 mb-4">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">dijutech.solution@gmail.com</span>
                </div>
                <button
                  onClick={() => {
                    handleWhatsAppContact();
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300 touch-target"
                >
                  Get Free Quote
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};