import React, { useState } from 'react';
import { X, User, Phone, MapPin, Package, MessageCircle, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppOrderModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

interface OrderForm {
  fullName: string;
  phoneNumber: string;
  deliveryAddress: string;
  quantity: number;
}

export const WhatsAppOrderModal: React.FC<WhatsAppOrderModalProps> = ({
  product,
  isOpen,
  onClose
}) => {
  // ✅ Track the WhatsApp click as a Lead
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Lead');
    }
  const [formData, setFormData] = useState<OrderForm>({
    fullName: '',
    phoneNumber: '',
    deliveryAddress: '',
    quantity: 1
  });

  const [errors, setErrors] = useState<Partial<OrderForm>>({});

  const handleInputChange = (field: keyof OrderForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<OrderForm> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(formData.phoneNumber.trim())) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }

    if (!formData.deliveryAddress.trim()) {
      newErrors.deliveryAddress = 'Delivery address is required';
    }

    if (formData.quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }
    else if (formData.quantity > product.stockCount) {
      newErrors.quantity = `Only ${product.stockCount} items available`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateTotal = () => {
    return product.price * formData.quantity;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Generate WhatsApp message
    const message = `Hello DijuTech, I would like to order the following product:

🛍 Product: ${product.name}
🖼 Preview: ${product.description}
📦 Quantity: ${formData.quantity}
💰 Unit Price: ₦${product.price.toLocaleString()}
💵 Total Price: ₦${calculateTotal().toLocaleString()}

👤 Name: ${formData.fullName}
📞 Phone: ${formData.phoneNumber}
📍 Delivery Address: ${formData.deliveryAddress}

Please confirm my order and provide payment details. Thank you!`;

    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/2349137487240?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Close modal and reset form
    onClose();
    setFormData({
      fullName: '',
      phoneNumber: '',
      deliveryAddress: '',
      quantity: 1
    });
    setErrors({});
  };

  const handleClose = () => {
    onClose();
    setErrors({});
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 rounded-t-2xl flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-green-600" />
              Order Product
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Product Preview */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex items-center space-x-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 text-sm">{product.name}</h3>
                <p className="text-xs text-gray-600 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-lg font-bold text-green-600">
                    ₦{product.price.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.stockCount} in stock
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-1" />
                Full Name *
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number *
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors ${
                  errors.phoneNumber ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="+234 XXX XXX XXXX"
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
              )}
            </div>

            {/* Delivery Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Delivery Address *
              </label>
              <textarea
                value={formData.deliveryAddress}
                onChange={(e) => handleInputChange('deliveryAddress', e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors resize-none ${
                  errors.deliveryAddress ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
                placeholder="Enter your complete delivery address"
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-xs mt-1">{errors.deliveryAddress}</p>
              )}
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Package className="w-4 h-4 inline mr-1" />
                Quantity *
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={formData.quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 1)}
                  min="1"
                  max={product.stockCount}
                  className={`w-20 text-center py-2 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                    errors.quantity ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => handleInputChange('quantity', Math.min(product.stockCount, formData.quantity + 1))}
                  className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition-colors"
                  disabled={formData.quantity >= product.stockCount}
                >
                  +
                </button>
              </div>
              {errors.quantity && (
                <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>
              )}
            </div>

            {/* Order Summary */}
            <div className="bg-green-50 rounded-xl p-4 border border-green-200">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                <Package className="w-4 h-4 mr-2" />
                Order Summary
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Unit Price:</span>
                  <span className="font-medium">₦{product.price.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Quantity:</span>
                  <span className="font-medium">{formData.quantity}</span>
                </div>
                <div className="border-t border-green-200 pt-2 flex justify-between">
                  <span className="font-semibold text-green-800">Total Price:</span>
                  <span className="font-bold text-green-800 text-lg">
                    ₦{calculateTotal().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#25D366' }}
            >
              <MessageCircle className="w-5 h-5" />
              Confirm & Open WhatsApp
            </button>

            <p className="text-xs text-gray-500 text-center">
              This will open WhatsApp with your order details pre-filled
            </p>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};