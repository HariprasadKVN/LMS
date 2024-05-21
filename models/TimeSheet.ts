export interface TimeSheet {
  taskId?: string;
  taskName?: string;
  status?: string;
  effort: {date:Date,effort:Number}[];
}
