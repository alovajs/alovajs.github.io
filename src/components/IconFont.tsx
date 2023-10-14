import React from 'react';

interface IconFontProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number | string;
  height?: number | string;
  size?: number | string;
}
export default function IconFont({ className, width, size = 20, name, height, style }: IconFontProps) {
  return (
    <svg
      style={{
        ...style,
        fill: 'currentcolor',
        overflow: 'hidden',
        verticalAlign: '-0.15em'
      }}
      className={className}
      aria-hidden="true"
      width={(width || size) + 'px'}
      height={(height || size) + 'px'}>
      <use xlinkHref={`#icon-${name}`}></use>
    </svg>
  );
}
