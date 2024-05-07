export interface ITask {
  createdBy?: string;
  assignedTo?: string;
  taskId?: string;
  taskDesc?: string;
  estimate?: number;
  status?: string;
  startDate?: Date;
  endDate?: Date;
}