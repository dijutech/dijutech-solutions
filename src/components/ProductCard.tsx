import React from 'react';
import { Check, MessageCircle } from 'lucide-react';

interface ProductCardProps {
  title: string;
  image: string;
  features: string[];
  priceRange: string;
  onWhatsAppOrder: (product: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  image,
  features,
  priceRange,
  onWhatsAppOrder
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-105">
      <div className="relative overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-contain group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
          Premium
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        
        <ul className="space-y-2 mb-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-gray-600 text-sm">
              <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
        
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-blue-600">{priceRange}</span>
          <span className="text-sm text-gray-500">Starting from</span>
        </div>
        
        <button 
          onClick={() => onWhatsAppOrder(title)}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg"
        >
          <MessageCircle className="w-4 h-4" />
          Order via WhatsApp
        </button>
      </div>
    </div>
  );
};