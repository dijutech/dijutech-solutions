import React, { useState } from 'react';
import { Phone, Mail } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { TrustSection } from './components/TrustSection';
import { FlashSaleOffer } from './components/FlashSaleOffer';
import { StickyOfferBanner } from './components/StickyOfferBanner';
import { PaymentSelection } from './components/PaymentSelection';
import { LeadForm } from './components/LeadForm';
import { DeliveryInfo } from './components/DeliveryInfo';
// import { Chatbot } from './components/Chatbot';
import { NotificationSystem } from './components/NotificationSystem';
import { AdminRoute } from './components/admin/AdminRoute';
import { ChatbaseController } from './components/ChatbaseController';
import { Product, Customer, Order } from './types';

function App() {
  const [capturedCustomers, setCapturedCustomers] = useState<Customer[]>([]);
  const [currentView, setCurrentView] = useState<'main' | 'admin'>('main');

  // Check if current URL is admin route
  React.useEffect(() => {
    const path = window.location.pathname;
    if (path === '/admin' || path.startsWith('/admin/')) {
      setCurrentView('admin');
    } else {
      setCurrentView('main');
    }
  }, []);

  const handleWhatsAppOrder = (product: Product) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in ordering the ${product.name}.

Product Details:
- Price: ₦${product.price.toLocaleString()}
- Features: ${product.features.slice(0, 3).join(', ')}

Please provide more information and help me place an order. Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleHeroWhatsAppQuote = () => {
    const message = encodeURIComponent(
      `Hi! I'm interested in learning more about your smart home solutions.

I would like to:
- Get a free consultation
- Receive a custom quote
- Learn about available products
- Schedule a home assessment

Please contact me to discuss my smart home needs. Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFlashSaleClaim = (offerCode: string) => {
    const message = encodeURIComponent(
      `🔥 FLASH SALE CLAIM - Code: ${offerCode}

Hi! I want to claim the limited-time Smart Home Security Bundle offer:
- Complete Security Package (₦876,000 value)
- Flash Sale Price: ₦720,000
- Promo Code: ${offerCode}
- Total Savings: ₦156,000

Please confirm my order and arrange delivery. Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleFormSubmit = (formData: any) => {
    const message = encodeURIComponent(
      `New Lead from Website:
Name: ${formData.name}
Phone: ${formData.phone}
Location: ${formData.location}
Interests: ${formData.interests.join(', ')}
Preferred Contact Time: ${formData.contactTime}

Please contact me for a quote!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleSecurePayment = () => {
    // Show a helpful message and redirect to product selection
    toast.success('All orders are now processed through WhatsApp for personalized service!', {
      duration: 5000,
      icon: '💬',
    });
    
    // Scroll to products section
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppPayment = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to discuss payment options for my smart home order.

I'm interested in:
- Payment methods available
- Bank transfer details
- Cash on delivery options
- Installation scheduling

Please provide payment assistance. Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCustomerCapture = (customer: Customer) => {
    setCapturedCustomers(prev => [...prev, customer]);
    console.log('Customer captured:', customer);
  };

  const handleOrderComplete = (order: Order) => {
    console.log('Order completed:', order);
    // Here you would typically send the order to your backend
  };

  const handleNavClick = (target: string) => {
    if (target.startsWith('#')) {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Admin route
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#333333',
              color: '#fff',
            },
          }}
        />
        {/* Chatbase Controller - Hide on admin routes */}
        <ChatbaseController isAdminRoute={true} />
        <AdminRoute />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#333333',
            color: '#fff',
          },
          success: {
            duration: 5000,
            style: {
              background: '#10b981',
              color: '#fff',
            },
          },
          error: {
            duration: 5000,
            style: {
              background: '#ef4444',
              color: '#fff',
            },
          },
        }}
      />

      {/* Chatbase Controller - Show on public routes */}
      <ChatbaseController isAdminRoute={false} />

      {/* Notification System */}
      <NotificationSystem />

      {/* Header */}
      <Header onWhatsAppClick={handleHeroWhatsAppQuote} />

      {/* Sticky Offer Banner */}
      <StickyOfferBanner onWhatsAppClaim={handleFlashSaleClaim} />

      {/* Hero Section */}
      <div className="pt-16 sm:pt-20">
        <Hero onWhatsAppClick={handleHeroWhatsAppQuote} />
      </div>

      {/* Flash Sale Offer */}
      <FlashSaleOffer onWhatsAppClaim={handleFlashSaleClaim} />

      {/* Product Catalog */}
      <section id="products">
        <ProductCatalog
          onWhatsAppOrder={handleWhatsAppOrder}
        />
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Delivery Information */}
      <section id="delivery">
        <DeliveryInfo />
      </section>

      {/* Payment Selection */}
      <PaymentSelection 
        onSecurePayment={handleSecurePayment}
        onWhatsAppPayment={handleWhatsAppPayment}
      />

      {/* Lead Form */}
      <LeadForm onSubmit={handleFormSubmit} />

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive smart home solutions with professional installation and ongoing support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Installation Services</h3>
              <p className="text-gray-600 mb-4">Professional installation by certified technicians</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Same-day installation available</li>
                <li>• 2-year installation warranty</li>
                <li>• Post-installation support</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Maintenance & Support</h3>
              <p className="text-gray-600 mb-4">24/7 technical support and maintenance services</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Remote troubleshooting</li>
                <li>• Regular maintenance checks</li>
                <li>• Software updates</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Custom Solutions</h3>
              <p className="text-gray-600 mb-4">Tailored smart home systems for your specific needs</p>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Home assessment</li>
                <li>• Custom design</li>
                <li>• Integration services</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section id="support" className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Customer Support
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We're here to help you every step of the way with comprehensive support options
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-primary-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Get Help Now</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">+234 913 748 7240</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-600" />
                  <span className="text-gray-700">dijutech.solution@gmail.com</span>
                </div>
                <button
                  onClick={handleHeroWhatsAppQuote}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-lg font-semibold transition-colors"
                >
                  Chat on WhatsApp
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Support Hours</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-sm text-green-800 font-medium">
                    Emergency support available 24/7 for existing customers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-white py-8 sm:py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold">
                  <span className="text-primary-400">Diju</span>
                  <span className="text-white">Tech</span>
                </h3>
                <p className="text-sm text-gray-400">Smart Home Solutions</p>
              </div>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Nigeria's leading provider of smart home technology solutions. We make your home smarter, safer, and more efficient.
              </p>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li><button onClick={() => handleNavClick('#products')} className="hover:text-white transition-colors">Products</button></li>
                <li><button onClick={() => handleNavClick('#services')} className="hover:text-white transition-colors">Services</button></li>
                <li><button onClick={() => handleNavClick('#delivery')} className="hover:text-white transition-colors">Delivery</button></li>
                <li><button onClick={() => handleNavClick('#support')} className="hover:text-white transition-colors">Support</button></li>
                {/* <li><button onClick={() => setCurrentView('admin')} className="hover:text-white transition-colors">Admin</button></li> */}
              </ul>
            </div>
            
            <div>
              <h4 className="text-base sm:text-lg font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                <li>Phone: +234 913 748 7240</li>
                <li>Email: dijutech.solution@gmail.com</li>
                <li>WhatsApp: +234 913 748 7240</li>
                <li>Lagos • Abuja • Port Harcourt</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-gray-400 text-sm">
            <p>&copy; <span className='year'>2025</span> DijuTech Solutions. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* Intelligent Chatbot
      <Chatbot onCustomerCapture={handleCustomerCapture} /> */}
    </div>
  );
}

export default App;