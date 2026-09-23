import { useState } from "react";
import Search from "../common/search/Search";

function Landing({
    terms,
    updateTerms,
}: {
    terms: string;
    updateTerms: (value: string) => void;
}) {
    const [searchValue, setSearchValue] = useState<string>("");

return (
    <header>
        <h1>Welcome to Auto Parts X</h1>
        <span>Search for auto parts and services</span>
        <main>
            <section>
                {/* Invoke the Search component and pass the searchValue 
                and handleSearchChange props */}
                <Search
                    searchValue={searchValue}
                    handleSearchChange={(value: string) => {
                        setSearchValue(value);
                    }}
                />
            </section>
        </main>
    </header>
);
