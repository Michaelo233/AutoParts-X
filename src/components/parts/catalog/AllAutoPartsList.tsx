import Search from "../../common/search/Search";
import { useSearchForm } from "../../../hooks/useSearchForm";

function AllAutoParts() {
    const { searchValue, handleSearchChange, handleSubmit } = useSearchForm();

    return(
        <main>
            <Search
                searchValue={searchValue}
                handleSearchChange={handleSearchChange}
                Title={"Search for auto parts..."}
                handleSubmit={handleSubmit}
            />
            
        </main>
    )
}

export default AllAutoParts;