'use client'

import React from 'react';
import styles from './SpineItem.module.scss';
import { useRouter } from 'next/navigation'

// interface

export interface ISpineItem {
    name: string;
    displayName: string;
    link: string;
    icon: React.ReactNode;
}

// Props

export interface SpineItemProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    data: ISpineItem;
}

// Component

export function SpineItem({
  data,
  className,
  ...props
}: Readonly<SpineItemProps>) {
  className = className || '';
  const router = useRouter();
  return (
    <div key={data.name} className={`${styles['spine-item']} ${className}`} onClick={() => router.push(data.link)} {...props}>
      <div className='spine-icon'>
        {data.icon}
      </div>
    </div>
  );
}
