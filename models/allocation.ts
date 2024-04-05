export default interface IAllocation {
  id: number;
  taskId: string;
  description?: string;
  start?: string;
  end?: string;
  status?: string;
  _id?: string;
  created_by?: string;
  assigned_to?: string;
  task_id?: string;
  task_desc?: string;
  estimate?: string;
  start_date?: string;
  end_date?: string;
  current?:boolean;
}
