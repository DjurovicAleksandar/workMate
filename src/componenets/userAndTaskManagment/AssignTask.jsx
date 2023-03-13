import { useEffect, useState } from "react";
import { db } from "../config/firebase";

import { collection, doc, getDocs, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function AssignTask() {
  const navigate = useNavigate();

  //Employee and task list
  const [employeeList, setEmployeeList] = useState([]);
  const [taskList, setTaskList] = useState([]);

  //Option tag values
  const [employeeID, setEmployeeID] = useState("");
  const [taskID, setTaskID] = useState("");
  //Option tag titles
  const [employee, setEmployee] = useState("");
  const [task, setTask] = useState("");

  const assignTaskHandler = async (e) => {
    e.preventDefault();

    try {
      const employeeDoc = doc(db, "employees", employeeID);
      const taskDoc = doc(db, "tasks", taskID);

      await updateDoc(employeeDoc, {
        currentTask: task,
      });
      await updateDoc(taskDoc, {
        userAssigned: employee,
      });

      navigate("/user-info", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    (async () => {
      //Get collections for task and employees
      const taskData = await getDocs(collection(db, "tasks"));
      const employeeData = await getDocs(collection(db, "employees"));

      //Getting data for task list
      const taskListData = taskData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //Getting data for employee list
      const employeesListData = employeeData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //Filtering data from database

      //Allowing only tasks that do not have assigned user
      const dataTaskFilter = taskListData.filter(
        (task) => task.userAssigned === ""
      );

      //Allowing only users that do not have current task
      const dataEmployeesFilter = employeesListData.filter(
        (employee) => employee.currentTask === ""
      );

      setTaskList(dataTaskFilter);
      setEmployeeList(dataEmployeesFilter);
    })();
  }, []);

  return (
    <div className="container flex items-center justify-center px-12 py-4 rounded-lg h-screen">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[400px] border p-4 bg-pinkCol rounded-lg shadow-lg"
        onSubmit={assignTaskHandler}
      >
        <h1 className="font-bold text-blueCol text-xl">
          Task assigment to employee
        </h1>
        <label className="text-blueCol font-semibold" htmlFor="employees">
          Choose a employee
        </label>

        <select
          value={employeeID}
          onChange={(e) => {
            setEmployeeID(e.target.value);
            setEmployee(e.target.options[e.target.selectedIndex].title);
          }}
          id="employees"
          name="employees"
          className="text-m w-full rounded-md p-2"
        >
          <option value="">Select an option</option>
          {employeeList.map(({ fullName, jobTitle, id }) => {
            return (
              <option
                key={id}
                title={fullName}
                value={id}
              >{`${fullName}, ${jobTitle} `}</option>
            );
          })}
        </select>
        <label className="font-semibold text-blueCol" htmlFor="tasks">
          Choose a task
        </label>

        <select
          value={taskID}
          onChange={(e) => {
            setTaskID(e.target.value);
            setTask(e.target.options[e.target.selectedIndex].title);
          }}
          id="tasks"
          name="tasks"
          className="text-m w-full p-2 rounded-md"
        >
          <option value="">Select an option</option>
          {taskList.map((task) => {
            return (
              <option key={task.id} title={task.taskName} value={task.id}>
                {task.taskName}
              </option>
            );
          })}
        </select>

        <div className="flex items-center justify-between w-full mt-10">
          <input
            type="submit"
            value="Assign"
            className="cursor-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500"
          />
          <button className="cursor-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500">
            <Link to="/task-manager">Go back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}
export default AssignTask;
