import React, { useState } from 'react';
import { User, Phone, MapPin, Clock, CheckSquare } from 'lucide-react';

interface LeadFormProps {
  onSubmit: (data: any) => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    interests: [] as string[],
    contactTime: ''
  });

  const products = [
    'Smart Locks',
    'CCTV Systems',
    'Home Automation',
    'Solar Lights',
    'Smart Projectors'
  ];

  const locations = [
    'Lagos (Mainland)',
    'Lagos (Island)',
    'Abuja',
    'Port Harcourt',
    'Kano',
    'Ibadan',
    'Delta',
    'Porthacourt',
    'Other'
  ];

  const handleInterestChange = (product: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(product)
        ? prev.interests.filter(p => p !== product)
        : [...prev.interests, product]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Get Your Free Quote Today
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below and we'll contact you within 30 minutes with a personalized quote
          </p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="Enter your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="+234 XXX XXX XXXX"
                />
              </div>
            </div>

            {/* Location Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                Location
              </label>
              <select
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select your location</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>{location}</option>
                ))}
              </select>
            </div>

            {/* Product Interests */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <CheckSquare className="w-4 h-4 inline mr-1" />
                Products of Interest (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {products.map((product, index) => (
                  <label key={index} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(product)}
                      onChange={() => handleInterestChange(product)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700">{product}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact Time */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-1" />
                Preferred Contact Time
              </label>
              <select
                value={formData.contactTime}
                onChange={(e) => setFormData(prev => ({ ...prev, contactTime: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              >
                <option value="">Select preferred time</option>
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="anytime">Anytime</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Get Quote via WhatsApp
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            By submitting this form, you agree to receive communications from DijuTech Solutions
          </div>
        </div>
      </div>
    </section>
  );
};