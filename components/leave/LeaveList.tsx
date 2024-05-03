import { useEffect, useState } from "react";
import { boolean, string } from "zod";
import UCCard from "../ui/card";
import UCTable from "../ui/table/table";
import UCTableHeader from "../ui/table/thead";
import UCTableRow from "../ui/table/tr";
import UCTableHeaderCell from "../ui/table/th";
import UCTableBody from "../ui/table/tbody";
import UCTableCell from "../ui/table/td";
import { deleteLeave, getEmployee } from "@/lib/employeeAction";
import UCButton from "../ui/button";

const LeaveList: React.FC = ({}) => {
  const [leaveData, setLeaveData] = useState<{
    empId: string;
    leaves: Record<string, string>;
  }>({
    empId: "",
    leaves: {},
  });

  const mockTotalLeaves: Record<string, number> = {
    Casual: 10,
    Optional: 5,
    Special: 2,
  };

  const getEmployeeData = async () => {
    const x = await getEmployee();
    setLeaveData(x);
  };
  const parseLeaveDetails = (details: string) => {
    const [endDate, type, noOfDays, duration, reason] = details.split("|");
    return { endDate, type, noOfDays, duration, reason };
  };

  const groupedLeaves: Record<string, [string, string, string][]> = {};
  const getEmployeeLeavesByType = () => {
    Object.entries(leaveData.leaves).forEach(([startDate, details]) => {
      console.log(leaveData.leaves);
      console.log(startDate, details);
      const { endDate, type, noOfDays } = parseLeaveDetails(details);
      if (!groupedLeaves[type]) {
        groupedLeaves[type] = [];
      }
      groupedLeaves[type].push([startDate, endDate, noOfDays]);
    });
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  getEmployeeLeavesByType();

  return (
    <>
      {Object.entries(groupedLeaves).map(([type, leaves], index) => (
        <UCCard
          key={index}
          title={type}
          subTitle={`Alloted-${10} Utilized-${0} Balance-${10}`}
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
              {leaves.map(([startDate, endDate], index) => {
                const { noOfDays, duration, reason } = parseLeaveDetails(
                  leaveData.leaves[startDate],
                );
                return (
                  <UCTableRow key={index}>
                    <UCTableCell>{startDate}</UCTableCell>
                    <UCTableCell>{endDate}</UCTableCell>
                    <UCTableCell>{noOfDays}</UCTableCell>
                    <UCTableCell>{duration}</UCTableCell>
                    <UCTableCell>{reason}</UCTableCell>
                    <UCTableCell>
                      <UCButton
                        title="Delete Leave"
                        onClick={() => deleteLeave(leaveData.empId, startDate)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-6 w-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                          />
                        </svg>
                      </UCButton>
                    </UCTableCell>
                  </UCTableRow>
                );
              })}
            </UCTableBody>
          </UCTable>
        </UCCard>
      ))}
    </>
  );
};

export default LeaveList;
