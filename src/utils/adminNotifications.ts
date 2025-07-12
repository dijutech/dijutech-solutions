interface OrderNotification {
  orderId: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  amount: number;
  paymentMethod: string;
  paymentReference?: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  timestamp: Date;
}

export class AdminNotificationService {
  private readonly ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'dijutech.solution@gmail.com';
  private readonly ADMIN_PHONE = import.meta.env.VITE_ADMIN_PHONE || '+2349137487240';
  private readonly API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async sendOrderNotification(notification: OrderNotification): Promise<void> {
    try {
      // Send email notification
      await this.sendEmailNotification(notification);
      
      // Send SMS notification
      await this.sendSMSNotification(notification);
      
      // Send WhatsApp notification
      await this.sendWhatsAppNotification(notification);
      
      // Log to admin dashboard
      await this.logToAdminDashboard(notification);
      
    } catch (error) {
      console.error('Failed to send admin notifications:', error);
    }
  }

  private async sendEmailNotification(notification: OrderNotification): Promise<void> {
    const emailData = {
      to: this.ADMIN_EMAIL,
      subject: `🚨 New Order Alert - ${notification.orderId}`,
      html: this.generateEmailTemplate(notification)
    };

    await fetch(`${this.API_BASE_URL}/api/notifications/email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData)
    });
  }

  private async sendSMSNotification(notification: OrderNotification): Promise<void> {
    const smsData = {
      to: this.ADMIN_PHONE,
      message: `NEW ORDER: ${notification.orderId} - ₦${notification.amount.toLocaleString()} from ${notification.customerName} (${notification.customerPhone}). Payment: ${notification.paymentMethod}`
    };

    await fetch(`${this.API_BASE_URL}/api/notifications/sms`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(smsData)
    });
  }

  private async sendWhatsAppNotification(notification: OrderNotification): Promise<void> {
    const message = this.generateWhatsAppMessage(notification);
    
    // This would integrate with WhatsApp Business API
    await fetch(`${this.API_BASE_URL}/api/notifications/whatsapp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: this.ADMIN_PHONE,
        message: message
      })
    });
  }

  private async logToAdminDashboard(notification: OrderNotification): Promise<void> {
    await fetch(`${this.API_BASE_URL}/api/admin/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notification)
    });
  }

  private generateEmailTemplate(notification: OrderNotification): string {
    const itemsList = notification.items.map(item => 
      `<tr>
        <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₦${(item.price * item.quantity).toLocaleString()}</td>
      </tr>`
    ).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Alert</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #2563eb; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0;">🚨 New Order Alert</h1>
            <p style="margin: 5px 0 0 0;">Order ID: ${notification.orderId}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
            <h2 style="color: #1e40af; margin-top: 0;">Customer Information</h2>
            <p><strong>Name:</strong> ${notification.customerName}</p>
            <p><strong>Phone:</strong> ${notification.customerPhone}</p>
            ${notification.customerEmail ? `<p><strong>Email:</strong> ${notification.customerEmail}</p>` : ''}
            
            <h2 style="color: #1e40af;">Order Details</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 10px 0;">
              <thead>
                <tr style="background: #e2e8f0;">
                  <th style="padding: 10px; text-align: left;">Product</th>
                  <th style="padding: 10px; text-align: center;">Qty</th>
                  <th style="padding: 10px; text-align: right;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemsList}
              </tbody>
            </table>
            
            <div style="text-align: right; margin-top: 20px; padding-top: 10px; border-top: 2px solid #2563eb;">
              <h3 style="margin: 0; color: #1e40af;">Total: ₦${notification.amount.toLocaleString()}</h3>
            </div>
            
            <h2 style="color: #1e40af;">Payment Information</h2>
            <p><strong>Method:</strong> ${notification.paymentMethod}</p>
            ${notification.paymentReference ? `<p><strong>Reference:</strong> ${notification.paymentReference}</p>` : ''}
            <p><strong>Time:</strong> ${notification.timestamp.toLocaleString()}</p>
          </div>
          
          <div style="background: #10b981; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center;">
            <p style="margin: 0;"><strong>Action Required:</strong> Contact customer within 2 hours to confirm order and arrange delivery.</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateWhatsAppMessage(notification: OrderNotification): string {
    const itemsList = notification.items.map(item => 
      `• ${item.name} (${item.quantity}x) - ₦${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    return `🚨 NEW ORDER ALERT

Order ID: ${notification.orderId}
Customer: ${notification.customerName}
Phone: ${notification.customerPhone}
Amount: ₦${notification.amount.toLocaleString()}

Items:
${itemsList}

Payment: ${notification.paymentMethod}
${notification.paymentReference ? `Reference: ${notification.paymentReference}` : ''}

⏰ Contact customer within 2 hours!`;
  }
}