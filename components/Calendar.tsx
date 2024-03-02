import clsx from "clsx";
import { useState, useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import EventContext from "@/store/eventContext";

const Header: React.FC = () => {
  const date = new Date();

  return (
    <div className="rounded-t-md bg-slate-300/70 p-2 dark:bg-slate-800/70">
      {date.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        weekday: "long",
      })}
    </div>
  );
};

const Navigate: React.FC<{ date: Date; navigate: (date: Date) => void }> = ({
  date,
  navigate,
}) => {
  const next = (event: React.MouseEvent<HTMLDivElement>) => {
    const tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() + 1);
    navigate(tempDate);
  };

  const previous = (event: React.MouseEvent<HTMLDivElement>) => {
    const tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() - 1);
    navigate(tempDate);
  };

  return (
    <div className="flex flex-row p-1">
      <div
        className="rounded-md
          text-black/50
          dark:text-white/50
          hover:bg-slate-400/50
          hover:text-slate-800/75
          active:bg-slate-600/50
          active:text-slate-100
          dark:hover:bg-blue-300/50
          dark:hover:text-blue-300
          dark:active:bg-blue-600/50
          dark:active:text-blue-100"
        onClick={previous}
      >
        <ChevronLeftIcon className="h-6 w-6"></ChevronLeftIcon>
      </div>
      <div className="flex-grow  text-center font-bold">
        {date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </div>
      <div
        className="rounded-md
          text-black/50
          dark:text-white/50
          hover:bg-slate-400/50
          hover:text-slate-800/75
          active:bg-slate-600/50
          active:text-slate-100
          dark:hover:bg-blue-300/50
          dark:hover:text-blue-300
          dark:active:bg-blue-600/50
          dark:active:text-blue-100"
        onClick={next}
      >
        <ChevronRightIcon className="h-6 w-6"></ChevronRightIcon>
      </div>
    </div>
  );
};

const Weekday: React.FC = () => {
  return (
    <div className="grid grid-cols-7  text-center text-sm font-bold">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div className="bg-slate-300/70 dark:bg-slate-700/50">Sat</div>
      <div className="bg-slate-300/70 dark:bg-slate-700/50">Sun</div>
    </div>
  );
};

const Calendar: React.FC<{
  weekstart?: string;
  weekend?: string;
}> = ({ weekstart, weekend}) => {
  
  const today = new Date();
  const [x, setX] = useState<Date>(today);

  const dateChanged = (date: Date) => {
    setX(date);
  };

  return (
    <div
      className="m-1 select-none divide-y divide-slate-600/50 rounded-lg  border 
      border-slate-400 bg-gradient-to-b dark:border-slate-900       
      dark:from-slate-800/50 dark:to-slate-900/70"
    >
      <Header></Header>
      <Navigate date={x} navigate={dateChanged}></Navigate>
      <Weekday></Weekday>
      <Days date={x}  />
      <Footer />
    </div>
  );
};

const Days: React.FC<{
  date: Date;
}> = ({ date}) => {
  
  const {events} = useContext(EventContext);
  
  const dates: {
    date: Date;
    current: boolean;
    eventType?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
    desc?: string;
  }[] = [];
  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
  let current: boolean = false;

  for (let index = 0; index < 42; index++) {
    const tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + index);
    current = tempDate.getDate() == 1 ? !current : current;
    const holiday = events?.find(
      (item) => item.date.toDateString() === tempDate.toDateString(),
    );
    dates.push({
      date: tempDate,
      current: current,
      eventType: holiday?.type,
      desc: holiday?.description,
    });
  }

  return (
    <div className="grid grid-cols-7 text-sm">
      {dates.map((item, key) => (
        <Day
          key={key}
          date={item.date}
          current={item.current}
          eventType={item.eventType}
          desc={item.desc}          
        ></Day>
      ))}
    </div>
  );
};

const Day: React.FC<{
  date: Date;
  current: boolean;
  eventType?: "fixed" | "optional" | "optionalApplied" | "special" | "leave";
  desc?: string;  
}> = ({ date, current, eventType, desc }) => {
  const {onDateClicked} = useContext(EventContext);


  const today: boolean = new Date().toDateString() === date.toDateString();
  const isWeekend: boolean = date.getDay() === 0 || date.getDay() === 6;

  const onClick = () => {
    onDateClicked && onDateClicked(date);
  };

  return (
    <div
      className={clsx("text-center ", {
        "bg-yellow-300/50 shadow-md shadow-violet-700/50 outline outline-2 outline-yellow-400/50 dark:bg-indigo-300/75 dark:outline-indigo-700":
          today,
        "text-violet-900/70": today,
        "dark:hover:bg-slate-500/50": current && !isWeekend,
        "hover:cursor-pointer hover:bg-blue-300": current,
        "text-slate-500/70 dark:text-slate-500/75": !current,
        "rounded-md bg-green-700/75 dark:bg-teal-300/50": eventType === "fixed",
        "rounded-md bg-teal-300/75 dark:bg-teal-300/70": eventType === "optional",
        "rounded-md bg-sky-500/50 dark:bg-sky-500/50": eventType === "leave",
        "rounded-md bg-violet-500/50 dark:bg-violet-500/50": eventType === "special",
        "rounded-md bg-fuchsia-500/50 dark:bg-indigo-500/50":
          eventType === "optionalApplied",
        "bg-slate-300/70 dark:bg-slate-700/50": isWeekend,
      })}
      onClick={onClick}
    >
      {date.toLocaleDateString("en-IN", { day: "2-digit" })}
    </div>
  );
};

const Footer: React.FC = () => {
  return <div className=" p-2">Footer</div>;
};

function getHolidays() {
  /*  const holidays = await fs.readFile(process.cwd() + "mock-data/holidays.json", "utf8");
  return holidays; */
  const holidays: { type: "Fixed" | "Optional"; date: Date; desc: string }[] = [
    { type: "Fixed", date: new Date(2024, 0, 1), desc: "New Year" },
    { type: "Fixed", date: new Date(2024, 0, 26), desc: "Republic Day" },
    { type: "Optional", date: new Date(2024, 1, 26), desc: "Rest Day" },
  ];
  return holidays;
}

export default Calendar;
