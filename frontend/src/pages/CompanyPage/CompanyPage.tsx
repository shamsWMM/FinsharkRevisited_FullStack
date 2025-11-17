import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";
import Sidebar from "../../components/Sidebar/Sidebar";
import CompanyDashboard from "../../components/CompanyDashboard/CompanyDashboard";
import Tile from "../../components/Tile/Tile";

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
        <p>Loading company profile...</p> :
        company ?
            (<div className="w-full relative flex ct-docs-disable-sidebar-content overflow-x-hidden">
                <Sidebar />
                <CompanyDashboard>
                    <Tile title={company.companyName} subtitle={company.city} />
                </CompanyDashboard>
            </div>) :
            <div>
                "Company Not Found."
            </div>;
};

export default CompanyPage;