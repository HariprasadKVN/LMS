export interface TimeSheet {
  taskId?: string;
  taskName?: string;
  status?: string;
  done: boolean;
  effort: { date: Date; effort: Number }[];
}
