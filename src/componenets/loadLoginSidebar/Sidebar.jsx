import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";

//Importing MUI icons
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

//logo import
import logo from "../../assets/imgs/logo.png";

function Sidebar() {
  const navigate = useNavigate();

  // Sidebar open/close state
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the sidebar open and closed
  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    // Adjusting the sidebar width and background color based on whether it is open or closed
    sidebar.style.width = isOpen ? "40px" : "200px";

    sidebar.style.backgroundColor = isOpen
      ? "rgb(248,113,113)"
      : "rgba(0,0,0,0.5)";
    setIsOpen(!isOpen);
  };

  // Function to log out the user and navigate to the home page
  const handleLogout = () => {
    signOut(auth);
    navigate("/", { replace: true });
  };

  // An array containing the menu items for the sidebar, which can be easily modified without changing the component's code
  const menuItems = [
    {
      link: "/",
      icon: <DashboardOutlinedIcon style={{ fontSize: "40px" }} />,
      label: "Dashboard",
    },
    {
      link: "/calendar",
      icon: <CalendarMonthOutlinedIcon style={{ fontSize: "40px" }} />,
      label: "Calendar",
    },
    {
      link: "/user-info",
      icon: <GroupOutlinedIcon style={{ fontSize: "40px" }} />,
      label: "Employee manager",
    },
    {
      link: "/task-manager",
      icon: <ListAltOutlinedIcon style={{ fontSize: "40px" }} />,
      label: "Task manager",
    },
  ];

  return (
    <div className="z-50 sidebar fixed w-[40px] bg-pinkCol h-full ease-in-out duration-700 flex flex-col items-center justify-between">
      <div className="mb-16">
        <img src={logo} alt="Logo" />
      </div>
      <button className="absolute top-0 right-[-35px]" onClick={toggleSidebar}>
        {isOpen ? (
          <ArrowCircleLeftOutlinedIcon
            style={{ fontSize: "30px", color: "rgb(248,113,113)" }}
          />
        ) : (
          <ArrowCircleRightOutlinedIcon
            style={{ fontSize: "30px", color: "white" }}
          />
        )}
      </button>
      <ul className="h-[700px]">
        {menuItems.map((item) => (
          <Link key={item.link} to={item.link}>
            <li className="group flex items-center justify-center bg-transparent text-white ease-in-out duration-700 cursor-pointer">
              <div>{item.icon}</div>
              <div>
                {isOpen ? (
                  <p className="group-hover:text-pinkCol visible ease-in-out duration-700 text-center w-[40px]">
                    {item.label}
                  </p>
                ) : (
                  <p className="group-hover:text-pinkCol hidden ease-in-out duration-700 text-center w-[40px]">
                    {item.label}
                  </p>
                )}
              </div>
            </li>
          </Link>
        ))}
      </ul>
      <div>
        <button
          onClick={handleLogout}
          className="cursor-pointer hover:scale-110 active:scale-90 ease-in-out duration-300"
        >
          <LogoutOutlinedIcon style={{ fontSize: "30px", color: "white" }} />
          <div>
            {isOpen ? (
              <p className="text-pinkCol visible ease-in-out duration-700 text-center w-[40px]">
                Logout
              </p>
            ) : (
              <p className="text-pinkCol hidden ease-in-out duration-700 text-center w-[40px]">
                Logout
              </p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
