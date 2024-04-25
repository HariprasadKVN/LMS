import clsx from "clsx";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";

export interface DivProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  title: string;
}

const UCCard: React.FC<DivProps> = ({
  children,
  title,
  className,
  ...rest
}: DivProps) => {
  // return <div
  //     {...rest}
  //     className={clsx("border dark:border-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:active:bg-teal-500 border-blue-950/90 bg-blue-700/50 hover:bg-blue-700 hover:text-white/50 active:bg-blue-700/50 active:text-inherit m-1 px-2 py-1 rounded-md", className)} >
  //     <div>{title}</div>
  //     {children}
  // </div>

  return (
    <div className="flex flex-col m-1">
      <div className="flex flex-row rounded-t bg-blue-950/90 px-2 py-1 text-white dark:bg-teal-600">
        <div className="grow">{title}</div>
        <div>
          <ChevronDoubleDownIcon className="h-4 w-4"></ChevronDoubleDownIcon>{" "}
        </div>
      </div>
      <div className="p-1 border border-blue-950/90 dark:border-teal-600/90" >{children}</div>
    </div>
  );
};

export default UCCard;
