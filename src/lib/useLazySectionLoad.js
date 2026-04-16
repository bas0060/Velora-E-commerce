import { useEffect, useRef, useState } from 'react';

export const useLazySectionLoad = ({ rootMargin = '300px', threshold = 0.1 } = {}) => {
  const sectionRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad || !sectionRef.current) return;

    const element = sectionRef.current;
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect();
          }
        },
        { rootMargin, threshold }
      );
      observer.observe(element);

      return () => observer.disconnect();
    }

    setShouldLoad(true);
  }, [rootMargin, shouldLoad, threshold]);

  return [sectionRef, shouldLoad];
};

export default useLazySectionLoad;
