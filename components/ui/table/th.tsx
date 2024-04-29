import clsx from 'clsx';

interface TableHeaderCellProps extends React.HTMLAttributes<HTMLTableCellElement> {
    children: React.ReactNode;
}
// className={clsx("px-4 py-2 text-left text-xs font-medium titlecase tracking-wider text-gray-900", className)}
const UCTableHeaderCell: React.FC<TableHeaderCellProps> = ({ children, className, ...rest }: TableHeaderCellProps) => {
    return <th
        {...rest}
        className={clsx("px-4 py-2 font-medium", className)}>
        {children}
    </th>
}

export default UCTableHeaderCell