"use server";
import Task from "@/models/Task";
import { TimeSheet } from "@/models/TimeSheet";

export async function logTime(timeSheets: TimeSheet[]) {
  try {
    timeSheets.forEach(async (timeSheet) => {
      const task = await Task.findByIdAndUpdate(timeSheet.taskId, {
        $set: { status: timeSheet.status, effort: timeSheet.effort },
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
