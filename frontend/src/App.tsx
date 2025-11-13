import { useState, type SyntheticEvent } from "react";
import "./App.css"
import CardList from "./components/CardList/CardList"
import Search from "./components/Search/Search"
import type { CompanySearch } from "./company";
import { searchCompanies } from "./api";
import StockList from "./components/Portfolio/Stock/StockList";

function App() {
  const [search, setSearch] = useState("");
  const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onStockCreate = (e: any) => {
    e.preventDefault();
    const stockValue = e.target[0].value;
    if (typeof stockValue !== "string" || stockValue.trim() === "")
      return;

    const existsInPortfolio = portfolioValues.includes(stockValue.toLowerCase());
    if (existsInPortfolio)
      return;

    const updatedPortfolio = [... portfolioValues, stockValue.toLocaleLowerCase()];
    setPortfolioValues(updatedPortfolio);
  }

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result)) {
      setSearchResult(result);
    }
  };

  return (
    <>
      <Search onSearchSubmit={onSearchSubmit} handleInputChange={handleInputChange} search={search} />
      <StockList stockValues={portfolioValues} />
      {serverError && <h1>{serverError}</h1>}
      <CardList companies={searchResult} onStockCreate={onStockCreate}/>
    </>
  )
}

export default App
