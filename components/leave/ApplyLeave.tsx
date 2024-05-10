import { applyLeave, getDiff } from "@/lib/employeeAction";
import { useState } from "react";
import UCDate from "../ui/date";
import UCCheckbox from "../ui/checkbox";
import UCSelect from "../ui/select";
import UCInput from "../ui/input";
import UCButton from "../ui/button";
import toast from "react-hot-toast";
import { Leave, LeaveAllottedUtilized } from "./Leave";

interface Props {
  leaveData: Record<string, Leave[]>;
  empId: string;
  utilizedLeavesCount: Record<string, LeaveAllottedUtilized>;
  fetchLeaveData: () => void;
}

const ApplyLeave: React.FC<Props> = ({
  leaveData,
  empId,
  utilizedLeavesCount,
  fetchLeaveData,
}) => {
  const [type, setType] = useState("Casual");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<"half" | "full">("full");

  const convertStringToDate = (dateString: string) => {
    const year = Number(dateString.slice(0, 4));
    const month = Number(dateString.slice(4, 6)) - 1;
    const day = Number(dateString.slice(6));

    return new Date(year, month, day);
  };

  const validateLeave = async () => {
    if (startDate > endDate) {
      toast.error("Start date should not be greater than end date", {
        duration: 5000,
      });
      return false;
    }

    for (const type in leaveData) {
      for (const leave of leaveData[type]) {
        const leaveStartDate = convertStringToDate(leave.startDate);
        const leaveEndDate = convertStringToDate(leave.endDate);

        if (
          (startDate >= leaveStartDate && startDate <= leaveEndDate) ||
          (endDate >= leaveStartDate && endDate <= leaveEndDate) ||
          (leaveStartDate >= startDate && leaveEndDate <= endDate)
        ) {
          toast.error(
            `Leave overlaps with existing leave for ${type} from ${leave.startDate} to ${leave.endDate}`,
            { duration: 5000 },
          );
          return false;
        }

        let diff = await getDiff(startDate, endDate);
        console.log("Diff", diff);

        if (diff > utilizedLeavesCount[type].balance) {
          toast.error(
            `You only have ${utilizedLeavesCount[type].balance}balance leaves for ${type} but applying for ${diff} days`,
            {
              duration: 5000,
            },
          );
          return false;
        }
      }
    }
    return true;
  };

  const validateandapplyLeave = async () => {
    if (!(await validateLeave())) return;

    const result = await applyLeave(empId, {
      type: type,
      start: startDate,
      end: endDate,
      duration: duration,
      reason: reason,
    });

    if (result.success) {
      toast.success("Leave Applied", { duration: 5000 });
      fetchLeaveData();
    } else {
      toast.error("Something went wrong", { duration: 5000 });
    }
  };

  return (
    <form>
      <div className="flex flex-col md:hidden">
        <div className="flex flex-row">
          <div>
            <UCSelect
              options={["Casual", "Optional", "Special"]}
              label="Leave Type"
              onChange={(e) => setType(e.target.value)}
            ></UCSelect>
          </div>
          <div>
            <UCDate
              name="Start Date"
              onChange={(e) => setStartDate(new Date(e.target.value))}
              required
            ></UCDate>
          </div>
          <div>
            <UCDate
              name="End Date"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            ></UCDate>
          </div>
        </div>
        <div>
          <UCCheckbox
            value="Half"
            name="Halfday"
            label="Apply for Half a Day"
            onChange={() => setDuration("half")}
          />
        </div>
        <div className="flex flex-row">
          <div className="grow">
            <UCInput
              label="Reason"
              className="w-full"
              onChange={(e) => setReason(e.target.value)}
              required
            ></UCInput>
          </div>
          <div className="content-end">
            <UCButton type="button" onClick={validateandapplyLeave}>
              Apply Leave
            </UCButton>
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex flex-col">
          <div className="flex flex-row  content-center justify-center">
            <div className="content-end">
              <UCSelect
                options={["Casual", "Optional", "Special"]}
                label="Leave Type"
                onChange={(e) => setType(e.target.value)}
              ></UCSelect>
            </div>
            <div className="content-end">
              <UCDate
                name="Start Date"
                onChange={(e) => setStartDate(new Date(e.target.value))}
              ></UCDate>
            </div>
            <div className="content-end">
              <UCDate
                name="End Date"
                className="outline-none"
                onChange={(e) => setEndDate(new Date(e.target.value))}
              ></UCDate>
            </div>
            <div className="content-end">
              <UCCheckbox
                value="Half"
                name="Halfday"
                label="Apply for Half a Day"
                onChange={() => setDuration("half")}
              />
            </div>
            <div className="grow content-end">
              <UCInput
                label="Reason"
                className="w-full"
                onChange={(e) => setReason(e.target.value)}
              ></UCInput>
            </div>
            <div className="content-end">
              <UCButton type="button" onClick={validateandapplyLeave}>
                Apply Leave
              </UCButton>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ApplyLeave;
