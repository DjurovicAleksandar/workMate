import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import email from "../assets/email.png";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toogleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (!isOpen) {
      sidebar.style.width = "180px";
      sidebar.style.backgroundColor = "rgba(0,0,0,0.5)";
    } else {
      sidebar.style.width = "130px";
      sidebar.style.backgroundColor = "rgb(248,113,113)";
    }
    setIsOpen(!isOpen);
  };
  return (
    <div className="sidebar fixed w-[130px] bg-red-400 brder-2 h-full ease-in-out duration-500 flex flex-col items-center justify-between">
      <div className="relative">
        <h1>LOGO</h1>

        <button className="absolute right-[-50px]" onClick={toogleSidebar}>
          click me
        </button>
      </div>

      <ul className="">
        <Link to="/">
          <li className="flex items-center justify-center bg-trasnparent text-white ease-in-out duration-500 cursor-pointer">
            <div>
              <img src={email} />
            </div>
            <div>
              {isOpen ? (
                <p className="opacity-1 ease-in-out duration-500 text-center block w-[90px]">
                  Dashboard
                </p>
              ) : (
                <p className="opacity-0 ease-in-out duration-500 text-center block w-[90px]">
                  Dashboard
                </p>
              )}
            </div>
          </li>
        </Link>
        <Link to="/calendar">
          <li className="flex items-center justify-center bg-trasnparent text-white ease-in-out duration-500 cursor-pointer">
            <div>
              <img src={email} />
            </div>
            <div>
              {isOpen ? (
                <p className="opacity-1 ease-in-out duration-500 text-center block w-[90px]">
                  Calendar
                </p>
              ) : (
                <p className="opacity-0 ease-in-out duration-500 text-center block w-[90px]">
                  Calendar
                </p>
              )}
            </div>
          </li>
        </Link>
        <Link to="/user-info">
          <li className="flex items-center justify-center bg-trasnparent text-white ease-in-out duration-500 cursor-pointer">
            <div>
              <img src={email} />
            </div>
            <div>
              {isOpen ? (
                <p className="opacity-1 ease-in-out duration-500 text-center block w-[90px]">
                  Employee's
                </p>
              ) : (
                <p className="opacity-0 ease-in-out duration-500 text-center block w-[90px]">
                  Employee's
                </p>
              )}
            </div>
          </li>
        </Link>
        <Link to="/task-manager">
          <li className="flex items-center justify-center bg-trasnparent text-white ease-in-out duration-500 cursor-pointer">
            <div>
              <img src={email} />
            </div>
            <div>
              {isOpen ? (
                <p className="opacity-1 ease-in-out duration-500 text-center block w-[90px]">
                  Tasks's
                </p>
              ) : (
                <p className="opacity-0 ease-in-out duration-500 text-center block w-[90px]">
                  Tasks's
                </p>
              )}
            </div>
          </li>
        </Link>
      </ul>
      <div>
        <button className="">Log out</button>
      </div>
    </div>
  );
}

export default Sidebar;
