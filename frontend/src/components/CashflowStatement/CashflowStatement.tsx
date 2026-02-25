import { useOutletContext } from "react-router-dom";
import type { CompanyCashflow } from "../../company";
import { useState, useEffect } from "react";
import { getCompanyCashflow } from "../../api";
import Table from "../Table/Table";
import Spinner from "../Spinner/Spinner";
import { formatDollarValue, formatNumber } from "../../helpers/NumberFormatter";

const config = [
  {
    label: "Date",
    render: (company: CompanyCashflow) => company.date,
  },
    {
      label: "Operating Cashflow",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.operatingCashFlow),
    },
    {
      label: "Investing Cashflow",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.netCashUsedForInvestingActivites),
    },
    {
      label: "Financing Cashflow",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.netCashUsedProvidedByFinancingActivities),
    },
    {
      label: "Cash At End of Period",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.cashAtEndOfPeriod),
    },
    {
      label: "CapEX",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.capitalExpenditure),
    },
    {
      label: "Issuance Of Stock",
      render: (company: CompanyCashflow) =>
      formatNumber(company.commonStockIssued),
    },
    {
      label: "Free Cash Flow",
      render: (company: CompanyCashflow) =>
        formatDollarValue(company.freeCashFlow),
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
  <Spinner />
  );
};

export default CashflowStatement;
