import { Link } from "react-router-dom";
// import Table from "../employeeManagment/Table";
import Table from "../reusableComponenets/TableReusable";

function UserInfo() {
  return (
    <div className="container flex flex-col items-center px-12 pt-8 overlay">
      <div className="self-start mb-5">
        <button className=" px-3 md:px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-xs md:text-[14px] text-center md:font-semibold  hover:scale-110 active:scale-90 ease-in-out duration-500">
          <Link to="/add-user">ADD USER</Link>
        </button>
      </div>
      <div className="w-4/5">
        <Table type="employees" />
      </div>
    </div>
  );
}

export default UserInfo;
