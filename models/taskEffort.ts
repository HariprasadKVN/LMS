import { TimeSheet } from "./TimeSheet";

export interface TaskEffort{
    empId?:string,
    startDate?:Date,
    status?:string,
    tasks?:TimeSheet[],
}