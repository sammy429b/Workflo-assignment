import { Clock3, GripHorizontal } from "lucide-react"
import EditJobPopup from "./EditJobPop"
import { priorityBlockColor } from "@/context/useTaskBoard";

const updatedDateFormatter = (date: string) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const month = dateObj.getMonth() + 1;
    const year = dateObj.getFullYear();
    return `${year}-${month}-${day}`;
}

function TaskCard({ task }) {
    return (
        <>
            <div className="w-full p-2 my-2 rounded-lg shadow-md border">
                <div className="">
                    <div className="flex items-center justify-between my-2">
                        <EditJobPopup />
                        <GripHorizontal size={20} className="hover:cursor-pointer" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">{task.title}</h3>
                    </div>
                </div>
                <p>{task.description}</p>
                <div>
                    <p className="text-white max-w-max rounded px-2 py-1" style={{ background: priorityBlockColor[task.priority] }}>{task.priority}</p>
                </div>
                <div className="flex gap-x-4 items-center my-1">
                    <Clock3 size={20} />
                    <p>{updatedDateFormatter(task.deadline)}</p>
                </div>
                <p>{task.details}</p>
            </div>
        </>
    )
}

export default TaskCard