import { useEffect, useState } from "react";

function Loading() {
  const [barProgress, setBarProgress] = useState(0);

  useEffect(() => {
    const barInterval = setInterval(() => {
      setBarProgress((prev) => (prev += 1));
    }, 13);

    return () => clearInterval(barInterval);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-between overlay">
      <div className="w-[150px] text-center p-4">Logo</div>
      <div className="h-[300px] flex flex-col items-center justify-start">
        <p className="text-5xl font-light text-center">
          W<span className="text-[#FCDF07]">E</span>LCOME
        </p>
        <div className="w-full bg-transparent h-[1px] rounded-full">
          <div
            className="h-full bg-[#FCDF07] rounded-full"
            style={{ width: `${barProgress}%` }}
          />
        </div>
      </div>
      <p className="p-4 text-center">©WorkMate 2023</p>
    </div>
  );
}

export default Loading;
