import clsx from "clsx";
import UCLabel from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string
}

const UCInput: React.FC<InputProps> = ({ label, className, ...rest }: InputProps) => {
    let { type, name, id } = { ...rest }
    const display = label ? label : name;
    const margin = type === "checkbox" ? "m-0" : "m-1";

    return <div className={margin}>
        {type != "checkbox" && <UCLabel htmlFor= {id} caption={display}></UCLabel>}
        <input autoComplete="off"
            {...rest}
            className={clsx("dark:bg-inherit border border-slate-400/50 rounded-md px-2 outline-none",
                {
                    "appearance-none": type === "text",
                }, className)} />
    </div>
}

export default UCInput;