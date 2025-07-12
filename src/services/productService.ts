import { Product } from '../types';
import toast from 'react-hot-toast';

export class ProductService {
  private products: Map<string, Product> = new Map();
  private readonly STORAGE_KEY = 'dijutech_products';

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        const productsArray = JSON.parse(stored);
        productsArray.forEach((product: Product) => {
          this.products.set(product.id, product);
        });
      }
    } catch (error) {
      console.error('Failed to load products from storage:', error);
    }
  }

  private saveToStorage(): void {
    try {
      const productsArray = Array.from(this.products.values());
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(productsArray));
    } catch (error) {
      console.error('Failed to save products to storage:', error);
    }
  }

  private generateId(): string {
    return 'product_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  async getAllProducts(): Promise<Product[]> {
    // Simulate API delay
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const products = Array.from(this.products.values());
      return products;
    } catch (error) {
      console.error('Failed to load products:', error);
      toast.error('Failed to load products from database');
      throw error;
    }
  }

  async getProduct(id: string): Promise<Product | null> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      return this.products.get(id) || null;
    } catch (error) {
      console.error('Failed to get product:', error);
      toast.error('Failed to retrieve product');
      throw error;
    }
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const product: Product = {
        id: this.generateId(),
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || 0,
        originalPrice: productData.originalPrice,
        image: productData.image || '',
        features: productData.features || [],
        category: productData.category || '',
        inStock: productData.inStock ?? true,
        stockCount: productData.stockCount || 0,
        installationRequired: productData.installationRequired ?? false,
        warranty: productData.warranty || '1 Year'
      };

      this.products.set(product.id, product);
      this.saveToStorage();
      
      toast.success('Product created successfully');
      return product;
    } catch (error) {
      console.error('Failed to create product:', error);
      toast.error('Failed to create product');
      throw error;
    }
  }

  async updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const existingProduct = this.products.get(id);
      if (!existingProduct) {
        toast.error('Product not found');
        throw new Error('Product not found');
      }

      const updatedProduct: Product = {
        ...existingProduct,
        ...productData,
        id // Ensure ID doesn't change
      };

      this.products.set(id, updatedProduct);
      this.saveToStorage();
      
      toast.success('Product updated successfully');
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update product:', error);
      toast.error('Failed to update product');
      throw error;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const deleted = this.products.delete(id);
      if (deleted) {
        this.saveToStorage();
        toast.success('Product deleted successfully');
      } else {
        toast.error('Product not found');
      }
      
      return deleted;
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast.error('Failed to delete product');
      throw error;
    }
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return Array.from(this.products.values())
        .filter(product => product.category === category);
    } catch (error) {
      console.error('Failed to get products by category:', error);
      toast.error('Failed to load products by category');
      throw error;
    }
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const lowercaseQuery = query.toLowerCase();
      return Array.from(this.products.values())
        .filter(product => 
          product.name.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.category.toLowerCase().includes(lowercaseQuery) ||
          product.features.some(feature => feature.toLowerCase().includes(lowercaseQuery))
        );
    } catch (error) {
      console.error('Failed to search products:', error);
      toast.error('Failed to search products');
      throw error;
    }
  }

  async updateStock(id: string, stockCount: number): Promise<Product> {
    try {
      const product = this.products.get(id);
      if (!product) {
        toast.error('Product not found');
        throw new Error('Product not found');
      }

      const updatedProduct: Product = {
        ...product,
        stockCount,
        inStock: stockCount > 0
      };

      this.products.set(id, updatedProduct);
      this.saveToStorage();
      
      toast.success('Stock updated successfully');
      return updatedProduct;
    } catch (error) {
      console.error('Failed to update stock:', error);
      toast.error('Failed to update stock');
      throw error;
    }
  }

  async bulkUpdateStock(updates: Array<{ id: string; stockCount: number }>): Promise<Product[]> {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedProducts: Product[] = [];
      
      for (const update of updates) {
        const product = this.products.get(update.id);
        if (product) {
          const updatedProduct: Product = {
            ...product,
            stockCount: update.stockCount,
            inStock: update.stockCount > 0
          };
          
          this.products.set(update.id, updatedProduct);
          updatedProducts.push(updatedProduct);
        }
      }
      
      this.saveToStorage();
      toast.success(`Updated stock for ${updatedProducts.length} products`);
      return updatedProducts;
    } catch (error) {
      console.error('Failed to bulk update stock:', error);
      toast.error('Failed to update stock');
      throw error;
    }
  }

  // Analytics methods
  async getProductStats(): Promise<{
    totalProducts: number;
    inStockProducts: number;
    outOfStockProducts: number;
    totalValue: number;
    categoryCounts: Record<string, number>;
  }> {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const products = Array.from(this.products.values());
    const totalProducts = products.length;
    const inStockProducts = products.filter(p => p.inStock).length;
    const outOfStockProducts = totalProducts - inStockProducts;
    const totalValue = products.reduce((sum, p) => sum + (p.price * p.stockCount), 0);
    
    const categoryCounts: Record<string, number> = {};
    products.forEach(product => {
      categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
    });
    
    return {
      totalProducts,
      inStockProducts,
      outOfStockProducts,
      totalValue,
      categoryCounts
    };
  }

  // Import/Export functionality
  async exportProducts(): Promise<string> {
    const products = Array.from(this.products.values());
    return JSON.stringify(products, null, 2);
  }

  async importProducts(jsonData: string): Promise<number> {
    try {
      const importedProducts: Product[] = JSON.parse(jsonData);
      let importedCount = 0;
      
      for (const productData of importedProducts) {
        // Generate new ID to avoid conflicts
        const product: Product = {
          ...productData,
          id: this.generateId()
        };
        
        this.products.set(product.id, product);
        importedCount++;
      }
      
      this.saveToStorage();
      return importedCount;
    } catch (error) {
      throw new Error('Invalid JSON data');
    }
  }

  // Validation methods
  validateProduct(productData: Partial<Product>): string[] {
    const errors: string[] = [];
    
    if (!productData.name || productData.name.trim().length === 0) {
      errors.push('Product name is required');
    }
    
    if (!productData.description || productData.description.trim().length === 0) {
      errors.push('Product description is required');
    }
    
    if (!productData.price || productData.price <= 0) {
      errors.push('Product price must be greater than 0');
    }
    
    if (!productData.category || productData.category.trim().length === 0) {
      errors.push('Product category is required');
    }
    
    if (productData.stockCount !== undefined && productData.stockCount < 0) {
      errors.push('Stock count cannot be negative');
    }
    
    if (!productData.image || !this.isValidUrl(productData.image)) {
      errors.push('Valid product image URL is required');
    }
    
    return errors;
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}