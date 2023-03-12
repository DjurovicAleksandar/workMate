import { Link } from "react-router-dom";
import TaskTable from "./TaskTable";

function TaskManager() {
  return (
    <div className="container flex flex-col items-center justify-center ">
      <div className="self-start">
        <button className="text-black bg-white w-full h-[45px] rounded-lg text-center font-semibold text-[16px] active:scale-90 ease-in-out duration-200">
          <Link to="/add-task">ADD TASK</Link>
        </button>
        <button className="text-black bg-white w-full h-[45px] rounded-lg text-center font-semibold text-[16px] active:scale-90 ease-in-out duration-200">
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
