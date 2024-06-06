import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
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
  const [expanded, setExpanded] = useState<boolean>(false);

  return (
    <div className="m-1 flex flex-col">
      <div className="flex flex-row rounded-t bg-blue-950/90  px-2 py-1 text-white dark:bg-teal-100 dark:text-black">
        <div className="flex grow flex-col">
          <div className="">{title}</div>
          {subTitle ? <div className="text-sm italic">{subTitle}</div> : <></>}
        </div>

        <div
          className="m-2 content-center rounded 
          hover:bg-blue-300 hover:text-slate-700 active:bg-blue-950/90 active:text-white
          hover:dark:bg-teal-300 hover:dark:text-slate-600 active:dark:bg-teal-800 active:dark:text-white"
        >
          {expanded && (
            <ChevronDoubleUpIcon
              className="h-4 w-4"
              onClick={() => setExpanded(false)}
            ></ChevronDoubleUpIcon>
          )}
          {!expanded && (
            <ChevronDoubleDownIcon
              className="h-4 w-4"
              onClick={() => setExpanded(true)}
            ></ChevronDoubleDownIcon>
          )}
        </div>
      </div>
      {expanded && (
        <div className="dark:bg-gary-800 border border-blue-950/90 p-2 dark:border-teal-100">
          {children}
        </div>
      )}
    </div>
  );
};

export default UCCard;
