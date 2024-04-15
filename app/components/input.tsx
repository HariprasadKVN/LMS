import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Input: React.FC<InputProps> = ({ className, ...rest }: InputProps) => {
    return <input
        autoComplete='off'        
        {...rest}        
        className={clsx("appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1", className)} />
}

export default Input