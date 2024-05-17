"use server";
import dbConnect from "@/store/dbConnect";
import { Create, Delete, Update, getEmployee } from "@/store/employeeStore";
import { orgLeavesCount } from "@/mock-data/orgLeavesCount";

export const createEmployee = async (empId: string) => {
  await dbConnect();
  const x = await Create(empId);

  return x;
};

export const getEmployeeLeavesByType = async (empId: string, year: string) => {
  let x = await getEmployee(empId, "");
  if (!x || !x.leaves) {
    return { leavesData: {}, utilizedAndAllotted: {} };
  }
  x = x.leaves[year];
  let allLeavesList: Record<
    string,
    {
      startDate: string;
      endDate: string;
      noOfDays: string;
      duration: string;
      reason: string;
    }[]
  > = {};

  const utilizedLeaves: {
    [type: string]: { allotted: number; utilized: number; balance: number };
  } = {};

  for (const type in x) {
    allLeavesList[type] = [];
    for (const entry in x[type]) {
      if (entry == "allotted") {
        utilizedLeaves[type] = {
          allotted: Number(x[type][entry]),
          utilized: 0,
          balance: 0,
        };
        continue;
      }
      const splittedArray = x[type][entry].split("|");
      allLeavesList[type].push({
        startDate: entry,
        endDate: splittedArray[0],
        noOfDays: splittedArray[1],
        duration: splittedArray[2],
        reason: splittedArray[3],
      });
    }
  }

  for (const type in allLeavesList) {
    const total = allLeavesList[type].reduce(
      (total, leave) => total + parseInt(leave.noOfDays),
      0,
    );
    utilizedLeaves[type] = {
      allotted: utilizedLeaves[type].allotted,
      utilized: total,
      balance: utilizedLeaves[type].allotted - total,
    };
  }

  return { leavesData: allLeavesList, utilizedAndAllotted: utilizedLeaves };
};

export const applyLeave = async (
  employeeID: string,
  leaves: {
    start: Date;
    end: Date;
    type: string;
    duration: "half" | "full";
    reason: string;
  },
) => {
  const leave = leaves;

  const year = leave.start.getFullYear().toString();

  const startDateKey = convertDatetoKey(leave.start);
  const endDateKey = convertDatetoKey(leave.end);
  const noOfDays = await getDiff(leaves.start, leaves.end);

  const leaveEntry = `${endDateKey}|${noOfDays}|${leave.duration}|${leave.reason}`;

  const x = await getEmployee(employeeID, "");
  if (!x.leaves || !x.leaves[year] || !x.leaves[year][leave.type]) {
    await Update(employeeID, `leaves.${year}.${leave.type}`, {
      allotted: orgLeavesCount[leave.type],
    });
  }

  const result = await Update(
    employeeID,
    `leaves.${year}.${leave.type}.${startDateKey}`,
    leaveEntry,
  );
  return { success: true, result };
};

const convertDatetoKey = (date: Date) => {
  const key = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  return key;
};

//this function calculates diff and also excludes saturday and sunday
export const getDiff = async (startDate: Date, endDate: Date) => {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  let totalDays = Math.round(
    Math.abs((startDate.getTime() - endDate.getTime()) / oneDay),
  );

  // Calculate number of Saturdays and Sundays
  let satSunCount = 0;
  for (let i = 0; i <= totalDays; i++) {
    const currentDate = new Date(startDate.getTime() + i * oneDay);
    if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
      satSunCount++;
    }
  }

  // Subtract weekends from total days
  totalDays -= satSunCount;

  return totalDays + 1;
};

export const deleteLeave = async (employeeID: string, path: string) => {
  const res = await Delete(employeeID, path);
};
