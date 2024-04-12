import clsx from "clsx";

interface DropdownProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: string[];
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  className,
  ...rest
}: DropdownProps) => {
  return (
    <select
      {...rest}
      className={clsx(
        "rounded-md border border-blue-500 bg-blue-100 px-2 py-1 hover:bg-blue-200 focus:border-blue-500 focus:outline-none",
        className,
      )}
    >
      {children.map((option, index) => (
        <option
          key={index}
          className={clsx(
            "rounded-md border border-blue-500 bg-blue-100 shadow-md",
          )}
          value={option}
        >
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
