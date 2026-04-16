/**
 * Performance Optimization Utilities
 * Includes debouncing, throttling, memoization, and request deduplication
 */

/**
 * Debounce function to limit API calls on resize/scroll events
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle function to limit execution frequency
 */
export const throttle = (fn, limit = 300) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Request cache to deduplicate simultaneous API calls
 */
class RequestCache {
  constructor() {
    this.cache = new Map();
    this.pending = new Map();
  }

  getKey(url, options = {}) {
    return `${url}:${JSON.stringify(options)}`;
  }

  set(key, value, ttl = 5 * 60 * 1000) {
    this.cache.set(key, { value, expires: Date.now() + ttl });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    if (Date.now() > item.expires) {
      this.cache.delete(key);
      return null;
    }
    return item.value;
  }

  async fetchWithCache(url, options = {}, fetchFn = fetch) {
    const key = this.getKey(url, options);

    // Return cached result if exists
    const cached = this.get(key);
    if (cached) return cached;

    // Return pending request if exists (deduplication)
    if (this.pending.has(key)) {
      return this.pending.get(key);
    }

    // Make new request
    const promise = fetchFn(url, options)
      .then(res => res.json())
      .then(data => {
        this.set(key, data);
        this.pending.delete(key);
        return data;
      })
      .catch(err => {
        this.pending.delete(key);
        throw err;
      });

    this.pending.set(key, promise);
    return promise;
  }

  clear() {
    this.cache.clear();
    this.pending.clear();
  }
}

export const requestCache = new RequestCache();

/**
 * Lazy load images using Intersection Observer
 */
export const lazyLoadImages = () => {
  const imageElements = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    imageElements.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    imageElements.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
};

/**
 * Preload resources for better performance
 */
export const preloadResource = (href, type = 'prefetch') => {
  if (!document.querySelector(`link[href="${href}"][rel="${type}"]`)) {
    const link = document.createElement('link');
    link.rel = type; // 'prefetch' or 'preload' or 'dns-prefetch'
    link.href = href;
    if (type === 'preload') {
      link.as = href.endsWith('.js') ? 'script' : href.endsWith('.css') ? 'style' : 'fetch';
    }
    document.head.appendChild(link);
  }
};

/**
 * Batch DOM updates to prevent layout thrashing
 */
export const batchDOMUpdate = (fn) => {
  if ('requestAnimationFrame' in window) {
    requestAnimationFrame(fn);
  } else {
    setTimeout(fn, 0);
  }
};

/**
 * Defer non-critical tasks
 */
export const deferTask = (fn, delay = 0) => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => fn(), { timeout: delay });
  } else {
    setTimeout(fn, Math.max(delay, 1));
  }
};

/**
 * Monitor component render performance
 */
export const measureComponentPerformance = (componentName, fn) => {
  const startTime = performance.now();
  try {
    const result = fn();
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    if (process.env.NODE_ENV === 'development' && duration > 16.67) {
      console.warn(`⚠️  ${componentName} took ${duration.toFixed(2)}ms to render (>16.67ms)`);
    }
    return result;
  } catch (error) {
    console.error(`Error in ${componentName}:`, error);
    throw error;
  }
};

export default {
  debounce,
  throttle,
  requestCache,
  lazyLoadImages,
  preloadResource,
  batchDOMUpdate,
  deferTask,
  measureComponentPerformance,
};
