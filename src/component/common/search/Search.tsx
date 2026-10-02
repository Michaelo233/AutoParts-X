import styles from './search.module.css';

type SearchProps = {
  searchValue: string;
  Title: string;
  dependencies: any[];
  filterFn: ((item: any) => boolean) | null;
  handleSearchChange: (value: string) => void;
  handleSubmit: (value: string) => void;
};

/*  Search component to allow users to search for items */
function Search({ searchValue, Title, handleSearchChange, handleSubmit }: SearchProps) {
    return (
        <form 
            className={styles.searchContainer} 
            onSubmit={(event) => {
                event.preventDefault();
                // This now properly triggers the search action
                handleSubmit(searchValue); 
            }}
        >
            <span className={styles.searchIcon}>🔍</span>
            <input 
              type="text" 
              className={styles.searchInput}
              value={searchValue} 
              placeholder={Title}
              onChange={e => handleSearchChange(e.target.value)} 
            />
            
            {/* Changed from "Search parts" to prevent duplicate wording */}
            <button type="submit" className={styles.searchButton}>
                Search
            </button>
        </form>
    );
}

export default Search;