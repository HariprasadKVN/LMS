"use server";
import { IEmployee } from "@/models/IEmployee";
import dbConnect from "@/store/dbConnect";
import mongoose from "mongoose";

interface Model extends IEmployee, mongoose.Document {}

const ModelSchema = new mongoose.Schema<Model>({
  empId: {
    type: String,
  },
  leaves: {
    type: mongoose.Schema.Types.Mixed,
  },
  effort: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const store =
  mongoose.models.Employee || mongoose.model<Model>("Employee", ModelSchema);

export async function Update(empId: string, path: string, data: any) {
  await dbConnect();
  let root = await store.findOne({
    empId: empId,
  });

  const pathArray = path.split(".");

  const key = pathArray.pop() || "key";
  const node = pathArray.pop() || "node";
  const entityderived = pathArray[0];
  let parent = root;

  pathArray.forEach((element) => {
    if (!parent[element]) {
      parent[element] = {};
    }
    parent = parent[element];
  });

  const x = parent[node];
  let y = { ...x, [key]: data };

  parent[node] = y;

  root.markModified(entityderived);
  await root.save();
}

export const getEmployee = async (employeeID: string, path: string) => {
  try {
    await dbConnect();
    const employee = await store.findOne({ empId: employeeID });
    if (!employee) {
      return null;
    }
    if (path === "") {
      return employee;
    }
    const pathArray = path.split(".");
    let parent = employee;

    pathArray.forEach((element) => {
      parent = parent[element];
    });
    return parent;
  } catch (error) {
    console.error("Error getting employee week effort:", error);
    return { success: false, error: error };
  }
};

export async function Delete(empId: string, path: string) {
  await dbConnect();
  let root = await store.findOne({
    empId: empId,
  });

  const pathArray = path.split(".");

  const key = pathArray.pop() || "key";
  const node = pathArray.pop() || "node";
  const entityderived = pathArray[0];
  let parent = root;

  pathArray.forEach((element) => {
    parent = parent[element];
  });

  delete parent[node][key];

  root.markModified(entityderived);
  await root.save();
}
