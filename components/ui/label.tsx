interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  caption?: string;
}

const UCLabel: React.FC<LabelProps> = ({
  caption,
  className,
  ...rest
}: LabelProps) => {
  const { htmlFor } = { ...rest };

  return (
    <label
      className="block 
                pl-1 text-xs font-semibold 
                dark:font-medium
                capitalize tracking-wide
                text-slate-950/90
                dark:text-blue-100"
      htmlFor={htmlFor}
    >
      {caption}
    </label>
  );
};

export default UCLabel;
