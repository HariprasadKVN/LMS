import clsx from "clsx";
import Label from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  caption?: string;
}

const Checkbox: React.FC<InputProps> = ({
  caption,
  className,
  ...rest
}: InputProps) => {
  const { name } = { ...rest };
  return (
    <>
      <Label caption={caption ? caption : name}></Label>
      <input
        autoComplete="off"
        {...rest}
        type="checkbox"
        className={clsx(
          "my-2 content-center rounded-md border border-slate-400/50 px-4 py-4 dark:bg-inherit",
          className,
        )}
      ></input>
    </>
  );
};

export default Checkbox;
