import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
  useLocation,
} from "react-router-dom";
import Dashboard from "../Dashboard";
import Sidebar from "../Sidebar";
import Calendar from "../Calendar";
import UserInfo from "../UserInfo";
import TaskManager from "../TaskManager";
import LoginPage from "../loginAndLoading/LoginPage";
import AddUser from "../userAndTaskManagment/AddUser";
import UpdateUser from "../userAndTaskManagment/UpdateUser";
import UpdateTask from "../userAndTaskManagment/UpdateTask";
import AddTask from "../userAndTaskManagment/AddTask";
import AssignTask from "../userAndTaskManagment/AssignTask";
const Root = () => {
  return (
    <>
      <Sidebar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/update-user" element={<UpdateUser />} />
      <Route path="/task-manager" element={<TaskManager />} />
      <Route path="/add-task" element={<AddTask />} />
      <Route path="/update-task" element={<UpdateTask />} />
      <Route path="/assign-task" element={<AssignTask />} />
    </Route>
  )
);

export default router;
