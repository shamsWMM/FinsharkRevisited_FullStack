import type { SyntheticEvent } from "react";
import StockCard from "../../Card/StockCard";
import { v4 as uuidv4 } from "uuid";

interface Props {
    stockValues: string[];
    onStockDelete: (e: SyntheticEvent) => void;
}

const StockList = ({ stockValues, onStockDelete }: Props) => {
    return (
        <section id="portfolio">
            <h2 className="mb-3 mt-3 text-3xl font-semibold text-center md:text-4xl">
                Portfolio</h2>
            <div className="relative flex flex-col items-center max-w-5xl mx-auto space-y-10 px-10 mb-5 md:px-6 md:space-y-0 md:space-x-7 md:flex-row">
                <>
                    {stockValues.length > 0 ? (
                        stockValues.map(
                            (stockValue) => {
                                return (<StockCard
                                    key={uuidv4()}
                                    stockValue={stockValue}
                                    onStockDelete={onStockDelete} />
                                );
                            }
                        )) :
                        (
                            <h3 className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                                Your portfolio is empty.
                            </h3>
                        )}
                </>
            </div>
        </section>
    );
};

export default StockList;