"use server";

import dbConnect from "@/lib/dbConnect";
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
  leaves: [{ type: string; when: [Date] }],
) => {
  //Get the employee details
  const employee = await Employee.findOne({ empId: employeeID });

  const c = employee["leaves"][leaves[0].type];
  const x = {...c, ["20240220"]:8};
  employee["leaves"][leaves[0].type] = x;
  employee.markModified("leaves")
  const s = await employee.save();
  console.log(s);
}
