import { NavLink } from "react-router-dom";
import { useState } from "react";
import './Navigation.css';

function Nav () {
    const [isOpen, setIsOpen] = useState(false);


    return (

        <nav className="navigation">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/recycling">Recycling Services</NavLink>
            <NavLink to="/sell">Sell and Buy</NavLink>
            <NavLink to="/rent">Rent cars</NavLink>
            <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? "Close" : "Menu"}
            </button>
        </nav>
    );
}

export default Nav;