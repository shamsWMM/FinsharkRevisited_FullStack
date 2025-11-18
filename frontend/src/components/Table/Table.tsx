import {testIncomeStatementData} from "./testData";
const data = testIncomeStatementData;
type Company = (typeof data)[0];
const config = [
  {
    label: "Year",
    render: (company: Company) => company.calendarYear,
  },
  {
    label: "Cost of Revenue",
    render: (company: Company) => company.costOfRevenue,
  },
];

const Table = () => {
  const renderedRows = data.map((company) => {
    return (
      <tr key={company.cik}>
        <td className="p-4 whitespace-nowrap text-sm font-normal text-gray-900">
          {config[0].render(company)}
        </td>
        <td className="p-3">{config[1].render(company)}</td>
      </tr>
    );
  });
  const renderedHeaders = config.map((config) => {
    return (
      <th
        className="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
        key={config.label}
      >
        {config.label}
      </th>
    );
  });
  return (
    <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
      <table className="min-w-full divide-y divide-gray-200 m-5">
        <thead className="bg-gray-50">{renderedHeaders}</thead>
        <tbody>{renderedRows}</tbody>
      </table>
    </div>
  );
};

export default Table;