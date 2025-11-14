import type { CompanySearch } from "../../company";
import { v4 as uuidv4 } from "uuid";
import Card from "../Card/Card";
import "./CardList.css";
import type { SyntheticEvent } from "react";

interface Props {
    companies: CompanySearch[];
    onStockCreate: (e: SyntheticEvent) => void;
}

const CardList = ({ companies, onStockCreate }: Props) => {
    return (<div>
        {companies.length > 0 ?
            (companies.map(copmpany => {
                return <Card
                    id={copmpany.symbol}
                    key={uuidv4()}
                    company={copmpany}
                    onStockCreate={onStockCreate}
                />
            })) :
            (<p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
                No results found.
            </p>)}
    </div>);
};

export default CardList;