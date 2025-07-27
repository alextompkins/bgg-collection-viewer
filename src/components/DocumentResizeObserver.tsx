import type { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

interface ResizeContainerProps {
  children: ComponentChildren;
}

const onResize: ResizeObserverCallback = () => {
  window.parent.postMessage(
    {
      type: 'resize',
      height: document.body.scrollHeight,
    },
    { targetOrigin: '*' },
  );
};

export const DocumentResizeObserver = ({ children }: ResizeContainerProps) => {
  useEffect(() => {
    const observer = new ResizeObserver(onResize);
    observer.observe(document.body);

    return () => observer.disconnect();
  });

  return <>{children}</>;
};
