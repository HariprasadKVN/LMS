"use client";
import React, { useState } from "react";
import UCSelect from "../ui/select";
import { useFormState } from "react-dom";
import UCDate from "../ui/date";
import { addTask } from "@/lib/taskAction";
import UCInput from "../ui/input";
import UCButton from "../ui/button";

// interface Props {
//   handleSubmit?: (data: any) => void;
// }

//const AddTask: React.FC<Props> = ({ handleSubmit }) => {
const AddTask: React.FC = () => {
  const [taskData, setTaskData] = useState({
    taskId: "",
    project: "",
    sprint: "",
    taskDesc: "",
    taskType: "",
    startDate: "",
    endDate: "",
    estimate: "",
    createdBy: "Hari",
    assignedTo: "",
    status: "assigned",
  });
  const [errorMessage, dispatchf] = useFormState(addTask, undefined);

  const handleChange = (e: any) => {
    const formData = { ...taskData, [e.target.name]: e.target.value };
    setTaskData(formData);
  };
  return (
    <>
      <form action={dispatchf}>
        <div className="flex flex-wrap space-y-0 pb-1 pt-0 text-sm">
          <div className="m-0 flex flex-row space-x-0">
            <div>
              <UCSelect
                options={["Select", "Decom", "Essette"]}
                label="Project"
                name="project"
                value={taskData.project}
                onChange={handleChange}
                className="w-44"
              ></UCSelect>
            </div>
            <div>
              <UCInput
                label="Sprint"
                maxLength={4}
                type="text"
                className="w-46"
                placeholder="Sprint"
                name="sprint"
                value={taskData.sprint}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div>
              <UCInput
                label="Task Id"
                type="text"
                maxLength={8}
                className="w-32"
                placeholder="Task id"
                name="taskId"
                value={taskData.taskId}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div>
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
                value={taskData.taskType}
                onChange={handleChange}
                className="w-38"
              ></UCSelect>
            </div>
            <div className="col-span-2">
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
                className="w-60"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
              ></UCSelect>
            </div>
          </div>
          <div className="mb-4 flex flex-row space-x-0">
            <div className=" col-span-2">
              <UCInput
                label="Description"
                type="text"
                className="w-96"
                placeholder="Description"
                name="taskDesc"
                required
                value={taskData.taskDesc}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div className="col-span-2">
              <UCInput
                label="Estimate(Hrs)"
                type="number"
                min="0"
                className="w-32"
                placeholder="Estimate"
                name="estimate"
                value={taskData.estimate}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div className=" col-span-2">
              <UCDate
                label="Start Date"
                className="w-38"
                id="startDate"
                name="startDate"
                value={taskData.startDate}
                onChange={handleChange}
              ></UCDate>
              <p className="text-xs text-red-600">{errorMessage?.startDate}</p>
            </div>
            <div className=" col-span-2">
              <UCDate
                label="End Date"
                className="w-48"
                id="endDate"
                name="endDate"
                value={taskData.endDate}
                onChange={handleChange}
              ></UCDate>
              <p className="text-xs text-red-600">{errorMessage?.endDate}</p>
            </div>
            <div className="content-end">
              <UCButton type="submit" className="w-10">
                +
              </UCButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
