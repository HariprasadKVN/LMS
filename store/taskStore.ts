"use server";
import { ITask } from "@/models/ITask";
import dbConnect from "@/store/dbConnect";
import mongoose from "mongoose";
import { unstable_noStore as noStore } from 'next/cache';

interface Model extends ITask, mongoose.Document {}

const ModelSchema = new mongoose.Schema<Model>({
  pid: {
    type: String,
  },
  createdBy: {
    type: String,
    // required: [true, "Please provide the creator's ID"],
  },
  assignedTo: {
    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  project: {
    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  sprint: {
    type: String,
    // required: [true, "Please provide the assigned to ID"],
  },
  taskId: {
    type: String,
    // required: [true, "Please specify the task ID."],
  },
  taskDesc: {
    type: String,
    // required: [true, "Please provide the task description"],
  },
  taskType: {
    type: String,
    // required: [true, "Please provide the task description"],
  },
  estimate: {
    type: Number,
  },
  status: {
    type: String,
  },
  startDate: {
    // required: [true, "Please provide the start date"],
    type: Date,
  },
  endDate: {
    type: Date,
  },
});

const store =
  mongoose.models.Task || mongoose.model<Model>("Task", ModelSchema);

export async function create(data: ITask) {
  await dbConnect();
  const c = await store.create(data);
  console.log(c);
  return c;
}

export const getTasks = async (username: string): Promise<ITask[]> => {
  noStore();
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
  }));
};

//export async function updateTask(taskId: string, status: string, path: string, data:any) {
export async function updateTask(primaryId: string, status: string) {
  await dbConnect();
  if (primaryId === "") {
    console.log(primaryId);
    return;
  }

  let root = await store.findByIdAndUpdate(primaryId, { status: status });
  console.log(root);
}

export default store;
