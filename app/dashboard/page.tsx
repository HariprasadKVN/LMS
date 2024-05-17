'use client'
import { Suspense} from "react";
import Task from '@/components/task/Task';
import LeaveDetails from "@/components/leave/Leave";
import TimeSheet from "@/components/timesheet/timesheet";
import UCCard from "@/components/ui/card";
import Loading from "../loading";

export default function Home() {

  return (
    <div className="flex flex-col m-3">
      <UCCard title="Task(s)">
        <Task></Task>
      </UCCard>
      <UCCard title="Leaves">
        <LeaveDetails></LeaveDetails>
      </UCCard>
      <Suspense fallback={<Loading></Loading>}>
        <UCCard title="Timesheet">
          <TimeSheet />
        </UCCard>
      </Suspense>
    </div>
  );
}