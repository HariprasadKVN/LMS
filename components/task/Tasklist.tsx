"use client";
import { format } from "date-fns";
import {
  CheckIcon,
  XMarkIcon,
  RocketLaunchIcon,
} from "@heroicons/react/24/outline";
import { ITask } from "@/models/ITask";
import UCTable from "../ui/table/table";
import UCTableHeader from "../ui/table/thead";
import UCTableBody from "../ui/table/tbody";
import UCTableRow from "../ui/table/tr";
import UCTableHeaderCell from "../ui/table/th";
import UCTableCell from "../ui/table/td";

interface tasksList extends ITask {
 // current?: boolean;
}

interface Props {
  tasks: tasksList[];
  setStatus: (primaryId: string, status: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, setStatus }) => {
  // const [selected, setSelected] = useState(false);
  // const columns = [
  //   { header: "TaskId", key: "task_id"},
  //   { header: "Description", key: "task_desc"},
  //   { header: "Assigned to", key: "assigned_to" },
  //   { header: "Estimate", key: "estimate"},
  //   { header: "Start by", key: "start_date"},
  //   { header: "End Before", key: "end_date"},
  //   { header: "Status", key: "status"},
  //   { header: "Action", key: "status"},
  // ];

  /* const data = [
    { name: "John Doe", age: 30, email: "john@example.com" },
    { name: "Jane Smith", age: 25, email: "jane@example.com" },
    // Add more rows as needed
  ]; */

  // console.log(tasks);

  return (
    <div className="overflow-x-auto ">
     {/*  <Table columns={columns} data={tasks} /> */}
      <UCTable className="w-full text-sm table-auto">
        <UCTableHeader className="text-sm w-full">
          <UCTableRow className="border-b w-full">
            <UCTableHeaderCell >Project</UCTableHeaderCell>
            <UCTableHeaderCell >Task</UCTableHeaderCell>
            <UCTableHeaderCell >Start By</UCTableHeaderCell>
            <UCTableHeaderCell >End Before</UCTableHeaderCell>
            <UCTableHeaderCell >Status</UCTableHeaderCell>
            <UCTableHeaderCell >Action</UCTableHeaderCell>
          </UCTableRow>
        </UCTableHeader>
        <UCTableBody className="w-full text-xs">
          {tasks.map((task, index) => (
            <UCTableRow key={index} className="border-b text-center ">
              <UCTableCell className="text-left">{task.project}|{task.sprint}|{task.taskId} </UCTableCell>
              <UCTableCell className="text-left text-wrap">
                {task.taskDesc}
              </UCTableCell>
              <UCTableCell className="text-center">
                {format(task.startDate ? task.startDate : "", "MMM dd, yyyy")}
              </UCTableCell>
              <UCTableCell className="text-center">
                {format(task.endDate ? task.endDate : "", "MMM dd, yyyy")}
              </UCTableCell>
              <UCTableCell className="text-center">{task.status}</UCTableCell>
              <UCTableCell>
                <div className="flex flex-row justify-center">
                  {task.status === "assigned" && (
                    <RocketLaunchIcon
                      className="h-4
                      hover:cursor-pointer 
                      hover:text-blue-500"
                      onClick={() =>
                        setStatus(task.pid ? task.pid :"", "in progress")
                      }
                    ></RocketLaunchIcon>
                  )}
                  {task.status === "in progress" && (
                    <>
                      <CheckIcon
                        className="h-4 hover:text-green-700"
                        onClick={() =>
                          setStatus(task.pid ? task.pid : "", "completed")
                        }
                      ></CheckIcon>
                      <XMarkIcon
                        className="h-4 hover:text-red-700"
                        onClick={() =>
                          setStatus(task.pid ? task.pid : "", "aborted")
                        }
                      ></XMarkIcon>
                    </>
                  )}
                </div>
              </UCTableCell>
            </UCTableRow>
          ))}
        </UCTableBody>
      </UCTable>
    </div>
  );
};

export default TaskList;
