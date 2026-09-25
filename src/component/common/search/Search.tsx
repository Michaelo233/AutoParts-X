import ReusableButton from '../ReusableButton';
import styles from './search.module.css';

type SearchProps = {
  searchValue: string;
  handleSearchChange: (value: string) => void;
};

/*  Search component to allow users to search for items */
function Search({ searchValue, handleSearchChange }: SearchProps) {

    return (
        <form className= {styles.searchContainer} onSubmit={(event) => {
            event.preventDefault()}}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              id="part-search"
              type="text" 
              placeholder='Search for auto parts and services...' 
              className={styles.searchInput}
              value={searchValue} 
              onChange={ e => handleSearchChange(e.target.value)} />
           <ReusableButton label="Search parts"
          onClick={() => console.log("Searching for:", searchValue)}/>
        </form>
    );
}

export default Search;