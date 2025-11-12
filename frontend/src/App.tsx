import { useState, type SyntheticEvent } from "react";
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

  const onStockCreate = (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("Event",e);
  }

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
      {serverError && <h1>{serverError}</h1>}
      <CardList companies={searchResult} onStockCreate={onStockCreate}/>
    </>
  )
}

export default App
