import Todo from "./todos/Todo";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import DetailUser from "./DetailUser";
function Epp() {
  return (
    <Router>
      <div className="App">
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
        <div>
          <NavLink to="/profile">Profile</NavLink>
        </div>
        <div>
          <NavLink to="/content">Content</NavLink>
        </div>

        <ToastContainer
          position="top-left"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/content" element={<Todo />} />
          <Route path="/content/:id" element={<DetailUser />} />
        </Routes>
      </div>
    </Router>
  );
}

export default Epp;
