import type { SyntheticEvent } from "react";

type Props = {
    onStockCreate: (e: SyntheticEvent) => void;
    symbol: string;
};

const Stock = ({ onStockCreate, symbol }: Props) => {
    return (<form onSubmit={onStockCreate}>
        <input readOnly={true} hidden={true} value={symbol} />
        <button type="submit">Add</button>
    </form>);
};

export default Stock;