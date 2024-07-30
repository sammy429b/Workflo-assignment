import { Clock3, Trash2 } from "lucide-react";
import EditJobPopup from "./EditJobPop";
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
      <div className="my-2 w-full rounded-lg border p-2 shadow-md">
        <div className="">
          <div className="my-2 flex items-center justify-between">
            <EditJobPopup />
            <Trash2 size={20} className="hover:cursor-pointer" onClick={handleDeleteTask} />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{task.title}</h3>
          </div>
        </div>
        <p>{task.description}</p>
        <div>
          <p
            className="max-w-max rounded px-2 py-1 text-white"
            style={{ background: priorityBlockColor[task.priority] }}
          >
            {task.priority}
          </p>
        </div>
        <div className="my-1 flex items-center gap-x-4">
          <Clock3 size={20} />
          <p>{updatedDateFormatter(task.deadline)}</p>
        </div>
        <p>{task.details}</p>
      </div>
    </>
  );
}

export default TaskCard;
