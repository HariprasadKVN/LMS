import UCInput from "./input";
import UCLabel from "./label";

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
      <UCLabel caption={caption ? caption : name}></UCLabel>
      <UCInput        
        {...rest}
        type="checkbox"        
      ></UCInput>
    </>
  );
};

export default UCCheckbox;