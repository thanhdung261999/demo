import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import videoHomePage from "../../assets/video-HomePage.mp4";
const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state?.user?.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={videoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">There's a better way to ask</div>
        <div className="homepage-description">
          You don't want to make a boring form. And your audience won't
          answerone. Create a typeform instead—and make everyone happy.
        </div>
        <div className="homepage-btn-start">
          {isAuthenticated === true ? (
            <button onClick={() => navigate("/users")}>Doing Quiz Now</button>
          ) : (
            <button onClick={() => navigate("/login")}>
              Get started. it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default HomePage;
