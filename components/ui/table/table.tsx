import clsx from 'clsx';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}
// className={clsx("table-auto divide-y divide-slate-500 rounded dark:bg-slate-50 w-full", className)}
const UCTable: React.FC<TableProps> = ({ children, className, ...rest }: TableProps) => {
    return <table
        {...rest}
        className={clsx("w-full divide-y dark:divide-teal-600 dark:bg-slate-50", className)}>
        {children}
    </table>
}

export default UCTable