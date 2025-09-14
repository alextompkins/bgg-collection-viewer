import type { RefObject } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export function useIsVisible(element: RefObject<HTMLElement | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!element.current) return;

    const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));

    console.log('setting up observer on', element);
    observer.observe(element.current);

    return () => {
      console.log('disconnecting observer');
      observer.disconnect();
    };
  }, [element]);

  return isIntersecting;
}
