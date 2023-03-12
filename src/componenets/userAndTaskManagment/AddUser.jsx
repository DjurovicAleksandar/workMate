import { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

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

  const addUserHandler = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);

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
      });

      navigate("/user-info", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container flex items-center justify-center py-4">
      <form
        className="flex flex-col justify-center items-center gap-4 w-[400px] border p-4 bg-red-100 rounded-lg"
        onSubmit={addUserHandler}
      >
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder="Full name"
          required
        />
        <input
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder="Job title"
          required
        />
        {/* <input
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder="Current task"
          required
        /> */}
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="email"
          placeholder="Email"
          required
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          min="6"
          placeholder="Security code"
          required
        />
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="number"
          placeholder="Phone number"
          required
        />
        <input
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="date"
          placeholder="Date of birth"
          required
        />
        <input
          value={monthlySalaray}
          onChange={(e) => setMonthlySalaray(e.target.value)}
          className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
          type="text"
          placeholder="Monthly salary"
          required
        />

        <div className="flex items-center justify-between w-full">
          <input type="submit" value="Confirm" className="cursor-pointer" />
          <button>
            <Link to="/user-info">Go back</Link>
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUser;
