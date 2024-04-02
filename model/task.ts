export default interface ITask {
  id: number;
  task_id: String;
  task_desc: String;
  estimate: Number;
  status: String;
  planned_start_date?: Date;
  actuall_start_date?: Date;
}
