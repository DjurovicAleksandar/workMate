import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../config/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

//Icons
import lockIcon from "../../assets/imgs/lock.png";
import emailIcon from "../../assets/imgs/email.png";

function LoginPage() {
  const navigate = useNavigate();

  //Password and email ref
  const passwordRef = useRef(null);
  const emailRef = useRef(null);

  //Error state - for the error render if an error in SignInWithEmailAndPassword occurs
  const [error, setError] = useState("");

  //Email and password states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //Function for handling log in of the user
  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      //Login in
      await signInWithEmailAndPassword(auth, email, password);

      //Checking if the user exists
      if (auth.currentUser?.email) {
        //Checking if the user is  admin - then navigating to the admin page
        if (auth.currentUser?.email === "admin@workmate.com")
          navigate("/dashboard", { replace: true });
        else {
          //Checking if the user is  employee - then navigating to the employee page
          navigate("/dashboard", { replace: true });
        }
      }
    } catch (error) {
      //Setting the error
      setError(error.message.replace("Firebase: ", ""));
      console.error(error);
    }
  };

  useEffect(() => {
    //On the component mount, if the user is already logged in, it will redirect them to the required page

    if (auth.currentUser?.email) {
      //Admin redirection
      if (auth.currentUser?.email === "admin@workmate.com")
        navigate("/dashboard", { replace: true });
      else {
        //empoloyee redirection
        navigate("/dashboard", { replace: true });
      }
    }
  }, []);

  return (
    <div className="bg-red-300 w-full h-screen flex flex-col justify-star items-center overlay">
      <div className="p-4 mb-14 w-[150px]">
        <Link to="/">LOGOIN TO CONTINUTE</Link>
      </div>
      <div className="w-[300px] sm:w-[350px]">
        <form className="relative" onSubmit={loginHandler}>
          <input
            ref={emailRef}
            value={email}
            onChange={() => setEmail(emailRef.current.value)}
            type="text"
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[20px]"
            placeholder="User email"
            style={{
              backgroundImage: `url(${emailIcon})`,
              backgroundPosition: "left 0.5rem center",
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
            }}
            required
          />
          <input
            ref={passwordRef}
            value={password}
            onChange={() => setPassword(passwordRef.current.value)}
            type="password"
            className="w-full py-[13px] pl-[51px] text-[14px] pr-3 rounded-lg border-[1px] bg-transparent border-[#FFFFFF] focus:outline-none focus:border-yellowCol mb-[40px]"
            placeholder="User password"
            style={{
              backgroundImage: `url(${lockIcon})`,
              backgroundPosition: "left 0.5rem center",
              backgroundSize: "20px",
              backgroundRepeat: "no-repeat",
            }}
            required
          />
          {error && (
            <span className="text-xs text-red-400 absolute top-[120px] right-0">
              {error}
            </span>
          )}
          <input
            className="bg-white text-black w-full h-[45px] rounded-lg text-center font-semibold text-[1rem] hover:scale-110 active:scale-90 ease-in-out duration-300 shadow-md cursor-pointer"
            type="submit"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
