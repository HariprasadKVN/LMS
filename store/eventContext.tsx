import { createContext } from "react";

const EventContext = createContext<{
  events: {
    date: Date;
    description: string;
    type?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
  }[];
  onDateClicked: (date: Date) => void;
}>({ events: [], onDateClicked: (date: Date) => {} });

export default EventContext;
