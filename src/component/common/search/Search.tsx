import styles from './search.module.css';

/*  Search component to allow users to search for items */
function Search({searchValue, handleSearchChange}
    :{
        searchValue: string;
        handleSearchChange: (value: string) => void;
    }
) {
    return (
        <form className= {styles.searchContainer} action="#">
            <span className={styles.searchIcon}>🔍</span>
            <input 
              id="part-search"
              type="text" 
              placeholder='Search for auto parts and services...' 
              className={styles.searchInput}
              value={searchValue} 
              onChange={ e => handleSearchChange(e.target.value)} />
            <button className={styles.btnSearch}>Search parts</button>
        </form>
    );
}

export default Search;