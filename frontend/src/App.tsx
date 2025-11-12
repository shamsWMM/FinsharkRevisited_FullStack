import { useState } from "react";
import "./App.css"
import CardList from "./components/CardList/CardList"
import Search from "./components/Search/Search"
import type { CompanySearch } from "./company";
import { searchCompanies } from "./api";

function App() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result)) {
      setSearchResult(result);
    }
    console.log(searchResult);
  };

  return (
    <>
      <Search handleButtonClick={handleButtonClick} handleInputChange={handleInputChange} search={search} />
      <CardList />
    </>
  )
}

export default App
