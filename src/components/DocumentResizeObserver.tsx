import type { ComponentChildren } from 'preact';
import { useEffect } from 'preact/hooks';

interface ResizeContainerProps {
  frameId: string;
  children: ComponentChildren;
}

const resizeCallback =
  (frameId: string): ResizeObserverCallback =>
  () => {
    window.parent.postMessage(
      {
        type: 'resize',
        height: document.body.scrollHeight,
        frame: frameId,
      },
      { targetOrigin: '*' },
    );
  };

export const DocumentResizeObserver = ({ frameId, children }: ResizeContainerProps) => {
  useEffect(() => {
    const observer = new ResizeObserver(resizeCallback(frameId));
    observer.observe(document.body);

    return () => observer.disconnect();
  });

  return <>{children}</>;
};
