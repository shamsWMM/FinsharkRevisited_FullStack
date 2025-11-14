import type { SyntheticEvent } from "react";
import type { CompanySearch } from "../../company";
import Stock from "../Portfolio/Stock/Stock";
import "./Card.css";
import { Link } from "react-router-dom";

interface Props {
    id: string;
    company: CompanySearch;
    onStockCreate: (e: SyntheticEvent) => void;
}

const Card = ({ company, onStockCreate }: Props) => {
    return (
        <div
            className="flex flex-col items-center justify-between w-full p-6 bg-slate-100 rounded-lg md:flex-row">
            <Link to={`/company/${company.symbol}`} className="font-bold text-center text-black md:text-left">
                {company.name} ({company.symbol})
            </Link>
            <p className="text-black">${company.currency}</p>
            <p className="font-bold text-black">
                {company.exchange} - {company.exchangeFullName}
            </p>
            <Stock onStockAdd={onStockCreate} symbol={company.symbol} />
        </div>);
};

export default Card;