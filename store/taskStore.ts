"use server";
import { ITask } from "@/models/ITask";
import dbConnect from "@/store/dbConnect";
import mongoose from "mongoose";
import { string } from "zod";

interface Model extends ITask, mongoose.Document {}

const ModelSchema = new mongoose.Schema<Model>({
  pid: { type: String },
  createdBy: { type: String },
  assignedTo: { type: String },
  taskId: { type: String },
  taskDesc: { type: String },
  estimate: { type: Number },
  status: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  project: { type: String },
  sprint: { type: String },
  taskType: { type: String },
});

const store =
  mongoose.models.Task || mongoose.model<Model>("Task", ModelSchema);

const create = async (data: ITask) => {
  await dbConnect();
  const newTask = await store.create(data);
  return newTask;
};

const getTasks = async (username: string): Promise<ITask[]> => {
  await dbConnect();
  const response = await store.find({ assignedTo: username });
  return response.map((item) => ({
    pid: item._id.toString(),
    createdBy: item.createdBy,
    assignedTo: item.assignedTo,
    taskId: item.taskId,
    taskDesc: item.taskDesc,
    estimate: item.estimate,
    status: item.status,
    startDate: item.startDate,
    endDate: item.endDate,
    project: item.project,
    sprint: item.sprint,
    taskType: item.taskType,
  }));
};

const updateTask = async (primaryId: string, status: string) => {
  await dbConnect();
  if (primaryId === "") {
    console.log(primaryId);
    return;
  }

  let root = await store.findByIdAndUpdate(primaryId, { status: status });
  return root;
};

export { create, getTasks, updateTask };
