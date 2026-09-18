import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Search.css";

function Search({dataList= [] }: {dataList: any[] }) {
   
    const [filterText, setFilterText] = useState("");

    const filterServices = dataList.filter((item) =>
        item.name?.toLowerCase().includes(filterText.toLowerCase())
    );
    return (
        <div className="search-container">
            <input type="text" placeholder="Search..." className="search-input"
             value={filterText} onChange={(e) => setFilterText(e.target.value)} />
            <button className="search-button">Search</button>

            {/* Display filtered services */}
            <ul className="search-results">
                {filterServices.map((service, index) => (
                    <li key={index} className="search-result-item">
                        <NavLink to={`/recycling/${service.id}`}>{service.name}</NavLink>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Search;