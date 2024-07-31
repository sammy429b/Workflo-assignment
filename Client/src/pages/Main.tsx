import Sidebar from "@/components/custom/sidebar";
import TaskBoard from "./TaskBoard";
import Tooltips from "@/components/custom/tooltips";

function Main() {
  return (
    <div className="w-full flex flex-col-reverse md:flex-row border-t h-auto">
      <div className="w-full md:w-1/6 md:h-full boder-none md:border-r sticky bottom-0 md:static bg-white">
        <Sidebar />
      </div>
      <div className="w-full md:w-5/6 min-h-screen bg-[#f7f7f7]">
        <Tooltips/>
        <TaskBoard />
      </div>
    </div>
  );
}

export default Main;