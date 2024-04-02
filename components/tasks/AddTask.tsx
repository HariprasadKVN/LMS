"use client";
import axios from "axios";
import { json } from "node:stream/consumers";
import React, { useState } from "react";
import WorkAllocation from "../dashboard/work-allocation";

function AddTask() {
  const [taskId, setTaskId] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [taskAdded, setTaskAdded] = useState(false);

  const handleSubmit = async (e: any) => {
    setTaskAdded(false);
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:5000/api/users/EMPIN3035/work/allocations",
      {
        taskId: taskId,
        description: description,
        start: startDate,
        end: endDate,
      },
    );
    console.log(response.data);
    setTaskAdded(true);
  };
  return (
    <>
      <div className="m-5">Work Allocation</div>
      <div className="m-5">
        <form className="w-full max-w-lg">
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-first-name"
              >
                Task Id
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:bg-white focus:outline-none"
                id="grid-task-id"
                type="text"
                placeholder="Please enter task id"
                onChange={(e) => setTaskId(e.target.value)}
                value={taskId}
              />
            </div>
          </div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="w-full px-3">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-description"
              >
                Description
              </label>
              <input
                className="mb-3 block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-description"
                type="text"
                placeholder="Please enter task description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="-mx-3 mb-6 flex flex-wrap">
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-start-date"
              >
                Start Date
              </label>
              <input
                className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                id="grid-start-date"
                type="Date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="mb-6 w-full px-3 md:mb-0 md:w-1/2">
              <label
                className="mb-2 block text-xs font-bold uppercase tracking-wide text-gray-700"
                htmlFor="grid-end-date"
              >
                End Date
              </label>
              <div className="relative">
                <input
                  className="block w-full appearance-none rounded border border-gray-200 bg-gray-200 px-4 py-3 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none"
                  id="grid-end-date"
                  type="Date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="-mx-3 mb-2 flex flex-wrap">
            <button
              className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
              type="button"
              onClick={handleSubmit}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
      <div className="m-5">
        <WorkAllocation isNewTaskAdded={taskAdded} />
      </div>
    </>
  );
}

export default AddTask;
