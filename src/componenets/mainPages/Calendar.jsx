import Calendar from "react-calendar";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router";

function DashboardCalendar() {
  const navigate = useNavigate();

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      // Add class to tiles in month view
      if (date.getDate() === new Date().getDate()) {
        return "today";
      }
    }
  };

  useEffect(() => {
    if (!auth.currentUser) navigate("/", { replace: true });
  }, []);

  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-blueCol">Today's Date Calendar</h2>
        <Calendar tileClassName={tileClassName} />
      </div>
    </div>
  );
}

export default DashboardCalendar;
