import UCInput from "./input";
import UCLabel from "./label";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const UCCheckbox: React.FC<InputProps> = ({
  label,
  className,
  ...rest
}: InputProps) => {
  
  return (
    <>
      <UCInput
        {...rest}
        type="checkbox"
      /><label>{label}</label>
    </>
  );
};

export default UCCheckbox;