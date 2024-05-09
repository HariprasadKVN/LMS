"use server";
import { ITask } from "@/models/Task";
import dbConnect from "@/store/dbConnect";
import mongoose from "mongoose";

interface Model extends ITask, mongoose.Document {}

const ModelSchema = new mongoose.Schema<Model>({
  createdBy: {
    type: String,
    // required: [true, "Please provide the creator's ID"],
  },
  assignedTo: {
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

export const getTasks = async (username:string|undefined) => {
  await dbConnect();
  const x = await store.find({assignedTo:username});
  console.log(x);
  return x;
};


export async function updateTask(taskId: string, status: string, path: string, data:any) {
  await dbConnect();
  let root = await store.findOne({
    taskId: taskId,
  });
 
  const pathArray = path.split(".");
 
  const key = pathArray.pop() || "key";
  const node = pathArray.pop() || "node";
  const entityderived = pathArray[0];
  let parent = root;
 
  pathArray.forEach((element) => {
    parent = parent[element];
  });
 
  const x = parent[node];
  let y = { ...x, [key]: data };
 
  parent[node] = y;
 
  root.markModified(entityderived);
  await root.save();
}

export default store; 


