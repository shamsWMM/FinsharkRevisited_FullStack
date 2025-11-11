import { useState } from "react";
import "./Search.css";

const Search = () => {
    const [search, setSearch] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    };

    return (
        <div>
            <input value={search} onChange={handleInputChange} />
            <button onClick={handleButtonClick} />
        </div>
    );
};

export default Search;