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
        <div className="flex flex-col content-center justify-center space-y-0 pb-1 pt-0 text-sm">
          <div className="m-0 flex w-full flex-row space-x-0">
            <div className="w-1/3">
              <UCSelect
                options={["Select", "Decom", "Essette"]}
                className="w-full"
                label="Project"
                name="project"
                value={taskData.project}
                onChange={handleChange}
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
                value={taskData.sprint}
                onChange={handleChange}
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
                value={taskData.taskId}
                onChange={handleChange}
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
                value={taskData.taskType}
                onChange={handleChange}
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
                value={taskData.assignedTo}
                onChange={handleChange}
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
                value={taskData.taskDesc}
                onChange={handleChange}
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
                value={taskData.estimate}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div className=" col-span-2 w-1/4">
              <UCDate
                label="Start Date"
                className="w-full"
                id="startDate"
                name="startDate"
                value={taskData.startDate}
                onChange={handleChange}
              ></UCDate>
              <p className="text-xs text-red-600">{errorMessage?.startDate}</p>
            </div>
            <div className="flex w-1/4">
              <div className="w-3/4">
                <UCDate
                  label="End Date"
                  className="w-full"
                  id="endDate"
                  name="endDate"
                  value={taskData.endDate}
                  onChange={handleChange}
                ></UCDate>
                <p className="text-xs text-red-600">{errorMessage?.endDate}</p>
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
