import React, { useState, useEffect } from "react";
import Button from "@/components/ui/button";
import { logTime } from "@/lib/timesheetActions";
import { TimeSheet } from "@/models/TimeSheet";
import UCTable from "../ui/table/table";
import UCTableHeader from "../ui/table/thead";
import UCTableBody from "../ui/table/tbody";
import UCTableRow from "../ui/table/tr";
import UCTableCell from "../ui/table/td";
import UCTableHeaderCell from "../ui/table/th";
import toast from "react-hot-toast";

interface effort {
  date: Date;
  effort: number;
}

interface Task {
  taskId?: string;
  taskName: string;
  status: boolean;
  efforts: Array<effort>;
}

interface TimeSheetProps {
  currentWeek: Date;
  timeSheetData: TimeSheet[];
}

const LogTime: React.FC<TimeSheetProps> = ({ currentWeek, timeSheetData }) => {
  const [tasks, setTasks] = useState<TimeSheet[]>([]); // State to store tasks

  let timeSheets: TimeSheet[] = [];
  useEffect(() => {
    const getAllocations = async () => {
      try {
        console.log(timeSheetData);
        setTasks(timeSheetData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllocations();
  }, [timeSheetData]); // Fetch tasks on component mount

  // Function to get the current week's weekdays
  const getWeekdays = () => {
    const weekStart = new Date(currentWeek);

    const weekdaysArr: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      weekdaysArr.push(day);
    }

    return weekdaysArr;
  };

  // Function to handle text input change
  const handleTextChange = (
    taskIndex: number,
    dayIndex: number,
    value: number,
    day: Date,
  ) => {
    const newtask = [...tasks];
    const newtaskindex = newtask[taskIndex].effort.findIndex(
      (effort) =>
        effort.date.getDate() === day.getDate() &&
        effort.date.getMonth() === day.getMonth() &&
        effort.date.getFullYear() === day.getFullYear(),
    );
    console.log("indexfind", newtaskindex);
    if (newtaskindex === -1) {
      newtask[taskIndex].effort.push({ date: day, effort: value });
    } else {
      newtask[taskIndex].effort[newtaskindex].effort = value;
    }
    console.log("newtask", newtask);
    setTasks(newtask);

    console.log("task", tasks);
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (taskIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      status:
        newTasks[taskIndex].status === "in progress"
          ? "completed"
          : "in progress",
    };
    setTasks(newTasks);
  };

  // Function to submit logs
  const submitLog = async () => {
    const updatedTasks = await logTime(tasks);
    console.log(updatedTasks);
    toast.success("Timesheet data has been submitted sucessfully", {
      duration: 5000,
    });
  };

  // Function to render column headings
  const renderColumnHeadings = () => {
    const weekDays = getWeekdays();
    return (
      <UCTableRow>
        <UCTableHeaderCell>Task</UCTableHeaderCell>
        {weekDays.map((day, index) => (
          <UCTableHeaderCell key={index}>
            {day.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              weekday: "short",
            })}
          </UCTableHeaderCell>
        ))}
        <UCTableHeaderCell>Action</UCTableHeaderCell>
      </UCTableRow>
    );
  };

  // Function to render task grid
  const renderTaskGrid = () => {
    return tasks.map((task, taskIndex) => (
      <UCTableRow key={task.taskId}>
        <UCTableCell>{task.taskName}</UCTableCell>
        {task.effort.map((day, dayIndex) => (
          <UCTableCell key={dayIndex}>
            <>
              <input
                type="number"
                value={day.effort.toString()}
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  if (inputValue <= 9) {
                    handleTextChange(taskIndex, dayIndex, inputValue, day.date);
                  }
                }}
                className="w-12"
                max="9"
                min="0"
              />
            </>
          </UCTableCell>
        ))}
        <UCTableCell>
          <input
            type="checkbox"
            checked={task.status === "in progress" ? false : true}
            onChange={() => handleCheckboxChange(taskIndex)}
          />
        </UCTableCell>
      </UCTableRow>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <UCTable>
        <UCTableHeader>{renderColumnHeadings()}</UCTableHeader>
        <UCTableBody>{renderTaskGrid()}</UCTableBody>
      </UCTable>
      <div className="whitespace-nowrap px-4 py-2 text-right ">
        <Button onClick={submitLog}>Submit</Button>
      </div>
    </div>
  );
};

export default LogTime;
