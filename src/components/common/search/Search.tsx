import styles from './search.module.css';

type SearchProps = {
  searchValue: string;
  Title: string;
  handleSearchChange: (value: string) => void;
  handleSubmit: (value: string) => void;
};

/*  Search component to allow users to search for items */
function Search({ searchValue, handleSearchChange, handleSubmit }: SearchProps) {
    return (
        <form 
            className={styles.searchContainer} 
            onSubmit={(event) => {
                event.preventDefault();
                // This now properly triggers the search action
                handleSubmit(searchValue); 
            }}
        >
            <input
                type="text"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search for auto parts..."
                className={styles.searchInput}
            />  
            
            
            {/* Changed from "Search parts" to prevent duplicate wording */}
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    );
}

export default Search;