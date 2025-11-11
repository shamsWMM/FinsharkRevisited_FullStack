import "./Search.css";

interface Props {
    handleButtonClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    search: string | undefined;
}

const Search = ({search, handleInputChange, handleButtonClick} : Props) => {
    return (
        <div>
            <input value={search} onChange={handleInputChange} />
            <button onClick={handleButtonClick} />
        </div>
    );
};

export default Search;