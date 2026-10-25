import Link from '@docusaurus/Link';
import { useThemeConfig, type ThemeConfig } from '@docusaurus/theme-common';
import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import styles from './styles.module.css';

/**
 * 统一页脚：结构 / 类名对齐 code.html 的 footer，数据全部来自 docusaurus.config.ts。
 *
 * - `themeConfig.footer`：多列 links（title + items）、copyright
 * - `themeConfig.footerExtras`：品牌简介 / 提示语、底栏法务链接
 *   （footer 内部只接受 Docusaurus 内置字段，扩展内容放在 themeConfig 顶层）
 *
 * 相对 code.html 的兩处必要适配：
 * 1. 根节点挂 `use-tailwind`：页脚在全站复用，需要 tw preflight（border-box / 边距重置），
 *    同时边框显式写 `border-solid`（默认 border-style 为 none）。
 * 2. 站内链接统一走 `useBaseUrl`：否则构建期会按当前页面路径解析成相对路径。
 */

export type FooterLinkItem = {
  label?: string;
  to?: string;
  href?: string;
  html?: string;
};

export type FooterColumn = {
  title?: string | null;
  items: FooterLinkItem[];
};

export type SiteFooterExtras = {
  brand?: {
    description?: string;
    note?: string;
  };
  legalLinks?: FooterLinkItem[];
};

type ThemeConfigWithExtras = ThemeConfig & {
  footerExtras?: SiteFooterExtras;
};

/** 单个页脚链接（对齐 code.html：继承父级文字色，hover 变白） */
function FooterLink({ item, className }: { item: FooterLinkItem; className: string }) {
  const toUrl = useBaseUrl(item.to);
  const hrefUrl = useBaseUrl(item.href, { forcePrependBaseUrl: true });

  if (item.html) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: item.html }}
      />
    );
  }

  if (item.to) {
    return (
      <Link
        className={className}
        to={toUrl}>
        {item.label}
      </Link>
    );
  }

  const external = Boolean(item.href && /^https?:/i.test(item.href));

  return (
    <a
      className={className}
      href={hrefUrl}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}>
      {item.label}
    </a>
  );
}

export default function Footer() {
  const { footer, footerExtras } = useThemeConfig() as ThemeConfigWithExtras;

  if (!footer) {
    return null;
  }

  const { copyright } = footer;
  const { brand, legalLinks } = footerExtras ?? {};
  const columns = ((footer.links ?? []) as FooterColumn[]).filter(column =>
    Array.isArray(column.items)
  );

  return (
    <footer
      className={clsx(
        styles.footer,
        'use-tailwind bg-black text-white pt-24 pb-16 border-t border-solid border-zinc-900'
      )}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-20 border-b border-solid border-zinc-900">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-bold">
                <span className="material-symbols-outlined text-[16px]">deployed_code</span>
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                alova<span className="text-brand-cyan">.js</span>
              </span>
            </div>

            {brand?.description ? (
              <p className="text-zinc-500 text-xs leading-relaxed max-w-sm mb-6 font-normal">
                {brand.description}
              </p>
            ) : null}

            {brand?.note ? (
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                <span>{brand.note}</span>
              </div>
            ) : null}
          </div>

          {columns.map((column, columnIndex) => (
            <div key={column.title ?? columnIndex}>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-5 font-semibold">
                {column.title}
              </span>
              <div className="flex flex-col gap-3 text-xs text-zinc-500">
                {column.items.map((item, itemIndex) => (
                  <FooterLink
                    key={item.label ?? item.href ?? itemIndex}
                    item={item}
                    className="hover:text-white transition-colors"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-xs font-mono">
          {copyright ? <div dangerouslySetInnerHTML={{ __html: copyright }} /> : <div />}

          {legalLinks?.length ? (
            <div className="flex items-center gap-6">
              {legalLinks.map((item, index) => (
                <FooterLink
                  key={item.label ?? index}
                  item={item}
                  className="hover:text-zinc-400 transition-colors"
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  );
}
