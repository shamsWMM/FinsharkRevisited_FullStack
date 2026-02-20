import { useOutletContext } from "react-router-dom";
import type { CompanyCashflow } from "../../company";
import { useState, useEffect } from "react";
import { getCompanyCashflow } from "../../api";
import Table from "../Table/Table";


const config = [
  {
    label: "Date",
    render: (company: CompanyCashflow) => company.date,
  },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashflow) =>
      company.operatingCashFlow,
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashflow) =>
      company.netCashUsedForInvestingActivites,
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashflow) =>
      company.netCashUsedProvidedByFinancingActivities,
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashflow) =>
      company.cashAtEndOfPeriod,
    },
    {
      label: "CapEX",
      render: (company: CompanyCashflow) =>
      company.capitalExpenditure,
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashflow) =>
      company.commonStockIssued,
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashflow) =>
      company.freeCashFlow,
    },
];

const CashflowStatement = () => {
  const ticker = useOutletContext<string>();
  const [cashflowData, setCashflowData] = useState<CompanyCashflow[]>();
  useEffect(() => {
    const getRatios = async () => {
      const result = await getCompanyCashflow(ticker);
      if (typeof result == "string")
        return;
      setCashflowData(result);
    };
    getRatios();
  }, []);
  return cashflowData ? (
    <Table config={config} data={cashflowData}></Table>
  ) : (
  <h1> No results! </h1>
  );
};

export default CashflowStatement;
