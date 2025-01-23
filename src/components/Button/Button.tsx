'use client';

import { classNames } from '@/utils/components';
import Link, { LinkProps } from 'next/link';
import {
  ElementType,
  ComponentPropsWithoutRef,
  PropsWithChildren
} from 'react';

import styles from './button.module.scss';

export interface ButtonPropsBase extends PropsWithChildren {
  className?: string;
  disabled?: boolean;
  variant?: 'default' | 'outline';
  type?: 'button' | 'reset' | 'submit';
}

type ButtonProps<T extends ElementType> = ButtonPropsBase & {
  as?: T;
  href?: T extends typeof Link ? string : never;
} & (T extends typeof Link ? LinkProps : ComponentPropsWithoutRef<T>);

export default function Button<T extends ElementType = 'button'>({
  as,
  children,
  ...props
}: ButtonProps<T>) {
  const Component = as || 'button';

  const newClassNames = classNames([
    styles.default,
    props?.className,
    props?.variant && styles[props.variant],
    props?.disabled && styles.disabled
  ]);

  return (
    <Component {...props} className={newClassNames}>
      {children}
    </Component>
  );
}
