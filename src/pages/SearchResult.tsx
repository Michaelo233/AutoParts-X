import { useSearchParams } from "react-router-dom";

function SearchResult() {
    
const [searchParams] = useSearchParams();

    return (
        <main>
            <h1>Search Results</h1>
            <p>Search term: {searchParams.get("q")}</p>
        </main>
    );
}

export default SearchResult;