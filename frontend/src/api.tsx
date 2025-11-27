import axios from "axios";
import type { CompanyBalanceSheet, CompanyIncomeStatement, CompanyKeyMetrics, CompanyProfile, CompanySearch } from "./company";

export const searchCompanies = async (query: string) => {
    try {
        const { data: companies } = await axios.get<CompanySearch[]>(
            `https://financialmodelingprep.com/stable/search-symbol?query=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return companies;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
};

export const getCompanyProfile = async (query: string): 
Promise<CompanyProfile | string> => {
    try {
        const { data } = await axios.get<CompanyProfile[]>(
            `https://financialmodelingprep.com/stable/profile?symbol=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return data[0];
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
};

export const getCompanyKeyMetrics = async (query: string): 
Promise<CompanyKeyMetrics | string> => {
    try {
        const { data } = await axios.get<CompanyKeyMetrics[]>(
            `https://financialmodelingprep.com/stable/key-metrics-ttm?symbol=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return data[0];
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
};

export const getCompanyIncomeStatement = async (query: string): 
Promise<CompanyIncomeStatement[] | string> => {
    try {
        const { data } = await axios.get<CompanyIncomeStatement[]>(
            `https://financialmodelingprep.com/stable/income-statement?symbol=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
};

export const getCompanyBalanceSheet = async (query: string): 
Promise<CompanyBalanceSheet[] | string> => {
    try {
        const { data } = await axios.get<CompanyBalanceSheet[]>(
            `https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=${query}&apikey=${import.meta.env.VITE_FMP_API_KEY}`);
        return data;
    } catch (e) {
        if (axios.isAxiosError(e)) {
            console.log("error message: ", e.message);
            return e.message;
        } else {
            console.log("unexpected error: ", e);
            return "Unexpected error.";
        }
    }
};