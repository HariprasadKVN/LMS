"use client";
import { auth, signOut } from "@/lib/actions";
import { addTaskAsync, getTaskList, updateTaskList } from "@/lib/taskAction";
import { ITask } from "@/models/ITask";
import { IUITask } from "@/models/IUITask";
import { User } from "next-auth";
import { createContext, useEffect, useState } from "react";

const LMSContext = createContext<{
  onAddTask: () => void;
  tasks?: ITask[];
  taskModel: IUITask;
  onTextChange: (name: string, value: string) => void;
  setStatus: (primaryId: string, status: string) => void;
  user?: User;
  signOut?: () => void;
}>({
  tasks: [],
  onAddTask: () => {},
  taskModel: { created: false },
  onTextChange: (name: string, value: string) => {},
  setStatus: (primaryId: string, status: string) => {},
  user: {},
  signOut: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [task, setTask] = useState<IUITask>({
    created: false,
    status: "assigned",
  });
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    auth().then((s) => {
      setUser(s?.user!);
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

  const onAddTask = async () => {
    const createdTask = await addTaskAsync({ ...task, createdBy: user.id });
    if (createdTask?.created) {
      const clearTaskModel = { created: false };
      setTask(clearTaskModel);
      const x = [...tasks];
      x.push(createdTask);
      setTasks(x);
    } else {
      setTask({ ...createdTask });
    }
  };

  const onTextboxChange = (name: string, value: string) => {
    setTask({ ...task, [name]: value });
  };

  const logOut = async () => {
    await signOut();
  };

  return (
    <LMSContext.Provider
      value={{
        tasks: tasks,
        onAddTask: onAddTask,
        taskModel: task,
        onTextChange: onTextboxChange,
        setStatus: setStatus,
        user: user,
        signOut: logOut,
      }}
    >
      {children}
    </LMSContext.Provider>
  );
};
export default LMSContext;
