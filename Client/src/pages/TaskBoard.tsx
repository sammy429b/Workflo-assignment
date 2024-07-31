import TaskCard from "@/components/custom/taskCard";
import { useTaskBoard } from "@/context/useTaskBoard"

function TaskBoard() {
    const {taskBoard} = useTaskBoard();
  return (
    <>
        <div className="w-full">
          <div className="my-2 mt-10 flex w-full items-center justify-end py-2 pr-4 md:mt-0"></div>
          <div className="h-screen w-full ">
            <div className="flex h-[15rem] w-full flex-row items-start justify-around">
              {taskBoard.map((column) => (
                <div key={column.id} className="w-1/5">
                  <div className="h-auto w-full rounded-lg border p-4 shadow-md">
                    <div
                      className="flex w-full justify-start gap-x-1 rounded p-2 text-white"
                      style={{ backgroundColor: column.bgcolor }}
                    >
                      <h2 className="text-lg font-semibold">{column.title}</h2>
                      <p>({column.item.length})</p>
                    </div>
                    <div className="mt-4 flex w-full flex-col">
                      {column.item.map((task,index) => (
                        <TaskCard task={task} key={index} status={column.id} taskId={task._id} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
    </>
  )
}

export default TaskBoard