import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import TaskBoard from "./components/TaskBoard";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[95%] lg:max-w-[1200px] p-5 mx-auto">
      <TaskBoard />
    </div>
  );
}

export default App;
