import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { getUserRoleCountsAPI } from "../../services/chartServices";
import AdminSideBar from "../../components/AdminSideBar";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const UserPieChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["user-role-counts"],
    queryFn: getUserRoleCountsAPI,
  });

  const chartData = [
    { name: "Agents", value: data?.agent || 0 },
    { name: "Owners", value: data?.owner || 0 },
    { name: "Customers", value: data?.customer || 0 },
  ];

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="w-full max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">User Role Distribution</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <PieChart width={400} height={300}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            label={({ name, value }) => `${name}: ${value}`}
          >
            {chartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      )}
    </div>
    </div>
  );
};

export default UserPieChart;
