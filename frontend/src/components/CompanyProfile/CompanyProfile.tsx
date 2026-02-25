import { useOutletContext } from "react-router-dom";
import type { CompanyKeyMetrics } from "../../company";
import { useEffect, useState } from "react";
import { getCompanyKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";
import Spinner from "../Spinner/Spinner";
import { formatDollarValue, formatRatio } from "../../helpers/NumberFormatter";

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) =>
      formatDollarValue(company.marketCap),
      subTitle: "Total value of all a company's shares of stock",
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.currentRatioTTM),
      subTitle:
      "Measures the companies ability to pay short term debt obligations",
  },
  {
    label: "Return On Equity",
      render: (company: CompanyKeyMetrics) =>
        formatRatio(company.returnOnEquityTTM),
        subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: CompanyKeyMetrics) =>
      formatRatio(company.freeCashFlowYieldTTM),
      subTitle: "Shows how much a company pays each year relative to stock price",
  },
  {
    label: "Return On Invested Capital",
    render: (company: CompanyKeyMetrics) =>
      formatDollarValue(company.returnOnInvestedCapitalTTM),
      subTitle:
      "Return on equity is the measure of a company's net income divided by its shareholder's equity",
  },
];

const CompanyProfile = () => {
  const ticker = useOutletContext<string>();
  const [companyData, setCompanyData] = useState<CompanyKeyMetrics>();
  useEffect(() => {
    const getKeyMetrics = async () => {
      const value = await getCompanyKeyMetrics(ticker);
      if (typeof value == "string")
        return;
      setCompanyData(value);
    };
    getKeyMetrics();
  }, []);
  return (
    <>
      {companyData ?
        (
          <RatioList data={companyData} config={tableConfig} /> 
      ) : (
          <Spinner />
      )}
    </>
  );
};

export default CompanyProfile;
