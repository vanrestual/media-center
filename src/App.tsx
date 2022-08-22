import { Link, NavLink, Route, Routes } from "react-router-dom";
import { CalculatorIcon, PhotographIcon } from "@heroicons/react/outline";
import Logo from "./components/Logo";
import { Counter } from "./features/counter/Counter";
import Media from "./pages/media";
import Uploads from "./pages/media/Uploads";
import Welcome from "./pages/Welcome";

export default function App() {
  return (
    <>
      <nav className="navigation-bar">
        <div className="navigation-bar-wrapper">
          <div className="navigation-bar-left">
            <NavLink to="/" className={({ isActive }) => isActive ? "navigation-bar-brand-active" : "navigation-bar-brand"}>
              <Logo aria-hidden="true" className="navigation-bar-logo" />
              <span className="navigation-bar-logo-label">MPIndo</span>
            </NavLink>
            <ul className="navigation-bar-menu">
              <li>
                <NavLink className={({ isActive }) => isActive ? "navigation-bar-menu-link-active": "navigation-bar-menu-link"} to="/counter">
                  <CalculatorIcon aria-hidden="true" className="navigation-bar-menu-link-icon" />
                  <span className="navigation-bar-menu-link-label">Counter</span>
                </NavLink>
              </li>
              <li>
                <NavLink className={({ isActive }) => isActive ? "navigation-bar-menu-link-active": "navigation-bar-menu-link"} to="/media">
                  <PhotographIcon aria-hidden="true" className="navigation-bar-menu-link-icon" />
                  <span className="navigation-bar-menu-link-label">Media</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <header className="header">
        <div className="header-container">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="counter" element={<Counter />} />
            <Route path="media" element={<Media />} />
            <Route path="media/uploads" element={<Uploads />} />
          </Routes>
        </div>
      </header>
      <footer className="footer">
        <div className="footer-wrapper">
          <Logo aria-hidden="true" className="footer-logo" />
          <p className="footer-copyright">Copyright &copy; {new Date().getFullYear()} <Link className="footer-copyright-link" to="/">MPIndo</Link>. <span className="footer-copyright-row">All rights reserved.</span></p>
        </div>
      </footer>
    </>
  );
}
