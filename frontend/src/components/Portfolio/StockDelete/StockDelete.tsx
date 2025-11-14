import type { SyntheticEvent } from "react";

interface Props {
    stockValue: string;
    onStockDelete: (e: SyntheticEvent) => void;
}

const StockDelete = ({ onStockDelete, stockValue }: Props) => {
    return <>
        <form onSubmit={onStockDelete}>
            <input hidden={true} value={stockValue} readOnly={true} />
            <button className="block w-full py-3 text-white duration-200 border-2 rounded-lg bg-red-500 hover:text-red-500 hover:bg-white border-red-500">
                X
            </button>
        </form>
    </>
};

export default StockDelete;