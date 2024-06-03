import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./Tasklist";
import { addTaskAsync, getTaskList, updateTaskList } from "@/lib/taskAction";
import { ITask } from "@/models/ITask";
import { auth, signOut } from "../../lib/actions";
import { Session } from "next-auth";
import TaskContext from "@/store/taskContext";
import { IUITask } from "@/models/IUITask";

function Task() {
  const [tasks, setTasks] = useState<{}[]>([]);
  const [task, setTask] = useState<IUITask>({
    created: false,
    status: "assigned",
  });
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth().then((s) => {
      setUserId(s?.user?.id ? s?.user?.id : "");
      getTaskList(s?.user?.name ? s?.user?.name : "").then((data) => {
        setTasks(data);
      });
    });
  }, []);

  // const setStatus = (primaryId: string, status: string) => {
  //   const taskIndex = tasks.findIndex((taskList) => taskList.pid === primaryId);
  //   const updatedTasks = [...tasks];
  //   updatedTasks[taskIndex] = { ...tasks[taskIndex], status: status };
  //   setTasks(updatedTasks);
  //   updateTaskList(primaryId, status);
  // };

  const onAddTask = async () => {
    const createdTask = await addTaskAsync({ ...task, createdBy: userId });
    console.log(createdTask);
    if (createdTask.created) {
      const clearTaskModel = { created: false };
      setTask(clearTaskModel);
      const x = [...tasks];
      x.push(createdTask);
      console.log(x);
      setTasks(x);
    } else {
      setTask({ ...createdTask });
    }
  };

  const onTextboxChange = (name: string, value: string) => {
    setTask({ ...task, [name]: value });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks: tasks,
        onAddTask: onAddTask,
        taskModel: task,
        onTextChange: onTextboxChange,
      }}
    >
      <AddTask></AddTask>
      <TaskList></TaskList>
    </TaskContext.Provider>
  );
}

export default Task;
