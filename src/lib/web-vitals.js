/**
 * Web Vitals Monitoring
 * Tracks Core Web Vitals and custom performance metrics
 * Supports sending to analytics services
 */

// Store metrics for debugging
const vitalsMetrics = [];

/**
 * Get the largest contentful paint (LCP) metric
 */
export const observeLCP = (callback) => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        callback({
          name: 'LCP',
          value: lastEntry.renderTime || lastEntry.loadTime,
          rating: lastEntry.renderTime || lastEntry.loadTime > 2500 ? 'poor' : 'good',
        });
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP monitoring not supported');
    }
  }
};

/**
 * Get the first input delay (FID) / interaction to next paint (INP)
 */
export const observeFID = (callback) => {
  if ('PerformanceObserver' in window) {
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          callback({
            name: 'FID',
            value: entry.processingDuration,
            rating: entry.processingDuration > 100 ? 'poor' : 'good',
          });
        });
      });
      observer.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.warn('FID monitoring not supported');
    }
  }
};

/**
 * Get the cumulative layout shift (CLS) metric
 */
export const observeCLS = (callback) => {
  if ('PerformanceObserver' in window) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            callback({
              name: 'CLS',
              value: clsValue,
              rating: clsValue > 0.1 ? 'poor' : 'good',
            });
          }
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS monitoring not supported');
    }
  }
};

/**
 * Get navigation timing (Time to First Byte, DOM Interactive, etc.)
 */
export const getNavigationMetrics = () => {
  if ('performance' in window && 'getEntriesByType' in window.performance) {
    const navTiming = performance.getEntriesByType('navigation')[0];
    if (navTiming) {
      return {
        ttfb: navTiming.responseStart - navTiming.requestStart,
        domInteractive: navTiming.domInteractive - navTiming.fetchStart,
        domComplete: navTiming.domComplete - navTiming.fetchStart,
        loadComplete: navTiming.loadEventEnd - navTiming.fetchStart,
      };
    }
  }
  return null;
};

/**
 * Initialize all vitals monitoring
 */
export const initVitalsMonitoring = (onMetric) => {
  observeLCP(onMetric);
  observeFID(onMetric);
  observeCLS(onMetric);

  // Get navigation metrics once window loads
  if (document.readyState === 'complete') {
    const navMetrics = getNavigationMetrics();
    if (navMetrics) {
      onMetric({ name: 'Navigation', value: navMetrics });
    }
  } else {
    window.addEventListener('load', () => {
      const navMetrics = getNavigationMetrics();
      if (navMetrics) {
        onMetric({ name: 'Navigation', value: navMetrics });
      }
    });
  }
};

/**
 * Send metrics to analytics
 */
export const sendMetricToAnalytics = (metric) => {
  vitalsMetrics.push(metric);
  
  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Send to external service (e.g., Google Analytics)
  if (window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      rating: metric.rating,
    });
  }
};

export default vitalsMetrics;
