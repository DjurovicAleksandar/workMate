import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";

import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
///GET MOVIE LIST MORA BITI POSEBNO STAVLJENA U FAJL I UPLOADAVA U SVE FALJOVE DA SE AUTOMSKI UPDATE UI
//PEDDROT TECH 56
///////////

/////

function AddTask() {
  const navigate = useNavigate();

  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [userAssigned, setUserAssigned] = useState("");

  const addTaskHandler = async (e) => {
    e.preventDefault();

    const taskRef = doc(db, "tasks", taskName);

    setDoc(taskRef, {
      taskName: taskName,
      taskDescription: taskDescription,
      startDate: startDate,
      dueDate: dueDate,
      userAssigned: userAssigned,
    });

    navigate("/task-manager", { replace: true });
  };

  return (
    <div className="container flex items-center justify-center py-4">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[400px] border p-4 bg-red-100 rounded-lg"
        onSubmit={addTaskHandler}
      >
        <h1>Create a new task</h1>
        <input
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder="Task title"
          required
        />

        <input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="date"
          placeholder="Start date"
          required
        />
        <input
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="date"
          placeholder="Due date"
          required
        />

        <textarea
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          placeholder="Task description..."
          className="w-full resize-none p-4"
        />
        <div className="flex items-center justify-between w-full">
          <input type="submit" value="Create task" className="cursor-pointer" />
          <button>
            <Link to="/user-info">Go back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
export default AddTask;
