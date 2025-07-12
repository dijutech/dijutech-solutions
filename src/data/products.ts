import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'smart-door-lock-01',
    name: 'Smart Door Lock Pro(Z-18)',
    description: 'Advanced keyless entry system with biometric and PIN access enhancing more security to the door.',
    price: 144350,
    originalPrice: 155350,
    image: '/src/images/big-handle1.png',
    features: [
      'Fingerprint & PIN Access',
      'Mobile App Control',
      'Smart IC Card(2) & more...',
      'Auto-Lock Security',
      'Battery Backup',
      'Weather Resistant',
      'Manual key access'
    ],
    category: 'Security',
    inStock: true,
    stockCount: 25,
    installationRequired: true,
    warranty: '2 Years'
  },
  {
    id: 'cctv-system-01',
    name: 'SOLAR HD CCTV Security System(Dual-lens)',
    description: 'Solar 4-camera HD surveillance system with Dual lens cam & night vision',
    price: 95230,
    originalPrice: 117041,
    image: '/src/images/cctv2.png',
    features: [
      '4 HD Cameras (1080p)',
      'Night Vision Technology',
      'Mobile App Monitoring & more....',
      'Motion Detection Alerts',
      'Cloud Storage Option'
    ],
    category: 'Security',
    inStock: true,
    stockCount: 33,
    installationRequired: true,
    warranty: '2 Years'
  },
  {
    id: 'home-automation-01',
    name: 'Smart Home Automation Kit',
    description: 'Complete home automation system with voice control',
    price: 32415,
    originalPrice: 44603,
    image: '/src/images/switch22.png',
    features: [
      'Voice Control Integration',
      'Smart Lighting Control',
      'AC & Appliance Control',
      'Energy Monitoring',
      'Mobile App Control'
    ],
    category: 'Automation',
    inStock: true,
    stockCount: 63,
    installationRequired: true,
    warranty: '2 Years'
  },
  {
    id: 'smart-Lock-01',
    name: 'Smart Door Lock(K30T)',
    description: 'Advanced Smart Lock with Facial Recognition, CCTV monitoring & Audio/Video Intercom and many more...',
    price: 207211,
    originalPrice: 219303,
    image: '/src/images/k30-lock1.png',
    features: [
      'Facial Recognition',
      'One-time password',
      'Remote Unlocking (extra) & more....',
      'Chargeable Lithium battery',
      'Mobile App Acess'
    ],
    category: 'Security',
    inStock: true,
    stockCount: 50,
    installationRequired: true,
    warranty: '2 Year'
  },
  {
    id: 'security-lock-01',
    name: 'Big Handle Lock with Cam',
    description: 'A premium Big handle Lock With Cam that combines robustdesign and integrated surveillance delivering high-end security and convenience',
    price: 139500,
    originalPrice: 147500,
    image: '/src/images/handlecam.png',
    features: [
      'HD Camera & Display',
      'Fingeprint',
      'RFID Cards(2) & more....',
      'Built-in Doorbell',
      'Passcode Entry'
    ],
    category: 'Security',
    inStock: true,
    stockCount: 20,
    installationRequired: true,
    warranty: '2 Years'
  },
  {
    id: 'smart-projector-01',
    name: '4K Smart Projector',
    description: 'Ultra HD smart projector with wireless connectivity',
    price: 108142,
    originalPrice: 132620,
    image: '/src/images/projector1.png',
    features: [
      '4K Ultra HD Resolution',
      'Wireless Screen Mirroring',
      'Built-in Smart TV OS',
      'Multiple Connectivity Options',
      'Long-lasting LED Lamp'
    ],
    category: 'Entertainment',
    inStock: true,
    stockCount: 18,
    installationRequired: false,
    warranty: '1 Years'
  }
];