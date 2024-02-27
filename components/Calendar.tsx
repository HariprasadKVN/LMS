import clsx from "clsx";
import { useState } from "react";

const Header: React.FC = () => {
  const date = new Date();

  return (
    <div className="p-2">
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
  console.log("component created");
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
    <div className="flex flex-row p-2">
      <div
        className="hover:bg-white 
        hover:text-black"
        onClick={previous}
      >
        {"<"}
      </div>
      <div className="flex-grow text-center font-bold">
        {date.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
      </div>
      <div onClick={next}>{">"}</div>
    </div>
  );
};

const Weekday: React.FC = () => {
  return (
    <div className="grid grid-cols-7 text-center font-bold">
      <div>Mon</div>
      <div>Tue</div>
      <div>Wed</div>
      <div>Thu</div>
      <div>Fri</div>
      <div className="bg-red-500/50">Sat</div>
      <div className="bg-red-500/50">Sun</div>
    </div>
  );
};

const Calendar: React.FC<{
  events?: { date: Date; description: string }[];
  weekstart?: string;
  weekend?: string;
}> = ({ events, weekstart, weekend }) => {
  const today = new Date();
  const [x, setX] = useState<Date>(today);

  const dateChanged = (date: Date) => {
    setX(date);
  };

  return (
    <div className="border rounded">
      <Header></Header>
      <Navigate date={x} navigate={dateChanged}></Navigate>
      <Weekday></Weekday>
      <Days date={x} />
      <Footer />
    </div>
  );
};

const Days: React.FC<{ date: Date }> = ({ date }) => {
  let emidsHolidays = getHolidays();
  const dates: {
    date: Date;
    current: boolean;
    eventType?: "Fixed" | "Optional";
    desc?: string;
    currentDayState?: number;
    applyLeave?: () => void;
  }[] = [];
  let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
  let current: boolean = false;

  for (let index = 0; index < 42; index++) {
    let tempDate = new Date(startDate);
    tempDate.setDate(tempDate.getDate() + index);
    current = tempDate.getDate() == 1 ? !current : current;
    let holiday = emidsHolidays.find(
      (item) => item.date.toDateString() === tempDate.toDateString()
    );
    const [currentDayState, setCurrentDayState] = useState(0);
    const applyLeave = () => {
      setCurrentDayState((currentDayState + 1) % 5);
    };
    dates.push({
      date: tempDate,
      current: current,
      eventType: holiday?.type,
      desc: holiday?.desc,
      currentDayState: currentDayState,
      applyLeave: applyLeave,
    });
  }

  return (
    <div className="grid grid-cols-7">
      {dates.map((item, key) => (
        <Day
          key={key}
          date={item.date}
          current={item.current}
          eventType={item.eventType}
          desc={item.desc}
          currentDayState={item.currentDayState}
          applyLeave={item.applyLeave}
        ></Day>
      ))}
    </div>
  );
};

const Day: React.FC<{
  date: Date;
  current: boolean;
  eventType?: "Fixed" | "Optional";
  desc?: string;
  currentDayState?: number;
  applyLeave?: () => void;
}> = ({ date, current, eventType, desc, currentDayState, applyLeave }) => {
  const today: boolean = new Date().toDateString() === date.toDateString();
  const isWeekend: boolean = date.getDay() === 0 || date.getDay() === 6;

  return (
    <div
      className={clsx("text-center", {
        "bg-yellow-300": today,
        "hover:bg-blue-300": current,
        "text-slate-700/50": !current,
        "bg-green-500/50": eventType === "Fixed",
        "bg-green-700/50": eventType === "Optional",
        "bg-red-500/50": isWeekend,
        "bg-orange-500/50": currentDayState === 1,
        "bg-teal-500/50": currentDayState === 2,
        "bg-purple-500/50": currentDayState === 3,
      })}
      onClick={applyLeave}
    >
      {date.toLocaleDateString("en-IN", { day: "2-digit" })}
    </div>
  );
};

const Footer: React.FC = () => {
  return <div className="p-2">Footer</div>;
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
