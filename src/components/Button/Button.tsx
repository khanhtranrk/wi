import styles from './Button.module.scss';

/**
 * ButtonProps interface represents the props for the Button component.
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
}

/**
 * Renders a button component.
 *
 * @component
 * @param {Readonly<ButtonProps>} props - The button props.
 * @returns {JSX.Element} The rendered button component.
 */
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
