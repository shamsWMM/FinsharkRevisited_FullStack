type Props = {
    onStockAdd: (e: any) => void;
    symbol: string;
};

const Stock = ({ onStockAdd: onStockAdd, symbol }: Props) => {
    return (<div className="flex flex-col items-center justify-end flex-1 space-x-4 space-y-2 md:flex-row md:space-y-0">
        <form onSubmit={onStockAdd}>
            <input readOnly={true} hidden={true} value={symbol} />
            <button
                type="submit"
                className="p-2 px-8 text-black bg-blue rounded-lg hover:opacity-70 focus:outline-none">
                Add
            </button>
        </form>
    </div>);
};

export default Stock;