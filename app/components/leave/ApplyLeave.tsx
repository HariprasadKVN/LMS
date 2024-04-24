import { applyLeave } from "@/app/lib/employeeAction";
import { useState } from "react";
import UCDate from "../ui/date";
import UCCheckbox from "../ui/checkbox";
import UCSelect from "../ui/select";
import UCInput from "../ui/input";

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
    <div className="p-2">
      <form>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-row items-end">
            <div className="pr-1">
              <UCSelect
                options={['Casual', 'Optional', 'Special']}
                label="Leave Type"
                onChange={(e) => setType(e.target.value)}>
              </UCSelect>
            </div>

            <div className="pr-1">
              <UCDate
                name="Start Date"
                onChange={(e) => setStartDate(new Date(e.target.value))}>
              </UCDate>
            </div>
            <div className="pr-1">
              <UCDate
                name="End Date"
                onChange={(e) => setEndDate(new Date(e.target.value))}>
              </UCDate>
            </div>
            <div className="items-center justify-center">
              <UCCheckbox
                value="Half"
                name="Halfday"
                label="Apply for Half a Day"
                onChange={() => setDuration("half")}
              />
              
            </div>
          </div>

          <div className="flex flex-row">
            <div>
              <UCInput label="Reason" onChange={(e) => setReason(e.target.value)}></UCInput>
            </div>

            <div className="col-span-1 content-around">
              <button
                className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
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
              </button>
            </div>
          </div>

        </div>
      </form>
    </div>

  );
};

export default ApplyLeave;