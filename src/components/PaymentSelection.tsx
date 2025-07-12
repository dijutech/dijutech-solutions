import React from 'react';
import { Lock, MessageCircle, Truck, MessageSquare, Star, CheckCircle, CreditCard, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

interface PaymentSelectionProps {
  onSecurePayment: () => void;
  onWhatsAppPayment: () => void;
}

export const PaymentSelection: React.FC<PaymentSelectionProps> = ({
  onWhatsAppPayment
}) => {
  const handleProductSelection = () => {
    const productsSection = document.querySelector('#products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-800 mb-4">
            Select Your Preferred Payment Method
          </h2>
          <p className="text-dark-600 max-w-2xl mx-auto text-sm sm:text-base">
            Choose the payment option that works best for you. All transactions are secure and protected.
          </p>
        </motion.div>

        {/* Payment Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 sm:mb-12">
          {/* Secure Online Payment */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full mx-auto mb-4 sm:mb-6 group-hover:bg-primary-200 transition-colors">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-dark-800 text-center mb-3">
                Secure Online Payment
              </h3>
              
              <p className="text-dark-600 text-center mb-4 sm:mb-6 text-sm">
                Fast & secure payment via credit card/debit card
              </p>
              
              <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4 text-dark-500" />
                  <span className="text-xs text-dark-500">Visa</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4 text-dark-500" />
                  <span className="text-xs text-dark-500">Mastercard</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CreditCard className="w-4 h-4 text-dark-500" />
                  <span className="text-xs text-dark-500">Verve</span>
                </div>
              </div>
              
              <button
                onClick={handleProductSelection}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg group touch-target"
              >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Select Product to Pay
              </button>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>256-bit SSL Encryption</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Pay via WhatsApp */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full mx-auto mb-4 sm:mb-6 group-hover:bg-green-200 transition-colors">
                <MessageCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold text-dark-800 text-center mb-3">
                Pay via WhatsApp
              </h3>
              
              <p className="text-dark-600 text-center mb-4 sm:mb-6 text-sm">
                Get personalized assistance with your payment
              </p>
              
              <div className="flex items-center justify-center space-x-3 mb-4 sm:mb-6">
                <div className="bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-xs text-green-700 font-medium">Bank Transfer</span>
                </div>
                <div className="bg-green-50 px-3 py-1 rounded-full">
                  <span className="text-xs text-green-700 font-medium">Cash on Delivery</span>
                </div>
              </div>
              
              <button
                onClick={onWhatsAppPayment}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 sm:py-4 px-6 rounded-xl font-semibold text-sm sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-lg group touch-target"
                style={{ backgroundColor: '#25D366' }}
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                Chat on WhatsApp
              </button>
              
              <div className="mt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-xs text-dark-500">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  <span>Instant Response Guaranteed</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Information Box */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">ℹ</span>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-2">How to Make Secure Online Payment</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Browse our products above and click "Order via WhatsApp" on your desired item</li>
                <li>2. Fill in your details and select your preferred Quantity</li>
                <li>3. Complete payment securely by clicking the "Confirm" button.</li>
                <li>4. Receive instant confirmation and delivery scheduling</li>
              </ol>
            </div>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <h3 className="text-base sm:text-lg font-bold text-dark-800 text-center mb-4 sm:mb-6">
            Why Choose DijuTech Solutions?
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {/* Fast Delivery */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full mx-auto mb-2 sm:mb-3 group-hover:bg-primary-200 transition-colors">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-dark-800 text-xs sm:text-sm mb-1">Fast Delivery</h4>
              <p className="text-xs text-dark-600">Same day installation available</p>
            </div>

            {/* Free Expert Consultation */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full mx-auto mb-2 sm:mb-3 group-hover:bg-green-200 transition-colors">
                <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-dark-800 text-xs sm:text-sm mb-1">Free Expert Consultation</h4>
              <p className="text-xs text-dark-600">Professional guidance included</p>
            </div>

            {/* Premium Quality Products */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full mx-auto mb-2 sm:mb-3 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
              </div>
              <h4 className="font-semibold text-dark-800 text-xs sm:text-sm mb-1">Premium Quality Products</h4>
              <p className="text-xs text-dark-600">International standard devices</p>
            </div>

            {/* Verified Seller */}
            <div className="text-center group">
              <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full mx-auto mb-2 sm:mb-3 group-hover:bg-purple-200 transition-colors">
                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-dark-800 text-xs sm:text-sm mb-1">Verified Seller</h4>
              <p className="text-xs text-dark-600">Licensed & certified business</p>
            </div>
          </div>
        </motion.div>

        {/* Additional Security Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 text-center"
        >
          <div className="inline-flex flex-wrap items-center justify-center space-x-2 sm:space-x-4 bg-gray-100 rounded-full px-4 sm:px-6 py-2 sm:py-3 gap-y-2">
            <div className="flex items-center space-x-2">
              <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-dark-600" />
              <span className="text-xs sm:text-sm text-dark-700 font-medium">Secure Payment</span>
            </div>
            <div className="w-1 h-1 bg-dark-400 rounded-full hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
              <span className="text-xs sm:text-sm text-dark-700 font-medium">Money Back Guarantee</span>
            </div>
            <div className="w-1 h-1 bg-dark-400 rounded-full hidden sm:block"></div>
            <div className="flex items-center space-x-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-600" />
              <span className="text-xs sm:text-sm text-dark-700 font-medium">5-Year Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};