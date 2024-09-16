import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button({
  children,
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button
      className={`${styles['button']} ${className}`}
      {...props}
    >
        {children}
    </button>
  );
}
