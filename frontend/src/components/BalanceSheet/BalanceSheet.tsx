import { useEffect, useState } from "react";
import type { CompanyBalanceSheet } from "../../company";
import { useOutletContext } from "react-router-dom";
import { getCompanyBalanceSheet } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatDollarValue, formatRatio } from "../../helpers/NumberFormatter";
const config = [
    {
        label: "Cash",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.cashAndCashEquivalents),
    },
    {
        label: "Inventory",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.inventory),
    },
    {
        label: "Other Current Assets",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.otherCurrentAssets),
    },
    {
        label: "Minority Interest",
        render: (company: CompanyBalanceSheet) =>
          formatRatio(company.minorityInterest),
    },
    {
        label: "Other Non-Current Assets",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.otherNonCurrentAssets),
    },
    {
        label: "Long Term Debt",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.longTermDebt),
    },
    {
        label: "Total Debt",
        render: (company: CompanyBalanceSheet) =>
          formatDollarValue(company.otherCurrentLiabilities),
    },
];

const BalanceSheet = () => {
    const ticker = useOutletContext<string>();
    const [balanceSheet, setBalanceSheet] = useState<CompanyBalanceSheet>();
    useEffect(() => {
        const getBalanceSheet = async () => {
            const result = await getCompanyBalanceSheet(ticker);
            if (typeof result == "string")
                return;
            setBalanceSheet(result[0]);
        };
        getBalanceSheet();
    }, []);
    return (
        <>
            {balanceSheet ? (
                <RatioList data={balanceSheet} config={config} /> 
            ) : (
                <Spinner />
            )}
        </>
    );
};

export default BalanceSheet;
