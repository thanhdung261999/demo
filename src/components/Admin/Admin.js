import { FaBars } from "react-icons/fa";
import Sidebar from "./Sidebar";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.scss";
const Admin = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <Sidebar collapsed={collapsed} />
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <FaBars
            onClick={() => {
              setCollapsed(!collapsed);
            }}
          />
        </div>
        <div className="admin-main">
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
};
export default Admin;
