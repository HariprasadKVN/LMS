'use client'
import { useState } from "react";
import { EventContextProvider } from "@/store/eventContext";
import Task from "./components/task/Task";
import Input from "./components/input";


export default function Home() {
  const [date, setDate] = useState<string>("");

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

  return (
    <>
      <div className="text-sm">
        <div className="flex flex-row">
          <div> {'<'}</div>
          <div>Apr 28, 2024 - May 4, 2025</div>
          <div> {'>'}</div>
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
              <th className="border-collapse border border-slate-500 w-10">Done</th>
            </tr>
            <tr>

              <th className="border-collapse border border-slate-500 w-10 font-light">Apr 28</th>
              <th className="border-collapse border border-slate-500 w-10">Tue</th>
              <th className="border-collapse border border-slate-500 w-10">Wed</th>
              <th className="border-collapse border border-slate-500 w-10">Thu</th>
              <th className="border-collapse border border-slate-500 w-10">Fri</th>
              <th className="border-collapse border border-slate-500 w-10">Sat</th>
              <th className="border-collapse border border-slate-500 w-10">Sun</th>
              <th className="border-collapse border border-slate-500 w-10">Done</th>
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
              <td className="border-collapse border border-slate-500"></td>
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
              <td className="border-collapse border border-slate-500"></td>
            </tr>
          </tbody>
        </table>
      </div>
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