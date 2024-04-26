import UCInput from './input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const UCDate: React.FC<InputProps> = ({ label, className, ...rest }: InputProps) => {

    return <>
        <UCInput
            label={label}
            autoComplete='off'
            {...rest}
            type="date"
            className={className} />
    </>
}

export default UCDate