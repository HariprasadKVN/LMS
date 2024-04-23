import clsx from 'clsx';
import Label from './label';
import Input from './input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const UCDate: React.FC<InputProps> = ({ label, className, ...rest }: InputProps) => {
    const { name } = { ...rest };
    const display = label ? label : name;

    return <>
        <Label caption={display}></Label>        
        <Input
            autoComplete='off'
            {...rest}
            type="date"
            className={clsx("appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 pt-1 content-center", className)} />
    </>
}

export default UCDate