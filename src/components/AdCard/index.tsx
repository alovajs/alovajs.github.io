import clsx from 'clsx';
import React, { FC, ReactNode } from 'react';
import styles from './styles.module.css';

const AdCard: FC<{ img: string; children: ReactNode; className: string; href: string }> = ({
  img,
  children,
  className,
  href
}) => (
  <a
    className={clsx('padding--sm', styles.wrapper, className)}
    href={href}
    target="_blank">
    <img src={img}></img>
    {children}
  </a>
);
export default AdCard;
