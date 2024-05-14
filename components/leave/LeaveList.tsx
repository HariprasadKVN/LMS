import { useEffect, useState } from "react";
import { deleteLeave } from "@/lib/employeeAction";
import UCCard from "../ui/card";
import UCTable from "../ui/table/table";
import UCTableHeader from "../ui/table/thead";
import UCTableRow from "../ui/table/tr";
import UCTableHeaderCell from "../ui/table/th";
import UCTableBody from "../ui/table/tbody";
import UCTableCell from "../ui/table/td";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Leave, LeaveAllottedUtilized } from "./Leave";

export interface Props {
  leaveData: Record<string, Leave[]>;
  utilizedLeavesCount: Record<string, LeaveAllottedUtilized>;
  empId: string;
  fetchLeaveData: () => void;
}

const LeaveList: React.FC<Props> = ({
  leaveData,
  utilizedLeavesCount,
  empId,
  fetchLeaveData,
}) => {
  const currentYear = new Date().getFullYear().toString();

  useEffect(() => {
    fetchLeaveData();
  }, []);

  const handleDeleteLeave = async (path: string) => {
    await deleteLeave(empId, path);
    fetchLeaveData();
  };

  // return (
  //   <>
  //     {Object.entries(leaveData).map(([type, leaves], index) => (
  //       <UCCard
  //         key={index}
  //         title={type}
  //         subTitle={`Allotted-${utilizedLeavesCount[type].allotted} Utilized-${utilizedLeavesCount[type].utilized || 0} Balance-${utilizedLeavesCount[type].balance}`}
  //       >
  //         <UCTable className="text-center">
  //           <UCTableHeader>
  //             <UCTableRow>
  //               <UCTableHeaderCell>Start Date</UCTableHeaderCell>
  //               <UCTableHeaderCell>End Date</UCTableHeaderCell>
  //               <UCTableHeaderCell>Day</UCTableHeaderCell>
  //               <UCTableHeaderCell>Duration</UCTableHeaderCell>
  //               <UCTableHeaderCell>Reason</UCTableHeaderCell>
  //               <UCTableHeaderCell>Cancel</UCTableHeaderCell>
  //             </UCTableRow>
  //           </UCTableHeader>
  //           <UCTableBody>
  //             {leaves.map((leave, index) => {
  //               return (
  //                 <UCTableRow key={index}>
  //                   <UCTableCell>{leave.startDate}</UCTableCell>
  //                   <UCTableCell>{leave.endDate}</UCTableCell>
  //                   <UCTableCell>{leave.noOfDays}</UCTableCell>
  //                   <UCTableCell>{leave.duration}</UCTableCell>
  //                   <UCTableCell>{leave.reason}</UCTableCell>
  //                   <UCTableCell>
  //                     <XMarkIcon
  //                       title="Delete leave"
  //                       className="h-4 w-4 cursor-pointer hover:text-red-700"
  //                       onClick={() =>
  //                         handleDeleteLeave(
  //                           `leaves.${currentYear}.${type}.${leave.startDate}`,
  //                         )
  //                       }
  //                     />
  //                   </UCTableCell>
  //                 </UCTableRow>
  //               );
  //             })}
  //           </UCTableBody>
  //         </UCTable>
  //       </UCCard>
  //     ))}
  //   </>
  // );

  return (
    <>
      {Object.keys(leaveData).length === 0 ? (
        <p>No Data Found</p>
      ) : (
        <>
          {Object.entries(leaveData).map(([type, leaves], index) => (
            <UCCard
              key={index}
              title={type}
              subTitle={`Allotted-${utilizedLeavesCount[type].allotted} Utilized-${utilizedLeavesCount[type].utilized || 0} Balance-${utilizedLeavesCount[type].balance}`}
            >
              <UCTable className="text-center">
                <UCTableHeader>
                  <UCTableRow>
                    <UCTableHeaderCell>Start Date</UCTableHeaderCell>
                    <UCTableHeaderCell>End Date</UCTableHeaderCell>
                    <UCTableHeaderCell>Day</UCTableHeaderCell>
                    <UCTableHeaderCell>Duration</UCTableHeaderCell>
                    <UCTableHeaderCell>Reason</UCTableHeaderCell>
                    <UCTableHeaderCell>Cancel</UCTableHeaderCell>
                  </UCTableRow>
                </UCTableHeader>
                <UCTableBody>
                  {leaves.map((leave, index) => {
                    return (
                      <UCTableRow key={index}>
                        <UCTableCell>{leave.startDate}</UCTableCell>
                        <UCTableCell>{leave.endDate}</UCTableCell>
                        <UCTableCell>{leave.noOfDays}</UCTableCell>
                        <UCTableCell>{leave.duration}</UCTableCell>
                        <UCTableCell>{leave.reason}</UCTableCell>
                        <UCTableCell>
                          <XMarkIcon
                            title="Delete leave"
                            className="h-4 w-4 cursor-pointer hover:text-red-700"
                            onClick={() =>
                              handleDeleteLeave(
                                `leaves.${currentYear}.${type}.${leave.startDate}`,
                              )
                            }
                          />
                        </UCTableCell>
                      </UCTableRow>
                    );
                  })}
                </UCTableBody>
              </UCTable>
            </UCCard>
          ))}
        </>
      )}
    </>
  );
  
};

export default LeaveList;
