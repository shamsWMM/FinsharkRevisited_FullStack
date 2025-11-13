import type { SyntheticEvent } from "react";
import StockDelete from "../Portfolio/StockDelete/StockDelete";

interface Props {
    stockValue: string;
    onStockDelete: (e: SyntheticEvent) => void;
}
const StockCard = ({stockValue, onStockDelete} : Props) => {
    return (<>
    <h4>{stockValue}</h4>
    <StockDelete onStockDelete={onStockDelete} stockValue={stockValue} />
    </>);
}

export default StockCard;