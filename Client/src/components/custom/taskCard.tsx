import { Clock3, Trash2 } from "lucide-react";
import EditTaskPopup from "./editTaskPop";
import { priorityBlockColor, useTaskBoard } from "@/context/useTaskBoard";

const updatedDateFormatter = (date: string) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};

function TaskCard({ task, status, taskId }) {
    const { deleteTask } = useTaskBoard();

    const handleDeleteTask = async() => {
        try {
           await deleteTask(taskId, status);
        } catch (error) {
            console.log(error);
        }
    }
        

  return (
    <>
      <div className="my-2 w-full rounded-lg border p-2 shadow-md text-[#757575] bg-[#F9F9F9]">
        <div className="mb-1">
          <div className="my-1 flex items-center justify-between">
            <EditTaskPopup task={task} status={status} taskId={taskId} />
            <Trash2 size={20} className="hover:cursor-pointer" onClick={handleDeleteTask} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#606060]">{task.title}</h3>
          </div>
        </div>
        <p className="mb-1">{task.description}</p>
        <div>
          <p
            className="max-w-max rounded px-2 py-1 text-white text-sm"
            style={{ background: priorityBlockColor[task.priority] }}
          >
            {task.priority}
          </p>
        </div>
        <div className="my-2 flex items-center gap-x-4 font-semibold">
          <Clock3 size={20} />
          <p>{updatedDateFormatter(task.deadline)}</p>
        </div>
        {/* <p>{}</p> */}
      </div>
    </>
  );
}

export default TaskCard;
