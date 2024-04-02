import Calendar from "@/components/Calendar";
import LeaveInfo from "@/components/LeaveInfo";
import WorkAllocation from "@/components/dashboard/work-allocation";
import AddTask from "@/components/tasks/AddTask";
import { EventContextProvider } from "@/store/eventContext";

export default function Home() {
  return (
    <EventContextProvider>
      <div className="flex flex-col">
        <div className="flex flex-row p-2">
          <div className="flex-none">
            <LeaveInfo></LeaveInfo>
          </div>
          <div className="flex-grow">
            {/*  <Calendar></Calendar> */}
            {/* <WorkAllocation /> */}
            <AddTask />
          </div>
        </div>
        <div>Panel Task</div>
      </div>
    </EventContextProvider>
  );
}
