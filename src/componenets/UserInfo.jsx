import { Link } from "react-router-dom";
import Table from "../componenets/Table";

function UserInfo() {
  return (
    <div className="container flex flex-col items-center justify-center ">
      <div className="self-start">
        <button className="text-black w-full h-[45px] rounded-lg text-center font-semibold text-[16px] active:scale-90 ease-in-out duration-200">
          <Link to="/add-user">ADD USER</Link>
        </button>
      </div>
      <div className="w-4/5">
        <Table />
      </div>
    </div>
  );
}

export default UserInfo;
