import React, { useState } from "react";
import LogTime from "./logtime";
import Button from "../ui/button";
 
interface Props {
  handleDateChange: (newCurrentDate: Date) => void;
}
 
const WeekView: React.FC<Props> = ({handleDateChange}) => {
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  const week = getStartOfWeek(new Date());
  const [currentWeek, setCurrentWeek] = useState(week);
 
  const goToPreviousWeek = () => {
    const previousWeek = new Date(currentWeek);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setCurrentWeek(previousWeek);
    handleDateChange(previousWeek);
  };
 
  const goToNextWeek = () => {
    const nextWeek = new Date(currentWeek);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setCurrentWeek(nextWeek);
    handleDateChange(nextWeek);
  };
 
  const formatWeekRange = () => {
    const startOfWeek = getStartOfWeek(new Date(currentWeek));
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);
    return `${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`;
  };
 
  return (
    <div>
      <h2>Week View</h2>
      <div className="flex bg-blue-950/90 dark:bg-teal-600">
        <div className="flex-none">
          <Button onClick={goToPreviousWeek}>{"<"}</Button>
        </div>
        <div className="grow content-center text-center text-white">
          <span>{formatWeekRange()}</span>
        </div>
        <div className="flex-none">
          <Button onClick={goToNextWeek}>{">"}</Button>
        </div>
      </div>
     
    </div>
  );
};
 
export default WeekView;