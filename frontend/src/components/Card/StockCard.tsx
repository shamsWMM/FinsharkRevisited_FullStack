interface Props {
    stockValue: string;
}
const StockCard = ({stockValue} : Props) => {
    return <>
    <h4>{stockValue}</h4>
    <button>X</button>
    </>
}

export default StockCard;