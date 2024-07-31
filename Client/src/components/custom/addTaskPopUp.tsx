import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Calendar,
  CircleDashed,
  Pencil,
  Plus,
  Share2,
  Star,
  TriangleAlert,
} from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useForm, SubmitHandler } from "react-hook-form";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useTaskBoard } from "@/context/useTaskBoard";

interface TaskType {
  _id?: string;
  title: string;
  status: string;
  priority: string;
  deadline: Date;
  description: string;
  details: string;
  userId: string;
}

interface EditJobPopupProps {
  task: TaskType;
  status: string;
  taskId: string;
}

export default function AddTaskPopup({ initialStatus}) {

  const { addTask } = useTaskBoard();

  
  const [status, setStatus] = useState<string>("");
  const [priority, setPriority] = useState<string>("");
  
  const { register, handleSubmit, reset } = useForm<TaskType>();


  // Update form values when the task changes
  useEffect(() => {
    setStatus(initialStatus || "");
 
  }, []);

  const onSubmit = async (data: any) => {
    data = { ...data, status, priority };
    try {
      await addTask(data);
      reset()
    } catch (error) {
      console.log("Error adding task", error);
    }
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full flex justify-between items-center">
            Add task
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="scrollbar h-full w-4/5 max-w-screen-md overflow-y-auto rounded bg-slate-50 md:h-auto" >
          <DialogHeader>
            <div className="mt-4 flex w-full items-center justify-between">
              <DialogTitle className="text-2xl">Add Task</DialogTitle>
              <div className="flex">
                <Button
                  variant="secondary"
                  className="text-md mr-4 flex items-center justify-center gap-x-2"
                >
                  Favorite
                  <Star size={20} />
                </Button>
                <Button
                  variant="secondary"
                  className="text-md flex items-center justify-center gap-x-2"
                >
                  Share
                  <Share2 size={20} />
                </Button>
              </div>
            </div>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="text"
                className="h-15 w-full border-none bg-transparent py-2 text-5xl outline-none"
                placeholder="Title"
                {...register("title")}
              />
            </div>
            <div>
              <div className="my-3 flex items-center justify-start gap-x-4">
                <div className="flex w-1/5 items-center justify-between">
                  <CircleDashed />
                  <p>Status</p>
                </div>
                <div className="w-2/5">
                  <Select value={initialStatus} onValueChange={(value) => setStatus(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not Selected" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="to do" className="hover:bg-slate-100">To do</SelectItem>
                        <SelectItem value="in progress" className="hover:bg-slate-100">In Progress</SelectItem>
                        <SelectItem value="under review" className="hover:bg-slate-100">Under Review</SelectItem>
                        <SelectItem value="completed" className="hover:bg-slate-100">Completed</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="my-3 flex items-center justify-start gap-x-4">
                <div className="flex w-1/5 items-center justify-between">
                  <TriangleAlert size={20} />
                  <p>Priority</p>
                </div>
                <div className="w-2/5">
                  <Select value={priority} onValueChange={(value) => setPriority(value)}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Not Selected" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="low" className="hover:bg-slate-100">Low</SelectItem>
                        <SelectItem value="medium" className="hover:bg-slate-100">Medium</SelectItem>
                        <SelectItem value="urgent" className="hover:bg-slate-100">Urgent</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="my-3 flex items-center justify-start gap-x-4">
                <div className="flex w-1/5 items-center justify-between">
                  <Calendar size={20} />
                  <p>Deadline</p>
                </div>
                <div className="w-2/5">
                  <Input type="date" className="w-full" {...register("deadline")} />
                </div>
              </div>

              <div className="my-3 flex items-center justify-start gap-x-4">
                <div className="flex w-1/5 items-center justify-between">
                  <Pencil size={20} />
                  <p>Description</p>
                </div>
                <div className="w-2/5">
                  <Input
                    type="text"
                    {...register("description")}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="my-4 flex items-center justify-start gap-x-4">
                <Textarea
                  placeholder="Start writing, or drag your own files here."
                  className="focus-visible:ring-0"
                  {...register("details")}
                />
              </div>
            </div>
            <DialogFooter>
              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="secondary"
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save & Close
                </Button>
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
