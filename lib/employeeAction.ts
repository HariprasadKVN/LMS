"use server";

import dbConnect from "@/store/dbConnect";
import Employee from "@/models/Employee";

export async function create(formData: {
  name: string;
  email: string;
  password: string;
}): Promise<{
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}> {
  await dbConnect();

  const userAuth = {
    name: "tst",
    email: formData.email,
    password: formData.password,
  };

  const x = await Employee.create({
    empId: "Hari",
    leaves: { casual: { total: 5, applied: [new Date(2024, 0, 27)] } },
  });

  console.log(x);

  return new Promise((resolve) => {
    resolve({
      name: undefined,
      email: "Email already exists. Please user another email",
      password: undefined,
    });
  });
}

export const getEmployee = async () => {
  await dbConnect();
  const x = await Employee.findOne({ empId: "test" });
  return x;
};

export const applyLeave = async (
  employeeID: string,
  leaves: {
    start: Date;
    end: Date;
    type: string;
    duration: "half" | "full";
    reason: string;
  }[],
) => {
  await dbConnect();
  const employee = await Employee.findOne({ empId: employeeID });

  const leave = leaves[0];

  const startDateKey = convertDatetoKey(leave.start);
  const endDateKey = convertDatetoKey(leave.end);
  const noOfDays = leave.end.getDate() - leave.start.getDate() + 1;

  const leaveEntry = `${endDateKey}|${leave.type}|${noOfDays}|${leave.duration}|${leave.reason}`;

  if (!employee.leaves.hasOwnProperty(startDateKey)) {
    employee.leaves[startDateKey] = leaveEntry;
  } else {
    console.log("Already exist", employee.leaves[startDateKey]);
  }

  employee.markModified("leaves");
  const savedEmployee = await employee.save();
  return { success: true, leaveEntry };
};

const convertDatetoKey = (date: Date) => {
  const key = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  return key;
};

export const deleteLeave = async (employeeID: string, date: string) => {
  try {
    await dbConnect();
    const employee = await Employee.findOne({ empId: employeeID });
    console.log(employee);

    if (!employee) {
      throw new Error("Employee not found");
    }

    const leaves = employee.leaves;
    console.log(leaves);

    if (leaves[date]) {
      delete leaves[date];
      employee.markModified("leaves");
      await employee.save();
      return { success: true };
    } else {
      return {
        success: false,
        error: "Leave entry not found for the specified date",
      };
    }
  } catch (error) {
    console.error("Error deleting leave:", error);
    return { success: false, error };
  }
};
