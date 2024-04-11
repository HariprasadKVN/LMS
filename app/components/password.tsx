import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

const Password: React.FC<InputProps> = ({className, ...rest}:InputProps) => {
    return <input 
        {...rest} 
        type="password"
        id="password"
        name="password"
        className={clsx("appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1",className)}/>
}

export default Password