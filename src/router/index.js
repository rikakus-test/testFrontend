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
  const [visible, setVisible] = useState(false);

  return (
    <BrowserRouter>
    <Routes>
            <Route
          path="/"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} visible={visible} setVisible={()=>setVisible(!visible)}>
              <Home isGrid={isGrid} visible={visible} setVisible={()=>setVisible(!visible)}/>
            </SideBar>
          }
        />
                    <Route
          path="/devices"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} visible={visible} setVisible={()=>setVisible(!visible)}>
              <Test isGrid={isGrid} visible={visible} setVisible={()=>setVisible(!visible)}/>
            </SideBar>
          }
        />
                    <Route
          path="/profile"
          element={
            <SideBar isGrid={isGrid} setIsGrid={()=>setIsGrid(!isGrid)} visible={visible} setVisible={()=>setVisible(!visible)}>
              <NotFound isGrid={isGrid} visible={visible} setVisible={()=>setVisible(!visible)}/>
            </SideBar>
          }
        />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
  );
};

export default Router;
