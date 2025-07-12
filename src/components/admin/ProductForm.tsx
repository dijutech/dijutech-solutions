import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Product } from '../../types';
import { X, Eye, EyeOff, Image, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
interface ProductFormProps {
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
  onClose: () => void;
}

interface FormData {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  inStock: boolean;
  stockCount: number;
  installationRequired: boolean;
  warranty: string;
  features: string;
  imageUrl: string;
}

export const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [previewData, setPreviewData] = useState<Partial<Product> | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [imageError, setImageError] = useState<string>('');

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || 0,
      originalPrice: product?.originalPrice || undefined,
      category: product?.category || '',
      inStock: product?.inStock ?? true,
      stockCount: product?.stockCount || 0,
      installationRequired: product?.installationRequired ?? false,
      warranty: product?.warranty || '1 Year',
      features: product?.features?.join('\n') || '',
      imageUrl: product?.image || '',
    }
  });

  const watchedData = watch();
  const watchedImageUrl = watch('imageUrl');

  useEffect(() => {
    if (product) {
      // Set form values for editing
      Object.keys(product).forEach(key => {
        if (key === 'features') {
          setValue('features', product.features.join('\n'));
        } else if (key === 'image') {
          setValue('imageUrl', product.image);
        } else if (key !== 'image') {
          setValue(key as keyof FormData, (product as any)[key]);
        }
      });
    }
  }, [product, setValue]);

  useEffect(() => {
    if (watchedImageUrl) {
      validateImageUrl(watchedImageUrl);
    }
  }, [watchedImageUrl]);

  const categories = [
    'Security',
    'Automation',
    'Lighting',
    'Entertainment',
    'Climate Control',
    'Networking',
    'Other'
  ];

  const warrantyOptions = [
    '1 Year',
    '2 Years',
    '3 Years',
    '5 Years'
  ];

  const validateImageUrl = (url: string) => {
    if (!url) {
      setImagePreview('');
      setImageError('');
      return;
    }

    // Basic URL validation
    try {
      new URL(url);
      
      // Check if it's an image URL (basic check)
      const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
      const hasImageExtension = imageExtensions.some(ext => 
        url.toLowerCase().includes(ext)
      );
      
      if (hasImageExtension || url.includes('images') || url.includes('photo')) {
        setImagePreview(url);
        setImageError('');
      } else {
        setImagePreview('');
        setImageError('URL should point to an image file');
      }
    } catch {
      setImagePreview('');
      setImageError('Please enter a valid URL');
    }
  };

  const onSubmit = (data: FormData) => {
    const features = data.features.split('\n').filter(f => f.trim() !== '');
    
    if (!data.imageUrl) {
      toast.error('Product image URL is required');
      return;
    }

    if (imageError) {
      toast.error('Please provide a valid image URL');
      return;
    }
    
    const productData: Partial<Product> = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      category: data.category,
      inStock: data.inStock,
      stockCount: Number(data.stockCount),
      installationRequired: data.installationRequired,
      warranty: data.warranty,
      features,
      image: data.imageUrl,
    };

    if (product) {
      productData.id = product.id;
    }

    onSave(productData);
  };

  const handlePreview = () => {
    const data = watchedData;
    const features = data.features.split('\n').filter(f => f.trim() !== '');
    
    const previewProduct: Partial<Product> = {
      name: data.name,
      description: data.description,
      price: Number(data.price),
      originalPrice: data.originalPrice ? Number(data.originalPrice) : undefined,
      category: data.category,
      inStock: data.inStock,
      stockCount: Number(data.stockCount),
      installationRequired: data.installationRequired,
      warranty: data.warranty,
      features,
      image: data.imageUrl,
    };

    setPreviewData(previewProduct);
    setShowPreview(true);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-6 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">
                {product ? 'Edit Product' : 'Add New Product'}
              </h2>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreview}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Basic Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                  
                  {/* Product Name */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      {...register('name', { required: 'Product name is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      {...register('description', { required: 'Description is required' })}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product description"
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      {...register('category', { required: 'Category is required' })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Features (one per line)
                    </label>
                    <textarea
                      {...register('features')}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter features, one per line"
                    />
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & Inventory */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Pricing & Inventory</h3>
                  
                  {/* Price */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₦) *
                      </label>
                      <input
                        {...register('price', { 
                          required: 'Price is required',
                          min: { value: 0, message: 'Price must be positive' }
                        })}
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                      {errors.price && (
                        <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Original Price (₦)
                      </label>
                      <input
                        {...register('originalPrice', {
                          min: { value: 0, message: 'Price must be positive' }
                        })}
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Stock */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Count *
                      </label>
                      <input
                        {...register('stockCount', { 
                          required: 'Stock count is required',
                          min: { value: 0, message: 'Stock must be non-negative' }
                        })}
                        type="number"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                      {errors.stockCount && (
                        <p className="text-red-500 text-sm mt-1">{errors.stockCount.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Warranty
                      </label>
                      <select
                        {...register('warranty')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {warrantyOptions.map(warranty => (
                          <option key={warranty} value={warranty}>{warranty}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Toggles */}
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        {...register('inStock')}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">In Stock</span>
                    </label>
                    
                    <label className="flex items-center">
                      <input
                        {...register('installationRequired')}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700">Installation Required</span>
                    </label>
                  </div>
                </div>

                {/* Product Image URL */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Image className="w-4 h-4 inline mr-1" />
                    Product Image URL *
                  </label>
                  <input
                    {...register('imageUrl', { required: 'Product image URL is required' })}
                    type="url"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/image.jpg"
                  />
                  {errors.imageUrl && (
                    <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
                  )}
                  {imageError && (
                    <p className="text-red-500 text-sm mt-1">{imageError}</p>
                  )}
                  
                  {/* Image Preview */}
                  {imagePreview && !imageError && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">Preview:</p>
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                        onError={() => {
                          setImagePreview('');
                          setImageError('Failed to load image from URL');
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
              >
                {product ? 'Update Product' : 'Create Product'}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>

      {/* Preview Modal */}
      {showPreview && previewData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-60"
          onClick={() => setShowPreview(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Product Preview</h3>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Preview Content */}
              <div className="space-y-4">
                {previewData.image && (
                  <img
                    src={previewData.image}
                    alt={previewData.name}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                )}
                
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">{previewData.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{previewData.category}</p>
                  <p className="text-gray-700">{previewData.description}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-blue-600">
                    ₦{previewData.price?.toLocaleString()}
                  </span>
                  {previewData.originalPrice && (
                    <span className="text-lg text-gray-500 line-through">
                      ₦{previewData.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                
                {previewData.features && previewData.features.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-800 mb-2">Features:</h5>
                    <ul className="list-disc list-inside space-y-1">
                      {previewData.features.map((feature, index) => (
                        <li key={index} className="text-sm text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Stock: {previewData.stockCount}</span>
                  <span>Warranty: {previewData.warranty}</span>
                  <span className={previewData.inStock ? 'text-green-600' : 'text-red-600'}>
                    {previewData.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};