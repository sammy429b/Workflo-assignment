import { DropdownMenuDemo } from './profile'
import { Button } from '../ui/button'
import { ArrowDownUp } from 'lucide-react'
import AddJobPopup from './addJobPopup'

function navbar() {
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
              <AddJobPopup />
            </div>
          </section>
        </header>

    </>
  )
}

export default navbar