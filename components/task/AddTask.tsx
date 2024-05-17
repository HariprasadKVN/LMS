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
        <div className="flex flex-wrap  space-y-0 text-sm pl-3 pb-4">
          <div className="m-0 flex flex-row space-x-1">
            <div>
              <UCSelect
                options={["Select", "Decom", "Essette"]}
                label="Project"
                name="project"
                value={taskData.project}
                onChange={handleChange}
                className="w-80"
              ></UCSelect>
            </div>
            <div>
              <UCInput
                label="Sprint"
                type="text"
                className="w-40"
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
                className="w-96"
                placeholder="Task id"
                name="taskId"
                value={taskData.taskId}
                onChange={handleChange}
              ></UCInput>
            </div>
          </div>
          <div  className="mb-4 flex flex-row space-x-1">
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
                className="w-80"
              ></UCSelect>
            </div>
            <div className="col-span-2">
              <UCInput
                label="Estimate(Hrs)"
                type="number"
                min="0"
                className="w-40"
                placeholder="Estimate"
                name="estimate"
                value={taskData.estimate}
                onChange={handleChange}
              ></UCInput>
            </div>
            <div className=" col-span-2">
              <UCInput
                label="Description"
                /* label={
                  <>
                    <span style={{ color: "red" }}>*</span> Description
                  </>
                } */
                type="text"
                className="w-96"
                placeholder="Description"
                name="taskDesc"
                required
                value={taskData.taskDesc}
                onChange={handleChange}
              ></UCInput>
            </div>           
          </div>
          <div className="mb-4 flex flex-row space-x-1">
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
                className="w-80"
                name="assignedTo"
                value={taskData.assignedTo}
                onChange={handleChange}
              ></UCSelect>
            </div>
            <div className=" col-span-2">
              <UCDate
                label="Start Date"
                className="w-40"
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
                className="w-44"
                id="endDate"
                name="endDate"
                value={taskData.endDate}
                onChange={handleChange}
              ></UCDate>
              <p className="text-xs text-red-600">{errorMessage?.endDate}</p>
            </div>
            <div className="content-end">
              <UCButton type="submit" className="w-48">Add Task</UCButton>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTask;
