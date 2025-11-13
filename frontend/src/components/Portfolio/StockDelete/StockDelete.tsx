import type { SyntheticEvent } from "react";

interface Props {
    stockValue: string;
    onStockDelete: (e: SyntheticEvent) => void;
}

const StockDelete = ({onStockDelete, stockValue}: Props) => {
    return <>
        <form onSubmit={onStockDelete}>
            <input hidden={true} value={stockValue} readOnly={true} />
            <button>X</button>
        </form>
    </>
};

export default StockDelete;