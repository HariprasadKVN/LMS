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
}

interface Props {
  tasks: tasksList[];
  setStatus: (primaryId: string, status: string) => void;
}

const TaskList: React.FC<Props> = ({ tasks, setStatus }) => {
  return (
    <div className="overflow-x-auto ">
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
