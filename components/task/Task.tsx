import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./Tasklist";
import { getTaskList } from "@/lib/taskAction";
import { ITask } from "@/models/Task";
import { auth, signOut } from "../../lib/actions";
import { Session } from "next-auth";


function Task() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  //const username = "Madhu";
  useEffect(() => {
    // getTaskList(username).then((data) => {
    //   setTasks(data);     
    // });
    
    auth().then((s) => getTaskList((s?.user?.name)?s?.user?.name:"").then((data) => {
      setTasks(data);     
    }))
  }, []);

  // const getAllocations = async () => {
  //   const response = await axios.get("/api/hari/tasks");
  //   return response.data.data;
  // };

  const setStatus = (taskId: string, status: string) => {
    const taskIndex = tasks.findIndex(
      (taskList) => taskList.taskId === taskId,
    );
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...tasks[taskIndex], status: status };
    setTasks(updatedTasks);
  };

  /* const handleEditClick = (taskId: string) => {
    const taskIndex = tasks.findIndex(
      (allocations) => allocations._id === taskId,
    );
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = {
      ...tasks[taskIndex],
      current: true,
      status: status,
    };

    const res = fetch("/api/tasks", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTasks[taskIndex]),
    })
      .then(() => setTasks(updatedTasks))
      .catch((err) => console.log(err));
  }; */

  // const setStatus = (taskId: string, status: string) => {
  //   const taskIndex = tasks.findIndex(
  //     (allocations) => allocations._id === taskId,
  //   );
    // const updatedTasks = [...tasks];
    // updatedTasks[taskIndex] = {
    //   ...updatedTasks[taskIndex],
    //   current: false,
    //   status: status,
    // };

    // const res = fetch("/api/hari/tasks", {
    //   method: "PUT",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedTasks[taskIndex]),
    // })
    //   .then(() => setTasks(updatedTasks))
    //   .catch((err) => console.log(err));
  //};

  // const handleSubmit = async (data: any) => {
  //   try {
  //     const res = await fetch("/api/hari/tasks", {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         created_by: data.createdBy,
  //         assigned_to: data.assignedTo,
  //         task_id: data.taskId,
  //         task_desc: data.description,
  //         estimate: data.estimate,
  //         status: data.status,
  //         start_date: data.startDate,
  //         end_date: data.endDate,
  //       }),
  //     });

  //     if (!res.ok) {
  //       throw new Error(res.status.toString());
  //     }

  //     // const x = await getAllocations();
  //     // setTasks(x);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <>
    {/* handleSubmit={handleSubmit} */}
      <AddTask ></AddTask>
      {/* <TaskList/> */}
      <TaskList
        tasks={tasks}
        setStatus={setStatus}
       
      ></TaskList>
    </>
  );
}

export default Task;
