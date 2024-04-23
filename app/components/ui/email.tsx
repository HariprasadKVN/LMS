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
        className={clsx(className, "appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1")} />

}

export default UCEmail;