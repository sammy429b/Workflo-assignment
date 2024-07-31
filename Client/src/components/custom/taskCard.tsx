import { Clock3, Trash2 } from "lucide-react";
import EditJobPopup from "./editTaskPop";
import { priorityBlockColor, useTaskBoard } from "@/context/useTaskBoard";

interface TaskType {
  _id?: string;
  title: string;
  status: string;
  priority: string;
  deadline: string;
  description: string;
  details: string;
  userId: string;
}

interface TaskCardProps {
  task: TaskType;
  status: string;
  taskId: string;
}

const updatedDateFormatter = (date: Date) => {
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${year}-${month}-${day}`;
};

function TaskCard({ task, status, taskId }: TaskCardProps) {
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
            <EditJobPopup task={task} taskId={taskId} />
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
            style={{ background: priorityBlockColor[task.priority as keyof typeof priorityBlockColor] }}
          >
            {task.priority}
          </p>
        </div>
        <div className="my-2 flex items-center gap-x-4 font-semibold">
          <Clock3 size={20} />
          <p>{updatedDateFormatter(new Date(task.deadline))}</p>
        </div>
        {/* <p>{}</p> */}
      </div>
    </>
  );
}

export default TaskCard;
