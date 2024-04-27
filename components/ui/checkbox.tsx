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
    <div className="flex flex-row m-1 content-center">
      <label className="text-thin text-sm mr-1 italic">{label}</label>
      <UCInput
        {...rest}
        type="checkbox"     
      />
    </div>
  );
};

export default UCCheckbox;