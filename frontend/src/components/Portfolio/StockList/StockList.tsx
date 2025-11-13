import type { SyntheticEvent } from "react";
import StockCard from "../../Card/StockCard";
import { v4 as uuidv4 } from "uuid";

interface Props {
    stockValues: string[];
    onStockDelete: (e: SyntheticEvent) => void;
}

const StockList = ({ stockValues, onStockDelete }: Props) => {
    return (
        <>
            <h3>Portfolio</h3>
            <ul>
                {stockValues &&
                    stockValues.map(
                        (stockValue) => {
                            return <StockCard 
                                key={uuidv4()}
                                stockValue={stockValue} 
                                onStockDelete={onStockDelete} />
                        }
                    )
                }
            </ul>
        </>
    );
}

export default StockList;