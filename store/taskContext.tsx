"use client";
import { ITask } from "@/models/ITask";
import { IUITask } from "@/models/IUITask";
import { createContext, useState } from "react";

const TaskContext = createContext<{
  onAddTask: () => void;
  tasks?: ITask[];
  taskModel: IUITask;
  onTextChange: (name: string, value: string) => void;
}>({
  tasks: [],
  onAddTask: () => {},
  taskModel: {created:false},
  onTextChange: (name: string, value: string) => {},
});

export default TaskContext;
