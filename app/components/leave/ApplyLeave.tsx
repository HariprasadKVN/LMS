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
    <>
      <form>
        <div className="grid grid-cols-6  gap-1">
          <div>
            {/* <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="Leave type"
            >
              Leave Type
            </label>
            <select onChange={(e) => setType(e.target.value)}>
              <option value="Casual">Casual</option>
              <option value="Optional">Optional</option>
              <option value="Special">Special</option>
            </select> */}
            <UCSelect
              options={['Casual', 'Optional', 'Special']}
              label="Leave Type"
              onChange={(e) => setType(e.target.value)}>
            </UCSelect>

          </div>

          <div>
            <UCDate
              name="Start Date"
              onChange={(e) => setStartDate(new Date(e.target.value))}>
            </UCDate>
          </div>
          <div>
          <UCDate
              name="End Date"
              onChange={(e) => setEndDate(new Date(e.target.value))}>
            </UCDate>
            {/* <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="End Date"
            >
              End Date
            </label>
            <input
              name="End Date"
              type="date"
              onChange={(e) => setEndDate(new Date(e.target.value))}
            ></input> */}
          </div>
          <div>
            <UCInput label="Reason" onChange={(e) => setReason(e.target.value)}></UCInput>
          </div>

          <div>
            <UCCheckbox
              value="Half"
              name="Halfday"
              caption="Duration"
              onChange={() => setDuration("half")}
            />{" "}
            Half Day
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
      </form>
    </>
  );
};

export default ApplyLeave;