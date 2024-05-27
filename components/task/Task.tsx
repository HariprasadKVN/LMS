import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./Tasklist";
import { getTaskList, updateTaskList } from "@/lib/taskAction";
import { ITask } from "@/models/ITask";
import { auth, signOut } from "../../lib/actions";
import { Session } from "next-auth";

function Task() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [userId, setUserId] = useState("");
  useEffect(() => {
    auth().then((s) => {
      setUserId(s?.user?.id ? s?.user?.id : "");
      getTaskList(s?.user?.name ? s?.user?.name : "").then((data) => {
        setTasks(data);
      });
    });
  }, []);

  const setStatus = (primaryId: string, status: string) => {
    const taskIndex = tasks.findIndex((taskList) => taskList.pid === primaryId);
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex] = { ...tasks[taskIndex], status: status };
    setTasks(updatedTasks);
    updateTaskList(primaryId, status);
  };

  const post=(data:any)=>{console.log(data)}
  return (
    <>
      <AddTask userId={userId} post={post}></AddTask>
      <TaskList tasks={tasks} setStatus={setStatus}></TaskList>
    </>
  );
}

export default Task;
