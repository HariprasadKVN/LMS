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
                capitalize tracking-wide
                text-slate-950/90
                dark:text-slate-200/80"
      htmlFor={htmlFor}
    >
      {caption}
    </label>
  );
};

export default UCLabel;
