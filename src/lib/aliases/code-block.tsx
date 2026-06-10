import type { ReactNode } from 'react';

/**
 * Simplified CodeBlock - renders content in a pre/code block
 * Docusaurus @theme/CodeBlock compat for fumadocs
 */
export default function CodeBlock({ children, className }: { children?: ReactNode; className?: string }) {
  const lang = className?.replace(/^language-/, '') || '';

  return (
    <pre className={`${lang ? `language-${lang}` : ''}`}>
      <code>{children}</code>
    </pre>
  );
}
