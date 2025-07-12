import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Product, Customer, OrderItem, Order } from '../types';
import { OrderService } from '../services/orderService';
import { PaymentService } from '../services/paymentService';
import { deliveryZones } from '../data/deliveryZones';
import { User, Phone, Mail, MapPin, CreditCard, MessageCircle, Truck, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

interface OrderFormProps {
  product?: Product;
  onClose: () => void;
  onOrderComplete?: (order: Order) => void;
}

interface FormData extends Customer {
  email: string;
  address: string;
  paymentMethod: 'paystack' | 'flutterwave' | 'whatsapp';
}

export const OrderForm: React.FC<OrderFormProps> = ({ product, onClose, onOrderComplete }) => {
  const [step, setStep] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [orderTotals, setOrderTotals] = useState({ subtotal: 0, tax: 0, deliveryFee: 0, total: 0 });
  const [isProcessing, setIsProcessing] = useState(false);
  
  const orderService = new OrderService();
  const paymentService = new PaymentService();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<FormData>();
  const watchedLocation = watch('location');

  useEffect(() => {
    if (product && watchedLocation) {
      const orderItem: OrderItem = {
        productId: product.id,
        product,
        quantity,
        price: product.price
      };
      const totals = orderService.calculateOrderTotal([orderItem], watchedLocation);
      setOrderTotals(totals);
    }
  }, [product, quantity, watchedLocation]);

  const onSubmit = async (data: FormData) => {
    if (!product) return;

    setIsProcessing(true);
    
    try {
      const customer: Customer = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        location: data.location,
        address: data.address
      };

      const orderItem: OrderItem = {
        productId: product.id,
        product,
        quantity,
        price: product.price
      };

      const order = orderService.createOrder(customer, [orderItem], data.paymentMethod);

      if (data.paymentMethod === 'whatsapp') {
        // Generate WhatsApp message and redirect
        const message = orderService.generateWhatsAppMessage(order);
        const whatsappUrl = `https://wa.me/2349137487240?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        toast.success('Order sent via WhatsApp!');
      } else {
        // Process online payment
        if (data.paymentMethod === 'paystack') {
          const paymentData = await paymentService.initializePaystackPayment(order);
          window.location.href = paymentData.authorization_url;
        } else if (data.paymentMethod === 'flutterwave') {
          const paymentData = await paymentService.initializeFlutterwavePayment(order);
          window.location.href = paymentData.link;
        }
      }

      onOrderComplete?.(order);
      onClose();
    } catch (error) {
      console.error('Order processing error:', error);
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const getDeliveryInfo = (location: string) => {
    return deliveryZones.find(zone => 
      zone.areas.some(area => location.toLowerCase().includes(area.toLowerCase()))
    );
  };

  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Complete Your Order</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            {/* Progress Steps */}
            <div className="flex items-center mt-4">
              {[1, 2, 3].map((stepNum) => (
                <React.Fragment key={stepNum}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= stepNum ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {stepNum}
                  </div>
                  {stepNum < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      step > stepNum ? 'bg-blue-600' : 'bg-gray-200'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {/* Step 1: Product & Quantity */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-800">Product Details</h3>
                
                {/* Product Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{product.name}</h4>
                      <p className="text-sm text-gray-600">{product.description}</p>
                      <p className="text-lg font-bold text-blue-600 mt-1">
                        ₦{product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quantity Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity (Max: {product.stockCount})
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                      className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                      disabled={quantity >= product.stockCount}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                >
                  Continue to Customer Details
                </button>
              </motion.div>
            )}

            {/* Step 2: Customer Information */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-800">Customer Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <User className="w-4 h-4 inline mr-1" />
                      Full Name *
                    </label>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <Phone className="w-4 h-4 inline mr-1" />
                      Phone Number *
                    </label>
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+234 XXX XXX XXXX"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    Location *
                  </label>
                  <select
                    {...register('location', { required: 'Location is required' })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your location</option>
                    {deliveryZones.map((zone) => (
                      <optgroup key={zone.name} label={zone.name}>
                        {zone.areas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Delivery Address
                  </label>
                  <textarea
                    {...register('address')}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                {/* Delivery Information */}
                {watchedLocation && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="flex items-center mb-2">
                      <Truck className="w-5 h-5 text-blue-600 mr-2" />
                      <h4 className="font-semibold text-blue-800">Delivery Information</h4>
                    </div>
                    {(() => {
                      const deliveryInfo = getDeliveryInfo(watchedLocation);
                      return deliveryInfo ? (
                        <div className="text-sm text-blue-700">
                          <p>Estimated delivery: {deliveryInfo.estimatedDays} day(s)</p>
                          <p>Delivery fee: ₦{deliveryInfo.deliveryFee.toLocaleString()}</p>
                          {deliveryInfo.installationAvailable && (
                            <p>✅ Professional installation available</p>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-blue-700">
                          Delivery available (fees calculated at checkout)
                        </p>
                      );
                    })()}
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Payment & Summary */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h3 className="text-lg font-semibold text-gray-800">Payment & Order Summary</h3>
                
                {/* Order Summary */}
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center mb-3">
                    <Calculator className="w-5 h-5 text-gray-600 mr-2" />
                    <h4 className="font-semibold text-gray-800">Order Summary</h4>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>{product.name} × {quantity}</span>
                      <span>₦{(product.price * quantity).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₦{orderTotals.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax (7.5%)</span>
                      <span>₦{orderTotals.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₦{orderTotals.deliveryFee.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-blue-600">₦{orderTotals.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <h4 className="font-semibold text-gray-800 mb-3">Select Payment Method</h4>
                  <div className="space-y-3">
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        {...register('paymentMethod', { required: 'Please select a payment method' })}
                        type="radio"
                        value="paystack"
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 text-blue-600 mr-3" />
                      <div>
                        <div className="font-medium">Secure Online Payment (Paystack)</div>
                        <div className="text-sm text-gray-600">Pay with card, bank transfer, or USSD</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        {...register('paymentMethod')}
                        type="radio"
                        value="flutterwave"
                        className="mr-3"
                      />
                      <CreditCard className="w-5 h-5 text-purple-600 mr-3" />
                      <div>
                        <div className="font-medium">Secure Online Payment (Flutterwave)</div>
                        <div className="text-sm text-gray-600">Alternative secure payment gateway</div>
                      </div>
                    </label>
                    
                    <label className="flex items-center p-4 border border-gray-300 rounded-xl hover:bg-gray-50 cursor-pointer">
                      <input
                        {...register('paymentMethod')}
                        type="radio"
                        value="whatsapp"
                        className="mr-3"
                      />
                      <MessageCircle className="w-5 h-5 text-green-600 mr-3" />
                      <div>
                        <div className="font-medium">Pay via WhatsApp</div>
                        <div className="text-sm text-gray-600">Bank transfer or cash on delivery</div>
                      </div>
                    </label>
                  </div>
                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>
                  )}
                </div>

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl font-semibold"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-semibold flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    ) : null}
                    {isProcessing ? 'Processing...' : 'Complete Order'}
                  </button>
                </div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};