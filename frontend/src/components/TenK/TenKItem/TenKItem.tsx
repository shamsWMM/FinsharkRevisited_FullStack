import { Link } from "react-router-dom";
import type { CompanyTenK } from "../../../company"

type Props = {
  tenK: CompanyTenK;
};

const TenKItem = ({ tenK }: Props) => {
  const filingDate = new Date(tenK.fillingDate).getFullYear();

  return (
    <Link
      reloadDocument
      to={tenK.finalLink}
      type="button"
      className="inline-flex items-center p-4 text-md bg-lightGreen rounded-1-lg"
    >
    10K - {tenK.symbol} - {filingDate}
    </Link>
  );
};

export default TenKItem;
