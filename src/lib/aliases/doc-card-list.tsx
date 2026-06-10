import type { ReactNode } from 'react';

/**
 * Simplified DocCardList - renders children or empty div
 * Docusaurus component for auto-generated doc card lists.
 * In fumadocs, we render children directly or show nothing.
 */
export default function DocCardList({ children }: { children?: ReactNode }) {
  if (children) {
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>;
  }
  return null;
}
