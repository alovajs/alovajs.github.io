'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import type { AnchorHTMLAttributes, ReactNode } from 'react';

/**
 * Docusaurus compatibility layer:
 * - Translate/translate: render English text as-is (can be extended with i18n)
 * - Link: converts `to` prop to Next.js Link `href`
 * - useColorMode: compat hook for @docusaurus/theme-common
 */

export function translate({ message }: { message: string; id?: string }): string {
  return message;
}

export function Translate({ children, id }: { children: ReactNode; id?: string }): ReactNode {
  return <>{children}</>;
}

export function DLink({
  to,
  ...props
}: { to: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>) {
  let href = to;
  if (!/^\//.test(to) && !/^https?:\/\//.test(to) && !/^mailto:/.test(to)) {
    href = `/${to}`;
  }

  const isExternal = /^https?:\/\//.test(href);
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      />
    );
  }
  return (
    <Link
      href={href}
      {...props}
    />
  );
}

export function useColorMode() {
  const { resolvedTheme } = useTheme();
  return { colorMode: resolvedTheme === 'dark' ? 'dark' : 'light' };
}

/** Docusaurus-compatible Tabs / TabItem from fumadocs */
import { Tabs, Tab } from 'fumadocs-ui/components/tabs';
export { Tabs, Tab };
export const TabItem = Tab;
