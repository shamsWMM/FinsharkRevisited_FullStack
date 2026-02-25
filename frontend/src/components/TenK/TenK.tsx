import type { CompanyTenK } from "../../company";
import TenKItem from "./TenKItem/TenKItem";
import { useState, useEffect } from "react";
import { getTenK } from "../../api";
import Spinner from "../Spinner/Spinner";

type Props = {
  ticker: string;
};

const TenK = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyTenK[]>();

  useEffect(() => {
    const getTenKData = async () => {
      const value = await getTenK(ticker);
      if (typeof value === "string") return;
      if (value.length > 0) {
        setCompanyData(value);
      }
    };
    getTenKData();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4" role="group">
    { companyData ?
      (
        companyData?.slice(0,5).map((tenK) => {
          return <TenKItem tenK={tenK} />;

        })) : 
          (
            <Spinner />
        )}
        </div>
  );
};

export default TenK;
