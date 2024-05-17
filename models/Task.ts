export interface ITask {
  createdBy?: string;
  assignedTo?: string;
  project?:string;
  sprint?:string;
  taskId?: string;
  taskDesc?: string;
  taskType?:string;
  estimate?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}