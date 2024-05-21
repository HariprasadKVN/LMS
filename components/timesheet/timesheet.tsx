"use client";
import { useEffect, useState } from "react";
import WeekView from "./Weekview";
import LogTime from "./logtime";
import { getInprogressTasks } from "@/lib/timesheetActions";
import { TaskEffort } from "@/models/taskEffort";
import { auth } from "@/lib/actions";
import Loading from "@/app/loading";

const TimeSheet = () => {
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  const week = getStartOfWeek(new Date());
  const [currentDate, setCurrentDate] = useState(week);
  const [timeSheetTasks, setTimeSheetTasks] = useState<TaskEffort>({});

  const handleDateChange = (newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const user = await auth();
        let tasks = await getInprogressTasks(currentDate, user?.user?.id!, user?.user?.name!);
        tasks = { ...tasks, empId: user?.user?.id! };
        setTimeSheetTasks(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getTasks(); 
  }, [currentDate]);

  return (
    <>
      <WeekView handleDateChange={handleDateChange} />
      <LogTime currentWeek={currentDate} timeSheetData={timeSheetTasks} />
    </>
  );
};

export default TimeSheet;