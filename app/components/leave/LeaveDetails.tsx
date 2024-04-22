import ApplyLeave from "./ApplyLeave";
import LeaveList from "./LeaveList";

const LeaveDetails: React.FC = ({

}) => {
    return (
        <div className="border border-blue-950/60 rounded-lg m-1">
            <div className="bg-gradient-to-b from-blue-950
                to-blue-500 rounded-t-lg px-4 py-2 text-2xl font-bold text-slate-300/90">
                Leave
            </div>
            <ApplyLeave></ApplyLeave>
            <div className="m-1">
                <LeaveList></LeaveList>
            </div>
        </div>
    )
};

export default LeaveDetails;