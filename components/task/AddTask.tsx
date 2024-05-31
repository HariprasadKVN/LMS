"use client";
import { useFormState } from "react-dom";
import { addTask, addTask1 } from "@/lib/taskAction";
import UCInput from "../ui/input";
import UCButton from "../ui/button";
import UCSelect from "../ui/select";
import UCDate from "../ui/date";

interface props {
  userId: string;
  post: (data: any) => void
}

const AddTask: React.FC<props> = ({ userId, post }) => {
  const [errorMessage, dispatch] = useFormState(addTask, undefined);

  const add = (payload: FormData) => {
    dispatch(payload);
    post(errorMessage)
  }

  return (
    <>
      <form action={add}>
        <div className="flex flex-col content-center justify-center space-y-0 pb-1 pt-0 text-sm">
          <div className="m-0 flex w-full flex-row space-x-0">
            <input hidden name="createdBy" value={userId} readOnly></input>
            <div className="w-1/3">
              <UCSelect
                options={["Select", "Decom", "Essette"]}
                className="w-full"
                label="Project"
                name="project"
              ></UCSelect>
            </div>
            <div className="w-1/6">
              <UCInput
                label="Sprint"
                maxLength={4}
                type="text"
                className="w-full"
                placeholder="Sprint"
                name="sprint"
              ></UCInput>
            </div>
            <div className="w-1/5">
              <UCInput
                label="Task Id"
                type="text"
                maxLength={8}
                className="w-full"
                placeholder="Task id"
                name="taskId"
              ></UCInput>
            </div>
            <div className="w-1/4">
              <UCSelect
                options={[
                  "Select",
                  "Analysis",
                  "Implementation",
                  "Testing",
                  "Review",
                  "Deployment",
                  "Documentation",
                  "Self-learning",
                  "Org Activity",
                ]}
                label="Task Type"
                name="taskType"
                className="w-full"
              ></UCSelect>
            </div>
            <div className="col-span-2 w-1/4">
              <UCSelect
                options={[
                  "Select",
                  "Bhuvaneshwari Murkhandi",
                  "Gajanan Tuppad",
                  "Guddi Kumari",
                  "HariPrasadVN",
                  "Jishna George",
                  "Madhu Gurukar",
                  "Neha Prakash",
                  "Rushikesh Thakare",
                  "Suhaib Kazmi",
                ]}
                label="Assigned To"
                className="w-full"
                name="assignedTo"
              ></UCSelect>
            </div>
          </div>
          <div className="mb-4 flex flex-row space-x-0">
            <div className=" col-span-2 w-1/2">
              <UCInput
                label="Description"
                type="text"
                className="w-full"
                placeholder="Description"
                name="taskDesc"
                required
              ></UCInput>
            </div>
            <div className="col-span-2 w-1/5">
              <UCInput
                label="Estimate(Hrs)"
                type="number"
                min="0"
                className="w-full"
                placeholder="Estimate"
                name="estimate"
              ></UCInput>
            </div>
            <div className=" col-span-2 w-1/4">
              <UCDate
                label="Start Date"
                className="w-full"
                id="startDate"
                name="startDate"
              ></UCDate>
              <p className="text-xs text-red-600">{errorMessage?.startDate?.toDateString()}</p>
            </div>
            <div className="flex w-1/4">
              <div className="w-3/4">
                <UCDate
                  label="End Date"
                  className="w-full"
                  id="endDate"
                  name="endDate"
                ></UCDate>
                <p className="text-xs text-red-600">{errorMessage?.endDate?.toDateString()}</p>
              </div>
              <div className="mr-2 w-1/4 content-end">
                <UCButton type="submit" className="w-full">
                  +
                </UCButton>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
