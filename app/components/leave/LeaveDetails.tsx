import ApplyLeave from "./ApplyLeave";
import LeaveList from "./LeaveList";

const LeaveDetails:React.FC =({

})=>{
    return(
    <>
    <p className="font-bold p-2 border-b text-left bg-blue-700 text-white">
        Leave LeaveDetails
    </p>
    <ApplyLeave></ApplyLeave>
    <LeaveList></LeaveList>
    </>
    )
};

export default LeaveDetails;