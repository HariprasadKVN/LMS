import { applyLeave } from "@/lib/employeeAction";
import { useState } from "react";
import UCDate from "../ui/date";
import UCCheckbox from "../ui/checkbox";
import UCSelect from "../ui/select";
import UCInput from "../ui/input";
import UCCard from "../ui/card";
import UCButton from "../ui/button";

const ApplyLeave: React.FC = ({ }) => {
  const [type, setType] = useState("Casual");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<"half" | "full">("full");

  const addLeave = async () => {
    try {
      const res = await fetch("/api/hari/leaves", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emp_ID: "INEMP1234",
          leaves: [
            {
              type: type,
              total: 10,
              leaveDetails: [
                {
                  start_date: startDate,
                  end_date: endDate,
                  reason: reason,
                  duration: duration,
                },
              ],
            },
          ],
        }),
      });

      if (!res.ok) {
        throw new Error(res.status.toString());
      }
      alert("Added");
    } catch (error) {
      console.log(error);
    }
  };
  return (

    <form>
      <div className="flex flex-row  content-center justify-center">
        <div className="bg-blue-200">
          <UCSelect
            options={['Casual', 'Optional', 'Special']}
            label="Leave Type"
            onChange={(e) => setType(e.target.value)}>
          </UCSelect></div>
        <div className="bg-blue-300 h-36">
          <UCDate
            name="Start Date"
            onChange={(e) => setStartDate(new Date(e.target.value))}>
          </UCDate>
        </div>
        <div className="bg-blue-400">
          <UCDate
            name="End Date"
            className="outline-none"
            onChange={(e) => setEndDate(new Date(e.target.value))}>
          </UCDate>
        </div>
        <div className="bg-blue-500">
          <UCCheckbox
            value="Half"
            name="Halfday"
            label="Apply for Half a Day"
            onChange={() => setDuration("half")}
          />
        </div>
        <div className="grow bg-blue-600">
          <UCInput label="Reason" className="w-full" onChange={(e) => setReason(e.target.value)}></UCInput>
        </div>
        <div className="bg-blue-700">
          <UCButton
            type="button"
            onClick={() => {
              applyLeave("Hari", [
                {
                  type: type,
                  start: startDate,
                  end: endDate,
                  duration: duration,
                  description: reason,
                },
              ]);
            }}
          >
            Apply Leave
          </UCButton>
        </div>
      </div>







    </form>
  );
};

export default ApplyLeave;