const LeaveInfo: React.FC = () => {
    return (<div className="text-sm p-1 flex flex-col gap-1 border rounded-md border-slate-700">
        <div className="rounded-md px-2 dark:bg-teal-300/50 bg-green-500/50">Fixed - 4</div>
        <div className="rounded-md px-2 dark:bg-teal-300/70 bg-green-700/50">Optional - 5</div>
        <div className="rounded-md px-2 dark:bg-sky-500/50 bg-sky-500/50">Leave - 7</div>
        <div className="rounded-md px-2 dark:bg-violet-500/50 bg-violet-500/50">Special - 5</div>
        <div className="rounded-md px-2 dark:bg-indigo-500/50 bg-indigo-500/50">Optional Applied - 9</div>
    </div>);
};

export default LeaveInfo;