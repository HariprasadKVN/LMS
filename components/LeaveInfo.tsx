'use client'
import { useContext } from "react";
import EventContext from "@/store/eventContext";

const LeaveInfo: React.FC = () => {
    const { events } = useContext(EventContext);

    return (<div className="text-sm p-1 flex flex-col gap-1 border rounded-md border-slate-700">
        <div className="rounded-md px-2 dark:bg-teal-300/50 bg-green-500/50">
            {`Fixed - ${events.filter((item) => item.type === "fixed").length}`}</div>
        <div className="rounded-md px-2 dark:bg-teal-300/70 bg-green-700/50">{`Optional - ${events.filter((item) => item.type === "optional").length}`}</div>
        <div className="rounded-md px-2 dark:bg-sky-500/50 bg-sky-500/50">{`Leave - ${events.filter((item) => item.type === "leave").length}`}</div>
        <div className="rounded-md px-2 dark:bg-violet-500/50 bg-violet-500/50">{`Special - ${events.filter((item) => item.type === "special").length}`}</div>
        <div className="rounded-md px-2 dark:bg-indigo-500/50 bg-indigo-500/50">{`Optional Applied - ${events.filter((item) => item.type === "optionalApplied").length}`}</div>
    </div>);
};

export default LeaveInfo;