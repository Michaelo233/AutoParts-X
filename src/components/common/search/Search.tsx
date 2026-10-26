import styles from "./search.module.css";

type SearchProps = {
  searchValue: string;
  Title: string;
  handleSearchChange: (value: string) => void;
  handleSubmit: (value: string) => void;
};

function Search({
  searchValue,
  Title,
  handleSearchChange,
  handleSubmit,
}: SearchProps) {

  return (
    <form
        className={styles.searchContainer}
        onSubmit={(event) => {
            event.preventDefault();
            handleSubmit(searchValue.trim());
        }}
    >
      <input
        type="text"
        placeholder={Title}
        value={searchValue}
        onChange={e => handleSearchChange(e.target.value)}
        className={styles.searchInput}
      />

      <button type="submit" className={styles.searchButton}>
        Search
      </button>
    </form>
  );
}

export default Search;