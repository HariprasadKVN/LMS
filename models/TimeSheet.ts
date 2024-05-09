export interface TimeSheet {
  taskId?: string;
  taskName?: string;
  status?: String;
  effort: {date:Date,effort:Number}[];
}
