import axios from "axios";
import type { CompanySearch } from "./company";

export const searchCompanies = async (query: string) => {
    try {
        const { data: companies } = await axios.get<CompanySearch[]>(
            `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return companies;
    } catch (e) {
        if(axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
}