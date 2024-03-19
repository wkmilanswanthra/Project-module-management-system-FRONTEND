import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Roles } from "./assets/constants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicationRoutes from "./routes";

function App() {
  const [routes, setRoutes] = useState();

  useEffect(() => {
    setRoutes(<ApplicationRoutes />);
  }, []);

  return (
    <div className="flex flex-col min-h-screen h-fit">
      <Router>
        <NavBar username={"username"} role={Roles.PROJECT_COORDINATOR} />
        {routes}
      </Router>
    </div>
  );
}

export default App;
