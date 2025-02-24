import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import SideBar from "../layout/Layout";
import NotFound from "../pages/NotFound";
import Test from "../pages/Test";
import Home from "../pages/Home"


const PrivateRoute = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return <Outlet />;
  }
};

const PrivateRouteAdmin = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  if (token.role !== 0) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
};

const Router = () => {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />

      <Route path="/test" element={<Test />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
};

export default Router;
