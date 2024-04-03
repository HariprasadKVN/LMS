export default interface IAllocation {
    id: number;
    taskId: string;
    description?: string;
    start?: string;
    end?: string;
    status?: string;
  }