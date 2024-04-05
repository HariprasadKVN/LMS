import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./Tasklist";
import IAllocation from "@/models/allocation";
import axios from "axios";

function Task() {
    const [tasks, setTasks] = useState<IAllocation[]>([]);
    useEffect(() => {
        const getAllocations = async () => {
            const response = await axios.get("/api/hari/tasks");
            return response.data.data;
        };
        getAllocations().then(
            (data) => {
                setTasks(data);
            }
        );
    }, []);


    const getAllocations = async () => {
        const response = await axios.get("/api/hari/tasks");
        return response.data.data;
    };


    const setStatus = (taskId: string, status: string) => {
        const taskIndex = tasks.findIndex(allocations => allocations._id === taskId);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...tasks[taskIndex], status: status };
        setTasks(updatedTasks);
    }

    const handleEditClick = (taskId: string) => {
        const taskIndex = tasks.findIndex(allocations => allocations._id === taskId);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...tasks[taskIndex], current: true, status: status };

        const res = fetch("/api/tasks", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks[taskIndex]),
        }).then(() => setTasks(updatedTasks)).catch((err) => console.log(err));
    }

    const handleSaveCancelClick = (taskId: string, status: string) => {
        const taskIndex = tasks.findIndex(allocations => allocations._id === taskId);
        const updatedTasks = [...tasks];
        updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], current: false, status: status };

        const res = fetch("/api/tasks", {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTasks[taskIndex]),
        }).then(() => setTasks(updatedTasks)).catch((err) => console.log(err));

    }

    const handleSubmit = async (data: any) => {
        try {
            const res = await fetch("/api/hari/tasks", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            
            if (!res.ok) {
               throw new Error(res.status.toString());
            }

            const x = await getAllocations();
            setTasks(x);
        } catch (error) {
            console.log(error);
        }


    };

    return <>
        <TaskList tasks={tasks}
            handleEdit={handleEditClick}
            handleSaveCancel={handleSaveCancelClick}
            setStatus={setStatus}></TaskList>
        <AddTask handleSubmit={handleSubmit}></AddTask>
    </>
}

export default Task;
