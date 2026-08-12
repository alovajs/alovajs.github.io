/// <reference types="@docusaurus/module-type-aliases" />

// Catch-all for theme components that are not explicitly declared above
// (e.g. @theme/ThemedImage). Resolves them as ambient modules for the editor.
declare module '@theme/*';

// Ensure Layout's wrapperClassName prop (and the rest of its props) is recognized
// by the editor's TS server, which may resolve @theme/Layout to a type declaration
// that omits wrapperClassName.
declare module '@theme/Layout' {
  import type {ReactNode} from 'react';
  export interface Props {
    children?: ReactNode;
    noFooter?: boolean;
    wrapperClassName?: string;
    title?: string;
    description?: string;
  }
}

// Raster images are bundled by webpack and imported as URL strings.
declare module '*.png' {
  const src: string;
  export default src;
}
declare module '*.jpg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const src: string;
  export default src;
}
declare module '*.gif' {
  const src: string;
  export default src;
}
declare module '*.webp' {
  const src: string;
  export default src;
}
