import { ApiConfig } from '@/utils/ApiConfig';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from './useAuth';

interface Item {
  id: string;
  title: string;
  bgcolor: string;
  item: TaskType[];
}
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

export const priorityBlockColor = {
  "low": "#0ECC5A",
  "medium": "#FFA235",
  "high": "#bb54ae",
  "urgent": "#FF6B6B",
};

export const TaskBoardContext = createContext<any>(null);

export const useTaskBoard = () => {
  return React.useContext(TaskBoardContext);
}

export const JobBoardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  const { userId } = useAuth();
  const taskBoardData: Item[] = [
    { title: 'To do', id: 'to do', bgcolor: '#bb54ae', item: [] },
    { title: 'In progress', id: 'in progress', bgcolor: "#8c46ed", item: [] },
    { title: 'Under review', id: 'under review', bgcolor: "#4aab9c", item: [] },
    { title: 'Completed', id: 'completed', bgcolor: "#f9d176", item: [] },
  ];
  const [taskBoard, setTaskBoard] = useState(taskBoardData);

  console.log("taskBoard", taskBoard);

  const getTask = async () => {
    try {
      const response = await axios.post(ApiConfig.getTask, { userId }, { withCredentials: true });
      if (response.status === 200) {
        const data = response.data;
        const updatedTaskBoard = taskBoardData.map((column) => {
          const tasks = data.tasks.find((item: any) => item._id === column.id);
          if (tasks) {
            column.item = [...tasks.tasks];
          }

          return column;
        });

        setTaskBoard(updatedTaskBoard);
      }
    } catch (error) {
      console.error(error);
    }
  }


  const addTask = async (task: TaskType) => {
    task = { ...task, userId };
    try {
      const response = await axios.post(ApiConfig.addTask, task, {
        withCredentials: true
      });
      console.log(response);
      if (response.status === 200) {
        const data = response.data;
        const updatedTaskBoard = taskBoardData.map((column) => {
          const tasks = data.tasks.find((item: any) => item._id === column.id);
          console.log(data.tasks);
          if (tasks) {
            column.item = [...tasks.tasks];
            console.log(column.item);
            console.log(column);
          }

          return column;
        });

        setTaskBoard(updatedTaskBoard);
      }

    } catch (error) {
      console.log(error);
    }
  }


  const deleteTask = async (taskId,status) => {
    console.log(taskId);
    try {
      const response = await axios.delete(ApiConfig.deleteTask, {
        withCredentials: true,
        data: { taskId }
      });
      console.log(response);
      if (response.status === 200) {
        const updatedTaskBoard = taskBoard.map((column) => {
          if (column.id === status) {

            column.item = column.item.filter((task) => task._id !== taskId);
            console.log(column.item);
          }
          return column;
        });
        setTaskBoard(updatedTaskBoard);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const value = {
    taskBoard,
    setTaskBoard,
    taskBoardData,
    getTask,
    addTask,
    deleteTask
  };


  useEffect(() => {
    getTask();
  }
, []);

  return (
    <TaskBoardContext.Provider value={value}>
      {children}
    </TaskBoardContext.Provider>
  );
};

