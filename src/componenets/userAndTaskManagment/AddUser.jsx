import { useState } from "react";
import { db } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

function AddUser() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [monthlySalaray, setMonthlySalaray] = useState("");
  const [completedTasks, setCompletedTasks] = useState("");

  const addUserHandler = async (e) => {
    e.preventDefault();

    const userRef = doc(db, "employees", email);

    setDoc(userRef, {
      fullName: fullName,
      jobTitle: jobTitle,
      currentTask: currentTask,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      birthday: birthday,
      monthlySalaray: monthlySalaray,
      completedTasks: completedTasks,
    });

    navigate("/user-info", { replace: true });
  };

  return (
    <div className="container flex items-center justify-center px-12 py-4">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[400px] border p-4 bg-pinkCol rounded-lg shadow-lg"
        onSubmit={addUserHandler}
      >
        <h1 className="font-bold text-blueCol text-xl">
          Register a new employee
        </h1>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="text"
          placeholder="Full name"
          required
        />
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="text"
          placeholder="Job title"
          required
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="text"
          min="6"
          placeholder="Security code"
          required
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="number"
          placeholder="Phone number"
          required
        />
        <input
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="date"
          placeholder="Date of birth"
          required
        />
        <input
          value={monthlySalaray}
          onChange={(e) => setMonthlySalaray(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black text-blueCol focus:border-blueCol mb-[20px]"
          type="text"
          placeholder="Monthly salary"
          required
        />

        <div className="flex items-center justify-between w-full">
          <input
            type="submit"
            value="Confirm"
            className="cursor-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[10px] sm:text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500"
          />
          <button className="cursor-pointer px-8 py-2 border-[1px] border-blueCol text-blueCol rounded-lg text-center font-semibold text-[10px] sm:text-[12px] hover:scale-110 active:scale-90 ease-in-out duration-500">
            <Link to="/user-info">Go back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
