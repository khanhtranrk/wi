import styles from './Spine.module.scss';
import { SpineItem, ISpineItem } from './SpineItem';

// Props

export interface SpineProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
    headItems?: ISpineItem[];
    middleItems?: ISpineItem[];
    footItems?: ISpineItem[];
}

// Components

export function Spine({
  className,
  headItems,
  middleItems,
  footItems,
  ...props
}: Readonly<SpineProps>) {
  className = className || '';
  headItems = headItems || [];
  middleItems = middleItems || [];
  footItems = footItems || [];

  return (
    <div className={`${styles['spine']} ${className}`} {...props}>
      <div className={styles['spine-head']}>
        {headItems.map((item) => <SpineItem data={item} />)}
      </div>
      <div className={styles['spine-middle']}>
        {middleItems.map((item) => <SpineItem data={item} />)}
      </div>
      <div className={styles['spine-foot']}>
        {footItems.map((item) => <SpineItem data={item} />)}
      </div>
    </div>
  );
}
