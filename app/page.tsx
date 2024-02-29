"use client";
import Calendar from "@/components/Calendar";
import { event } from "@/model/event";
import { useState } from "react";

export default function Home() {
  const [events, setEvents] = useState<event[]>([
    { date: new Date(2024, 0, 1), description: "New Year", type: "fixed" },
    { date: new Date(2024, 0, 26), description: "Republic Day", type: "fixed" },
    { date: new Date(2024, 3, 9), description: "Ugadi", type: "fixed" },
    { date: new Date(2024, 4, 1), description: "May Day", type: "fixed" },
    {
      date: new Date(2024, 7, 15),
      description: "Independence Day",
      type: "fixed",
    },
    {
      date: new Date(2024, 9, 2),
      description: "Gandhi Jayanti",
      type: "fixed",
    },
    {
      date: new Date(2024, 10, 1),
      description: "Karnataka Rajyotsava",
      type: "fixed",
    },
    { date: new Date(2024, 2, 25), description: "Holi", type: "optional" },
    {
      date: new Date(2024, 2, 29),
      description: "Good Friday",
      type: "optional",
    },
    {
      date: new Date(2024, 5, 17),
      description: "Eid al-Adha/Bakrid",
      type: "optional",
    },
    {
      date: new Date(2024, 7, 26),
      description: "Janmashtami",
      type: "optional",
    },
    { date: new Date(2024, 9, 31), description: "Diwali", type: "optional" },
    {
      date: new Date(2024, 11, 25),
      description: "Christmas",
      type: "optional",
    },
  ]);

  const getUpdateElement = (event: {
    date: Date;
    description: string;
    type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
    specialAllowed: boolean;
    optionalAllowed: boolean;
  }): event => {
    switch (event.type) {
      case undefined:
        event.type = "leave";
        break;
      case "optional":
        event.type = "optionalApplied";
        break;
      //From leave we can go to special, optionalApplied only if
      //they are available. If non is available we will cancel the leave
      case "leave":
        event.type = "special";
        break;
      case "special":
        event.type = "optionalApplied";
        break;
    }

    return event;
  };

  const onDateClicked = (date: Date) => {
    const event = events.find(
      (n) => n.date.toDateString() === date.toDateString(),
    );

    if (event) {
      //We will determine if we need to remove the event
      //Get the available types of leaves
      const specialAllowed =
        events.filter((event) => event.type === "special").length < 1;
      const optionalAllowed =
        (event.type == "optional" || event.type == "optionalApplied") &&
        events.filter((event) => event.type === "optionalApplied").length < 3;

      if (
        (event.type === "leave" && !(specialAllowed || optionalAllowed)) ||
        (event.type === "special" && !optionalAllowed)
      ) {
        const updatedArray = events.filter(
          (item, index) => item.date.toDateString() !== date.toDateString(),
        );

        setEvents(updatedArray);
      } else if (event.type === "optionalApplied") {
        const updateEvents = events.map((item, index) =>
          item.date.toDateString() === date.toDateString()
            ? {
              date:item.date,
              description:item.description,
              type:"optional" as "fixed" | "optional" | "optionalApplied" | "special" | "leave"
            }
            : item,
        );

        setEvents(updateEvents);
      } else if (event.type === "optional" && !optionalAllowed) {
      } else {
        const updateArray = events.map((item, index) =>
          item.date.toDateString() === date.toDateString()
            ? getUpdateElement({
                date: item.date,
                description: item.description,
                type: item.type,
                specialAllowed: specialAllowed,
                optionalAllowed: optionalAllowed,
              })
            : item,
        );

        setEvents(updateArray);
      }
    } else {
      console.log("push");
      setEvents([...events, { date: date, description: "", type: "leave" }]);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row p-2">
        <div className="flex-none">
          <table>
            <tbody>
              <tr>
                <td>Fixed</td>
                <td>{events.filter((item) => item.type === "fixed").length}</td>
              </tr>
              <tr>
                <td>Optional</td>
                <td>
                  {events.filter((item) => item.type === "optional").length +
                    events.filter((item) => item.type === "optionalApplied")
                      .length}
                </td>
              </tr>
              <tr>
                <td>Leave</td>
                <td>{events.filter((item) => item.type === "leave").length}</td>
              </tr>
              <tr>
                <td>Special</td>
                <td>
                  {events.filter((item) => item.type === "special").length}
                </td>
              </tr>

              <tr>
                <td>Optional Applied</td>
                <td>
                  {
                    events.filter((item) => item.type === "optionalApplied")
                      .length
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-grow">
          <Calendar events={events} onDateClicked={onDateClicked}></Calendar>
        </div>
      </div>
      <div>Panel Task</div>
    </div>
  );
}
