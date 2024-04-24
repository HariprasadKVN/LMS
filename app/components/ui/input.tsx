import clsx from "clsx";
import UCLabel from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const UCInput: React.FC<InputProps> = ({ label, className, ...rest }: InputProps) => {
    let { type, name } = { ...rest }
    const display = label ? label : name;

    return <>
        {type!="checkbox" && <UCLabel caption={display}></UCLabel>}
        <input autoComplete="off"
            {...rest}
            className={clsx({
                "appearance-none": type === "text",
                "py-1": type != "date",
                "pt-1": type === "date"
            }, "dark:bg-inherit border border-slate-400/50 rounded-md px-2", className)} />
    </>
}

export default UCInput;