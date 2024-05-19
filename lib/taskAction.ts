import { ITask } from "@/models/ITask";
import { create, getTasks, updateTask } from "@/store/taskStore";
import { z, ZodType } from "zod";
type FormData1 = {
  createdBy?: string;
  assignedTo?: string;
  taskId?: string;
  taskDesc: string;
  estimate?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  project?: string;
  sprint?: string;
  taskType?: string;
};
// This will be the schema for the form, it'll be used to validate the form when submitting.
//z.coerce.date() is used to convert the string to a date object.
const dateSchema: ZodType<FormData1> = z
  .object({
    createdBy: z.coerce.string(),
    assignedTo: z.coerce.string(),
    taskId: z.coerce.string(),
    taskDesc: z.coerce.string().min(1),
    estimate: z.coerce.number(),
    status: z.coerce.string(),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    project: z.coerce.string(),
    sprint: z.coerce.string(),
    taskType: z.coerce.string(),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date cannot be earlier than start date.",
    path: ["endDate"],
  });

const getValue = (data: FormDataEntryValue | null): string => {
  if (!data) return "";
  else return data.toString();
};

async function addTask(
  prevState:
    | {
        createdBy?: string;
        assignedTo?: string;
        taskId?: string;
        taskDesc?: string;
        estimate?: number;
        status?: string;
        startDate?: string;
        endDate?: string;
        project?: string;
        sprint?: string;
        taskType?: string;
      }
    | undefined,
  formData: FormData,
): Promise<{
  createdBy?: string;
  assignedTo?: string;
  taskId?: string;
  taskDesc?: string;
  estimate?: number;
  status?: string;
  startDate?: string;
  endDate?: string;
  project?: string;
  sprint?: string;
  taskType?: string;
}> {
  const result = dateSchema.safeParse({
    createdBy: formData.get("createdBy"),
    assignedTo: formData.get("assignedTo"),
    taskId: formData.get("taskId"),
    taskDesc: formData.get("taskDesc"),
    estimate: formData.get("estimate"),
    status: formData.get("status"),
    startDate: formData.get("startDate"),
    endDate: formData.get("endDate"),
    project: formData.get("project"),
    sprint: formData.get("sprint"),
    taskType: formData.get("taskType"),
  });
  console.log(result);
  try {
    if (!result.success) {
      console.log(result.error.formErrors.fieldErrors);
      const { startDate, endDate, taskDesc } =
        result.error.formErrors.fieldErrors;
      return new Promise((resolve) => {
        resolve({ endDate: endDate ? endDate[0] : "" });
      });
    } else {
      await create({ ...result.data, status: "assigned", createdBy: "hari" });
      return {};
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
}

async function getTaskList(username: string): Promise<ITask[]> {
  const x = await getTasks(username);
  const r = x.map((item) => ({
    pid: item.pid,
    createdBy: item.createdBy,
    assignedTo: item.assignedTo,
    taskId: item.taskId,
    taskDesc: item.taskDesc,
    estimate: item.estimate,
    status: item.status,
    startDate: item.startDate,
    endDate: item.endDate,
    project: item.project,
    sprint: item.sprint,
    taskType: item.taskType,
  }));
  console.log("mapping task details to model");
  console.log(r);
  return r;
}

async function updateTaskList(primaryId: string, status: string) {
  const x = await updateTask(primaryId, status);
  console.log("checking update action");
  console.log(x);
}

export { addTask, getTaskList, updateTaskList };
