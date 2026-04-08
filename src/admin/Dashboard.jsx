import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Button from "../components/utils/Button";
import Card from "../components/utils/Card";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import { GetDashboardData } from '../api/ApiFunction';
import Loader from '../components/utils/Loader';
import getFirstDayOfCurrentMonth from '../components/utils/getFirstDayOfCurrentMonth';
import NumberFormatter from '../components/utils/NumberFormatter';
import Icon from '../components/utils/Icon';

function Dashboard() {
    const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const [isLoading, setIsLoading] = useState(true);
    const [graphData, setGraphData] = useState([]);
    const [dashboardData, setDashboardData] = useState(null);
    const [monthWiseData, setMonthWiseData] = useState([]);
    const [dayWiseData, setDayWiseData] = useState([]);

    const dateToday = new Date().toISOString().split("T")[0];
    const firstDay = getFirstDayOfCurrentMonth();

    const dummyCards = [{
        amount: '91',
        title: 'Leads Landed',
        change: '+12%'
    },
    {
        amount: '25',
        title: 'Loans Disbursed',
        change: '+12%'
    },
    {
        amount: '1030K',
        title: 'Loan Disbursed',
        change: '+12%'
    },
    {
        amount: '6',
        title: 'Cases Underwaiting',
        change: '+12%'
    },
     {
        amount: '7',
        title: 'New Cases Disbursed',
        change: '+12%'
    },
     {
        amount: '185K',
        title: 'New Cases Disbursed Amount',
        change: '+12%'
    },
    {
        amount: '844K',
        title: 'Repeat Cases Disbursed',
        change: '+12%'
    },
    {
        amount: '1645K',
        title: 'Repeat Cases Disbursed Amount',
        change: '+12%'
    },
    {
        amount: '1320K',
        title: 'Demand of the Day',
        change: '+12%'
    },
    {
        amount: '80.24%',
        title: 'Collected Amount',
        change: '+12%'
    },
    {
        amount: '7',
        title: 'Collection effieciency againsed demand',
        change: '+12%'
    },
]

    const updateDateTime = () => {
        setCurrentDateTime(new Date());
        fetchDashboardData();
        fetchMonthWiseData();
        location.reload();
    };

    // useEffect(() => {
    //     const intervalId = setInterval(updateDateTime, 600000);
    //     return () => clearInterval(intervalId);
    // }, []);

    const fetchDashboardData = async () => {
        const req = {
            from_date: "2025-05-01",
            to_date: dateToday,
            company_id: import.meta.env.VITE_COMPANY_ID,
            product_name: import.meta.env.VITE_PRODUCT_NAME
        };

        try {
            const response = await GetDashboardData(req);
            setDashboardData(response.totalCounts);
            setGraphData(response.data || []);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setIsLoading(false);
        }
    };

    const fetchMonthWiseData = async () => {
        const req = {
            from_date: firstDay.toISOString().split("T")[0],
            to_date: dateToday,
            company_id: import.meta.env.VITE_COMPANY_ID,
            product_name: import.meta.env.VITE_PRODUCT_NAME
        };

        try {
            const response = await GetDashboardData(req);
            setMonthWiseData(response.totalCounts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setIsLoading(false);
        }
    };

    const fetchDayWiseData = async () => {
        const req = {
            from_date: dateToday,
            to_date: dateToday,
            company_id: import.meta.env.VITE_COMPANY_ID,
            product_name: import.meta.env.VITE_PRODUCT_NAME
        };

        try {
            const response = await GetDashboardData(req);
            setDayWiseData(response.totalCounts);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching dashboard data:", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
        fetchMonthWiseData();
        fetchDayWiseData();
    }, []);


    function formatNumber(num) {
        if (num >= 10000000) {
            return (num / 10000000).toFixed(2) + 'CR';
        } else if (num >= 100000) {
            return (num / 100000).toFixed(2) + 'L';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        } else {
            return num.toString();
        }
    }

    const DashboardStats = ({ data, title }) => {
        if (!data || data.length === 0) return null;

        // Fields to format with NumberFormatter
        const amountFields = [
            "total_amount_disbursed",
            "total_amount_collected",
            "total_amount_due",
            "total_amount_overdue"
        ];

        const stats = Object.entries(data[0]);

        const statPairs = [];
        for (let i = 0; i < stats.length; i += 2) {
            statPairs.push(stats.slice(i, i + 2));
        }

        return (
            <>
                <span className="font-bold text-base bg-primary text-white px-5 py-1 rounded-t-lg">
                    {title}
                </span>
                <div className="p-5 border border-gray-400 rounded-b-lg">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {statPairs.map((pair, index) => (
                            <div key={index} className="bg-white rounded shadow border border-gray-200">
                                <div className="bg-gradient-to-r from-primary to-blue-500 h-3"></div>
                                <div className="px-5 py-3">
                                    {pair.map(([key, value]) => (
                                        <div key={key} className="flex justify-between mb-2">
                                            <span className="font-medium text-gray-600 capitalize">
                                                {key.replace(/_/g, " ")}
                                            </span>
                                            <span className="font-bold text-primary text-xl">
                                                {
                                                    amountFields.includes(key)
                                                        ? formatNumber(value)
                                                        : value
                                                }
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    };


    if (isLoading) {
        return <Loader />;
    };

    const categories = graphData.map(item => `${item.month_name} ${item.year}`);

    const metricKeys = [
        { key: 'all_leads', label: 'All Leads' },
        { key: 'active_loans', label: 'Active Loans' },
        { key: 'leads_reject', label: 'Rejected' },
        { key: 'loan_closed', label: 'Closed Loans' },
    ];


    const series = metricKeys.map(({ key, label }) => ({
        name: label,
        data: graphData.map(month => month.monthwisedata?.[0]?.[key] ?? 0),
    }));

    return (
        <>
            <Helmet>
                <title>Dashboard</title>
                <meta name="Leads Verification" content="Leads Verification" />
            </Helmet>

            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-3 my-6">
                    <div className="text-xl font-bold"></div>
                    <div className="flex items-center">
                        <span className="text-dark pr-5 text-xs">
                            Last Refreshed: {currentDateTime.toLocaleDateString()}, {currentDateTime.toLocaleTimeString()}
                        </span>
                        <Button
                            onClick={updateDateTime}
                            btnName="Refresh"
                            btnIcon="IoRefresh"
                            style={"bg-primary text-white hover:bg-secondary hover:text-black"}
                        />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 mb-4">
                {/* stats card  */}
                {!dummyCards?.map((card) => (
                    <div className="w-full h-32 p-4 rounded-2xl min-w-0 bg-[#0db3a5]/90 backdrop-blur-md border border-white/20 shadow-lg shadow-teal-500/30 flex flex-col sm:flex-row overflow-hidden hover:scale-[1.02] transition-all duration-200">

                    {/* Left: Icon Section */}
                    <div className="w-full sm:w-2/5 flex items-center  bg-white/10 backdrop-blur-sm border-b border-white/10 sm:border-b-0 sm:border-r">
                        <div className="p-3 rounded-xl bg-white/20">
                            <Icon name="IoKeyOutline" color="white" size={48} />
                        </div>
                    </div>

                    {/* Right: Content */}
                    <div className="w-full sm:w-3/5 flex flex-col justify-center px-4 py-3">
                        <div className="text-2xl font-bold text-white leading-tight">{card?.amount}</div>
                        <div className="text-sm text-white/90">{card?.title}</div>
                        <div className="text-xs text-green-300 mt-1 font-medium">{card?.change}</div>
                    </div>
                </div>
                ))}

            </div>

            <div className="">
                <div className='mb-5'>
                    <DashboardStats data={dayWiseData} title="Today" />
                </div>
                <div className='mb-5'>
                    <DashboardStats data={monthWiseData} title="Current Month" />
                </div>
                <div className='mb-5'>
                    <DashboardStats data={dashboardData} title="Overall Business" />
                </div>
            </div>

            <div className="mt-6">

                <div className='w-full'>
                    <Card heading="Chart" style={"hover:scale-105 duration-500"}>
                        <LineChart
                            series={series}
                            categories={categories}
                            // title="Monthly Loan Activity"
                            height={250}
                            type="area"
                            colors={['#1E88E5', '#00C853', '#FFC107', '#FF3D00', '#6A1B9A', '#00ACC1']}
                        />
                    </Card>
                </div>
                <div className='w-full mt-6'>
                    <Card
                        heading="Chart"
                        style={"hover:scale-105 duration-500 py-2 px-2"}
                    >
                        <BarChart
                            data={graphData}
                            metrics={['all_leads', 'active_loans', 'leads_reject', 'loan_closed']}
                            labelMap={{
                                loan_closed: 'Closed Loans',
                                leads_reject: 'Rejected',
                                active_loans: 'Active Loans',
                                all_leads: 'All Leads',
                            }}
                        />
                    </Card>
                </div>

            </div>
        </>
    );
}

export default Dashboard;
