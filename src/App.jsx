import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

import Loading from "./componenets/Loading";
import router from "./componenets/rooter/Rooter";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Loading />;

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
