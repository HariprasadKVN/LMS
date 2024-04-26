"use server";
import Task from "@/models/Task";
import { TimeSheet } from "@/models/TimeSheet";

export async function logTime(timeSheets: TimeSheet[]) {
  try {
    timeSheets.forEach(async (timeSheet) => {
      let taskToUpdate = await Task.findById(timeSheet.taskId);
      if (taskToUpdate) {
        let newEfforts = {};
        timeSheet.effort.forEach((time) => {
          newEfforts = {
            ...newEfforts,
            [convertDatetoKey(time.date)]: time.effort,
          };
        });

        const efforts = {
          ...taskToUpdate?.efforts!,
          ...newEfforts,
        };
        const task = await Task.findByIdAndUpdate(timeSheet.taskId, {
          $set: { status: timeSheet.status, efforts: efforts },
        });
        if (!task) {
          console.log(`Failed to update task : ${timeSheet.taskId}`);
        }
      }
    });
    const tasks = await Task.find();
    return { success: true, data: tasks };
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
