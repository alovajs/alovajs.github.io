'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ThemeImageProps {
  sources: { light: string; dark: string };
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ThemeImage({ sources, alt, className, style }: ThemeImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <img
        src={sources.light}
        alt={alt ?? ''}
        className={className}
        style={style}
      />
    );
  }

  return (
    <img
      src={resolvedTheme === 'dark' ? sources.dark : sources.light}
      alt={alt ?? ''}
      className={className}
      style={style}
    />
  );
}

export function ThemedImage(props: ThemeImageProps) {
  return <ThemeImage {...props} />;
}

export default ThemeImage;
