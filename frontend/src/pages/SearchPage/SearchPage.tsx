import { useState, type SyntheticEvent } from "react";
import CardList from "../../components/CardList/CardList";
import StockList from "../../components/Portfolio/StockList/StockList";
import Search from "../../components/Search/Search";
import type { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";

const SearchPage = () => {
    const [search, setSearch] = useState("");
    const [portfolioValues, setPortfolioValues] = useState<string[]>([]);
    const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
    const [serverError, setServerError] = useState<string>("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const onStockAdd = (e: any) => {
        e.preventDefault();
        const stockValue = e.target[0].value;
        if (!validateString(stockValue))
            return;
        const existsInPortfolio = portfolioValues.includes(stockValue.toLowerCase());
        if (existsInPortfolio)
            return;

        const updatedPortfolio = [...portfolioValues, stockValue.toLocaleLowerCase()];
        setPortfolioValues(updatedPortfolio);
    }

    const onStockDelete = (e: any) => {
        e.preventDefault();
        const stockValue = e.target[0].value;
        const filtered = portfolioValues.filter((value) => {
            return value !== stockValue;
        });
        setPortfolioValues(filtered);
    }

    function validateString(value: any): boolean {
        if (typeof value !== "string" || value.trim() === "")
            return false;
        return true;
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
            <StockList stockValues={portfolioValues} onStockDelete={onStockDelete} />
            {serverError && <h1>{serverError}</h1>}
            <CardList companies={searchResult} onStockCreate={onStockAdd} />
        </>
    );
};

export default SearchPage;