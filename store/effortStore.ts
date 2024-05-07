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

export async function Update(
  entity: string,
  search: any,
  key: string,
  data: any,
) {
  let parentNode = await store.findOne(
    {
      $and: search,
    },
    { [entity]: 1 },
  );

  let leafNode = parentNode[entity];
  leafNode = {
    ...leafNode,
    [key]: data,
  };

  parentNode[entity] = leafNode;
  parentNode.markModified(entity);
  await parentNode.save();
}
