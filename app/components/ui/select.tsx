import clsx from 'clsx';
import Label from './label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[]
    label?: string
}

const Select: React.FC<SelectProps> = ({ label, options, className, ...rest }: SelectProps) => {
    const { name } = { ...rest }
    const display = label ? label : name;

    return <>
        <Label caption={display}></Label>
        <select
            autoComplete='off'
            {...rest}
            className={clsx("dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1 content-center", className)} >
            {options.map((item, index) => <option key={index}>{item}</option>)}
        </select>
    </>
}

export default Select