import RatioList from "../../components/RatioList/RatioList";
import Table from "../../components/Table/Table";
import { incomeStatementTestData } from "../../components/Table/testData";

const tableConfig = [
    {
        label: "Market Cap",
        render: (company: any) => company.marketCapTTM,
    }];

const DesignPage = () => {
    return (<>
        <h1>
            Website Design Guide
        </h1>
        <RatioList data={incomeStatementTestData} config={tableConfig}/>
        <Table data={incomeStatementTestData} config={{tableConfig}}/>
    </>);
};

export default DesignPage;