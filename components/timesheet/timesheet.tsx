import { useState } from "react";
import WeekView from "./Weekview";
import LogTime from "./logtime";
 
const TimeSheet = ()=>{
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };
  const week = getStartOfWeek(new Date());
const [currentDate , setCurrentDate] = useState(week);
 
const handleDateChange=(newCurrentDate:Date)=>{
setCurrentDate(newCurrentDate)
}
 
return <>
<WeekView handleDateChange = {handleDateChange}/>
<LogTime currentWeek={currentDate} />
</>
}
 
export default TimeSheet