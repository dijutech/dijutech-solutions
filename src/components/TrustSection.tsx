import React from 'react';
import { Star, Shield, Award, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export const TrustSection: React.FC = () => {
  const testimonials = [
    {
      name: "Mrs. Adeyemi",
      location: "Lekki, Lagos",
      rating: 5,
      text: "Excellent service! The smart lock installation was seamless and the team was very professional.",
      image: "/images/testi2.jpeg"
    },
    {
      name: "Mr. Okafor",
      location: "Abuja",
      rating: 5,
      text: "Best investment for home security. The CCTV system works perfectly and customer support is outstanding.",
      image: "/images/testi-1.jpeg"
    },
    {
      name: "Dr. Fatima",
      location: "Ikeja, Lagos",
      rating: 5,
      text: "Smart home automation has made my life so much easier. Highly recommend DijuTech Solutions!",
      image: "/images/testi-3last.webp"
    }
  ];

  const trustBadges = [
    { icon: Shield, title: "Certified Installation", desc: "Professional certified technicians" },
    { icon: Award, title: "5-Year Warranty", desc: "Extended warranty on all products" },
    { icon: Users, title: "24/7 Support", desc: "Round-the-clock customer service" }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {trustBadges.map((badge, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="bg-primary-100 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <badge.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-dark-800 mb-2">{badge.title}</h3>
              <p className="text-dark-600 text-sm sm:text-base">{badge.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark-800 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-dark-600 max-w-2xl mx-auto text-sm sm:text-base">
            Join thousands of satisfied customers who trust DijuTech Solutions for their smart home needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover mr-3 sm:mr-4"
                />
                <div>
                  <h4 className="font-semibold text-dark-800 text-sm sm:text-base">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-dark-500">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="flex mb-3">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-dark-600 text-sm leading-relaxed">"{testimonial.text}"</p>
            </motion.div>
          ))}
        </div>

        {/* Service Areas */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <h3 className="text-lg sm:text-xl font-bold text-dark-800 mb-4">We Serve All Major Cities</h3>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
            {['Lagos', 'Abuja', 'Port Harcourt', 'Kano', 'Ibadan', 'Benin City'].map((city, index) => (
              <span key={index} className="bg-primary-100 text-primary-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium">
                {city}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};