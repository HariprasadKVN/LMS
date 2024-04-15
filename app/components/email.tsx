import clsx from "clsx";
import Input from "./input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {

}

const Email: React.FC<InputProps> = ({ className, ...rest }: InputProps) => {
    const specific = {
        ...rest, autoComplete: 'off', type: "email",
        name: "email",
        id: "email"
    }

    return <Input
        {...specific}
        placeholder="id@domain.com"
        className={clsx(className, "appearance-none dark:bg-inherit border border-slate-400/50 rounded-md px-2 py-1")} />

}

export default Email;