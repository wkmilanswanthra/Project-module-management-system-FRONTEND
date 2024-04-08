import { useEffect, useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { Roles } from "./assets/constants";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ApplicationRoutes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/auth/api";

function App() {
  const [routes, setRoutes] = useState();
  const { user, isLoggedIn, roles, getMeLoading } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  useEffect(() => {
    setRoutes(<ApplicationRoutes />);
  }, []);

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <Router>
        {isLoggedIn && <NavBar name={user?.name} roles={roles} />}
        {routes}
      </Router>
    </div>
  );
}

export default App;
