"use server";
import { Effort } from "@/models/Effort";
import Task from "@/models/Task";
import { TimeSheet } from "@/models/TimeSheet";
import dbConnect from "@/store/dbConnect";

export async function logTime(timeSheets: TimeSheet[]) {
  try {
    await dbConnect();
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

const convertDateKeyToDate = (date: string) => {
  const dateVal = new Date(
    Number(date.substring(0, 4)),
    Number(date.substring(4, 6)) - 1,
    Number(date.substring(6, 8)),
  );
  return dateVal;
};

const convertEffortObject = (efforts: any, keys: string[]) => {
  let taskEfforts: Effort[] = [];
  //const effortKeys = Object.keys(efforts);
  keys.forEach((key) => {
    const effort = efforts !== undefined ? efforts[key] ? efforts[key] : 0 : 0;
    taskEfforts.push({ date: convertDateKeyToDate(key), effort: effort });
  });
  return taskEfforts;
};

export async function getInprogressTasks(currentWeek: Date) {
  await dbConnect();
  const keys = getWeekdayKeys(currentWeek);
  let filteredTasks: TimeSheet[] = [];
  try {
    const tasks = await Task.find();
    if (Array.isArray(tasks)) {
      filteredTasks = tasks
        .filter((task) => task.status === "in progress")
        .map((task) => ({
          taskId: task._id,
          taskName: task.task_desc || "",
          status: task.status,
          effort: convertEffortObject(task.efforts, keys),
        }));
    } else {
      console.error("Error fetching tasks:");
    }
  } catch (error) {
    throw error;
  }
  return filteredTasks;
}

const getWeekdayKeys = (from: Date): string[] => {
  const weekStart = new Date(from);
  const weekdaysArr: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(weekStart);
    day.setDate(weekStart.getDate() + i);
    weekdaysArr.push(convertDatetoKey(day));
  }

  return weekdaysArr;
};
