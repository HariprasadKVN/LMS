import clsx from "clsx";
import UCInput from "./input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const UCEmail: React.FC<InputProps> = ({ className, ...rest }: InputProps) => {
    const specific = {
        ...rest, autoComplete: 'off', type: "email",
        name: "email",
        id: "email"
    }

    return <UCInput
        {...specific}
        placeholder="id@domain.com"
        className={className} />

}

export default UCEmail;