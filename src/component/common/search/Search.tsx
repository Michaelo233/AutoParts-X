import "./Search.css";

/*  Search component to allow users to search for items */
function Search({searchValue, handleSearchChange}
    :{
        searchValue: string;
        handleSearchChange: (value: string) => void;
    }
) {
    return (
        <form className="search-container" action="#">
            {/* Search input */}
            <input type="text" 
            placeholder="Search for auto parts and services"
            className="search-input"
            value={searchValue} 
            onChange={ e => handleSearchChange(e.target.value)} />
            <input type="submit" value="Search"/>
        </form>
    );
}

export default Search;