import type { SyntheticEvent } from "react";
import "./Search.css";

interface Props {
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string | undefined;
    onSearchSubmit: (e: SyntheticEvent) => void;
}

const Search = ({search, handleInputChange, onSearchSubmit} : Props) => {
    return (
        <>
            <form onSubmit={onSearchSubmit}>
                <input value={search} onChange={handleInputChange} />
            </form>
        </>
    );
};

export default Search;