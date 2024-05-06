"use server";
import { IAddress } from "@/models/Address";
import { create } from "@/store/addressStore";


export async function addAddress(data:IAddress) {
  
  const c =  await create(data);
  console.log(c);
  return c;
}
