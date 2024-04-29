import clsx from 'clsx';

interface THeadProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}
// className={clsx("rounded dark:bg-teal-500/60", className)}
const UCTableHeader: React.FC<THeadProps> = ({ children, className, ...rest }: THeadProps) => {
    return <thead
        {...rest}
        className={clsx("bg-blue-900/60 dark:bg-teal-500/60 text-center text-xs font-medium titlecase tracking-wider text-gray-900",className)}>
        {children}
    </thead>
}

export default UCTableHeader