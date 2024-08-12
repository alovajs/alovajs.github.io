import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface IntroProps {
  section: string;
  title: string;
  description?: string;
  sectionTransId?: string;
  titleTransId?: string;
  descTransId?: string;
  children?: ReactNode;
  className?: string;
  sectionClassName?: string;
}

export default function Intro(props: IntroProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      <span className={clsx('text-primary-500 text-md font-bold', props.sectionClassName)}>
        <Translate id={props.sectionTransId}>{props.section}</Translate>
      </span>
      <span className="mt-3 dark:text-white text-2xl md:text-3xl font-bold">
        <Translate id={props.titleTransId}>{props.title}</Translate>
      </span>
      {props.description ? (
        <span className="mt-2 text-slate-400">
          <Translate id={props.descTransId}>{props.description}</Translate>
        </span>
      ) : null}
      {props.children}
    </div>
  );
}
