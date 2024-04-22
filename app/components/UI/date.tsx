import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

const Date: React.FC<InputProps> = ({ className, ...rest }: InputProps) => {
    const {name} = {...rest}

    return <>
        <label
            className="block 
                text-xs font-semibold uppercase 
                tracking-wide text-gray-700/80
                pl-1"
            htmlFor={name}> 
            {name}           
        </label>
        <input
            autoComplete='off'
            {...rest}
            type="date"
            className={clsx("appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 pt-1 content-center", className)} />
    </>
}

export default Date