import { BellDot, ChevronsRight, CircleDashed, Home, LayoutDashboard, LineChart, PlusCircle, Settings2, Users2 } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar"
import { ApiConfig } from "@/utils/ApiConfig";
import axios from "axios";
import { useAuth } from "@/context/useAuth";

function Sidebar() {
    const navigate = useNavigate();
    const{handleLogoutAuth} = useAuth();
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
    return (
        <>
            <div className="flex flex-col justify-center items-center gap-y-4 mt-8">
                <div className="">
                    <div className="flex justify-start gap-x-4 items-center  pl-8 pr-4">
                        <Avatar className="w-1/6 rounded-xl" >
                            <AvatarImage src="https://github.com/shadcn.png" className="rounded-xl" />
                            <AvatarFallback >CN</AvatarFallback>
                        </Avatar>
                        <p className="">Samy</p>
                    </div>
                    <div className="flex justify-between items-center mt-2 pl-8 pr-4">
                        <div className="flex items-center gap-x-2">
                            <BellDot />

                            <CircleDashed />
                            <ChevronsRight />
                        </div>
                        <div>
                            <Button variant={"secondary"} size={"sm"} onClick={toggleLogout}>Logout</Button>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-row justify-around md:justify-normal  md:flex-col gap-x-0 sm:gap-x-2 md:gap-y-4  pt-">
                    <Link to="/" className="text-xs sm:text-base md:text-md flex flex-col md:flex-row items-center justify-start pl-8 pr-4 hover:bg-slate-100">
                        <Home />
                        <Button className="text-md bg-transparent text-black hover:bg-slate-100">Home</Button>
                    </Link>

                    <Link to="/" className="text-xs sm:text-base md:text-md flex flex-col md:flex-row items-center justify-start pl-8 pr-4 hover:bg-slate-100">
                        <LayoutDashboard />
                        <Button className="text-md bg-transparent text-black hover:bg-slate-100">Boards</Button>
                    </Link>
                    <Link to="/" className="text-xs sm:text-base md:text-md flex flex-col md:flex-row items-center justify-start pl-8 pr-4 hover:bg-slate-100">
                        <Settings2 />
                        <Button className="text-md bg-transparent text-black hover:bg-slate-100">Settings</Button>
                    </Link>
                    <Link to="/" className="text-xs sm:text-base md:text-md flex flex-col md:flex-row items-center justify-start pl-8 pr-4 hover:bg-slate-100">
                        <Users2 />
                        <Button className="text-md bg-transparent text-black hover:bg-slate-100">Teams</Button>
                    </Link>
                    <Link to="/" className="text-xs sm:text-base md:text-md flex flex-col md:flex-row items-center justify-start pl-8 pr-4 hover:bg-slate-100">
                        <LineChart />
                        <Button className="text-md bg-transparent text-black hover:bg-slate-100">Analytics</Button>
                    </Link>

                </div>
                <div>
                    <Button className="bg-violet-700 text-white flex justify-start ml-4 mr-6 items-center gap-x-2 text-md hover:bg-violet-800">
                        Create new task
                        <PlusCircle size={20} />
                    </Button>
                </div>
            </div>
        </>
    )
}




export default Sidebar