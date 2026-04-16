import React from 'react';

/**
 * Reusable loading fallback component for Suspense boundaries
 * Provides consistent loading UI across the application
 */
export const PageLoadingFallback = ({ message = 'Loading...' }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="relative w-16 h-16">
            {/* Animated loading spinner */}
            <div className="absolute inset-0 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-green-500 border-r-green-400 rounded-full animate-spin"></div>
          </div>
        </div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">{message}</p>
        <p className="text-sm text-gray-500 dark:text-gray-400">Please wait...</p>
      </div>
    </div>
  );
};

/**
 * Lightweight fallback for smaller components (modals, sections)
 */
export const ComponentLoadingFallback = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="animate-spin">
        <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-700 border-t-green-500 rounded-full"></div>
      </div>
    </div>
  );
};

/**
 * Skeleton loading component for content preview
 */
export const SkeletonLoader = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded animate-pulse"
          style={{
            width: i === lines - 1 ? '80%' : '100%',
          }}
        />
      ))}
    </div>
  );
};

export default PageLoadingFallback;
