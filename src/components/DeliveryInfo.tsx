import React, { useState } from 'react';
import { deliveryZones } from '../data/deliveryZones';
import { Truck, MapPin, Clock, Shield, CheckCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DeliveryInfo: React.FC = () => {
  const [expandedZones, setExpandedZones] = useState<Set<string>>(new Set());
  const [showAllLocations, setShowAllLocations] = useState(false);

  const toggleZone = (zoneName: string) => {
    const newExpanded = new Set(expandedZones);
    if (newExpanded.has(zoneName)) {
      newExpanded.delete(zoneName);
    } else {
      newExpanded.add(zoneName);
    }
    setExpandedZones(newExpanded);
  };

  const handleContactSupport = () => {
    const message = encodeURIComponent(
      `Hi! I need information about custom delivery arrangements for my location.

Please provide details about:
- Delivery options to my area
- Estimated delivery time
- Installation services availability
- Delivery charges

Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleWhatsAppDeliveryInquiry = () => {
    const message = encodeURIComponent(
      `Hi! I don't see my area listed in your delivery zones.

My location: [Please specify your location]

Can you help me with:
- Custom delivery arrangements
- Delivery timeline and costs
- Installation availability

Thank you!`
    );
    const whatsappUrl = `https://wa.me/2349137487240?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const displayedZones = showAllLocations ? deliveryZones : deliveryZones.slice(0, 3);

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-700 mb-4">
            Delivery & Installation Services
          </h2>
          <p className="text-dark-600 max-w-2xl mx-auto text-sm sm:text-base">
            Fast, reliable delivery across Nigeria with professional installation services
          </p>
        </motion.div>

        {/* Service Features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {[
            { icon: Truck, title: 'Fast Delivery', desc: 'Same-day delivery in Lagos' },
            { icon: Shield, title: 'Secure Packaging', desc: 'Products safely packaged' },
            { icon: CheckCircle, title: 'Professional Installation', desc: 'Expert technicians - ₦25,000' },
            { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock assistance' }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <h3 className="font-semibold text-dark-800 mb-2 text-sm sm:text-base">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-dark-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Delivery Zones */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold mb-2">Delivery Coverage & Pricing</h3>
            <p className="text-primary-100 text-sm sm:text-base">Choose your location to see delivery options</p>
          </div>
          
          <div className="p-4 sm:p-6">
            {/* Mobile Accordion View */}
            <div className="block md:hidden space-y-4">
              {displayedZones.map((zone, index) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleZone(zone.name)}
                    className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between touch-target"
                  >
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 text-primary-600 mr-3" />
                      <span className="font-semibold text-dark-800">{zone.name}</span>
                    </div>
                    {expandedZones.has(zone.name) ? (
                      <ChevronUp className="w-5 h-5 text-dark-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-dark-600" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedZones.has(zone.name) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="p-4 bg-white border-t">
                          <div className="space-y-3 text-sm">
                            <div className="flex justify-between">
                              <span className="text-dark-600">Delivery Fee:</span>
                              <span className="font-semibold text-primary-600">
                                ₦{zone.deliveryFee.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark-600">Estimated Time:</span>
                              <span className="font-semibold">
                                {zone.estimatedDays} day{zone.estimatedDays > 1 ? 's' : ''}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-dark-600">Installation:</span>
                              <span className={`font-semibold ${
                                zone.installationAvailable ? 'text-blue-600' : 'text-gray-400'
                              }`}>
                                {zone.installationAvailable ? '₦25,000' : 'Not Available'}
                              </span>
                            </div>
                          </div>
                          
                          <div className="mt-4 pt-3 border-t">
                            <p className="text-xs text-dark-500 mb-2">Coverage Areas:</p>
                            <div className="flex flex-wrap gap-1">
                              {zone.areas.slice(0, 4).map((area) => (
                                <span
                                  key={area}
                                  className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                                >
                                  {area}
                                </span>
                              ))}
                              {zone.areas.length > 4 && (
                                <span className="text-xs text-dark-500">
                                  +{zone.areas.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Desktop Grid View */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedZones.map((zone, index) => (
                <motion.div
                  key={zone.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 rounded-xl p-4 hover:border-primary-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center mb-3">
                    <MapPin className="w-5 h-5 text-primary-600 mr-2" />
                    <h4 className="font-semibold text-dark-800">{zone.name}</h4>
                  </div>
                  
                  <div className="space-y-2 text-sm text-dark-600 mb-4">
                    <div className="flex justify-between">
                      <span>Delivery Fee:</span>
                      <span className="font-semibold text-primary-600">
                        ₦{zone.deliveryFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Estimated Time:</span>
                      <span className="font-semibold">
                        {zone.estimatedDays} day{zone.estimatedDays > 1 ? 's' : ''}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Installation:</span>
                      <span className={`font-semibold ${
                        zone.installationAvailable ? 'text-blue-600' : 'text-gray-400'
                      }`}>
                        {zone.installationAvailable ? '₦25,000' : 'Not Available'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-3">
                    <p className="text-xs text-dark-500 mb-2">Coverage Areas:</p>
                    <div className="flex flex-wrap gap-1">
                      {zone.areas.slice(0, 3).map((area) => (
                        <span
                          key={area}
                          className="bg-primary-100 text-primary-700 px-2 py-1 rounded text-xs"
                        >
                          {area}
                        </span>
                      ))}
                      {zone.areas.length > 3 && (
                        <span className="text-xs text-dark-500">
                          +{zone.areas.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* See All Locations Button */}
            {deliveryZones.length > 3 && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setShowAllLocations(!showAllLocations)}
                  className="bg-primary-100 hover:bg-primary-200 text-primary-700 px-6 py-3 rounded-xl font-semibold transition-colors touch-target"
                >
                  {showAllLocations ? 'Show Less' : `See All ${deliveryZones.length} Locations`}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Installation Services */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 sm:mt-12 bg-white rounded-2xl shadow-lg p-6 sm:p-8"
        >
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-dark-800 mb-4">
              Professional Installation Services
            </h3>
            <p className="text-dark-600 max-w-2xl mx-auto text-sm sm:text-base">
              Our certified technicians ensure proper installation and setup of your smart home devices
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h4 className="font-semibold text-dark-800 mb-4">Installation Includes:</h4>
              <ul className="space-y-2">
                {[
                  'Professional device mounting and setup',
                  'Network configuration and testing',
                  'Mobile app installation and training',
                  'System testing and demonstration',
                  'User manual and warranty documentation',
                  '30-day follow-up support'
                ].map((item, index) => (
                  <li key={index} className="flex items-start text-dark-600 text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-dark-800 mb-4">Service Level Agreement:</h4>
              <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-dark-600">Installation Time:</span>
                  <span className="font-semibold">2-4 hours</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-dark-600">Warranty Period:</span>
                  <span className="font-semibold">2-3 years</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-dark-600">Support Response:</span>
                  <span className="font-semibold">Within 2 hours</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-dark-600">Installation Fee:</span>
                  <span className="font-semibold text-blue-600">₦25,000</span>
                </div>
              </div>
              <p className="text-xs text-dark-500 mt-2">
                *Professional installation by certified technicians
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact for Custom Delivery */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-6 sm:mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-4 sm:p-6">
            <h4 className="font-semibold mb-2 text-sm sm:text-base">Need Custom Delivery?</h4>
            <p className="text-primary-100 mb-4 text-xs sm:text-sm">
              Don't see your location? Contact us for custom delivery arrangements
            </p>
            <button 
              onClick={handleWhatsAppDeliveryInquiry}
              className="bg-white text-primary-600 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors flex items-center justify-center gap-2 mx-auto touch-target text-sm sm:text-base"
            >
              <MessageCircle className="w-4 h-4" />
              Chat with us on WhatsApp
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};