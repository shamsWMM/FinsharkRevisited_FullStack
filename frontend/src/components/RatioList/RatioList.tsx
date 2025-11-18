import { TestDataCompany } from "../RatioList/testData";

const data = TestDataCompany[0];

type Company = typeof data;

const config = [
    {
        label: "Company Name",
        render: (company: Company) => company.companyName,
        subtitle: "It's the subtitle"
    }
];

const RatioList = () => {
    const renderedRow = config.map(row => {
        return (
            <li className="py-3 sm:py-4">
                <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 trucate">
                            {row.label}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                            {row.subtitle}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900">
                        {row.render(data)}
                    </div>
                </div>
            </li>
        );
    });
    return (
        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
            <ul className="divide-y divided-gray-200">
                {renderedRow}
            </ul>
        </div>
    );
};

export default RatioList;