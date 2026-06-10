import { Translate } from '@/lib/docusaurus-compat';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import IconFont from '../IconFont';

interface TitleProps {
  text: string;
  textTransId?: string;
  desc?: string;
  descTransId?: string;
  children?: ReactNode;
  className?: string;
  align?: 'center';
}
export default function PageModule({
  text,
  desc,
  textTransId,
  descTransId,
  children,
  className,
  align
}: TitleProps) {
  return (
    <div className={className}>
      <div className={clsx('row', 'container')}>
        <div
          className={clsx(
            'col col--12 margin-bottom--md flex-col',
            align === 'center' ? 'align-center' : ''
          )}>
          <div className={clsx('margin-bottom--md')}>
            <IconFont
              name="a-logoline"
              size={28}></IconFont>
          </div>
          <h2 style={{ textAlign: align }}>
            <Translate id={textTransId}>{text}</Translate>
          </h2>
        </div>
        {desc ? (
          <p
            className={clsx('col col--12')}
            style={{ textAlign: align }}>
            <Translate id={descTransId}>{desc}</Translate>
          </p>
        ) : null}
        <div className={clsx('col col--12')}>{children}</div>
      </div>
    </div>
  );
}
