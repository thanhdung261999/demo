import Header from "./components/Header/Header";
import { Link, Outlet } from "react-router-dom";
function App() {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="man-container"></div>
      <div className="sidenav-container"></div>
      <div className="app-content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
