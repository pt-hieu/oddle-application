import { useEffect, useRef } from 'react';

export const ImageDefaultAsType = 'img' as const;
export type ImageDefaultAsType = typeof ImageDefaultAsType;

export type ImageOwnProps = {
  children?: React.ReactNode;
  backgroundImage?: boolean;
};

export type ImageProps<E extends React.ElementType> = ImageOwnProps &
  Omit<React.ComponentProps<E>, keyof ImageOwnProps>;

function CustomImage<E extends React.ElementType = ImageDefaultAsType>({
  src: initSrc,
  backgroundImage,
  ...otherProps
}: ImageProps<E>) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const img = new Image();
    img.src = initSrc;

    img.onload = () => {
      if (!ref.current) return;
      if (!backgroundImage) {
        ref.current.src = initSrc;
        return;
      }

      ref.current.style.backgroundImage = `url(${initSrc})`;
    };

    img.onerror = () => {
      if (!ref.current) return;
      if (!backgroundImage) {
        ref.current.src = '/fallback.svg';
        return;
      }

      ref.current.style.backgroundImage = `url('/fallback.svg')`;
    };
  }, [initSrc]);

  return <img {...otherProps} ref={ref} src="" />;
}

export default CustomImage;
