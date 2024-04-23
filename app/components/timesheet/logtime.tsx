import React, { useState, useEffect } from "react";
import axios from "axios";
import IAllocation from "@/models/allocation"; // Import the interface for allocation data
 
interface Task {
  taskId: number;
  taskName: string;
  checked: boolean;
}
 
interface TimeSheetProps {
  currentWeek: Date;
}
 
const LogTime: React.FC<TimeSheetProps> = ({ currentWeek }) => {
  const weekdays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];
 
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
 
  const [tasks, setTasks] = useState<Task[]>([]); // State to store tasks
  const [hours, setHours] = useState<number[][]>([]); // State to store hours for each task
 
  useEffect(() => {
    const getAllocations = async () => {
      try {
        const response = await axios.get<{
          success: boolean;
          data: IAllocation[];
        }>("/api/hari/tasks"); // Fetch allocation data
        const allocationData = response.data.data; // Extract the allocation data array
        if (Array.isArray(allocationData)) {
          const filteredTasks = allocationData
            .filter((allocation) => allocation.status === "in progress") // Filter tasks with status "in progress"
            .map((allocation) => ({
              taskId: allocation.id,
              taskName: allocation.task_desc || "",
              checked: false,
            })); // Map allocation data to Task interface
          setTasks(filteredTasks); // Set tasks state
          setHours(Array.from({ length: filteredTasks.length }, () => Array(7).fill(0))); // Initialize hours state with 0 values
        } else {
          console.error("Response data is not an array:", allocationData);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    getAllocations();
  }, []); // Fetch tasks on component mount
 
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
  const handleTextChange = (taskIndex: number, dayIndex: number, value: number) => {
    const newHours = [...hours];
    newHours[taskIndex][dayIndex] = value;
    setHours(newHours);
  };
 
  // Function to handle checkbox change
  const handleCheckboxChange = (taskIndex: number) => {
    const newTasks = [...tasks];
    newTasks[taskIndex] = {
      ...newTasks[taskIndex],
      checked: !newTasks[taskIndex].checked,
    };
    setTasks(newTasks);
  };
 
  // Function to render column headings
  const renderColumnHeadings = () => {
    const weekDays = getWeekdays();
    return (
      <tr className="border-b text-center">
        <th className="whitespace-nowrap px-4 py-2 text-left">Task</th>
        {weekDays.map((day, index) => (
          <th key={index} className="whitespace-nowrap px-4 py-2 text-center">
            {day.getDate()} {monthNames[day.getMonth()]} <br /> {weekdays[day.getDay()]}
          </th>
        ))}
        <th className="whitespace-nowrap px-4 py-2 text-left">Action</th>
      </tr>
    );
  };
 
  // Function to render task grid
  const renderTaskGrid = () => {
    const weekDays = getWeekdays(); // Get weekdays for the selected week
 
    return tasks.map((task, taskIndex) => (
      <tr className="border-b text-center" key={task.taskId}>
        <td className="whitespace-nowrap px-4 py-2 text-left">
          {task.taskName}
        </td>
        {weekDays.map((_, dayIndex) => (
          <td className="px-4 py-2 text-center" key={dayIndex}>
            <input
              type="number"
              value={hours[taskIndex]?.[dayIndex] ?? 0}
              onChange={(e) =>
                handleTextChange(taskIndex, dayIndex, parseInt(e.target.value))
              }
              className="w-12"
            />
          </td>
        ))}
        <td className="px-4 py-2 text-center">
          <input
            type="checkbox"
            checked={task.checked || false}
            onChange={() => handleCheckboxChange(taskIndex)}
          />
        </td>
      </tr>
    ));
  };
 
  return (
    <div className="overflow-x-auto">
      <h2>Time Sheet</h2>
      <table className="w-full text-sm">
        <thead>{renderColumnHeadings()}</thead>
        <tbody>{renderTaskGrid()}</tbody>
      </table>
      <button
        className="flex-shrink-0 rounded border-4 border-teal-500 bg-teal-500 px-2 py-1 text-sm text-white hover:border-teal-700 hover:bg-teal-700"
        disabled={tasks.filter(task => task.checked).length === 0}
      >
        Submit Selected Tasks
      </button>
    </div>
  );
};
 
export default LogTime;