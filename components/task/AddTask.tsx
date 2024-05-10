'use client'
import React, { useState } from "react";
import UCSelect from "../ui/select";
import { useFormState } from "react-dom";
import UCDate from "../ui/date";
import {addTask} from "@/lib/taskAction";
import UCInput from "../ui/input";

// interface Props {
//   handleSubmit?: (data: any) => void;
// }

//const AddTask: React.FC<Props> = ({ handleSubmit }) => {
  const AddTask: React.FC = () => {
  const [taskData, setTaskData] = useState({
    taskId: "",
    taskDesc: "",
    startDate: "",
    endDate: "",
    estimate: "",
    createdBy: "Hari",
    assignedTo:"",
    status: "assigned",
  });
  const [errorMessage, dispatchf] = useFormState(addTask,undefined);

  const handleChange = (e: any) => {
    const formData = { ...taskData, [e.target.name]: e.target.value };
    setTaskData(formData);
  };
  return (
    <>
      <form  action={dispatchf}>
        <div className="grid grid-cols-12 gap-1">
        <div className="grow">
            <UCInput
              label="Task Id"
              type="text"
              className="w-full"
              placeholder="Task id"
              name="taskId"
              value={taskData.taskId}
              onChange={handleChange}
            ></UCInput>
          </div>
          <div className="grow">
            <UCInput
              label="Description"
              type="text"
              className="w-full"
              placeholder="Description"
              name="taskDesc"
              value={taskData.taskDesc}
              onChange={handleChange}
            ></UCInput>
          </div>
          <div className=" col-span-2">
            <UCDate
              label="Start Date"
              id="startDate"
              name="startDate"
               value={taskData.startDate}
               onChange={handleChange}
              >
            </UCDate>
            <p className="text-xs text-red-600">{errorMessage?.startDate}</p>
          </div>
          <div className=" col-span-2">
            <UCDate
              label="End Date"
              id ="endDate"
              name="endDate"
               value={taskData.endDate}
               onChange={handleChange}
              >
            </UCDate>
            <p className="text-xs text-red-600">{errorMessage?.endDate}</p>
          </div>
          <div className="col-span-2">
          <UCInput
            label="Estimate"
            className="w-full"
            name="estimate"
            value={taskData.estimate}
            onChange={handleChange}
          ></UCInput>
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
                "Rushikesh Thakre",
                "Suhaib Kazmi",
              ]}
              label="Assigned To"
              name="assignedTo"
              value={taskData.assignedTo}
              onChange={handleChange}
            ></UCSelect>
          </div>

          <div className="col-span-1 content-around">
            <button
              className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
              type="submit"
              // onClick={() => handleSubmit(taskData)}
            >
              Add Task
            </button>
          </div>
        </div>
      
      </form>
    </>
  );
};

export default AddTask;
