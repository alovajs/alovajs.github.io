import Translate from '@docusaurus/Translate';
import Arrow from '@site/static/img/arrow.svg';
import { ReactNode } from 'react';
import CodeBlock from '../CodeBlock';

export interface FeatureBlockProps {
  type?: string;
  title: string;
  description?: string;
  snippet?: string;
  className?: string;
  children?: ReactNode;
  showLearnMore?: boolean;
  to?: string;
}

export default function FeatureBlock(props: FeatureBlockProps) {
  const Link = (
    <a
      href={props.to ?? ''}
      target="_blank"
      className="flex items-center cursor-pointer">
      <span className="text-nowrap hidden min-[480px]:block lg:hidden xl:block">
        <Translate id="theme.featureBlock.learnMore">Learn More</Translate>
      </span>
      <span className="inline-block ml-2 dark:text-white cursor-pointer w-[16px] h-[16px]">
        <Arrow />
      </span>
    </a>
  );
  return (
    <div className={`ctw-card flex flex-col rounded-2xl px-8 py-8 ${props.className ?? ''}`}>
      <div className="flex flex-wrap items-center text-sm gap-y-[10px]">
        <div className="flex-1 flex">
          <span className="px-3 py-1 font-semibold bg-slate-200/10 rounded-full text-nowrap">
            {props.title}
          </span>
          {props.type ? (
            <span className="ml-3 bg-green-400/30 dark:bg-green-700/30 text-green-600 px-3 py-1 rounded-md">
              {props.type}
            </span>
          ) : null}
        </div>
        {props.showLearnMore ? <div className="">{Link}</div> : null}
      </div>
      {props.description ? <p className="mt-5">{props.description}</p> : null}
      {/* <div>code...</div> */}
      {props.snippet ? (
        <CodeBlock
          fontSize={14}
          code={props.snippet}
          className="mt-8"
        />
      ) : null}
      {props.children}
    </div>
  );
}
