import Card from "../Card/Card";
import "./CardList.css";

const CardList = () => {
    return <div>
        <Card companyName='Apple' ticker='APPL' price={100}/>
        <Card companyName='Orange' ticker='RNGE' price={140}/>
        <Card companyName='Choc' ticker='SHK' price={102}/>
    </div>;
};

export default CardList;