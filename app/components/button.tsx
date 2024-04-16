import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className, ...rest }: ButtonProps) => {
    return <button
        {...rest}
        className={clsx("border dark:border-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:active:bg-teal-500 border-blue-950/90 bg-blue-700/50 hover:bg-blue-700 hover:text-white/50 active:bg-blue-700/50 active:text-inherit m-1 px-2 py-1 rounded-md", className)} >
        {children}
    </button>
}

export default Button