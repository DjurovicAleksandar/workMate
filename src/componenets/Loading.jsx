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
    <div className="w-full flex flex-col items-center justify-between text-black">
      LOADING NOW
    </div>
  );
}

export default Loading;
