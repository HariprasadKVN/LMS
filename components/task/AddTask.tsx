'use client'
import React, { useState } from "react";
import UCSelect from "../ui/select";
import { useFormState } from "react-dom";
import UCDate from "../ui/date";
import addTask from "@/lib/taskAction";

interface Props {
  handleSubmit?: (data: any) => void;
}

const AddTask: React.FC<Props> = ({ handleSubmit }) => {
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
          <div className="col-span-1">
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="task-id"
            >
              Task Id
            </label>
            <input
              className="block w-full appearance-none rounded border bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:bg-white focus:outline-none"
              id="task-id"
              type="text"
              placeholder="Please enter task id"
              onChange={handleChange}
              name="taskId"
              value={taskData.taskId}
            />
          </div>
          <div className="col-span-3">
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="taskDesc"
            >
              Description
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="taskDesc"
              type="text"
              placeholder="Please enter task description"
              value={taskData.taskDesc}
              name="taskDesc"
              onChange={handleChange}
            />
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
            <p className="text-xs text-red-600">{errorMessage?.startDate?.toLocaleDateString()}</p>
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
            <p className="text-xs text-red-600">{errorMessage?.endDate?.toLocaleDateString()}</p>
          </div>
          <div className="col-span-2">
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="estimate"
            >
              Estimate
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="estimate"
              type="text"
              value={taskData.estimate}
              onChange={handleChange}
              name="estimate"
            />
          </div>
          <div className="col-span-2">
            <UCSelect
              options={[
                "Hari",
                "Gajanan",
                "Suhaib",
                "Jishna",
                "Madhu",
                "Guddi",
                "Neha",
                "Bhuvaneshari",
                "Rushi",
              ]}
              label="Assigned To"
              id="assignedTo"
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
