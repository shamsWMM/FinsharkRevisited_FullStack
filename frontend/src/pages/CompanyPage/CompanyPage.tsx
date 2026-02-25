import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../components/Sidebar/Sidebar";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import Tile from "../../components/Tile/Tile";
import Spinner from "../../components/Spinner/Spinner";
import Comparable from "../../components/Comparable/Comparable";

const CompanyPage = () => {
  let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();
  const [serverError, setServerError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);

    if (!ticker) {
      setServerError("No ticker provided");
      console.log(serverError);
      setIsLoading(false);
      return;
    }

    const getProfileInit = async () => {
      const result = await getCompanyProfile(ticker);

      if (typeof result === "string") {
        setServerError(result);
      } else {
        setCompany(result);
      }
      setIsLoading(false);
    };

    getProfileInit();
  }, [ticker]);

  return isLoading ?
    (
      <Spinner />
  ) : (
  ticker && company ?
    (
      <div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
      <Sidebar />
      <CompanyDashboard ticker={ticker}>
      <Tile title={"Company Name"} subtitle={company.companyName} />
      <Tile title={"Price"} subtitle={company.price.toString()} />
      <Tile title={"Sector"} subtitle={company.sector} />
      <Tile title={"Website"} subtitle={company.website} />
      <Comparable ticker={company.symbol} />
      <p className="bg-white shadow rounded text-medium text-gray-900 p-3 mt-1 m-4">
      {company.description} 
      </p>
      </CompanyDashboard>
      </div>
  ) : (
  <div>
  "Company Not Found."
  </div>
  ))};

  export default CompanyPage;
