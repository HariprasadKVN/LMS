"use server";
import Task from "@/models/Task";
import { TimeSheet } from "@/models/TimeSheet";

export async function logTime(timeSheets: TimeSheet[]) {
  try {
    timeSheets.forEach(async (timeSheet) => {
      let taskToUpdate = await Task.findById(timeSheet.taskId);
      const efforts = {
        ...taskToUpdate?.efforts!,
        [convertDatetoKey(timeSheet.effort[0].date)]:
          timeSheet.effort[0].effort,
      };
      const task = await Task.findByIdAndUpdate(timeSheet.taskId, {
        $set: { status: timeSheet.status, efforts: efforts },
      }); 
    });
    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return "Something went wrong.";
    }
    throw error;
  }
}

const convertDatetoKey = (date: Date) => {
  const key = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  return key;
};
