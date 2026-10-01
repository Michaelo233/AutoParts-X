import Search from "../../../common/search/Search";

function AllAutoParts() {

    return(
        <main>
            <Search
                searchValue={""}
                handleSearchChange={() => {}}
                Title={"Search for auto parts..."}
                handleSubmit={() => {}}
                dependencies={[]}
                filterFn={null}
            />
            
        </main>
    )
}

export default AllAutoParts;