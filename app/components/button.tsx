import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }: ButtonProps) => {
    return <button
        {...rest}
        className={clsx("dark:bg-blue-500 px-2 py-1 rounded-md border dark:border-blue-500 dark:hover:bg-blue-900", className)} >
        {children}
    </button>
}

export default Button