'use client'
import IAllocation from "@/models/allocation";
import { format } from 'date-fns'
import { CheckIcon, XMarkIcon, RocketLaunchIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface Props {
    tasks: allocation[];
    handleEdit: (taskId: string) => void;
    handleSaveCancel: (taskId: string, status: string) => void;
    setStatus: (taskId: string, status: string) => void
}

interface allocation extends IAllocation {
    current?: boolean
}

const TaskList: React.FC<Props> = ({ tasks, handleEdit,
    handleSaveCancel, setStatus }) => {    
    const [selected, setSelected] = useState(false)

    const handleEditClick = (taskId: string) => {
        handleEdit(taskId);
        setSelected(true);
    }

    const handleSaveCancelClick = (taskId: string, status: string) => {
        handleSaveCancel(taskId, status);
        setSelected(false);
    }

    return (
        <>
            <table className="text-sm w-full">
                <thead>
                    <tr className="border-b">
                        <th>Task</th>
                        <th>Assigned to</th>
                        <th>Estimate</th>
                        <th>Start by</th>
                        <th>End Before</th>
                        <th>Status</th>
                        <th>Action</th></tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (

                        <tr key={index} className="border-b text-center">
                            <td>{task.task_id} - {task.task_desc}</td>
                            <td>{task.assigned_to}</td>
                            <td className="text-center">{task.estimate}</td>
                            <td>{format(task.start_date ? task.start_date : '', 'MMM dd, yyyy')}</td>
                            <td>{format(task.end_date ? task.end_date : '', 'MMM dd, yyyy')}</td>
                            <td>{task.status}</td>
                            <td>
                                <div className="flex flex-row">
                                    {task.status === "assigned" &&
                                        <RocketLaunchIcon className="h-4 w-4 
                      hover:cursor-pointer 
                      hover:text-blue-500"
                                            onClick={() => setStatus(task._id ? task._id : '', 'in progress')}></RocketLaunchIcon>
                                    }
                                    {task.status === "in progress" &&
                                        <>
                                            <CheckIcon className="h-4 w-4 hover:text-green-700" onClick={() => handleSaveCancelClick(task._id ? task._id : '', 'completed')} ></CheckIcon>
                                            <XMarkIcon className="h-4 w-4 hover:text-red-700" onClick={() => handleSaveCancelClick(task._id ? task._id : '', 'aborted')} ></XMarkIcon>
                                        </>
                                    }
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
