/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { getDashboardStats, getSalesData } from "../api/plants.jsx";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage.jsx";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPlants: 0,
    totalCategories: 0,
    activeGrowth: 0,
    monthlyData: [],
  });
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsData, salesData] = await Promise.all([
          getDashboardStats(),
          getSalesData(),
        ]);

        setStats({
          totalPlants: statsData.totalPlants,
          totalCategories: statsData.totalCategories,
          activeGrowth: statsData.activeGrowth,
          totalAmount: statsData.sales.totalAmount,
          totalTransactions: statsData.sales.totalTransactions,
          monthlyData: statsData.monthlyData.map((item) => ({
            month: new Date(item.month).toLocaleString("default", {
              month: "short",
            }),
            count: item.count,
          })),
        });

        // setSales(salesData.slice(0, 5)); // Show last 5 sales

        setSales(statsData.sales.recentSales); // Show last 5 sales
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to load dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Chart data configuration
  const chartData = {
    labels: stats.monthlyData.map((item) => item.month),
    datasets: [
      {
        label: "Plants Added",
        data: stats.monthlyData.map((item) => item.count),
        backgroundColor: "#2D5D4C",
        borderRadius: 4,
      },
    ],
  };

  // Sales table columns
  const salesColumns = [
    { header: "Farmer Name", accessor: "farmerName" },
    { header: "Plant Name", accessor: "plantName" },
    { header: "Type", accessor: "type" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Amount", accessor: "amount" },
    { header: "Mobile", accessor: "mobile" },
    { header: "Date", accessor: "date" },
  ];

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="pt-20 px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary">
        Dashboard Overview
      </h1>

      {/* Summary Cards - Existing ones plus sales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {/* Existing cards... */}

        <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-secondary font-bold">
              Total Amount
            </h2>
            <p className="text-4xl font-bold text-primary">
              ₹{stats.totalAmount}
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-secondary">Total Plants</h2>
            <p className="text-4xl font-bold text-primary">
              {stats.totalPlants}
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-secondary">Total Transactions</h2>
            <p className="text-4xl font-bold text-primary">
              {stats.totalTransactions}
            </p>
          </div>
        </div>
        <div className="card bg-white shadow-md hover:shadow-lg transition-shadow">
          <div className="card-body">
            <h2 className="card-title text-secondary">Total Categories</h2>
            <p className="text-4xl font-bold text-primary">
              {stats.totalCategories}
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-primary">
          Monthly Growth Analysis
        </h2>
        <div className="h-96">
          <Bar
            data={chartData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: { beginAtZero: true },
              },
            }}
          />
        </div>
      </div>

      {/* Sales Section */}
      <div className="card bg-base-100 shadow-md mt-8">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-secondary">Recent Sales</h2>
            <a href="/sales" className="btn btn-sm btn-ghost">
              View All Sales →
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  {salesColumns.map((col) => (
                    <th key={col.accessor}>{col.header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale._id}>
                    {salesColumns.map((col) => (
                      <td key={col.accessor}>
                        {col.accessor.includes(".")
                          ? sale[col.accessor.split(".")[0]]?.[
                              col.accessor.split(".")[1]
                            ]
                          : col.accessor === "date"
                          ? new Date(sale[col.accessor]).toLocaleDateString()
                          : sale[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {sales.length === 0 && (
              <div className="text-center p-4 text-gray-500">
                No sales records found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
