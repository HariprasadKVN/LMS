"use server";
import { IAddress } from "@/models/Address";
import dbConnect from "@/store/dbConnect";
import mongoose from "mongoose";

interface Model extends IAddress, mongoose.Document {
  
}

const ModelSchema = new mongoose.Schema<Model>({
  name: {
    type: String,
    required: [true, "Please provide the User Name"],
  },
  email: {
    type: String,
    required: [true, "Please provide the User's email for logging"],
  },  
});

const store =  mongoose.models.Address ||
  mongoose.model<Model>("Address", ModelSchema);

export async function create(data:IAddress) {
  await dbConnect();
  const c =  await store.create(data);
  console.log(c);
  return c;
}
