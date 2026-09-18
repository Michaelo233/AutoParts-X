import "./Search.css";


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
            placeholder="Search..." 
            className="search-input"
            value={searchValue} 
            onChange={ e => handleSearchChange(e.target.value)} />
            <input type="submit" value="Search"/>
        </form>
    );
}

export default Search;