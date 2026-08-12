import Translate, { translate } from '@docusaurus/Translate';
import Intro from '../../pages/_indexComponent/Intro';
import sponsors from '@site/src/data/sponsors.json';
import watchthisLogo from '@site/static/img/sponsors/watchthis-dev-500.png';

// Local logos are bundled by webpack so they always resolve (static-serving safe).
const localLogos: Record<string, string> = {
  'watchthis-dev-500.png': watchthisLogo
};

function resolveLogo(logo: string): string {
  if (/^https?:\/\//.test(logo)) {
    return logo;
  }
  const fileName = logo.split('/').pop() ?? logo;
  return localLogos[fileName] ?? logo;
}

export default function SponsorStrip() {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  return (
    <section className="container mx-auto relative overflow-hidden py-16 mt-10 md:mt-32">
      {/* soft glow backdrop (B) */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-primary-500/25 to-primary-900/10 blur-[120px]" />

      <div className="relative z-10 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center text-center">
          <Intro
            section={translate({
              message: '# Sponsors',
              id: 'homepage.sponsors.sectionTitle'
            })}
            title={translate({
              message: 'Special thanks to our sponsors',
              id: 'homepage.sponsors.title'
            })}
            className="items-center text-center"
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {sponsors.map(sponsor => (
            <a
              key={sponsor.url}
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              title={sponsor.name}
              className="group flex items-center justify-center rounded-2xl bg-primary-100/20 px-8 py-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-white/5">
              <img
                src={resolveLogo(sponsor.logo)}
                alt={sponsor.name}
                className="h-[54px] w-auto object-contain transition group-hover:opacity-80"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
