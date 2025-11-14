import type { SyntheticEvent } from "react";
import StockDelete from "../StockDelete/StockDelete";
import { Link } from "react-router-dom";

interface Props {
    stockValue: string;
    onStockDelete: (e: SyntheticEvent) => void;
}
const StockCard = ({ stockValue, onStockDelete }: Props) => {
    return (<div className="flex flex-col w-full p-8 space-y-4 text-center rounded-lg shadow-lg md:w-1/3">
        <Link to={`/company/${stockValue}`} className="pt-6 text-xl font-bold">{stockValue}</Link>
        <StockDelete onStockDelete={onStockDelete} stockValue={stockValue} />
    </div>);
};

export default StockCard;