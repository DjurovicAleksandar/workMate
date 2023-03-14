import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Marquee from "react-fast-marquee";
import { collection, getDocs } from "firebase/firestore";
import HourglassTopOutlinedIcon from "@mui/icons-material/HourglassTopOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import * as marqueefy from "@marqueefy/marqueefy";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { Link } from "react-router-dom";

const Dashboard = () => {
  // Initialize Marqueefy
  const marqueefyList = Array.prototype.slice.call(
    document.querySelectorAll(".marqueefy")
  );

  const marqueefyInstances = marqueefyList.map((m) => {
    return new marqueefy.Marqueefy(m);
  });
  //Employee and task list
  const [topFive, setTopFive] = useState([]);
  const [unassignedTasks, setUnassignedTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState("");
  const [activeTask, setActiveTask] = useState([]);

  const data = [
    { year: "2017", finishedTasks: 500 },
    { year: "2018", finishedTasks: 3500 },
    { year: "2019", finishedTasks: 2200 },
    { year: "2020", finishedTasks: 4000 },
    { year: "2021", finishedTasks: 5800 },
    { year: "2022", finishedTasks: 7850 },
  ];

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

      //Sorting data for top five

      const topEmployees = employeesListData
        .sort((a, b) => b.completedTasks - a.completedTasks)
        .slice(0, 5);

      //Filtering data for unassigned tasks
      const unassignTaskData = taskListData.filter(
        (task) => task.userAssigned === ""
      );

      //Getting completed tasks
      const finishedTaskSum = employeesListData.reduce(
        (a, e) => a + +e.completedTasks,
        0
      );
      //Currently active tasks
      const currentlyActiveTasks = employeesListData.filter(
        (employee) => employee.currentTask
      );

      setTopFive(topEmployees);
      setUnassignedTasks(unassignTaskData);
      setCompletedTasks(finishedTaskSum);
      setActiveTask(currentlyActiveTasks);
    })();
  }, []);

  return (
    <div className="container px-20 py-5">
      <div className="w-4/5 boxCon">
        <div className="md:flex gap-10">
          {/*BOX1*/}
          <div className="bg-blueCol p-4 rounded-md shadow-xl mb-1">
            <h2 className="mb-8 font-bold text-pinkCol tracking-wider p-2 text-center sm:text-left">
              Task tracker summary
            </h2>
            <div>
              {/*Currently*/}

              <div className="text-center sm:flex items-center justify-between mb- sm:mb-12">
                <div className="sm:flex gap-5">
                  <div className="hidden sm:block">
                    <HourglassTopOutlinedIcon />
                  </div>
                  <h2 className="text-pinkCol text-xs sm:text-[1rem]">
                    Tasks currently active
                  </h2>
                </div>
                <p className="ml-2 font-bold">{activeTask.length}</p>
              </div>

              {/*Unassigned*/}

              <div className="text-center sm:flex items-center justify-between mb-2 sm:mb-12">
                <div className="sm:flex gap-5">
                  <div className="hidden sm:block">
                    <AssignmentOutlinedIcon />
                  </div>
                  <h2 className="text-pinkCol  text-xs sm:text-[1rem]">
                    Unassigned task count
                  </h2>
                </div>
                <p className="ml-2 font-bold">{unassignedTasks.length}</p>
              </div>

              {/*Accomplished*/}

              <div className="text-center sm:flex items-center justify-between mb-2 sm:mb-0">
                <div className="sm:flex gap-5">
                  <div className="hidden sm:block">
                    <AssignmentTurnedInOutlinedIcon />
                  </div>
                  <h2 className="text-pinkCol  text-xs sm:text-[1rem]">
                    Accomplished tasks this year
                  </h2>
                </div>
                <p className="ml-2 font-bold">{completedTasks}</p>
              </div>
            </div>
          </div>
          {/*Box2*/}
          <div className=" bg-pinkCol p-4 rounded-md shadow-xl mb-1">
            <h2 className="mb-8 font-bold text-blueCol tracking-wider p-2 text-center sm:text-left">
              Unassigned task registry
            </h2>
            <div className="flex flex-col gap-2  overflow-y-auto  scrollbar-hide h-[100px] md:h-[220px]">
              {unassignedTasks.map(({ taskName, id }) => {
                return (
                  <div className="text-xs text-blueCol " key={id}>
                    {taskName}
                  </div>
                );
              })}
            </div>
          </div>
          {/*Box3*/}
          <div className=" bg-blueCol p-4 rounded-md shadow-xl">
            <h2 className="mb-8 font-bold text-pinkCol tracking-wider p-2 text-center sm:text-left">
              Top five employees
            </h2>
            <ul className="h-[120px] md:h-[180px] overflow-y-auto scrollbar-hide">
              {topFive.map(({ fullName, jobTitle, completedTasks, id }) => {
                return (
                  <li
                    key={id}
                    className="text-xs sm:text-m flex border-b-[1px] gap-8 border-pinkCol"
                  >
                    <div className="w-[150px]">
                      <h3 className="text-pinkCol ">{fullName}</h3>
                      <p className="font-semibold mb-2">{jobTitle}</p>
                    </div>
                    <div className="w-[150px]">
                      <h3 className="text-pinkCol">Tasks completed</h3>
                      <p className="font-semibold">{completedTasks}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/*graph*/}
        <div className="hidden md:flex mt-20  items-center justify-center mb-1">
          <LineChart
            width={
              screen.width <= 1000 ? 350 : screen.width <= 1200 ? 600 : 800
            }
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
  );
};

export default Dashboard;
