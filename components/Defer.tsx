import {
  Children,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type Props = {
  children: ReactNode[];
  chunkSize?: number;
  timeout?: number;
};

export default function Defer({
  children,
  chunkSize = 10,
  timeout = 200,
}: Props) {
  const [renderedItemsCount, setRenderedItemsCount] = useState(chunkSize);

  const childrenArray = useMemo(() => Children.toArray(children), [children]);
  const idleCallbackRef = useRef<number>();

  useEffect(() => {
    if (idleCallbackRef.current) {
      window.cancelIdleCallback?.(idleCallbackRef.current);
    }

    if (renderedItemsCount >= childrenArray.length) return;
    const handler = () => {
      setRenderedItemsCount(
        Math.min(renderedItemsCount + chunkSize, childrenArray.length),
      );
    };

    if (window.requestIdleCallback) {
      idleCallbackRef.current = window.requestIdleCallback(handler, {
        timeout,
      });
      return;
    }

    handler();
    return () => {
      if (!idleCallbackRef.current) return;
      window.cancelIdleCallback?.(idleCallbackRef.current);
    };
  }, [renderedItemsCount, childrenArray.length, chunkSize]);

  return <>{childrenArray.slice(0, renderedItemsCount)}</>;
}
