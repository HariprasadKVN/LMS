import Calendar from "@/components/Calendar";
import LeaveInfo from "@/components/LeaveInfo";
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
            <Calendar></Calendar>
          </div>
        </div>
        <div>Panel Task</div>
      </div>
    </EventContextProvider>
  );
}
