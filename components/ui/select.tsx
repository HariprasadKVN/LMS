import clsx from 'clsx';
import UCLabel from './label';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    options: string[]
    label?: string
}

const UCSelect: React.FC<SelectProps> = ({ label, options, className, ...rest }: SelectProps) => {
    const { name, id } = { ...rest }
    const display = label ? label : name;

    return <div className="m-1">
        <UCLabel htmlFor= {id} caption={display}></UCLabel>
        <select
            autoComplete='off'
            {...rest}
            appearance-none="none"
            className={clsx("outline-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-0.5 content-center", className)} >
            {options.map(
                (item, index) =>
                    <option key={index} 
                        className="text-sm font-thin text-white bg-blue-950/90 dark:bg-teal-600">{item}</option>)}
        </select>
    </div>
}

export default UCSelect