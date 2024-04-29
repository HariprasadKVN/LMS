import clsx from 'clsx';

interface TableCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}
// className={clsx("whitespace-nowrap px-2 py-1 text-sm text-gray-500", className)} 
const UCTableCell: React.FC<TableCellProps> = ({ children, className, ...rest }: TableCellProps) => {
    return <td
        {...rest}
        className={clsx("whitespace-nowrap px-2 py-1",className)}>
        {children}
    </td>
}

export default UCTableCell