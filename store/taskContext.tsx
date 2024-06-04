"use client";
import { ITask } from "@/models/ITask";
import { IUITask } from "@/models/IUITask";
import { createContext } from "react";

const TaskContext = createContext<{
  onAddTask: () => void;
  tasks?: ITask[];
  taskModel: IUITask;
  onTextChange: (name: string, value: string) => void;
  setStatus: (primaryId: string, status: string) => void;
}>({
  tasks: [],
  onAddTask: () => {},
  taskModel: { created: false },
  onTextChange: (name: string, value: string) => {},
  setStatus: (primaryId: string, status: string) => {},
});

export default TaskContext;
