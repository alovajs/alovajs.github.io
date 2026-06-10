'use client';

import { Tabs as FumadocsTabs, Tab as FumadocsTab } from 'fumadocs-ui/components/tabs';
import { Children, isValidElement, type ReactNode } from 'react';

interface TabItemProps {
  value: string;
  label: string;
  default?: boolean;
  children: ReactNode;
  [key: string]: any;
}

function TabItem({ value, label, children, ...props }: TabItemProps) {
  return (
    <FumadocsTab
      value={label}
      {...props}>
      {children}
    </FumadocsTab>
  );
}

interface TabsProps {
  children: ReactNode;
  className?: string;
  groupId?: string;
  [key: string]: any;
}

function Tabs({ children, className, groupId, ...props }: TabsProps) {
  const items: string[] = [];
  const processedChildren = Children.map(children, (child) => {
    if (isValidElement<TabItemProps>(child)) {
      const label = child.props.label || child.props.value;
      if (label && !items.includes(label)) {
        items.push(label);
      }
      return child;
    }
    return child;
  });

  return (
    <FumadocsTabs
      items={items}
      className={className}
      {...props}>
      {processedChildren}
    </FumadocsTabs>
  );
}

export { Tabs, TabItem };
