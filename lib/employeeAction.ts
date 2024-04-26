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
  const x = await Employee.findOne({ empId: "Hari" });
  console.log(x);

  // x[0]["leaves"]["casual"]["total"] = 10;
  // x[0].markModified("leaves");
  // const s = await x[0].save();
  // console.log(s);

  // const y = await Employee.find();
  // console.log(y[0]);

  // const {leaves} = x[0];
  // const {casual} = leaves;
  // const {total, applied} = casual;
  // console.log(new Date(applied[0]).toLocaleDateString());
};

export const applyLeave = async (
  employeeID: string,
  leaves: {
    type: string;
    start: Date;
    end: Date;
    description?: string;
    duration: "half" | "full";
  }[],
) => {
  //Get the employee details
  const employee = await Employee.findOne({ empId: employeeID });

  let c = employee["leaves"][leaves[0].type];
  const dates = generateDates(leaves[0].start, leaves[0].end);
  dates.forEach(element => {
    c = {...c,[element]:`${leaves[0].duration}|${leaves[0].description}`}
  });

  employee["leaves"][leaves[0].type] = c;
  employee.markModified("leaves");
  const s = await employee.save();
  console.log(s);
};

const convertDatetoKey = (date: Date) => {
  const key = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}`;
  return key;
};

function generateDates(startDate: Date, endDate: Date): string[] {
  const dates: string[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(convertDatetoKey(new Date(currentDate)));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}
