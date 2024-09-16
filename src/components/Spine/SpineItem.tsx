import styles from './SpineItem.module.scss';

// interface

export interface ISpineItem {
    name: string;
    displayName: string;
    link: string;
    icon: string;
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
  return (
    <div className={`${styles['spine-item']} ${className}`} key={data.name} {...props}>
      {/* <a href={data.link} className='spine-link'>
        <img src={data.icon} className='spine-icon' />
        <span className='spine-text'>{data.displayName}</span>
      </a> */}
    </div>
  );
}
