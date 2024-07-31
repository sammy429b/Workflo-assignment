import AddJobPopup from "@/components/custom/addJobPopup";
import { DropdownMenuDemo } from "@/components/custom/profile";
import TaskCard from "@/components/custom/taskCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useTaskBoard } from "@/context/useTaskBoard";
import { ApiConfig } from "@/utils/ApiConfig";
import axios from "axios";
import { ArrowDownUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Main = () => {
  const { getTask, taskBoard } = useTaskBoard();
  const { handleLogoutAuth } = useAuth();
  const navigate = useNavigate();
  const toggleLogout = async () => {
    try {
      const response = await axios.get(ApiConfig.logout, {
        withCredentials: true,
      });
      console.log(response);
      if (response) {
        handleLogoutAuth();
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   getTask();
  // }, []);

  // useEffect(() => {
  //   // setItems(taskBoard);
  // }
  //   , [taskBoard]);

  return (
    <>
      <div className="dark:bg- w-full bg-white">
        <header>
          <nav className="flex items-center justify-between border-b p-2">
            <h1 className="text-2xl font-semibold text-black dark:text-white">
              Tasko
            </h1>
            <div className="flex items-center justify-center gap-2 p-2">
              <DropdownMenuDemo toggleLogout={toggleLogout} />
            </div>
          </nav>
          <section className="flex items-center justify-end border-b py-2 pr-4">
            <div className="flex items-center justify-center gap-x-2">
              <Button variant="secondary">
                <ArrowDownUp />
              </Button>
              <AddJobPopup />
            </div>
          </section>
        </header>

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
      </div>
    </>
  );
};

export default Main;
