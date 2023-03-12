import { auth, db } from "../config/firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function UpdateUser() {
  const navigate = useNavigate();
  const location = useLocation();
  const updateInfoObj = location.state;

  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [currentTask, setCurrentTask] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [birthday, setBirthday] = useState("");
  const [monthlySalaray, setMonthlySalaray] = useState("");

  const updateEmployeeHandler = async (e) => {
    e.preventDefault();

    const userId = updateInfoObj?.id;

    try {
      const employeeDoc = doc(db, "employees", userId);

      await updateDoc(employeeDoc, {
        fullName: fullName || updateInfoObj?.fullName,
        jobTitle: jobTitle || updateInfoObj?.jobTitle,
        currentTask: updateInfoObj?.currentTask,
        email: email || updateInfoObj?.email,
        password: password || updateInfoObj?.password,
        phoneNumber: phoneNumber || updateInfoObj?.phoneNumber,
        birthday: birthday || updateInfoObj?.birthday,
        monthlySalaray: monthlySalaray || updateInfoObj?.monthlySalaray,
      });

      navigate("/user-info", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="flex items-center justify-center py-4">
        <form
          className="flex flex-col justify-center items-start gap-4 w-[700px] border p-4 bg-red-100 rounded-lg"
          onSubmit={updateEmployeeHandler}
        >
          <input
            value={fullName}
            onChange={(e) =>
              setFullName(e.target.value || updateInfoObj?.fullName)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="text"
            placeholder={`Full name: ${updateInfoObj?.fullName}`}
          />
          <input
            value={jobTitle}
            onChange={(e) =>
              setJobTitle(e.target.value || updateInfoObj?.jobTitle)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="text"
            placeholder={`Job title: ${updateInfoObj?.jobTitle}`}
          />

          {/* <input
            value={currentTask}
            onChange={(e) =>
              setCurrentTask(e.target.value || updateInfoObj?.currentTask)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="text"
            placeholder={`Current task: ${updateInfoObj?.currentTask}`}
          /> */}

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value || updateInfoObj?.email)}
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="email"
            placeholder={`Email: ${updateInfoObj?.email}`}
          />

          <input
            value={password}
            onChange={(e) =>
              setPassword(e.target.value || updateInfoObj?.password)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="text"
            placeholder={`Security code: ${updateInfoObj?.password}`}
          />

          <input
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value || updateInfoObj?.phoneNumber)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="number"
            placeholder={`Phone number: ${updateInfoObj?.phoneNumber}`}
          />

          <input
            value={birthday || updateInfoObj?.birthday}
            onChange={(e) =>
              setBirthday(e.target.value || updateInfoObj?.birthday)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="date"
          />

          <input
            value={monthlySalaray}
            onChange={(e) =>
              setMonthlySalaray(e.target.value || updateInfoObj?.monthlySalaray)
            }
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-black focus:outline-none focus:border-yellowCol mb-[20px]"
            type="number"
            placeholder={`Monthly salary: ${updateInfoObj?.monthlySalaray}`}
          />

          <div className="flex items-center justify-between w-full">
            <input
              type="submit"
              value="Update user"
              className="cursor-pointer"
            />
            <button>
              <Link to="/user-info">Go back</Link>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUser;
