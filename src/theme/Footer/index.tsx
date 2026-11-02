import Link from '@docusaurus/Link';
import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import { useThemeConfig, type ThemeConfig } from '@docusaurus/theme-common';
import clsx from 'clsx';
import { translate } from '@docusaurus/Translate';
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
    note?: string;
  };
};

type ThemeConfigWithExtras = ThemeConfig & {
  footerExtras?: SiteFooterExtras;
};

export default function Footer() {
  const { footer, footerExtras } = useThemeConfig() as ThemeConfigWithExtras;

  if (!footer) {
    return null;
  }

  const { copyright } = footer;
  const { brand } = footerExtras ?? {};
  const { withBaseUrl } = useBaseUrlUtils();
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
              <img
                src="/img/logo.svg"
                alt="Alova"
                className="w-7 h-7 rounded-lg"
              />
              <span className="text-xl font-extrabold tracking-tight text-white">
                Alova
              </span>
            </div>

            {brand?.note ? (
              <div className="flex items-center gap-2 text-zinc-400 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan" />
                <span>
                  {translate({
                    id: 'theme.footer.brand.note',
                    message: brand.note
                  })}
                </span>
              </div>
            ) : null}
          </div>

          {columns.map((column, columnIndex) => (
            <div key={column.title ?? columnIndex}>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 block mb-5 font-semibold">
                {translate({
                  id: `theme.footer.links.col${columnIndex}.title`,
                  message: column.title ?? ''
                })}
              </span>
              <div className="flex flex-col gap-3 text-xs text-zinc-500">
                {column.items.map((item, itemIndex) => (
                  <Link
                    key={item.label ?? item.href ?? itemIndex}
                    className="hover:text-white transition-colors"
                    {...(item.to ? { to: withBaseUrl(item.to) } : { href: item.href })}>
                    {translate({
                      id: `theme.footer.links.col${columnIndex}.item${itemIndex}.label`,
                      message: item.label ?? ''
                    })}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-600 text-xs font-mono">
          {copyright ? (
            <div
              dangerouslySetInnerHTML={{
                __html: translate({ id: 'theme.footer.copyright', message: copyright })
              }}
            />
          ) : (
            <div />
          )}
        </div>
      </div>
    </footer>
  );
}
