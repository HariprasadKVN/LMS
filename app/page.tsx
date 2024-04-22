'use client'
import { useState } from "react";
import { EventContextProvider } from "@/store/eventContext";
import Task from "./components/task/Task";
import LeaveDetails from "./components/leave/LeaveDetails";
 
 
export default function Home() {
  //const [date, setDate] = useState<string>("");
  //tempDate.setDate(tempDate.getDate() + index);
  const [d, setD] = useState(new Date());
  const dayIndex = [0, 1, 2, 3, 4, 5, 6];
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const endDate = new Date();

  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
  endDate.setDate(startDate.getDate() + 6);

  const getDate = (date: Date | undefined): string => {

    if (date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero indexed
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    }
    else {
      return ""
    }


  }




  // const getAllocations = async () => {
  //   return await axios.get("/api/tasks");

  // };

  const setDate = (direction: 'next' | 'previous') => {

    console.log('------------------')
    console.log(startDate.toLocaleDateString('en-IN'))
    //make sure that the tempStart is always a Monday
    startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));
    console.log(startDate.toLocaleDateString('en-IN'))

    const newStart = new Date(startDate)

    if (direction === "next") {
      newStart.setDate(endDate.getDate() + 1);
    }
    else {
      newStart.setDate(startDate.getDate() - 1);
    }
    newStart.setDate(newStart.getDate() - ((newStart.getDay() + 6) % 7));
    endDate.setDate(newStart.getDate() + 6);

    console.log(newStart.toLocaleDateString('en-IN'))
    console.log(endDate.toLocaleDateString('en-IN'))
    //To trigger the start

    setStartDate(newStart)

  }



  return (
    <>
      <Task></Task>
      <LeaveDetails></LeaveDetails>
    </>
  );
}