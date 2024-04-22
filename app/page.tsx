'use client'
import { useState } from "react";
import { EventContextProvider } from "@/store/eventContext";
import Task from "./components/task/Task";
import Input from "./components/input";
import { ArrowRightIcon, ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
import Button from "./components/button";
import { applyLeave, create, getEmployee } from "./lib/employeeActions";


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
      
      {/* <button onClick={() => {
        let x = new Date(d);
        x.setDate(x.getDate() + 1);
        setD(x);
      }}>{d.toLocaleDateString('en-US')}</button>

      <div className="text-sm">
        <div className="flex flex-row">
          <div className="flex-none w-6 h-6 m-1">
            <ArrowLeftIcon
              onClick={() => setDate("previous")}
              className="border dark:border-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:active:bg-teal-500 border-blue-950/90 bg-blue-700/50 hover:bg-blue-700 hover:text-white/50 active:bg-blue-700/50 active:text-inherit rounded-md" />
          </div>
          <div className="grow content-center text-center">
            {`${startDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'short' })} - ${endDate.toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: '2-digit', weekday: 'short' })}`}
          </div>
          <div className="flex-none w-6 h-6 m-1">
            <ArrowRightIcon
              onClick={() => setDate("next")}
              className="border dark:border-teal-300 dark:bg-teal-500 dark:hover:bg-teal-700 dark:active:bg-teal-500 border-blue-950/90 bg-blue-700/50 hover:bg-blue-700 hover:text-white/50 active:bg-blue-700/50 active:text-inherit rounded-md" />
          </div>
        </div>

        <table className="border-collapse border border-slate-500 table-auto w-full">
          <thead>
            <tr>
              <th className="border-collapse border border-slate-500" rowSpan={2}>Task</th>
              <th className="border-collapse border border-slate-500 w-10">Mon</th>
              <th className="border-collapse border border-slate-500 w-10">Tue</th>
              <th className="border-collapse border border-slate-500 w-10">Wed</th>
              <th className="border-collapse border border-slate-500 w-10">Thu</th>
              <th className="border-collapse border border-slate-500 w-10">Fri</th>
              <th className="border-collapse border border-slate-500 w-10">Sat</th>
              <th className="border-collapse border border-slate-500 w-10">Sun</th>
              <th className="border-collapse border border-slate-500 w-10" rowSpan={2}>Status</th>
            </tr>
            <tr>
              {dayIndex.map((item, index) => {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + item);
                return <th key={index} className="border-collapse border border-slate-500 w-10 font-light">
                  {date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit"
                  })}
                </th>
              })}
              
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-collapse border border-slate-500">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500">
                <CheckIcon className="w-5 h-5"></CheckIcon>
              </td>
            </tr>
            <tr>
              <td className="border-collapse border border-slate-500">The Sliding Mr. Bones (Next Stop, Pottersville)</td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500"><Input className="w-full" /></td>
              <td className="border-collapse border border-slate-500">Done</td>
            </tr>
          </tbody>
        </table>
        <div className="flex flex-row-reverse">
          <Button>Submit</Button>
        </div>
      </div> */}
      {/* <Task></Task> */}
      {/* <div className="flex flex-row">
        <div className="flex flex-col">
          <label className="text-xs">Project</label>
          <div className="content-center">
            <select>
              <option>
                Project 1
              </option>
              <option>
                Project 2
              </option>
              <option>
                Project 3
              </option>
            </select>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs">Task Id</label>
          <div className="content-center">
            <input placeholder="Task Id"></input>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="text-xs">Start Date</label>
          <div className="content-center">
            <input className="bg-inherit border border-slate-500 rounded"
              type="date" value={date}
              onChange={(e) => {
                setDate(e.target.value)
              }}
            />
          </div>
        </div>
      </div> */}
      {/* <EventContextProvider>
        <div className="flex flex-col">
          <div className="flex flex-row p-2">
            <div className="flex-none">
              <LeaveInfo></LeaveInfo>
            </div>
            <div className="flex-grow">
              <Calendar></Calendar>   
            </div>
          </div>
          <div>Panel Task</div>
        </div>
      </EventContextProvider> */}
    </>
  );
}