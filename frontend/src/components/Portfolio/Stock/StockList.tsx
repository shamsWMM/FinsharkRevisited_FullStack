import StockCard from "../../Card/StockCard";

interface Props {
    stockValues: string[];
}

const StockList = ({ stockValues }: Props) => {
    return (
        <>
            <h3>Portfolio</h3>
            <ul>
                {stockValues &&
                    stockValues.map(
                        (stockValue) => {
                            return <StockCard stockValue={stockValue} />
                        }
                    )
                }
            </ul>
        </>
    );
}

export default StockList;