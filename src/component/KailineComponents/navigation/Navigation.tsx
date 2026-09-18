import { NavLink } from "react-router-dom";
import './Navigation.css';

function Nav () {
    return (

        <nav className="navigation">
            <NavLink to="/">Dashboard</NavLink>
            <NavLink to="/recycling">Recycling Services</NavLink>
            <NavLink to="/sell">Sell and Buy</NavLink>
            <NavLink to="/rent">Rent cars</NavLink>
        </nav>
    );
}

export default Nav;