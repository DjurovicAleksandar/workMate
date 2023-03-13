import { auth, db } from "../config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateTask() {
  const navigate = useNavigate();
  const location = useLocation();
  const updateInfoObj = location.state;

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");

  const updateTaskHandler = async (e) => {
    e.preventDefault();

    const taskId = updateInfoObj?.id;

    try {
      const taskDoc = doc(db, "tasks", taskId);

      await updateDoc(taskDoc, {
        taskName: taskName || updateInfoObj?.taskName,
        startDate: startDate || updateInfoObj?.startDate,
        dueDate: dueDate || updateInfoObj?.dueDate,
        taskDescription: taskDescription || updateInfoObj?.taskDescription,
        userAssigned: updateInfoObj?.userAssigned,
      });

      navigate("/task-manager", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container flex items-center justify-center px-12 py-4">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[400px] border p-4 bg-pinkCol rounded-lg shadow-lg"
        onSubmit={updateTaskHandler}
      >
        <h1>{`Update task: ${updateInfoObj?.taskName}`}</h1>
        <input
          value={taskName}
          onChange={(e) =>
            setTaskName(e.target.value || updateInfoObj?.taskName)
          }
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder={`Task name: ${updateInfoObj?.taskName}`}
        />
        <input
          value={startDate || updateInfoObj?.startDate}
          onChange={(e) =>
            setStartDate(e.target.value || updateInfoObj?.startDate)
          }
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="date"
        />
        <input
          value={dueDate || updateInfoObj?.dueDate}
          onChange={(e) => setDueDate(e.target.value || updateInfoObj?.dueDate)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="date"
        />

        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder={updateInfoObj?.taskDescription}
          className="w-full resize-none p-4"
        />

        <div className="flex items-center justify-between w-full">
          <input
            type="submit"
            value="Update task"
            className="cursor-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[10px] sm:text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500"
          />
          <button className="curosr-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[10px] sm:text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500">
            <Link to="/task-manager">Go back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateTask;
