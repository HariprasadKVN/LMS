"use client";
import UCInput from "../ui/input";
import UCButton from "../ui/button";
import UCSelect from "../ui/select";
import UCDate from "../ui/date";
import { useContext } from "react";
import LMSContext from "@/store/lmsContext";

const AddTask: React.FC = () => {
  let { onAddTask, taskModel, onTextChange } = useContext(LMSContext);

  return (
    <>
      {/* <form action={()=>{dispatch; post("Testing")}}> */}
      <div className="flex flex-col content-center justify-center space-y-0 pb-1 pt-0 text-sm">
        <div className="m-0 flex w-full flex-row space-x-0">
          <input hidden name="createdBy" value={"userId"} readOnly></input>
          <div className="w-1/3">
            <UCSelect
              options={["Select", "Decom", "Essette"]}
              className="w-full"
              label="Project"
              name="project"
              onChange={(e) => onTextChange("project", e.target.value)}
              value={taskModel.project === undefined ? "" : taskModel.project}
            ></UCSelect>
          </div>
          <div className="w-1/6">
            <UCInput
              label="Sprint"
              maxLength={4}
              type="text"
              className="w-full"
              placeholder="Sprint"
              name="sprint"
              onChange={(e) => onTextChange("sprint", e.target.value)}
              value={taskModel.sprint === undefined ? "" : taskModel.sprint}
            ></UCInput>
          </div>
          <div className="w-1/5">
            <UCInput
              label="Task Id"
              type="text"
              maxLength={8}
              className="w-full"
              placeholder="Task id"
              name="taskId"
              value={taskModel.taskId === undefined ? "" : taskModel.taskId}
              onChange={(e) => onTextChange("taskId", e.target.value)}
            ></UCInput>
          </div>
          <div className="w-1/4">
            <UCSelect
              options={[
                "Select",
                "Analysis",
                "Implementation",
                "Testing",
                "Review",
                "Deployment",
                "Documentation",
                "Self-learning",
                "Org Activity",
              ]}
              label="Task Type"
              name="taskType"
              className="w-full"
              value={taskModel.taskType === undefined ? "" : taskModel.taskType}
              onChange={(e) => onTextChange("taskType", e.target.value)}
            ></UCSelect>
          </div>
          <div className="col-span-2 w-1/4">
            <UCSelect
              options={[
                "Select",
                "Bhuvaneshwari Murkhandi",
                "Gajanan Tuppad",
                "Guddi Kumari",
                "HariPrasadVN",
                "Jishna George",
                "Madhu Gurukar",
                "Neha Prakash",
                "Rushikesh Thakare",
                "Suhaib Kazmi",
              ]}
              label="Assigned To"
              className="w-full"
              name="assignedTo"
              value={
                taskModel.assignedTo === undefined ? "" : taskModel.assignedTo
              }
              onChange={(e) => onTextChange("assignedTo", e.target.value)}
            ></UCSelect>
          </div>
        </div>
        <div className="mb-4 flex flex-row space-x-0">
          <div className=" col-span-2 w-1/2">
            <UCInput
              label="Description"
              type="text"
              className="w-full"
              placeholder="Description"
              name="taskDesc"
              required
              value={taskModel.taskDesc === undefined ? "" : taskModel.taskDesc}
              onChange={(e) => onTextChange("taskDesc", e.target.value)}
            ></UCInput>
          </div>
          <div className="col-span-2 w-1/5">
            <UCInput
              label="Estimate(Hrs)"
              type="number"
              min="0"
              className="w-full"
              placeholder="Estimate"
              name="estimate"
              value={taskModel.estimate === undefined ? "" : taskModel.estimate}
              onChange={(e) => onTextChange("estimate", e.target.value)}
            ></UCInput>
          </div>
          <div className=" col-span-2 w-1/4">
            <UCDate
              label="Start Date"
              className="w-full"
              id="startDate"
              name="startDate"
              value={
                taskModel.startDate === undefined
                  ? ""
                  : taskModel.startDate.toString()
              }
              onChange={(e) => onTextChange("startDate", e.target.value)}
            ></UCDate>
            <p className="text-xs text-red-600">
              {taskModel.errors?.startDate?.toString()}
            </p>
          </div>
          <div className="flex w-1/4">
            <div className="w-3/4">
              <UCDate
                label="End Date"
                className="w-full"
                id="endDate"
                name="endDate"
                value={
                  taskModel.endDate === undefined
                    ? ""
                    : taskModel.endDate.toString()
                }
                onChange={(e) => onTextChange("endDate", e.target.value)}
              ></UCDate>
              <p className="text-xs text-red-600">
                {taskModel.errors?.endDate?.toString()}
              </p>
            </div>
            <div className="mr-2 w-1/4 content-end">
              <UCButton type="button" className="w-full" onClick={onAddTask}>
                +
              </UCButton>
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
    </>
  );
};

export default AddTask;
