import Search from "../../common/search/Search";

function AllAutoParts() {

    return(
        <main>
            <Search
                searchValue={""}
                handleSearchChange={() => {}}
                Title={"Search for auto parts..."}
                handleSubmit={() => {}}
            />
            
        </main>
    )
}

export default AllAutoParts;