# Payment Integration Setup Guide for DijuTech Solutions

## 🚀 Quick Start Checklist

### 1. Payment Provider Accounts Setup

#### Paystack Setup
1. **Create Account**: Visit [paystack.com](https://paystack.com) and sign up
2. **Business Verification**: Complete KYC with business documents
3. **Get API Keys**: 
   - Go to Settings > API Keys & Webhooks
   - Copy Test/Live Public Key: `pk_test_...` or `pk_live_...`
   - Copy Test/Live Secret Key: `sk_test_...` or `sk_live_...`
4. **Set Webhook URL**: `https://yourdomain.com/api/webhooks/paystack`

#### Flutterwave Setup
1. **Create Account**: Visit [flutterwave.com](https://flutterwave.com) and sign up
2. **Business Verification**: Complete KYC process
3. **Get API Keys**:
   - Go to Settings > API Keys
   - Copy Test/Live Public Key: `FLWPUBK_TEST-...` or `FLWPUBK-...`
   - Copy Test/Live Secret Key: `FLWSECK_TEST-...` or `FLWSECK-...`
4. **Set Webhook URL**: `https://yourdomain.com/api/webhooks/flutterwave`

### 2. Environment Variables Setup

Create a `.env` file in your project root:

```env
# Paystack Configuration
VITE_PAYSTACK_PUBLIC_KEY=pk_test_your_actual_key_here
VITE_PAYSTACK_SECRET_KEY=sk_test_your_actual_key_here

# Flutterwave Configuration  
VITE_FLUTTERWAVE_PUBLIC_KEY=FLWPUBK_TEST-your_actual_key_here
VITE_FLUTTERWAVE_SECRET_KEY=FLWSECK_TEST-your_actual_key_here

# Your Backend API
VITE_API_BASE_URL=https://your-backend-api.com

# Admin Notifications
VITE_ADMIN_EMAIL=dijutech.solution@gmail.com
VITE_ADMIN_PHONE=+2349137487240

# Environment
VITE_ENVIRONMENT=development
```

### 3. Backend API Requirements

You need to create these API endpoints:

#### Payment Endpoints
- `POST /api/payments/store-reference` - Store payment references
- `POST /api/payments/verify` - Handle payment verification
- `POST /api/webhooks/paystack` - Paystack webhook handler
- `POST /api/webhooks/flutterwave` - Flutterwave webhook handler

#### Notification Endpoints
- `POST /api/notifications/email` - Send email notifications
- `POST /api/notifications/sms` - Send SMS notifications  
- `POST /api/notifications/whatsapp` - Send WhatsApp notifications

#### Admin Endpoints
- `POST /api/admin/orders` - Log orders to admin dashboard
- `GET /api/admin/orders` - Retrieve orders for admin

### 4. Webhook Setup (Critical for Production)

#### Paystack Webhook
```javascript
// Example Node.js webhook handler
app.post('/api/webhooks/paystack', (req, res) => {
  const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
    .update(JSON.stringify(req.body))
    .digest('hex');
    
  if (hash === req.headers['x-paystack-signature']) {
    const event = req.body;
    
    if (event.event === 'charge.success') {
      // Update order status
      // Send confirmation to customer
      // Notify admin
    }
  }
  
  res.sendStatus(200);
});
```

#### Flutterwave Webhook
```javascript
// Example Node.js webhook handler
app.post('/api/webhooks/flutterwave', (req, res) => {
  const secretHash = process.env.FLUTTERWAVE_SECRET_HASH;
  const signature = req.headers["verif-hash"];
  
  if (!signature || (signature !== secretHash)) {
    return res.status(401).end();
  }
  
  const payload = req.body;
  
  if (payload.status === 'successful') {
    // Update order status
    // Send confirmation to customer  
    // Notify admin
  }
  
  res.sendStatus(200);
});
```

### 5. Required Third-Party Services

#### Email Service (Choose One)
- **SendGrid**: For transactional emails
- **Mailgun**: Alternative email service
- **AWS SES**: Cost-effective option

#### SMS Service (Choose One)
- **Termii**: Nigerian SMS provider
- **Twilio**: International SMS service
- **BulkSMS Nigeria**: Local provider

#### WhatsApp Business API
- **WhatsApp Business API**: Official business messaging
- **Twilio WhatsApp API**: Third-party integration
- **360Dialog**: WhatsApp Business Solution Provider

### 6. Security Considerations

#### API Security
- Use HTTPS for all endpoints
- Validate webhook signatures
- Implement rate limiting
- Store sensitive keys securely

#### Data Protection
- Encrypt customer data
- Implement PCI DSS compliance
- Regular security audits
- Secure database access

### 7. Testing Checklist

#### Payment Flow Testing
- [ ] Test Paystack payment initialization
- [ ] Test Flutterwave payment initialization  
- [ ] Test successful payment flow
- [ ] Test failed payment handling
- [ ] Test webhook processing
- [ ] Test admin notifications

#### Integration Testing
- [ ] Test on mobile devices
- [ ] Test different payment methods
- [ ] Test network failure scenarios
- [ ] Test webhook delivery failures
- [ ] Test notification delivery

### 8. Go-Live Checklist

#### Pre-Launch
- [ ] Switch to live API keys
- [ ] Update webhook URLs to production
- [ ] Test with small amounts
- [ ] Verify admin notifications work
- [ ] Check SSL certificate
- [ ] Test customer journey end-to-end

#### Post-Launch Monitoring
- [ ] Monitor payment success rates
- [ ] Track webhook delivery
- [ ] Monitor admin notifications
- [ ] Check customer feedback
- [ ] Monitor for errors/failures

### 9. Support & Maintenance

#### Regular Tasks
- Monitor payment success rates
- Check webhook delivery logs
- Update API keys when needed
- Review transaction reports
- Handle customer payment issues

#### Emergency Contacts
- Paystack Support: support@paystack.com
- Flutterwave Support: support@flutterwave.com
- Your hosting provider support
- Your development team

### 10. Cost Considerations

#### Transaction Fees
- **Paystack**: 1.5% + ₦100 per transaction
- **Flutterwave**: 1.4% per transaction
- **SMS**: ₦2-5 per message
- **Email**: Usually free for reasonable volumes

#### Monthly Costs
- Hosting: ₦5,000-20,000/month
- Domain: ₦3,000/year
- SSL Certificate: Free (Let's Encrypt)
- Third-party services: Variable

---

## 🆘 Need Help?

If you need assistance with any of these steps:

1. **Technical Issues**: Contact your development team
2. **Payment Provider Issues**: Contact Paystack/Flutterwave support
3. **Business Setup**: Contact your business advisor
4. **Urgent Issues**: WhatsApp +2349137487240

Remember to test everything thoroughly before going live!