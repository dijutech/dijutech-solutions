export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  features: string[];
  category: string;
  inStock: boolean;
  stockCount: number;
  installationRequired: boolean;
  warranty: string;
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  alt: string;
  title?: string;
}

export interface Customer {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  location: string;
  address?: string;
}

export interface OrderItem {
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id?: string;
  customer: Customer;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'paystack' | 'flutterwave' | 'whatsapp';
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderStatus: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered';
  createdAt: Date;
  estimatedDelivery?: Date;
}

export interface ChatMessage {
  id: string;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  metadata?: any;
}

export interface ChatSession {
  id: string;
  customer?: Partial<Customer>;
  messages: ChatMessage[];
  status: 'active' | 'completed' | 'transferred';
  createdAt: Date;
  updatedAt: Date;
}

export interface DeliveryZone {
  name: string;
  areas: string[];
  deliveryFee: number;
  estimatedDays: number;
  installationAvailable: boolean;
}