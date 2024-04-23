"use client";
import IAllocation from "@/models/allocation";
import { format } from "date-fns";
import {
  CheckIcon,
  XMarkIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import Table from "../Table";

interface Props {
  tasks: allocation[];
  setStatus: (taskId: string, status: string) => void;
}

interface allocation extends IAllocation {
  current?: boolean;
}

const TaskList: React.FC<Props> = ({ tasks, setStatus }) => {
  const [selected, setSelected] = useState(false);
  const columns = [
    { header: "TaskId", key: "task_id"},
    { header: "Description", key: "task_desc"},
    { header: "Assigned to", key: "assigned_to" },
    { header: "Estimate", key: "estimate"},
    { header: "Start by", key: "start_date"},
    { header: "End Before", key: "end_date"},
    { header: "Status", key: "status"},
    { header: "Action", key: "status"},
  ];

  /* const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    // Add more rows as needed
  ]; */

  return (
    <>
     {/*  <Table columns={columns} data={tasks} /> */}
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th>Task</th>
            <th>Assigned to</th>
            <th>Estimate</th>
            <th>Start by</th>
            <th>End Before</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr key={index} className="border-b text-center">
              <td className="text-left">
                {task.task_id} - {task.task_desc}
              </td>
              <td>{task.assigned_to}</td>
              <td className="text-center">{task.estimate}</td>
              <td>
                {format(task.start_date ? task.start_date : "", "MMM dd, yyyy")}
              </td>
              <td>
                {format(task.end_date ? task.end_date : "", "MMM dd, yyyy")}
              </td>
              <td>{task.status}</td>
              <td>
                <div className="flex flex-row">
                  {task.status === "assigned" && (
                    <RocketLaunchIcon
                      className="h-4 w-4 
                      hover:cursor-pointer 
                      hover:text-blue-500"
                      onClick={() =>
                        setStatus(task._id ? task._id : "", "in progress")
                      }
                    ></RocketLaunchIcon>
                  )}
                  {task.status === "in progress" && (
                    <>
                      <CheckIcon
                        className="h-4 w-4 hover:text-green-700"
                        onClick={() =>
                          setStatus(task._id ? task._id : "", "completed")
                        }
                      ></CheckIcon>
                      <XMarkIcon
                        className="h-4 w-4 hover:text-red-700"
                        onClick={() =>
                          setStatus(task._id ? task._id : "", "aborted")
                        }
                      ></XMarkIcon>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TaskList;
