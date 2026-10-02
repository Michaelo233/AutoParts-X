import { NavLink } from "react-router";
import styles from './Nav.module.css';

export function Nav() {
    return(
        <nav className={styles.headerContainer}>
            <div className={styles.brand}>
                <img 
                    src="/images/Logo.jpg"
                    alt="" 
                    className={styles.logoImg} 
                />
            </div>
            <h1 className={styles.headerText}>
                Auto parts X
            </h1>
            <div className={styles.navLinks}>
                {/* Create an <a> tag that routes to the provided string value */}
                <NavLink to="/Home" end>
                    Home
                </NavLink>
                <NavLink to="/sell-services">
                   Sell Services 
                </NavLink>
                <NavLink to="/myParts">
                    My Parts
                </NavLink>
            </div>
            <div className={styles.loginLink}>
                <span>
                    <a href="#">Log In</a>
                </span>
            </div>
        </nav>
    );
}