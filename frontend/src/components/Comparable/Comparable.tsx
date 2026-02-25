import type { CompanyComparableData } from "../../company";
import { useState, useEffect } from "react";
import { getComparableData } from "../../api";
import ComparableItem from "./ComparableItem/ComparableItem";

type Props = {
  ticker: string;
};

const Comparable = ({ ticker }: Props) => {
  const [companyData, setCompanyData] = useState<CompanyComparableData>();

  useEffect(() => {
    const getComparable = async () => {
      const value = await getComparableData(ticker);
      if (typeof value === "string") return;
      if (value.length > 0) {
        setCompanyData(value[0]);
      }
    };
    getComparable();
  }, [ticker]);

  return (
    <div className="inline-flex rounded-md shadow-sm m-4">
      {companyData?.peersList?.map((ticker) => {
        return <ComparableItem key={ticker} ticker={ticker} />;
      })}
    </div>
  );
};

export default Comparable;
