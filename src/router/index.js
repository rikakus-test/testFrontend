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
import Home from "../pages/Home";
import Arduino from "../pages/Arduino";
import Device from "../pages/Device";
import HomeRelated from "../pages/HomeRelated";

import { useEffect, useState } from "react";
import Admin from "../pages/Admin";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Forget from "../pages/Auth/Forget";
import NewPasswword from "../pages/Auth/NewPassword";

const PrivateRoute = () => {
  if (typeof window === "undefined") return null;

  const token = JSON.parse(localStorage.getItem("token"));
  return token ? <Outlet /> : <Navigate to="/login" replace />;
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
  const [isGrid, setIsGrid] = useState(true);
  const [menuItems, setMenuItems] = useState([]);
  return (
    <BrowserRouter>
      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/new-password" element={<NewPasswword />} />

        {/* ================= PRIVATE ROUTES ================= */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <SideBar
                isGrid={isGrid}
                setIsGrid={() => setIsGrid(!isGrid)}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              >
                <Test
                  setIsGrid={() => setIsGrid(!isGrid)}
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                />
              </SideBar>
            }
          />
          <Route
            path="/home"
            element={
              <SideBar
                isGrid={isGrid}
                setIsGrid={() => setIsGrid(!isGrid)}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              >
                <Home
                  isGrid={isGrid}
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                />
              </SideBar>
            }
          />

          <Route
            path="/arduino"
            element={
              <SideBar
                isGrid={isGrid}
                setIsGrid={() => setIsGrid(!isGrid)}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              >
                <Arduino isGrid={isGrid} />
              </SideBar>
            }
          />

          <Route
            path="/devices"
            element={
              <SideBar
                isGrid={isGrid}
                setIsGrid={() => setIsGrid(!isGrid)}
                menuItems={menuItems}
                setMenuItems={setMenuItems}
              >
                <Device isGrid={isGrid} />
              </SideBar>
            }
          />

          {/* dynamic route dari menuItems */}
          {menuItems.map((item) => (
            <Route
              key={item.id}
              path={`/${item.id}`}
              element={
                <SideBar
                  isGrid={isGrid}
                  setIsGrid={() => setIsGrid(!isGrid)}
                  menuItems={menuItems}
                  setMenuItems={setMenuItems}
                >
                  <HomeRelated />
                </SideBar>
              }
            />
          ))}
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
