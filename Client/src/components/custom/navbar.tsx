import { DropdownMenuDemo } from './profile'
import { Button } from '../ui/button'
import { ArrowDownUp } from 'lucide-react'
import CreateTaskPopup from './createTaskPopup'
import axios from 'axios';
import { ApiConfig } from '@/utils/ApiConfig';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/useAuth';

function navbar() {
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
  return (
    <>
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
              <CreateTaskPopup />
            </div>
          </section>
        </header>

    </>
  )
}

export default navbar