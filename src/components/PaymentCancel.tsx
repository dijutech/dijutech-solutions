import React from 'react';
import { useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, MessageCircle, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

export const PaymentCancel: React.FC = () => {
  const navigate = useNavigate();

  const handleContactSupport = () => {
    const message = encodeURIComponent(
      `Hi! I had an issue with my payment and need assistance.

I was trying to complete an order but the payment was cancelled or failed.

Can you help me complete my purchase?`
    );
    window.open(`https://wa.me/2349137487240?text=${message}`, '_blank');
  };

  const handleRetryPayment = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="w-12 h-12 text-red-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Cancelled</h2>
        
        <p className="text-gray-600 mb-6">
          Your payment was cancelled or interrupted. Don't worry, no charges were made to your account.
        </p>

        <div className="bg-blue-50 rounded-xl p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
          <p className="text-sm text-blue-700">
            Our support team is available 24/7 to assist with payment issues or alternative payment methods.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleRetryPayment}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-5 h-5" />
            Try Again
          </button>
          
          <button
            onClick={handleContactSupport}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-5 h-5" />
            Get Payment Help
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};