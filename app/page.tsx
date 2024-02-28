import Calendar from "@/components/Calendar";

export default function Home() {
  const events: {
    date: Date;
    description: string;
    type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
  }[] = [
    { date: new Date(2024, 0, 1), description: "New Year", type: "fixed" },
    { date: new Date(2024, 0, 26), description: "Republic Day", type: "fixed" },
    { date: new Date(2024, 2, 6), description: "New Year", type: "leave" },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2">
        <div className="flex-none">Panel Overview</div>
        <div className="flex-grow">
          <Calendar events={events}></Calendar>
        </div>
      </div>
      <div>Panel Task</div>
    </div>
  );
}
