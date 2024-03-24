import { Link } from "react-router-dom";
import NavPage from "../components/NavPage";
import AppNav from "../components/AppNav";

function HomePage() {
  return (
    <div>
      <NavPage />
      <AppNav />
      <h1>Home Page</h1>
      <Link to="/app">Go to app</Link>
    </div>
  );
}

export default HomePage;
