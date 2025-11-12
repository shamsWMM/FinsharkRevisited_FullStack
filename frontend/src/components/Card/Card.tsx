import type { SyntheticEvent } from "react";
import type { CompanySearch } from "../../company";
import Stock from "../Portfolio/Stock/Stock";
import "./Card.css";

interface Props {
    id: string;
    company: CompanySearch;
    onStockCreate: (e: SyntheticEvent) => void;
}

const Card = ({id, company, onStockCreate}: Props) => {
    return (
        <div className="card">
            <img
                alt="company logo"
            />
            <div className="details">
                <h2>{company.name} ({company.symbol})</h2>
                <p>${company.currency}</p>
            </div>
            <p className="info">
                {company.exchange} - {company.exchangeFullName}
            </p>
            <Stock onStockCreate={onStockCreate} symbol={company.symbol}/>
        </div>);
};

export default Card;