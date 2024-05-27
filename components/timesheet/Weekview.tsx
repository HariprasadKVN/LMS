import React, { useState } from "react";
import Button from "../ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

interface Props {
  handleDateChange: (newCurrentDate: Date) => void;
}

const WeekView: React.FC<Props> = ({ handleDateChange }) => {
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
      <div className="flex flex-row bg-blue-950/90 dark:bg-teal-600 p-2 rounded select-none">
        <div className="flex-none content-center text-center text-white">
          <ChevronLeftIcon
            onClick={goToPreviousWeek}
            className="h-6 w-6 cursor-pointer text-white hover:bg-blue-300 rounded"
          />
        </div>
        <div className="grow content-center text-center text-white">
          <span>{formatWeekRange()}</span>
        </div>
        <div className="flex-none content-center text-center text-white">
          <ChevronRightIcon
            onClick={goToNextWeek}
            className="h-6 w-6 cursor-pointer text-white hover:bg-blue-300 rounded"
          />
        </div>
      </div>
  );
};

export default WeekView;
