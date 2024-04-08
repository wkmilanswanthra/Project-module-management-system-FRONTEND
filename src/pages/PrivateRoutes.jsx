import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const location = useLocation();
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/welcome" replace state={{ from: location }} />
  );
};

export default PrivateRoutes;
