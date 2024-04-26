import clsx from 'clsx';
import UCLabel from './label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[]
    label?: string
}

const UCSelect: React.FC<SelectProps> = ({ label, options, className, ...rest }: SelectProps) => {
    const { name } = { ...rest }
    const display = label ? label : name;

    return <>
        <UCLabel caption={display}></UCLabel>
        <select
            autoComplete='off'
            {...rest}
            appearance-none="none"
            className={clsx("dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-0.5 content-center", className)} >
            {options.map((item, index) => <option key={index}>{item}</option>)}
        </select>
    </>
}

export default UCSelect