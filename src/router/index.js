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
import { useEffect, useState } from "react";
import Admin from "../pages/Admin";


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
  const [isGrid, setIsGrid] = useState(true);
  const [menuItems, setMenuItems] = useState([
    {
      home_id: "home-001",
      arduino_id: null,
      home_name: "Rumah Utama",
      tab_ip: "Jl. Merdeka No.1"
    }
  ]);
  return (
    <BrowserRouter>
    <Routes>
      <Route
          path="/home"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}>
              <Home isGrid={isGrid} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}/>
            </SideBar>
          }
        />
         <Route
          path="/devices"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}>
              <Test isGrid={isGrid} />
            </SideBar>
          }
        />
        <Route
          path="/"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}>
              <NotFound isGrid={isGrid} />
            </SideBar>
          }
        />
        {menuItems.map(item => (
        <Route
        path={"/" + item.home_id}
        element={
          <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}>
          <Admin isGrid={isGrid} menuItems={menuItems} setMenuItems={(data)=>setMenuItems(data)}/>
        </SideBar>
        }
      />
  ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
};

export default Router;
