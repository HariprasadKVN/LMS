import React, { useState } from "react";

interface Props {
  handleSubmit: (data: any) => void;
}

const AddTask: React.FC<Props> = ({ handleSubmit }) => {
  const [taskData, setTaskData] = useState({
    taskId: "",
    description: "",
    startDate: "",
    endDate: "",
    estimate: "",
    assignedTo: "",
    createdBy: "Hari",
    status: "assigned",
  });

  const handleChange = (e: any) => {
    const formData = { ...taskData, [e.target.name]: e.target.value };
    setTaskData(formData);
  };
  return (
    <>
      <form>
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
              htmlFor="grid-description"
            >
              Description
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-description"
              type="text"
              placeholder="Please enter task description"
              value={taskData.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-start-date"
            >
              Start Date
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-start-date"
              type="Date"
              value={taskData.startDate}
              onChange={handleChange}
              name="startDate"
            />
          </div>
          <div className="col-span-2">
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="grid-end-date"
            >
              End Date
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="grid-end-date"
              type="Date"
              value={taskData.endDate}
              onChange={handleChange}
              name="endDate"
            />
          </div>
          <div className="col-span-1">
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
            <label
              className="block text-xs font-bold uppercase tracking-wide text-gray-700"
              htmlFor="assignedTo"
            >
              Assigned To
            </label>
            <input
              className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-2 py-1 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
              id="assignedTo"
              type="text"
              value={taskData.assignedTo}
              onChange={handleChange}
              name="assignedTo"
            />
          </div>
          <div className="col-span-1 content-around">
            <button
              className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
              type="button"
              onClick={() => handleSubmit(taskData)}
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
