import clsx from 'clsx';

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: React.ReactNode;
}
// className={clsx("border dark:border-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:active:bg-teal-500 border-blue-950 bg-blue-950/90 text-white hover:bg-blue-800 hover:text-white/80 active:bg-blue-700/50 active:text-inherit m-1 px-2 py-1 rounded-md", className)}
const UCTableRow: React.FC<TableRowProps> = ({ children, className, ...rest }: TableRowProps) => {
    return <tr
        {...rest}
         >
        {children}
    </tr>
}

export default UCTableRow