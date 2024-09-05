export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function Button({
  children,
  className,
  ...props
}: Readonly<ButtonProps>) {
  return (
    <button className={`flex flex-col h-10 p-2 rounded-md justify-center items-center bg-red-400 hover:bg-red-300 ${className}`} {...props}>
        {children}
    </button>
  );
}
