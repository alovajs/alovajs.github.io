import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import Arrow from '@site/static/img/arrow.svg';
import clsx from 'clsx';
import { ReactNode } from 'react';
import CodeBlock from '../CodeBlock';

export function ArrowTextLink(props: { to: string; children: ReactNode; keepText?: boolean }) {
  return (
    <Link
      to={props.to ?? ''}
      className="flex items-center cursor-pointer text-primary-500 dark:text-white hover:text-primary-900 dark:hover:text-primary-500">
      <span
        className={clsx(
          'text-nowrap text-sm md:text-base',
          props.keepText ? '' : 'hidden min-[480px]:block lg:hidden xl:block'
        )}>
        {props.children}
      </span>
      <Arrow className="ml-2 w-[12px] h-[12px]" />
    </Link>
  );
}

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
  const tagClasses = {
    client: 'bg-green-400/30 dark:bg-green-700/30 text-green-500 text-xs',
    server: 'bg-orange-400/30 text-orange-500 text-xs'
  };
  return (
    <div className={`ctw-card flex flex-col rounded-2xl md:p-8 p-4 ${props.className ?? ''}`}>
      <div className="flex flex-wrap items-center text-sm gap-y-[10px]">
        <div className="flex-1 flex">
          <span className="flex items-center px-3 font-bold bg-primary-100/20 border dark:bg-white/5 border-primary-100 dark:border-primary-900 rounded-full text-nowrap text-xs md:text-sm">
            {props.title}
          </span>
          {props.type ? (
            <span
              className={clsx(
                'ml-2 px-2 py-1 rounded-md',
                tagClasses[props.type?.toLowerCase()]
              )}>
              {props.type}
            </span>
          ) : null}
        </div>
        {props.showLearnMore ? (
          <ArrowTextLink to={props.to}>
            <Translate id="theme.featureBlock.learnMore">Learn more</Translate>
          </ArrowTextLink>
        ) : null}
      </div>
      {props.description ? <p className="mt-5">{props.description}</p> : null}
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
