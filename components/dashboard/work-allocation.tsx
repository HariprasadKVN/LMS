"use client";
import React, { useEffect, useState } from "react";
import PencilSquare from "@/svg/PencilSquare";
import DeleteSvg from "@/svg/DeleteSvg";
import axios from "axios";
import IAllocation from "@/models/allocation";
import AddTask from "../tasks/AddTask";

interface Props {
  isNewTaskAdded: boolean;
}

const WorkAllocation: React.FC<Props> = ({ isNewTaskAdded }) => {
  const [tasks, setTasks] = useState<IAllocation[]>([]);
  useEffect(() => {
    const getAllocations = async () => {
      const response = await axios.get("/api/tasks");
      setTasks(response.data.data);
    };
    getAllocations().then();
  }, [isNewTaskAdded]);

  const handleEdit = () => {
    alert("clicked edit");
  };

  const handleDelete = () => {
    alert("clicked delete");
  };

  console.log(tasks);
  return (
    <>
      <table>
        <thead>
          <tr><th>Task</th>
            <th>Start By</th>
            <th>Status</th>
            <th>Action</th></tr>
        </thead>
        <tbody>
          {tasks.map((task:IAllocation, index)=>(
            <tr key={index}>
              <td>{task.taskId} - {task.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <table className="m-5 border-separate border border-slate-500">
        <thead>
          <tr>
            <th className="border border-slate-200">Task</th>
            <th className="border border-slate-200">Planned start date</th>
            <th className="border border-slate-200">Status</th>
            <th className="border border-slate-200">Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: IAllocation, index) => (
            <tr key={index}>
              <td className="border border-slate-300">
                {task.taskId} - {task.description}
              </td>
              <td className="border border-slate-300">{task.start}</td>
              <td className="border border-slate-300">{task.status}</td>
              <td className="border border-slate-300">
                <div style={{ display: "flex" }}>
                  {" "}
                  <span onClick={handleEdit} style={{ cursor: "pointer" }}>
                    {" "}
                    <PencilSquare />
                  </span>
                  <span onClick={handleDelete} style={{ cursor: "pointer" }}>
                    {" "}
                    <DeleteSvg />
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
    </>
  );
};

export default WorkAllocation;
