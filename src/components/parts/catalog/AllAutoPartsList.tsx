import { useState } from "react";
import Search from "../../common/search/Search";
import { useCarPartSearch } from "../../../hooks/useAutoPartSearch";

// AllAutoParts component that displays a search bar and a list of auto parts 
// based on the search results
function AllAutoParts() {
  const [searchValue, setSearchValue] = useState("");

  const { results, searchParts } = useCarPartSearch();

  // Function to handle the search operation when the user submits a query
  const handleSearch = async (query: string) => {
    await searchParts(query);
  };

  return (
    <main>
      <h2>Search Auto Parts</h2>

      <Search
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
        Title="Search for auto parts..."
        handleSubmit={handleSearch}
      />

      <section>
        {results.map((part) => (
          <article key={part.partId}>
            <h3>{part.partName}</h3>
            <p>{part.partDescription}</p>
            <p>${part.partPrice}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AllAutoParts;