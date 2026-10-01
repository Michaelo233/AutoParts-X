import ReusableButton from '../ReusableButton';
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
        <form className= {styles.searchContainer} onSubmit={(event) => {
            event.preventDefault()}}>
            <span className={styles.searchIcon}>🔍</span>
            <input 
              id="part-search"
              type="text" 
              className={styles.searchInput}
              value={searchValue} 
              placeholder={Title}
              onChange={ e => handleSearchChange(e.target.value)} />
           <ReusableButton label="Search parts"
          onClick={() => handleSubmit(searchValue)}/>
        </form>
    );
}

export default Search;