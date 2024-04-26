import clsx from 'clsx';
import UCInput from './input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

const UCPassword: React.FC<InputProps> = ({className, ...rest}:InputProps) => {

    return <UCInput 
        {...rest}
        type="password"
        name="password"
        id="password"
        className={className}/>
}

export default UCPassword