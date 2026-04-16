import React, { Suspense, lazy } from 'react';
import { ComponentLoadingFallback } from '@/components/Loading';

/**
 * Utility to create lazy-loaded components with consistent fallback UI
 * Automatically wraps components in Suspense with loading fallback
 */
export const dynamicImport = (importFn, fallback = <ComponentLoadingFallback />) => {
  const LazyComponent = lazy(importFn);
  
  return (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Create lazy components with custom fallback messages
 */
export const createLazyComponent = (importFn, fallbackMessage = 'Loading...') => {
  const LazyComponent = lazy(importFn);
  
  return (props) => (
    <Suspense
      fallback={
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin mb-2">
              <div className="w-6 h-6 border-3 border-gray-200 border-t-green-500 rounded-full"></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{fallbackMessage}</p>
          </div>
        </div>
      }
    >
      <LazyComponent {...props} />
    </Suspense>
  );
};

/**
 * Higher-order component to wrap heavy components for lazy loading
 * Usage: const LazyFlashSales = withLazyLoad(() => import('@/modules/home/components/FlashSales'));
 */
export const withLazyLoad = (importFn, fallback = <ComponentLoadingFallback />) => {
  const LazyComponent = lazy(importFn);
  const Wrapper = (props) => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
  Wrapper.displayName = 'LazyLoad';
  return Wrapper;
};

export default dynamicImport;
