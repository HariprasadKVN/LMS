import clsx from 'clsx';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
    children: React.ReactNode;
}
// className={clsx("table-auto divide-y divide-slate-500 rounded dark:bg-slate-50 w-full", className)}
const UCTable: React.FC<TableProps> = ({ children, className, ...rest }: TableProps) => {
    return <table
        {...rest}
        className={clsx("w-full divide-y divide-blue-950 dark:divide-teal-600 bg-slate-200 dark:bg-slate-50 border", className)}>
        {children}
    </table>
}

export default UCTable