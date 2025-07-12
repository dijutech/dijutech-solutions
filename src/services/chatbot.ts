import { ChatMessage, ChatSession, Customer } from '../types';
import { products } from '../data/products';
import { deliveryZones } from '../data/deliveryZones';

export class ChatbotService {
  private sessions: Map<string, ChatSession> = new Map();

  createSession(): ChatSession {
    const sessionId = this.generateSessionId();
    const session: ChatSession = {
      id: sessionId,
      messages: [],
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.sessions.set(sessionId, session);
    
    // Add welcome message
    this.addMessage(sessionId, {
      id: this.generateMessageId(),
      type: 'bot',
      message: 'Welcome to DijuTech Solutions! 🏠✨\n\nI\'m here to help you find the perfect smart home solution. How can I assist you today?\n\n• View our products\n• Get pricing information\n• Technical support\n• Place an order',
      timestamp: new Date()
    });

    return session;
  }

  processMessage(sessionId: string, userMessage: string): ChatMessage[] {
    const session = this.sessions.get(sessionId);
    if (!session) throw new Error('Session not found');

    // Add user message
    const userMsg: ChatMessage = {
      id: this.generateMessageId(),
      type: 'user',
      message: userMessage,
      timestamp: new Date()
    };
    this.addMessage(sessionId, userMsg);

    // Generate bot response
    const botResponse = this.generateResponse(userMessage, session);
    const botMsg: ChatMessage = {
      id: this.generateMessageId(),
      type: 'bot',
      message: botResponse,
      timestamp: new Date()
    };
    this.addMessage(sessionId, botMsg);

    session.updatedAt = new Date();
    return [userMsg, botMsg];
  }

  private generateResponse(message: string, session: ChatSession): string {
    const lowerMessage = message.toLowerCase();

    // Greeting responses
    if (this.containsAny(lowerMessage, ['hello', 'hi', 'hey', 'good morning', 'good afternoon'])) {
      return 'Hello! Great to hear from you! 😊\n\nI can help you with:\n• Smart door locks\n• CCTV systems\n• Home automation\n• Smart lighting\n• Security alarms\n• Smart projectors\n\nWhat interests you most?';
    }

    // Product inquiries
    if (this.containsAny(lowerMessage, ['product', 'smart lock', 'door lock'])) {
      const smartLock = products.find(p => p.id === 'smart-door-lock-01');
      return `🔐 Smart Door Lock Pro - ₦${smartLock?.price.toLocaleString()}\n\nFeatures:\n• Fingerprint & PIN access\n• Mobile app control\n• Auto-lock security\n• Weather resistant\n\nWould you like to:\n1. See more details\n2. Check installation options\n3. Place an order`;
    }

    if (this.containsAny(lowerMessage, ['cctv', 'camera', 'security camera'])) {
      const cctv = products.find(p => p.id === 'cctv-system-01');
      return `📹 HD CCTV Security System - ₦${cctv?.price.toLocaleString()}\n\nIncludes:\n• 4 HD cameras (1080p)\n• Night vision technology\n• Mobile app monitoring\n• Motion detection alerts\n\nInstallation available in Lagos, Abuja, and Port Harcourt.\n\nInterested in a quote?`;
    }

    // Pricing inquiries
    if (this.containsAny(lowerMessage, ['price', 'cost', 'how much'])) {
      return 'Here are our popular products and prices:\n\n🔐 Smart Door Lock: ₦45,000\n📹 CCTV System (4 cameras): ₦85,000\n🏠 Home Automation Kit: ₦120,000\n💡 Smart Lighting Kit: ₦25,000\n🚨 Security Alarm: ₦65,000\n📽️ 4K Smart Projector: ₦180,000\n\nAll prices include warranty. Installation available for most products.\n\nWhich product interests you?';
    }

    // Technical support
    if (this.containsAny(lowerMessage, ['support', 'help', 'problem', 'issue', 'technical'])) {
      return 'I\'m here to help with technical support! 🔧\n\nFor immediate assistance:\n• WhatsApp: +234 913 748 7240\n• Email: dijutech.solution@gmail.com\n• Phone: Available 24/7\n\nCommon issues I can help with:\n• Installation guidance\n• App setup\n• Troubleshooting\n• Warranty claims\n\nWhat specific issue are you experiencing?';
    }

    // Order/purchase inquiries
    if (this.containsAny(lowerMessage, ['order', 'buy', 'purchase', 'payment'])) {
      return 'Ready to order? Great choice! 🛒\n\nTo complete your order, I\'ll need:\n• Your name\n• Phone number\n• Delivery location\n• Product selection\n\nPayment options:\n• Secure online payment (Paystack/Flutterwave)\n• Bank transfer\n• Cash on delivery (Lagos only)\n\nShall we start with your contact details?';
    }

    // Location/delivery inquiries
    if (this.containsAny(lowerMessage, ['delivery', 'location', 'shipping', 'installation'])) {
      return 'We deliver nationwide! 🚚\n\nDelivery zones:\n• Lagos: 1-2 days (₦2,500-3,000)\n• Abuja: 2-3 days (₦4,000)\n• Port Harcourt: 3-4 days (₦5,000)\n• Other cities: 4-7 days\n\nProfessional installation available in major cities.\n\nWhat\'s your location?';
    }

    // Default response
    return 'I understand you\'re interested in our smart home solutions! 🏠\n\nI can help you with:\n• Product information and pricing\n• Technical support\n• Order placement\n• Delivery and installation\n\nCould you please be more specific about what you\'d like to know? Or feel free to ask me anything about our products!';
  }

  private containsAny(text: string, keywords: string[]): boolean {
    return keywords.some(keyword => text.includes(keyword));
  }

  private addMessage(sessionId: string, message: ChatMessage): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.messages.push(message);
    }
  }

  getSession(sessionId: string): ChatSession | undefined {
    return this.sessions.get(sessionId);
  }

  updateCustomerInfo(sessionId: string, customer: Partial<Customer>): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.customer = { ...session.customer, ...customer };
      session.updatedAt = new Date();
    }
  }

  private generateSessionId(): string {
    return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  private generateMessageId(): string {
    return 'msg_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }

  // Export conversation data
  exportConversations(): any[] {
    return Array.from(this.sessions.values()).map(session => ({
      sessionId: session.id,
      customer: session.customer,
      messageCount: session.messages.length,
      status: session.status,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
      messages: session.messages
    }));
  }
}