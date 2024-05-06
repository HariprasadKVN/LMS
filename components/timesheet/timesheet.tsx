"use client";
import { useEffect, useState } from "react";
import WeekView from "./Weekview";
import LogTime from "./logtime";
import { TimeSheet } from "@/models/TimeSheet";
import { getInprogressTasks } from "@/lib/timesheetActions";
import { toast } from 'react-hot-toast';

const TimeSheet = () => {
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  const week = getStartOfWeek(new Date());
  const [currentDate, setCurrentDate] = useState(week);
  const [timeSheetTasks, setTimeSheetTasks] = useState<TimeSheet[]>([]);

  const handleDateChange = (newCurrentDate: Date) => {
    setCurrentDate(newCurrentDate);
  };

  useEffect(() => {
    const getTasks = async () => {
      try {
        const tasks = await getInprogressTasks(currentDate);
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
