import { Order } from '../types';

export class PaymentService {
  // These will be set from environment variables
  private readonly PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
  private readonly PAYSTACK_SECRET_KEY = import.meta.env.VITE_PAYSTACK_SECRET_KEY;
  private readonly FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY;
  private readonly FLUTTERWAVE_SECRET_KEY = import.meta.env.VITE_FLUTTERWAVE_SECRET_KEY;
  private readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://your-backend-api.com';

  async initializePaystackPayment(order: Order): Promise<{ authorization_url: string; reference: string }> {
    try {
      const response = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.PAYSTACK_SECRET_KEY}`
        },
        body: JSON.stringify({
          email: order.customer.email || `${order.customer.phone.replace(/\D/g, '')}@dijutech.ng`,
          amount: Math.round(order.total * 100), // Paystack expects amount in kobo
          reference: order.id,
          callback_url: `${window.location.origin}/payment/success`,
          cancel_action: `${window.location.origin}/payment/cancel`,
          metadata: {
            order_id: order.id,
            customer_name: order.customer.name,
            customer_phone: order.customer.phone,
            custom_fields: [
              {
                display_name: "Order ID",
                variable_name: "order_id",
                value: order.id
              },
              {
                display_name: "Customer Phone",
                variable_name: "customer_phone", 
                value: order.customer.phone
              }
            ]
          },
          channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer']
        })
      });

      if (!response.ok) {
        throw new Error(`Paystack API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.status) {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      // Store payment reference for tracking
      this.storePaymentReference(order.id!, data.data.reference, 'paystack');

      return data.data;
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw new Error('Failed to initialize Paystack payment. Please try again.');
    }
  }

  async initializeFlutterwavePayment(order: Order): Promise<{ link: string; tx_ref: string }> {
    try {
      const tx_ref = `DT_${order.id}_${Date.now()}`;
      
      const response = await fetch('https://api.flutterwave.com/v3/payments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.FLUTTERWAVE_SECRET_KEY}`
        },
        body: JSON.stringify({
          tx_ref: tx_ref,
          amount: order.total,
          currency: 'NGN',
          redirect_url: `${window.location.origin}/payment/success`,
          payment_options: 'card,mobilemoney,ussd,banktransfer',
          customer: {
            email: order.customer.email || `${order.customer.phone.replace(/\D/g, '')}@dijutech.ng`,
            phonenumber: order.customer.phone,
            name: order.customer.name
          },
          customizations: {
            title: 'DijuTech Solutions',
            description: `Payment for Order ${order.id}`,
            logo: `${window.location.origin}/logo.png`
          },
          meta: {
            order_id: order.id,
            customer_phone: order.customer.phone
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Flutterwave API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error(data.message || 'Failed to initialize payment');
      }

      // Store payment reference for tracking
      this.storePaymentReference(order.id!, tx_ref, 'flutterwave');

      return data.data;
    } catch (error) {
      console.error('Flutterwave initialization error:', error);
      throw new Error('Failed to initialize Flutterwave payment. Please try again.');
    }
  }

  async verifyPaystackPayment(reference: string): Promise<{ status: string; data: any }> {
    try {
      const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
          'Authorization': `Bearer ${this.PAYSTACK_SECRET_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`Paystack verification error: ${response.status}`);
      }

      const data = await response.json();
      
      // Send verification to your backend
      await this.notifyBackend('paystack', reference, data);
      
      return data;
    } catch (error) {
      console.error('Paystack verification error:', error);
      throw new Error('Failed to verify Paystack payment');
    }
  }

  async verifyFlutterwavePayment(transactionId: string): Promise<{ status: string; data: any }> {
    try {
      const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
        headers: {
          'Authorization': `Bearer ${this.FLUTTERWAVE_SECRET_KEY}`
        }
      });

      if (!response.ok) {
        throw new Error(`Flutterwave verification error: ${response.status}`);
      }

      const data = await response.json();
      
      // Send verification to your backend
      await this.notifyBackend('flutterwave', transactionId, data);
      
      return data;
    } catch (error) {
      console.error('Flutterwave verification error:', error);
      throw new Error('Failed to verify Flutterwave payment');
    }
  }

  private async storePaymentReference(orderId: string, reference: string, provider: string): Promise<void> {
    try {
      await fetch(`${this.API_BASE_URL}/api/payments/store-reference`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          order_id: orderId,
          payment_reference: reference,
          provider: provider,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to store payment reference:', error);
    }
  }

  private async notifyBackend(provider: string, reference: string, verificationData: any): Promise<void> {
    try {
      await fetch(`${this.API_BASE_URL}/api/payments/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          provider,
          reference,
          verification_data: verificationData,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to notify backend:', error);
    }
  }

  // Webhook verification for Paystack
  static verifyPaystackWebhook(payload: string, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha512', secret).update(payload).digest('hex');
    return hash === signature;
  }

  // Webhook verification for Flutterwave
  static verifyFlutterwaveWebhook(payload: any, signature: string, secret: string): boolean {
    const crypto = require('crypto');
    const hash = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');
    return hash === signature;
  }
}