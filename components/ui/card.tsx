import { ChevronDoubleDownIcon, ChevronDoubleUpIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export interface DivProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: React.ReactNode;
  title: string;
  subTitle?: string;
}

const UCCard: React.FC<DivProps> = ({
  children,
  title,
  subTitle,
  className,
  ...rest
}: DivProps) => {

  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <div className="flex flex-col m-1">
      <div className="flex flex-row rounded-t bg-blue-950/90 px-2 py-1 text-white dark:bg-teal-600">
        <div className="grow flex flex-col">
          <div className="">{title}</div>
          <div className="text-sm italic">{subTitle}</div>
        </div>

        <div className="content-center m-2 rounded 
          hover:dark:bg-teal-300 hover:dark:text-slate-600 active:dark:bg-teal-800 active:dark:text-white
          hover:bg-blue-300 hover:text-slate-700 active:bg-blue-950/90 active:text-white">
          {expanded && <ChevronDoubleUpIcon className="h-4 w-4" onClick={()=>setExpanded(false)}></ChevronDoubleUpIcon>}
          {!expanded && <ChevronDoubleDownIcon className="h-4 w-4" onClick={()=>setExpanded(true)}></ChevronDoubleDownIcon>}
        </div>
      </div>
      {expanded && <div className="p-2 border border-blue-950/90 dark:border-teal-600/90" >{children}</div>}
    </div>
  );
};

export default UCCard;
