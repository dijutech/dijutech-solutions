import { MediaItem } from '../types';

interface ProductMedia {
  [productId: string]: MediaItem[];
}

export const productMedia: ProductMedia = {
  'smart-door-lock-01': [
    {
      id: 'sdl-img-1',
      type: 'image',
      src: '/images/big-handle1.webp',
      alt: 'Smart Door Lock Pro - Front View',
      title: 'Sleek Design with Fingerprint Scanner'
    },
    {
      id: 'sdl-img-2',
      type: 'image',
      src: '/images/big-handle2.png',
      alt: 'Smart Door Lock Pro - Installation View',
      title: 'Easy Installation Process'
    },
    {
      id: 'sdl-img-3',
      type: 'image',
      src: '/images/big-handle3.webp',
      alt: 'Smart Door Lock Pro - Mobile App Interface',
      title: 'Mobile App Control Interface'
    },
    {
      id: 'sdl-video-1',
      type: 'video',
      src: '/images/bighandle-v.mp4',
      thumbnail: '/images/big-handle2.png',
      alt: 'Smart Door Lock Pro - Demo Video',
      title: 'See How It Works - Product Demonstration'
    }
  ],
  'cctv-system-01': [
    {
      id: 'cctv-img-1',
      type: 'image',
      src: '/images/cctv11.png',
      alt: 'HD CCTV Security System - Camera Array',
      title: '4-Camera HD Security System'
    },
    {
      id: 'cctv-img-2',
      type: 'image',
      src: '/images/cctv22.png',
      alt: 'HD CCTV Security System - Night Vision',
      title: 'Advanced Night Vision Technology'
    },
    {
      id: 'cctv-img-3',
      type: 'image',
      src: '/images/cctv33.png',
      alt: 'HD CCTV Security System - Mobile Monitoring',
      title: 'Real-time Mobile Monitoring'
    },
    {
      id: 'cctv-video-1',
      type: 'video',
      src: '/images/cctv-video.mp4',
      thumbnail: '/images/cctv22.png',
      alt: 'HD CCTV Security System - Installation Demo',
      title: 'Professional Installation Process'
    }
  ],
  'home-automation-01': [
    {
      id: 'ha-img-1',
      type: 'image',
      src: '/images/smart-switch11.jpg',
      alt: 'Smart Home Automation Kit - Control Hub',
      title: 'Central Control Hub'
    },
    {
      id: 'ha-img-2',
      type: 'image',
      src: '/images/switch22.webp',
      alt: 'Smart Home Automation Kit - Voice Control',
      title: 'Voice Control Integration'
    },
    {
      id: 'ha-img-3',
      type: 'image',
      src: '/images/switch33.webp',
      alt: 'Smart Home Automation Kit - Energy Monitoring',
      title: 'Energy Monitoring Dashboard'
    },
    {
      id: 'ha-video-1',
      type: 'video',
      src: '/images/smart-switchv.mp4',
      thumbnail: '/images/switch22.webp',
      alt: 'Smart Home Automation Kit - Full Demo',
      title: 'Complete Home Automation Experience'
    }
  ],
  'smart-Lock-01': [
    {
      id: 'sl-img-1',
      type: 'image',
      src: '/images/k30-lock1.png',
      alt: 'Smart Automatic Lock - Smart Display',
      title: 'RGB Color Changing Capabilities'
    },
    {
      id: 'sl-img-2',
      type: 'image',
      src: '/images/k30-lock2.png',
      alt: 'Smart Automatic Lock - App Control',
      title: 'Smartphone App Control'
    },
    {
      id: 'sl-img-3',
      type: 'image',
      src: '/images/k30-lock3.png',
      alt: 'Smart Automatic Lock - Door Setup',
      title: 'Perfect for Entrance Door'
    },
    {
      id: 'sl-video-1',
      type: 'video',
      src: '/images/auto-smart-v.mp4',
      thumbnail: '/images/k30-lock2.png',
      alt: 'Smart Automatic Lock - Feature display',
      title: 'See the Smart Lock in Action'
    }
  ],
  'security-lock-01': [
    {
      id: 'sa-img-1',
      type: 'image',
      src: '/images/handlecam1.png',
      alt: 'Big cam Handle Lock - handle lock',
      title: 'Advanced Front Display'
    },
    {
      id: 'sa-img-2',
      type: 'image',
      src: '/images/handlecam.png',
      alt: 'Wireless Security Alarm - Sensors',
      title: 'Wireless Motion Sensors'
    },
    {
      id: 'sa-img-3',
      type: 'image',
      src: '/images/handlecam3.png',
      alt: 'Big cam handle - unique features',
      title: 'Good For rooms, etc'
    },
    {
      id: 'sa-video-1',
      type: 'video',
      src: '/images/bighcamv.mp4',
      thumbnail: '/images/handlecam.png',
      alt: 'Big cam Handle - Authenticate users',
      title: 'Complete Security Lock'
    }
  ],
  'smart-projector-01': [
    {
      id: 'sp-img-1',
      type: 'image',
      src: '/images/projector11.png',
      alt: '4K Smart Projector - Device View',
      title: 'Ultra HD 4K Smart Projector'
    },
    {
      id: 'sp-img-2',
      type: 'image',
      src: '/images/projector22.webp',
      alt: '4K Smart Projector - Home Theater Setup',
      title: 'Perfect Home Theater Experience'
    },
    {
      id: 'sp-img-3',
      type: 'image',
      src: '/images/projector33.webp',
      alt: '4K Smart Projector - Wireless Connectivity',
      title: 'Wireless Screen Mirroring'
    },
    {
      id: 'sp-video-1',
      type: 'video',
      src: '/images/projector-v.mp4',
      thumbnail: '/images/projector22.webp',
      alt: '4K Smart Projector - Quality Demo',
      title: 'See the Amazing 4K Quality',
    }
  ]
};