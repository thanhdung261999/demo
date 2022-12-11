import Header from "./components/Header/Header";
import { Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Header />
      <div>test link</div>
      <button>
        <Link to="/users">go to user page</Link>
      </button>
      <button>
        <Link to="/admins">go to Admin page</Link>
      </button>
    </div>
  );
}

export default App;
