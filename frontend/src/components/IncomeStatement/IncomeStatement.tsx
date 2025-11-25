import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getCompanyIncomeStatement } from "../../api";
import type { CompanyIncomeStatement } from "../../company";
import Table from "../Table/Table";


const config = [
  {
    label: "Year",
    render: (company: CompanyIncomeStatement) => company.fiscalYear,
  },
  {
    label: "Cost of Revenue",
    render: (company: CompanyIncomeStatement) => company.costOfRevenue,
  },
];

const IncomeStatement = () => {
    const ticker = useOutletContext<string>();
    const [incomeStatement, setIncomeStatement] = useState<CompanyIncomeStatement[]>();
    useEffect(() => {
        const getIncomeStatements = async () => {
            const result = await getCompanyIncomeStatement(ticker);
            if (typeof result == "string")
                return;
            setIncomeStatement(result);
        };
        getIncomeStatements();
    }, []);
    return (
        <>
            {incomeStatement ?
                <Table data={incomeStatement} config={config} /> :
                "Loading ..."}
        </>
    );
};
export default IncomeStatement;