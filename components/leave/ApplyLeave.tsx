import { applyLeave } from "@/lib/employeeAction";
import { useState } from "react";
import UCDate from "../ui/date";
import UCCheckbox from "../ui/checkbox";
import UCSelect from "../ui/select";
import UCInput from "../ui/input";
import UCCard from "../ui/card";
import UCButton from "../ui/button";

const ApplyLeave: React.FC = ({}) => {
  const [type, setType] = useState("Casual");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [reason, setReason] = useState("");
  const [duration, setDuration] = useState<"half" | "full">("full");

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
            ></UCInput>
          </div>
          <div className="content-end">
            <UCButton
              type="button"
              onClick={() => {
                applyLeave("test", [
                  {
                    type: type,
                    start: startDate,
                    end: endDate,
                    duration: duration,
                    reason: reason,
                  },
                ]);
              }}
            >
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
              <UCButton
                type="button"
                onClick={() => {
                  applyLeave("test", [
                    {
                      type: type,
                      start: startDate,
                      end: endDate,
                      duration: duration,
                      reason: reason,
                    },
                  ]);
                }}
              >
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
