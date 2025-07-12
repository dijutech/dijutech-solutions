import { Order, OrderItem, Customer, Product } from '../types';
import { deliveryZones } from '../data/deliveryZones';

export class OrderService {
  private orders: Map<string, Order> = new Map();
  private readonly TAX_RATE = 0.075; // 7.5% VAT

  calculateOrderTotal(items: OrderItem[], location: string): {
    subtotal: number;
    tax: number;
    deliveryFee: number;
    total: number;
  } {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * this.TAX_RATE;
    const deliveryFee = this.getDeliveryFee(location);
    const total = subtotal + tax + deliveryFee;

    return { subtotal, tax, deliveryFee, total };
  }

  private getDeliveryFee(location: string): number {
    const zone = deliveryZones.find(zone => 
      zone.areas.some(area => 
        location.toLowerCase().includes(area.toLowerCase())
      )
    );
    return zone?.deliveryFee || 7500; // Default fee for unlisted areas
  }

  createOrder(customer: Customer, items: OrderItem[], paymentMethod: Order['paymentMethod']): Order {
    const orderId = this.generateOrderId();
    const totals = this.calculateOrderTotal(items, customer.location);
    
    const order: Order = {
      id: orderId,
      customer,
      items,
      ...totals,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      createdAt: new Date(),
      estimatedDelivery: this.calculateEstimatedDelivery(customer.location)
    };

    this.orders.set(orderId, order);
    return order;
  }

  private calculateEstimatedDelivery(location: string): Date {
    const zone = deliveryZones.find(zone => 
      zone.areas.some(area => 
        location.toLowerCase().includes(area.toLowerCase())
      )
    );
    
    const days = zone?.estimatedDays || 7;
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + days);
    return deliveryDate;
  }

  updateOrderStatus(orderId: string, status: Order['orderStatus']): boolean {
    const order = this.orders.get(orderId);
    if (order) {
      order.orderStatus = status;
      return true;
    }
    return false;
  }

  updatePaymentStatus(orderId: string, status: Order['paymentStatus']): boolean {
    const order = this.orders.get(orderId);
    if (order) {
      order.paymentStatus = status;
      if (status === 'completed') {
        order.orderStatus = 'confirmed';
      }
      return true;
    }
    return false;
  }

  getOrder(orderId: string): Order | undefined {
    return this.orders.get(orderId);
  }

  getAllOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  private generateOrderId(): string {
    return 'DT' + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
  }

  // Generate WhatsApp order message
  generateWhatsAppMessage(order: Order): string {
    const itemsList = order.items.map(item => 
      `• ${item.product.name} (Qty: ${item.quantity}) - ₦${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    return `🛒 NEW ORDER - ${order.id}

👤 Customer Details:
Name: ${order.customer.name}
Phone: ${order.customer.phone}
Location: ${order.customer.location}

📦 Order Items:
${itemsList}

💰 Order Summary:
Subtotal: ₦${order.subtotal.toLocaleString()}
Tax (7.5%): ₦${order.tax.toLocaleString()}
Delivery: ₦${order.deliveryFee.toLocaleString()}
TOTAL: ₦${order.total.toLocaleString()}

🚚 Estimated Delivery: ${order.estimatedDelivery?.toLocaleDateString()}

Please confirm this order and provide payment instructions.`;
  }
}