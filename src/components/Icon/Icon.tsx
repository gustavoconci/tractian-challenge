'use client';

import { classNames } from '@/utils/components';
import styles from './icon.module.scss';

export interface IconProps extends React.PropsWithChildren {
  id: string;
  size?: number;
  className?: string;
}

export default function Icon({ size = 14, ...props }: IconProps) {
  const newClassNames = classNames([
    styles.default,
    props?.className,
  ]);

  return (
    <svg height={size} width={size} className={newClassNames}>
      <use href={`/sprite.svg?v=4#${props.id}`}></use>
    </svg>
  );
}
