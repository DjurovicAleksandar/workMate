import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import Table from "../reusableComponenets/TableReusable";

function TaskManager() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.currentUser) navigate("/", { replace: true });
  }, []);

  return (
    <div className="container flex flex-col items-center px-16 pt-8">
      <div className="self-start mb-5 flex">
        <button className="mr-4 px-3 md:px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-xs md:text-[14px] text-center md:font-semibold text-[16px] hover:scale-110 active:scale-90 ease-in-out duration-500">
          <Link to="/add-task">ADD TASK</Link>
        </button>
        <button className="px-3 md:px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-xs md:text-[14px] text-center md:font-semibold text-[16px] hover:scale-110 active:scale-90 ease-in-out duration-500">
          <Link to="/assign-task">ASSIGN TASK</Link>
        </button>
      </div>
      <div className="w-4/5">
        <Table type="tasks" />
      </div>
    </div>
  );
}

export default TaskManager;
