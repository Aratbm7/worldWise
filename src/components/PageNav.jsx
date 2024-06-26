import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "./Logo";

function NavPage() {
  return (
    <nav className={styles.nav}>
        <Logo />
      <ul>
        <li>
          <NavLink to="/products">Products</NavLink>
        </li>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>LOGIN</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavPage;
