import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"; // Used for rendering the Line Chart
import { collection, getDocs } from "firebase/firestore"; // Used for getting data from Firebase
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined"; // Used for the hourglass icon
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined"; // Used for the check icon
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined"; // Used for the unassigned icon
import { useEffect, useState } from "react"; // Used for setting the state of the component
import { db } from "../config/firebase"; // Used for connecting to Firebase

// Dashboard component
const Dashboard = () => {
  // Employee and task list states
  const [topFive, setTopFive] = useState([]);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState("");
  const [activeTask, setActiveTask] = useState([]);

  // Data for the Line Chart
  const data = [
    { year: "2017", finishedTasks: 500 },
    { year: "2018", finishedTasks: 3500 },
    { year: "2019", finishedTasks: 2200 },
    { year: "2020", finishedTasks: 4000 },
    { year: "2021", finishedTasks: 5800 },
    { year: "2022", finishedTasks: 7850 },
  ];

  // useEffect hook to get data from Firebase
  useEffect(() => {
    (async () => {
      // Get collections for tasks and employees
      const taskData = await getDocs(collection(db, "tasks"));
      const employeeData = await getDocs(collection(db, "employees"));

      // Get data for task list
      const taskListData = taskData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Get data for employee list
      const employeesListData = employeeData.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      // Sort data for top five employees
      const topEmployees = employeesListData
        .sort((a, b) => b.completedTasks - a.completedTasks)
        .slice(0, 5);

      // Filter data for unassigned tasks
      const unassignTaskData = taskListData.filter(
        (task) => task.userAssigned === ""
      );

      // Get completed tasks
      const finishedTaskSum = employeesListData.reduce(
        (a, e) => a + +e.completedTasks,
        0
      );

      // Get currently active tasks
      const currentlyActiveTasks = employeesListData.filter(
        (employee) => employee.currentTask
      );

      // Set the states with the data from Firebase
      setTopFive(topEmployees);
      setUnassignedTasks(unassignTaskData);
      setCompletedTasks(finishedTaskSum);
      setActiveTask(currentlyActiveTasks);
    })();
  }, []);

  return (
    <div className="container flex items-center justify-center md:h-screen">
      <div className="overlay rounded-xl w-4/5 md:h-4/5 p-4 md:flex flex-col justify-between">
        <div className="flex flex-col gap-10 md:flex-row  md:justify-between">
          {/* Task Tracker Summary */}
          <div className="bg-blueCol p-4 rounded-md shadow-xl">
            <h2 className="mb-2 font-bold text-pinkCol tracking-wider">
              Task Tracker Summary
            </h2>
            <ul>
              <li>
                <div className="flex gap-2 mb-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <HourglassTopOutlinedIcon />
                    <p className="text-pinkCol font-semibold">
                      Tasks currently active
                    </p>
                  </div>
                  <p className="ml-2 font-bold">{activeTask.length}</p>
                </div>
              </li>
              <li>
                <div className="flex gap-2 mb-4">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <AssignmentOutlinedIcon />
                    <p className="text-pinkCol font-semibold">
                      Unassigned task count
                    </p>
                  </div>
                  <p className="ml-2 font-bold">{unassignedTasks.length}</p>
                </div>
              </li>
              <li>
                <div className="flex gap-2">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <AssignmentTurnedInOutlinedIcon />
                    <p className="text-pinkCol font-semibold">
                      Accomplished tasks so far
                    </p>
                  </div>
                  <p className="ml-2 font-bold">{completedTasks}</p>
                </div>
              </li>
            </ul>
          </div>
          {/* Unassigned Task Registry */}
          <div className="bg-pinkCol p-4 rounded-md shadow-xl overflow-y-auto scrollbar-hide h-[220px]">
            <h2 className="mb-2 font-bold text-blueCol tracking-wider">
              Unassigned task registry
            </h2>
            <ul className="flex flex-col gap-2">
              {unassignedTasks.map(({ taskName, id }) => {
                return (
                  <li className="text-xs text-blueCol" key={id}>
                    {taskName}
                  </li>
                );
              })}
            </ul>
          </div>
          {/* Top Five Employees */}
          <div className=" bg-blueCol p-4 rounded-md shadow-xl">
            <h2 className="mb-2 font-bold text-pinkCol tracking-wider">
              Top five employees
            </h2>
            <ul className="h-[180px] overflow-y-auto scrollbar-hide">
              {topFive.map(
                ({ fullName, jobTitle, currentTask, completedTasks, id }) => {
                  return (
                    <li
                      key={id}
                      className="text-xs flex border-b-[1px] gap-8 border-pinkCol"
                    >
                      <div className="w-[60px]">
                        <p className="font-semibold mb-2">{jobTitle}</p>
                        <h3 className="text-pinkCol ">{fullName}</h3>
                      </div>
                      <div className="w-[60px]">
                        <h3 className="text-pinkCol mb-3">Tasks completed</h3>
                        <p className="font-semibold">{completedTasks}</p>
                      </div>
                    </li>
                  );
                }
              )}
            </ul>
          </div>
        </div>

        {/* Line Chart */}
        <div className="flex flex-col md:flex-row justify-between items-center ">
          <div className="hidden md:block">
            <LineChart
              width={screen.width <= 1200 ? 700 : 1000}
              height={200}
              data={data}
            >
              <XAxis
                tick={{ fill: "#D3F5F5" }}
                tickLine={{ stroke: "#f87171" }}
                axisLine={{ stroke: "#f87171" }}
                dataKey="year"
              />
              <YAxis axisLine={{ stroke: "#f87171" }} />
              <CartesianGrid strokeDasharray="8 5" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="finishedTasks"
                stroke="#f87171"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
