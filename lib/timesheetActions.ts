"use server";
import { Effort } from "@/models/Effort";
import Employee from "@/models/Employee";
import { TimeSheet } from "@/models/TimeSheet";
import { TaskEffort } from "@/models/taskEffort";
import dbConnect from "@/store/dbConnect";
import { Update, getEmployee } from "@/store/employeeStore";
import { getTasks } from "@/store/taskStore";
import { stat } from "fs";

export async function SubmitTimesheet(taskEffort: TaskEffort) {
  try {
    await dbConnect();
    const weekKey = convertDatetoKey(taskEffort.startDate!);
    let weekData = {};
    taskEffort.tasks!.forEach((task) => {
      weekData = {
        ...weekData,
        status: taskEffort.status,
        [task.taskId!]: {
          description: task.taskName,
          efforts: task.effort.map((item) => item.effort),
        },
      };
    });
    console.log(weekData);
    await Update("Hari", `effort.${weekKey}`, weekData);
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
  keys.forEach((key) => {
    const effort =
      efforts !== undefined ? (efforts[key] ? efforts[key] : 0) : 0;
    taskEfforts.push({ date: convertDateKeyToDate(key), effort: effort });
  });
  return taskEfforts;
};

const convertEffortArrayToObject = (efforts: any[], keys: string[]) => {
  let taskEfforts: Effort[] = [];
  keys.forEach((key, index) => {
    const effort =
      efforts !== undefined ? (efforts[index] ? efforts[index] : 0) : 0;
    taskEfforts.push({ date: convertDateKeyToDate(key), effort: effort });
  });
  return taskEfforts;
};

export async function getInprogressTasks(currentWeek: Date) {
  await dbConnect();
  const keys = getWeekdayKeys(currentWeek);
  const weekKey = convertDatetoKey(currentWeek);
  let filteredTasks: TimeSheet[] = [];
  let submittedTasks: TimeSheet[] = [];
  let weekTaskEffort: TaskEffort = {};
  try {
    weekTaskEffort.startDate = currentWeek;
    const empEfforts = await getEmployee("Hari", `effort.${weekKey}`);
    if(!empEfforts){
      return weekTaskEffort;
    }
    const { status } = empEfforts;
    if (empEfforts) {
      const taskKeys = Object.keys(empEfforts);
      console.log(taskKeys);
      taskKeys.forEach((taskkey) => {
        if (taskkey !== "status") {
          const taskObj = empEfforts[taskkey];
          const submittedTask = {
            taskId: taskkey,
            taskName: taskObj.description,
            status: taskObj.done,
            effort: convertEffortArrayToObject(taskObj.efforts, keys),
          };
          submittedTasks.push(submittedTask);
        }
      });
    }
    if (status && status === "submitted") {
      //return empty task list
      weekTaskEffort.status = empEfforts.status;
      filteredTasks = [];
    } else {
      const tasks = await getTasks("Madhu");
      filteredTasks = tasks
        .filter((task) => task.status === "in progress")
        .map((task) => ({
          taskId: task._id,
          taskName: task.taskDesc || "",
          status: task.status,
          effort: convertEffortObject(task.efforts, keys),
        }));
    }
  } catch (error) {
    throw error;
  }
  weekTaskEffort.tasks = [...submittedTasks, ...filteredTasks];
  return weekTaskEffort;
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
