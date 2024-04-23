import Label from "./label";
import Input from "./input";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  caption?: string;
}

const UCCheckbox: React.FC<InputProps> = ({
  caption,
  className,
  ...rest
}: InputProps) => {
  const { name } = { ...rest };
  return (
    <>
      <Label caption={caption ? caption : name}></Label>
      <Input        
        {...rest}
        type="checkbox"        
      ></Input>
    </>
  );
};

export default UCCheckbox;
