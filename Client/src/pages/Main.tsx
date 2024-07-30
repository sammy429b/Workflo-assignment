import AddJobPopup from "@/components/custom/addJobPopup";
import { DropdownMenuDemo } from "@/components/custom/profile";
import TaskCard from "@/components/custom/taskCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/useAuth";
import { useTaskBoard } from "@/context/useTaskBoard";
import { ApiConfig } from "@/utils/ApiConfig";
import axios from "axios";
import { ArrowDownUp } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Main = () => {
  const { getTask, taskBoard } = useTaskBoard();
  const { handleLogoutAuth } = useAuth();
  const navigate = useNavigate();
  const toggleLogout = async () => {
    try {
      const response = await axios.get(ApiConfig.logout, {
        withCredentials: true
      });
      console.log(response);
      if (response) {
        handleLogoutAuth();
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTask();
  }, []);

  // useEffect(() => {
  //   // setItems(taskBoard);
  // }
  //   , [taskBoard]);

  return (
    <>

      <div className="w-full bg-white dark:bg-">
        <header>
          <nav className="flex justify-between items-center p-2 border-b">
            <h1 className="text-2xl font-semibold dark:text-white text-black">Tasko</h1>
            <div className="flex justify-center gap-2 items-center p-2">
              <DropdownMenuDemo toggleLogout={toggleLogout} />
            </div>
          </nav>
          <section className="flex justify-end items-center py-2 border-b pr-4">
            <div className="flex justify-center items-center gap-x-2">
              <Button variant="secondary">
                <ArrowDownUp />
              </Button>
              <AddJobPopup />
            </div>
          </section>
        </header>

        <div className="w-full">
          <div className="mt-10 md:mt-0 w-full flex justify-end items-center overflow-hidden my-2 py-2 pr-4"></div>
          <div className="w-full h-screen overflow-x-scroll">
            <div className="flex flex-row justify-around items-start w-full h-[15rem]">
              {taskBoard.map((item) => (
                <div key={item.id} className="w-1/5">
                  <div className=" p-4 rounded-lg shadow-md w-full border h-auto">
                    <div className="w-full p-2 gap-x-1 flex justify-start text-white rounded" style={{ backgroundColor: item.bgcolor }}>
                      <h2 className="text-lg font-semibold">{item.title}</h2>
                      <p>({item.item.length})</p>
                    </div>
                    <div className="mt-4 flex flex-col w-full">
                      {item.item.map((task) => (
                        <TaskCard task={task} key={task._id} />
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
}

export default Main;
