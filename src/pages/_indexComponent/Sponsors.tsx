import clsx from 'clsx';
import sponsors from '../../data/sponsors.json';
import { MaterialIcon } from './ui';
import { translate } from '@docusaurus/Translate';

type Sponsor = {
  name: string;
  logo: string;
  url?: string;
  title?: string;
  tier?: string;
};

/**
 * 各档位栅格：gold 两个一行、silver 三个一行、bronze 四个一行。
 * columns 用于把每档补足成整行，避免出现半截栅格。
 */
const tiers = [
  {
    key: 'gold',
    label: 'Gold',
    headerClassName: 'bg-amber-100/70 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    gridClassName: 'grid grid-cols-2 gap-3',
    columns: 2,
    cellClassName: 'h-32',
    logoClassName: 'h-16'
  },
  {
    key: 'silver',
    label: 'Silver',
    headerClassName: 'bg-sunken text-ink-3',
    gridClassName: 'grid grid-cols-2 sm:grid-cols-3 gap-3',
    columns: 3,
    cellClassName: 'h-24',
    logoClassName: 'h-11'
  },
  {
    key: 'bronze',
    label: 'Bronze',
    headerClassName: 'bg-amber-700/10 text-amber-800/80 dark:bg-amber-500/10 dark:text-amber-300/80',
    gridClassName: 'grid grid-cols-2 sm:grid-cols-4 gap-3',
    columns: 4,
    cellClassName: 'h-20',
    logoClassName: 'h-8'
  }
] as const;

/** Hero 底部的赞助商墙：按等级分档的栅格，默认灰阶、悬停还原品牌色 */
export default function Sponsors() {
  const sponsorList = sponsors as Sponsor[];

  return (
    <div className="max-w-6xl mx-auto px-6 mt-28 pt-10 border-t border-hairline">
      <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-ink-4 mb-8">
        {translate({ id: 'homepage.sponsors.title', message: 'Sponsors' })}
      </p>

      <div className="flex flex-col gap-6">
        {tiers.map(tier => {
          const list = sponsorList.filter(item => (item.tier ?? 'bronze') === tier.key);
          // 空档铺满一行空位；不足一行的补足到整行，避免出现半截栅格
          const emptySlots =
            list.length === 0
              ? tier.columns
              : (tier.columns - (list.length % tier.columns)) % tier.columns;

          return (
            <div
              key={tier.key}
              className="flex flex-col gap-2.5">
              <div
                className={clsx(
                  'rounded-lg py-1.5 text-center text-[10px] font-bold uppercase tracking-[0.3em]',
                  tier.headerClassName
                )}>
                {translate({ id: `homepage.sponsors.${tier.key}`, message: tier.label })}
              </div>

              <div className={tier.gridClassName}>
                {list.map(sponsor => {
                  const label = sponsor.title ?? sponsor.name;
                  const logo = (
                    <img
                      className={clsx(
                        // 暗色卡片上反相让深色 logo 变浅，悬停时还原品牌色
                        'max-w-[80%] w-auto object-contain grayscale opacity-60 transition duration-300 dark:invert dark:opacity-70 group-hover:grayscale-0 group-hover:opacity-100 dark:group-hover:invert-0',
                        tier.logoClassName
                      )}
                      src={sponsor.logo}
                      alt={label}
                      loading="lazy"
                    />
                  );
                  const cellClassName = clsx(
                    'group flex items-center justify-center rounded-xl border border-hairline bg-surface px-4 transition-colors hover:border-hairline-strong',
                    tier.cellClassName
                  );

                  return sponsor.url ? (
                    <a
                      key={sponsor.name}
                      className={cellClassName}
                      href={sponsor.url}
                      target="_blank"
                      rel="noreferrer"
                      title={label}>
                      {logo}
                    </a>
                  ) : (
                    <div
                      key={sponsor.name}
                      className={cellClassName}
                      title={label}>
                      {logo}
                    </div>
                  );
                })}

                {Array.from({ length: emptySlots }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className={clsx(
                      'flex items-center justify-center rounded-xl border border-dashed border-hairline bg-sunken px-4 text-[10px] font-bold uppercase tracking-[0.2em] text-ink-4',
                      tier.cellClassName
                    )}>
                    {translate({ id: 'homepage.sponsors.yourLogo', message: 'Your logo here' })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <a
          className="inline-flex items-center gap-2 rounded-full border border-hairline bg-surface px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-ink-2 shadow-sm transition-colors hover:border-brand-blue hover:text-brand-blue"
          href="https://github.com/sponsors/alovajs"
          target="_blank"
          rel="noreferrer">
          <MaterialIcon
            name="favorite"
            className="text-[15px]"
          />
          <span>{translate({ id: 'homepage.sponsors.become', message: 'Become a sponsor' })}</span>
        </a>
      </div>
    </div>
  );
}
