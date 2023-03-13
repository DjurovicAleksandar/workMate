import { Link } from "react-router-dom";
import Table from "../componenets/Table";

function UserInfo() {
  return (
    <div className="container flex flex-col items-center px-32 pt-8">
      <div className="self-start mb-10">
        <button className="px-8 py-2 bg-pinkCol text-blueCol rounded-lg text-center font-semibold text-[16px] hover:scale-110 active:scale-90 ease-in-out duration-500">
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
