"use client";
import Calendar from "@/components/Calendar";
import { useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<
    {
      date: Date;
      description: string;
      type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
    }[]
  >([
    { date: new Date(2024, 0, 1), description: "New Year", type: "fixed" },
    { date: new Date(2024, 0, 26), description: "Republic Day", type: "fixed" },
    { date: new Date(2024, 2, 6), description: "New Year", type: "leave" },
  ]);

  const getUpdateElement = (item: {
    date: Date;
    description: string;
    type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
  }) => {
    console.log(item.type);
    switch (item.type) {
      case undefined:
        item.type = "leave";
        break;
      case "leave":
        item.type = "special";
        break;
      case "special":
        item.type = undefined;
        break;
      // default:
      //   item.type = "leave";
      //   break;
    }
    console.log(item.type);
    return item;
  };

  const onDateClicked = (date: Date) => {
    const found = events.find(
      (n) => n.date.toDateString() === date.toDateString()
    );
    if (found) {
      const updateArray = events.map((item, index) =>
        item.date.toDateString() === date.toDateString()
          ? getUpdateElement(item)
          : item
      );

      setEvents(updateArray);
    } else {
      console.log("push");
      setEvents([...events, { date: date, description: "", type: "leave" }]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2">
        <div className="flex-none">Panel Overview</div>
        <div className="flex-grow">
          <Calendar events={events} onDateClicked={onDateClicked}></Calendar>
        </div>
      </div>
      <div>Panel Task</div>
    </div>
  );
}
