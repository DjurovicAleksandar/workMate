import { Link } from "react-router-dom";
import TaskTable from "../taskManagment/TaskTable";

function TaskManager() {
  return (
    <div className="container flex flex-col items-center px-32 pt-8">
      <div className="self-start mb-10">
        <button className="mr-4 px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-center font-semibold text-[16px] hover:scale-110 active:scale-90 ease-in-out duration-500">
          <Link to="/add-task">ADD TASK</Link>
        </button>
        <button className="px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-center font-semibold text-[16px] hover:scale-110 active:scale-90 ease-in-out duration-500">
          <Link to="/assign-task">ASSIGN TASK</Link>
        </button>
      </div>
      <div className="w-4/5">
        <TaskTable />
      </div>
    </div>
  );
}

export default TaskManager;
