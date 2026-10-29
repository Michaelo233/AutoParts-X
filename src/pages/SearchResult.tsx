
import { Navigate, useSearchParams } from "react-router-dom";

function SearchResult() {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("q") ?? "";

  return (
    <Navigate
      to={`/products?q=${encodeURIComponent(searchTerm)}`}
      replace
    />
  );
}

export default SearchResult;
