import Calendar from "react-calendar";

const tileClassName = ({ date, view }) => {
  if (view === "month") {
    // Add class to tiles in month view
    if (date.getDate() === new Date().getDate()) {
      return "today";
    }
  }
};

function DashboardCalendar() {
  return (
    <div className="container flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-pinkCol">Today's Date Calendar</h2>
        <Calendar tileClassName={tileClassName} />
      </div>
    </div>
  );
}

export default DashboardCalendar;
