// SVG imports as React components
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

// Docusaurus compat module declarations
declare module '@docusaurus/Link' {
  const Link: any;
  export default Link;
}

declare module '@theme/Tabs' {
  const Tabs: any;
  export default Tabs;
}

declare module '@theme/TabItem' {
  const TabItem: any;
  export default TabItem;
}

declare module '@docusaurus/Translate' {
  const Translate: any;
  export default Translate;
  export function translate(opts: { message: string; id: string }): string;
}

declare module '@docusaurus/useDocusaurusContext' {
  const useDocusaurusContext: any;
  export default useDocusaurusContext;
}

declare module '@docusaurus/theme-common' {
  export function useColorMode(): { colorMode: 'light' | 'dark' };
}

declare module '@theme/ThemedImage' {
  const ThemedImage: any;
  export default ThemedImage;
}

declare module '@theme/Layout' {
  const Layout: any;
  export default Layout;
}

// CSS modules
declare module '*.module.css' {
  const classes: Record<string, string>;
  export default classes;
}

// Media files
declare module '*.mp3' {
  const src: string;
  export default src;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

// raw-loader module declarations for sandpack code imports
declare module '!!raw-loader!*' {
  const content: string;
  export default content;
}

declare module '*?raw' {
  const content: string;
  export default content;
}
