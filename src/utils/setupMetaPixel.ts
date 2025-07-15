declare global {
  interface Window {
    fbq: FBQ;
    _fbq?: any;
  }

  interface FBQ {
    (...args: any[]): void;
    callMethod?: (...args: any[]) => void;
    push?: (...args: any[]) => void;
    loaded?: boolean;
    version?: string;
    queue?: any[];
  }
}

export const setupMetaPixel = () => {
  if (typeof window === 'undefined') return;

  const w = window as any;

  if (typeof w.fbq === 'function') return;

  (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
    if (f.fbq) return;
    n = function (...args: any[]) {
      (n as FBQ).callMethod
        ? (n as FBQ).callMethod!(...args)
        : ((n as FBQ).queue = (n as FBQ).queue || []).push(args);
    };
    (f.fbq as FBQ) = n as FBQ;
    f._fbq = f.fbq;
    f.fbq.push = n;
    f.fbq.loaded = true;
    f.fbq.version = '2.0';
    f.fbq.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  w.fbq('init', '1346544250415336');
  w.fbq('track', 'PageView');
};
