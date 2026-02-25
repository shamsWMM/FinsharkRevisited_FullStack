import { Link } from "react-router-dom";

type Props = {
  ticker: string;
};

const ComparableItem = ({ ticker }: Props) => {
  return (
    <Link
      reloadDocument
      to={`/company/${ticker}/company-profile`}
      type="button"
      className="inline-flex items-center p-4 rounded-1-lg"
    >
    {ticker}
    </Link>
  );
};

export default ComparableItem;
