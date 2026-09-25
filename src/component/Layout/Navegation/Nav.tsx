import { NavLink } from "react-router";
import styles from './Nav.module.css';

export function Nav() {
    return(
        <nav className={styles.headerContainer}>
            <img src="./Logo.jpg" alt="Auto Parts X Logo" className={styles.logo} />
            <h1 className={styles.headerText}>
                Auto parts X
            </h1>
            <div className={styles.navLinks}>
                {/* Create an <a> tag that routes to the provided string value */}
                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/sell-services">
                   Sell Services 
                </NavLink>
                <NavLink to="/buy-rent">
                    Buy and Rent
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