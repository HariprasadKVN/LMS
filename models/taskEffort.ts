import { TimeSheet } from "./TimeSheet";

export interface TaskEffort{
    startDate?:Date,
    status?:string,
    tasks?:TimeSheet[],
}