import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    caption?:string
}

const Checkbox: React.FC<InputProps> = ({caption, className, ...rest }: InputProps) => {
    const {name} = {...rest};
    return <>
        <label
            className="block 
                text-xs font-semibold uppercase 
                tracking-wide text-gray-700/80
                pl-1"
            htmlFor={name}>
            {caption?caption:name}
        </label>
        <input
            autoComplete='off'
            {...rest}
            type="checkbox"
            className={clsx("dark:bg-inherit border border-slate-400/50 rounded-md px-4 py-4 my-2 content-center", className)} >
        </input>
    </>
}

export default Checkbox