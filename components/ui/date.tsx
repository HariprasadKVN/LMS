import clsx from 'clsx';
import UCLabel from './label';
import UCInput from './input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const UCDate: React.FC<InputProps> = ({ label, className, ...rest }: InputProps) => {
    const { name } = { ...rest };
    const display = label ? label : name;

    return <>
        <UCInput
            label={display}
            autoComplete='off'
            {...rest}
            type="date"
            className={clsx(className)} />
            
    </>
}

export default UCDate