import clsx from 'clsx';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[]
}

const Select: React.FC<SelectProps> = ({ options, className, ...rest }: SelectProps) => {
    const { name } = { ...rest }

    return <>
        <label
            className="block 
                text-xs font-semibold uppercase 
                tracking-wide text-gray-700/80
                pl-1"
            htmlFor={name}>
            {name}
        </label>
        <select
            autoComplete='off'
            {...rest}
            className={clsx("dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1 content-center", className)} >
                {options.map((item, index)=><option key={index}>{item}</option>)}
        </select>
    </>
}

export default Select