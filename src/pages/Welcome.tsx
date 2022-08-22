import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className="welcome">
      <h1 className="welcome-title">Welcome to <Link to="/media" className="welcome-title-link">Media Center</Link> Application</h1>
    </div>
  );
}
