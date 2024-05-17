import { getEmployeeLeavesByType } from "@/lib/employeeAction";
import ApplyLeave from "./ApplyLeave";
import LeaveList from "./LeaveList";
import { useEffect, useState } from "react";
import { auth } from "@/lib/actions";

export interface Leave {
  startDate: string;
  endDate: string;
  noOfDays: string;
  duration: string;
  reason: string;
}

export interface LeaveAllottedUtilized {
  allotted: number;
  utilized: number;
  balance: number;
}
const Leave: React.FC = ({}) => {
  const [leaveData, setLeaveData] = useState<Record<string, Leave[]>>({});
  const [empId, setEmpId] = useState("");

  const [utilized, setUtilized] = useState<
    Record<string, LeaveAllottedUtilized>
  >({});

  const currentYear = new Date().getFullYear().toString();

  const fetchLeaveData = async () => {
    const { leavesData, utilizedAndAllotted } = await getEmployeeLeavesByType(
      empId,
      currentYear,
    );
    setLeaveData(leavesData);
    setUtilized(utilizedAndAllotted);
  };

  useEffect(() => {
    auth().then((data) => {
      const userId = data?.user?.id;
      if (userId) {
        setEmpId(userId);
        fetchLeaveData();
      }
    });
  }, [empId]);

  return (
    <>
      {empId == "" ? (
        <p>Loading</p>
      ) : (
        <>
          <ApplyLeave
            empId={empId}
            leaveData={leaveData}
            utilizedLeavesCount={utilized}
            fetchLeaveData={fetchLeaveData}
          ></ApplyLeave>
          <LeaveList
            leaveData={leaveData}
            utilizedLeavesCount={utilized}
            empId={empId}
            fetchLeaveData={fetchLeaveData}
            year={currentYear}
          ></LeaveList>{" "}
        </>
      )}
    </>
  );
};

export default Leave;
