import React, { useState } from 'react';
import { Product} from '../types';
import { products } from '../data/products';
import { productMedia } from '../data/productMedia';
import { MediaGallery } from './MediaGallery';
import { WhatsAppOrderModal } from './WhatsAppOrderModal';
import { Check, MessageCircle, Star, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductCatalogProps {
  onAddToCart?: (product: Product, quantity: number) => void;
  onWhatsAppOrder?: (product: Product) => void;
  onPayOnline?: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleWhatsAppOrder = (product: Product) => {
    setSelectedProduct(product);
    setShowOrderModal(true);
  };

  const handleCloseModal = () => {
    setShowOrderModal(false);
    setSelectedProduct(null);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Smart Home Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our premium collection of smart home solutions with professional installation and warranty
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* WhatsApp Order Modal */}
        {selectedProduct && (
          <WhatsAppOrderModal
            product={selectedProduct}
            isOpen={showOrderModal}
            onClose={handleCloseModal}
          />
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Media Gallery */}
              <div className="p-6 pb-0">
                <MediaGallery
                  productId={product.id}
                  productName={product.name}
                  media={productMedia[product.id] || []}
                  className="mb-6"
                />
              </div>
              
              {/* Product Info */}
              <div className="p-6 pt-0">
                {/* Header with badges */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                    <div className="flex items-center space-x-2 mb-2">
                      {product.originalPrice && (
                        <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          SAVE ₦{(product.originalPrice - product.price).toLocaleString()}
                        </div>
                      )}
                      {product.inStock ? (
                        <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          IN STOCK
                        </div>
                      ) : (
                        <div className="bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                          OUT OF STOCK
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center text-yellow-400 ml-4">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">4.8</span>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
                
                {/* Features */}
                <ul className="space-y-1 mb-4">
                  {product.features.slice(0, 3).map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-600 text-sm">
                      <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                {/* Pricing */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600">
                        ₦{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">
                          ₦{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">
                      {product.warranty} warranty included
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">Stock:</div>
                    <div className="text-sm font-semibold text-blue-600">
                      {product.stockCount} left
                    </div>
                  </div>
                </div>

                {/* Service Indicators */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Truck className="w-3 h-3 mr-1" />
                    <span>Fast Delivery</span>
                  </div>
                  {product.installationRequired && (
                    <div className="flex items-center">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Pro Installation</span>
                    </div>
                  )}
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    <span>{product.warranty}</span>
                  </div>
                </div>
                
                {/* WhatsApp Order Button */}
                <div className="space-y-2">
                  <button 
                    onClick={() => handleWhatsAppOrder(product)}
                    disabled={!product.inStock}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-lg disabled:cursor-not-allowed"
                    style={{ backgroundColor: product.inStock ? '#25D366' : undefined }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {product.inStock 
                      ? 'Order via WhatsApp'
                      : 'Out of Stock'
                    }
                  </button>
                  
                  {!product.inStock && (
                    <p className="text-center text-sm text-gray-500">
                      Contact us on WhatsApp for restock updates
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MessageCircle className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              Try selecting a different category or check back later.
            </p>
          </div>
        )}

        {/* WhatsApp Contact Info */}
        <div className="mt-12 text-center bg-green-50 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-4">
            Chat with our experts on WhatsApp for personalized recommendations
          </p>
          <button
            onClick={() => {
              const message = encodeURIComponent(
                "Hello DijuTech! I need help choosing the right smart home products for my needs. Can you assist me?"
              );
              window.open(`https://wa.me/2349137487240?text=${message}`, '_blank');
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 mx-auto transition-all duration-300"
            style={{ backgroundColor: '#25D366' }}
          >
            <MessageCircle className="w-5 h-5" />
            Chat with Expert
          </button>
        </div>
      </div>
    </section>
  );
};