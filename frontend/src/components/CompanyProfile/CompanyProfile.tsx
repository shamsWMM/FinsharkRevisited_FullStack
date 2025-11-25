import { useOutletContext } from "react-router-dom";
import type { CompanyKeyMetrics } from "../../company";
import { useEffect, useState } from "react";
import { getCompanyKeyMetrics } from "../../api";
import RatioList from "../RatioList/RatioList";

const tableConfig = [
  {
    label: "Market Cap",
    render: (company: CompanyKeyMetrics) => company.marketCap,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Equity",
    render: (company: CompanyKeyMetrics) => company.returnOnEquityTTM,
  },
  {
    label: "Free Cash Flow Yield",
    render: (company: CompanyKeyMetrics) => company.freeCashFlowYieldTTM,
  },
  {
    label: "Current Ratio",
    render: (company: CompanyKeyMetrics) => company.currentRatioTTM,
  },
  {
    label: "Return On Invested Capital",
    render: (company: CompanyKeyMetrics) => company.returnOnInvestedCapitalTTM,
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
        <RatioList data={companyData} config={tableConfig} /> :
        "Loading ..."}
    </>
  );
};

export default CompanyProfile;