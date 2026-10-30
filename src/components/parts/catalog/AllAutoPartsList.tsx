
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../common/search/Search";
import { useCarPartSearch } from "../../../hooks/useAutoPartSearch";

function AllAutoParts() {
  const [searchValue, setSearchValue] = useState("");
  const { results, searchParts } = useCarPartSearch();
  const navigate = useNavigate();

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
            <button
              type="button"
              onClick={() => navigate(`/products/${part.id}`)}
            >
              View Details
            </button>
          </article>
        ))}
      </section>
    </main>
  );
}

export default AllAutoParts;
