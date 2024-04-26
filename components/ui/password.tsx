import clsx from 'clsx';
import UCInput from './input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

const Password: React.FC<InputProps> = ({className, ...rest}:InputProps) => {
    const specific = {...rest,
         type:"password",         
         id:"password",
         name:"password"}

    return <UCInput 
        {...specific}         
        className={clsx("appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1",className)}/>
}

export default Password