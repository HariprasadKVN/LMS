import { ITask } from "./ITask";

export interface IUITask extends ITask {
  errors?: { startDate?: string; endDate?: string };
  created: boolean;
}
