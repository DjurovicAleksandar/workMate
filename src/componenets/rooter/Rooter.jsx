import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from "react-router-dom";

import Sidebar from "../loadLoginSidebar/Sidebar";

import LoginPage from "../loadLoginSidebar/LoginPage";

import Dashboard from "../mainPages/Dashboard";
import UserInfo from "../mainPages/UserInfo";
import TaskManager from "../mainPages/TaskManager";
import DashboardCalendar from "../mainPages/Calendar";

import AddUser from "../employeeManagment/AddUser";
import UpdateUser from "../employeeManagment/UpdateUser";

import UpdateTask from "../taskManagment/UpdateTask";
import AddTask from "../taskManagment/AddTask";
import AssignTask from "../taskManagment/AssignTask";

const Root = () => {
  const location = useLocation();
  const locationPath = location.pathname === "/";

  return (
    <>
      {!locationPath && <Sidebar />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/update-user" element={<UpdateUser />} />
      <Route path="/task-manager" element={<TaskManager />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/update-task" element={<UpdateTask />} />
      <Route path="/assign-task" element={<AssignTask />} />
      <Route path="/calendar" element={<DashboardCalendar />} />
    </Route>
  )
);

export default router;
