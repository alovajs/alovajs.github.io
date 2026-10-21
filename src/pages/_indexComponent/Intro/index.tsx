import Translate from '@docusaurus/Translate';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface IntroProps {
  section: string;
  title: string;
  description?: string;
  /** 章节编号，例如 "01"，渲染为 mono 大写的 eyebrow 前缀 */
  index?: string;
  sectionTransId?: string;
  titleTransId?: string;
  descTransId?: string;
  children?: ReactNode;
  className?: string;
  sectionClassName?: string;
  hideSection?: boolean;
}

export default function Intro(props: IntroProps) {
  return (
    <div className={clsx('flex flex-col', props.className)}>
      {props.hideSection ? null : (
        <span className={clsx('rsm-eyebrow', props.sectionClassName)}>
          {props.index ? <em className="rsm-eyebrow-index">{props.index}</em> : null}
          <Translate id={props.sectionTransId}>{props.section}</Translate>
        </span>
      )}
      <span className="mt-4 dark:text-white text-2xl md:text-4xl font-bold leading-[1.18] tracking-tight">
        <Translate id={props.titleTransId}>{props.title}</Translate>
      </span>
      {props.description ? (
        <span className="mt-3.5 leading-relaxed text-slate-400">
          <Translate id={props.descTransId}>{props.description}</Translate>
        </span>
      ) : null}
      {props.children}
    </div>
  );
}
