import { NavLink } from "react-router-dom";

function Nav () {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/recycling">Recycling Services</NavLink>
            <NavLink to="/sell">Sell and Buy</NavLink>
            <NavLink to="/rent">Rent cars</NavLink>
        </nav>
    );
}

export default Nav;