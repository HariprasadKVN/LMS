import clsx from 'clsx';

interface TBodyProps extends React.TableHTMLAttributes<HTMLTableSectionElement> {
    children: React.ReactNode;
}
// className={clsx("divide-y divide-slate-300", className)}
const UCTableBody: React.FC<TBodyProps> = ({ children, className, ...rest }: TBodyProps) => {
    return <tbody
        {...rest}
        className={clsx("divide-y divide-slate-600/50 dark:divide-slate-200/70 text-sm text-gray-500 dark:text-inherit",className)}>
        {children}
    </tbody>
}

export default UCTableBody