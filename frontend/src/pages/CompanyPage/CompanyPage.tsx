import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { CompanyProfile } from "../../company";
import { getCompanyProfile } from "../../api";

const CompanyPage = () => {
    let { ticker } = useParams();
    const [company, setCompany] = useState<CompanyProfile>();
    const [serverError, setServerError] = useState<string>("");

    useEffect(() => {
        if (!ticker) {
            setServerError("No ticker provided");
            return;
        }

        const getProfileInit = async () => {
            const result = await getCompanyProfile(ticker);

            if (typeof result === "string") {
                setServerError(result);
            } else {
                setCompany(result);
            }
        };

        getProfileInit();
    }, []);

    return (
        <div>
            {
                company ?
                    company.companyName :
                    "Company Not Found."
            }
        </div>);
};

export default CompanyPage;