import { resolve } from "path";
import { z, ZodType } from "zod";
import Task from "@/models/Task";
import dbConnect from "@/store/dbConnect";

type FormData1 = {
  startDate: Date;
  endDate: Date;
};
// This will be the schema for the form, it'll be used to validate the form when submitting.
//z.coerce.date() is used to convert the string to a date object.
const dateSchema: ZodType<FormData1> = z
  .object({startDate: z.coerce.date().refine((data) => data > new Date(), {message: "Start date must be in the future",}),
    endDate: z.coerce.date(),}).refine((data) => data.endDate > data.startDate, {message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const getValue = (data: FormDataEntryValue | null): string => {
  if (!data) return "";
  else return data.toString();
};

async function validateDate(
  //prevState: string | undefined,
  prevState:
    | {
        startDate: string | undefined;
        endDate: string | undefined;
        path: string | undefined;
      }
    | undefined,
  formData: FormData,
): Promise<{
  startDate: string | undefined;
  endDate: string | undefined;
  path: string | undefined;
}> {
  //Promise<string | undefined>

  const result = dateSchema.safeParse({
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    path: formData.get("path"),
  });
  console.log(result);
  try {
    if (!result.success) {
      const { startDate, endDate } = result.error.formErrors.fieldErrors;
      return new Promise((resolve) => {
        resolve({
          startDate: startDate ? startDate[0] : "",
          endDate: endDate ? endDate[0] : "",
          path: getValue(formData.get("path")),
        });
      });
    }
  //   else{
  // await dbConnect();
  // const x = await Task.create({
  //   //taskId:"test",
  //   createdBy: "jishna",
  //   assignedTo: "Rushi",
  //   taskId: "test",
  //   taskDesc: "testing db connect",
  //   estimate: 3,
  //   status: "assignedto",
  //   startDate: "04/05/2024",
  //   endDate: "05/05/2024",
  // });
  //  console.log(x);
  //   }
  } catch (error) {
    console.log(error);
  }

  return new Promise((resolve) => {
  
    resolve({
      startDate: undefined,
      path: undefined,
      endDate: undefined,
    });
  });
}

export default validateDate;
