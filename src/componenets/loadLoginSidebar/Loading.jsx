import { useEffect, useState } from "react";
import logo from "../../assets/imgs/logo.png";

function Loading() {
  // State to keep track of the progress of the loading bar
  const [barProgress, setBarProgress] = useState(0);

  // Function to update the progress of the loading bar every 13ms
  useEffect(() => {
    const barInterval = setInterval(() => {
      // Update the progress state by increasing the previous value by 1
      setBarProgress((prev) => (prev += 1));
    }, 13);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(barInterval);
  }, []);

  return (
    // Main loading screen with logo, loading bar, and developer credit
    <div className="w-full h-screen flex flex-col justify-between items-center pb-12 overlay">
      <div className="w-[20rem]">
        <img src={logo} alt="Logo" />
      </div>
      <div className="h-[300px]">
        <p className="text-[55px] font-light">
          W<span className="text-pinkCol">E</span>LCOME
        </p>
        {/* Loading bar with dynamic width based on progress state */}
        <div className="w-full bg-transparent h-1 rounded-full">
          <div
            className="h-full bg-pinkCol rounded-full"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>
      {/* Credit for developer */}
      <p className="">
        Developed by{" "}
        <a
          href="https://aleksandardjurovic.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aleksandar Đurović
        </a>
      </p>
    </div>
  );
}

export default Loading;
