import { Effort } from "./Effort";

export interface TimeSheet {
  taskId?: string;
  taskName?: string;
  status?: String;
  effort?: Effort[];
}
