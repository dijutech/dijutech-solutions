declare global {
  interface Window {
    fbq: FBQ;
    _fbq?: any;
  }

  interface FBQ {
    (...args: any[]): void;
    queue?: any[];
    loaded?: boolean;
    version?: string;
    q?: any[];
    l?: number;
  }
}

export const setupMetaPixel = () => {
  if (typeof window === 'undefined') return;

  const w = window as Window;
  
  // Avoid re-initialization
if (typeof w.fbq === 'function') return;
  
  const fbq: FBQ = function (...args: any[]) {
    (fbq.q = fbq.q || []).push(args);
  };
  
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.q = [];
  fbq.l = Date.now();
  
  w.fbq = fbq;
  
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  w.fbq('init', '715356251468666');
  w.fbq('track', 'PageView');
};
