import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Download, MessageCircle, ArrowLeft } from 'lucide-react';
import { PaymentService } from '../services/paymentService';
import { motion } from 'framer-motion';

export const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'failed'>('loading');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const reference = searchParams.get('reference') || searchParams.get('tx_ref');
  const status = searchParams.get('status');

  useEffect(() => {
    if (reference && status === 'successful') {
      verifyPayment();
    } else {
      setVerificationStatus('failed');
    }
  }, [reference, status]);

  const verifyPayment = async () => {
    try {
      const paymentService = new PaymentService();
      let verificationResult;

      // Determine which payment provider based on reference format
      if (reference?.startsWith('DT_')) {
        // Flutterwave transaction
        verificationResult = await paymentService.verifyFlutterwavePayment(reference);
      } else {
        // Paystack transaction
        verificationResult = await paymentService.verifyPaystackPayment(reference!);
      }

      if (verificationResult.status === 'success' || verificationResult.data?.status === 'success') {
        setVerificationStatus('success');
        setOrderDetails(verificationResult.data);
        
        // Send confirmation WhatsApp message
        sendConfirmationMessage();
      } else {
        setVerificationStatus('failed');
      }
    } catch (error) {
      console.error('Payment verification failed:', error);
      setVerificationStatus('failed');
    }
  };

  const sendConfirmationMessage = () => {
    const message = encodeURIComponent(
      `✅ PAYMENT CONFIRMED - Order ${orderDetails?.metadata?.order_id || reference}

Thank you for your payment! Your order has been confirmed and will be processed shortly.

Next Steps:
1. You will receive order confirmation via SMS
2. Our team will contact you within 2 hours
3. Installation will be scheduled (if applicable)
4. Tracking details will be shared

Need immediate assistance? Reply to this message!`
    );
    
    // Auto-send confirmation (optional)
    setTimeout(() => {
      window.open(`https://wa.me/2349137487240?text=${message}`, '_blank');
    }, 2000);
  };

  const handleDownloadReceipt = () => {
    // Generate and download receipt
    const receiptData = {
      orderId: orderDetails?.metadata?.order_id || reference,
      amount: orderDetails?.amount || 0,
      date: new Date().toLocaleDateString(),
      status: 'Paid'
    };
    
    // In a real implementation, this would generate a PDF
    console.log('Downloading receipt:', receiptData);
  };

  const handleContactSupport = () => {
    const message = encodeURIComponent(
      `Hi! I just completed payment for Order ${orderDetails?.metadata?.order_id || reference}.

Payment Reference: ${reference}
Status: Confirmed

I need assistance with my order. Please help!`
    );
    window.open(`https://wa.me/2349137487240?text=${message}`, '_blank');
  };

  if (verificationStatus === 'loading') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-800">Verifying Payment...</h2>
          <p className="text-gray-600">Please wait while we confirm your payment</p>
        </div>
      </div>
    );
  }

  if (verificationStatus === 'failed') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Verification Failed</h2>
          <p className="text-gray-600 mb-6">
            We couldn't verify your payment. Please contact support for assistance.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleContactSupport}
              className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Contact Support
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

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
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Payment Successful!</h2>
        
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="text-sm text-gray-600 mb-2">Order Reference</div>
          <div className="font-mono text-lg font-semibold text-gray-800">
            {orderDetails?.metadata?.order_id || reference}
          </div>
        </div>

        <p className="text-gray-600 mb-6">
          Your payment has been confirmed! We'll contact you within 2 hours to arrange delivery and installation.
        </p>

        <div className="space-y-3">
          <button
            onClick={handleDownloadReceipt}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
          
          <button
            onClick={handleContactSupport}
            className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Support
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Continue Shopping
          </button>
        </div>
      </motion.div>
    </div>
  );
};