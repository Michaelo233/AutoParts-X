
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../common/search/Search";

function AllAutoParts() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(value: string) {
    navigate(`/products?q=${encodeURIComponent(value.trim())}`);
  }

  return (
    <main>
      <Search
        searchValue={searchValue}
        handleSearchChange={setSearchValue}
        Title="Search for auto parts..."
        handleSubmit={handleSubmit}
      />
    </main>
  );
}

export default AllAutoParts;
