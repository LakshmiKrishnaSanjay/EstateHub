import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts";
import { getCityWiseChartAPI, getPropertyTypeCountsAPI, getSubscriptionChartAPI, getUserRoleCountsAPI } from "../../services/chartServices";
import { useQuery } from "@tanstack/react-query";
import AdminSideBar from "../../components/AdminSideBar";

// Colors for the doughnut chart segments
const COLORS = ["#82ca9d", "#ff7f50", "#8884d8", "#ffc658", "#8dd1e1", "#0088FE", "#00C49F", "#FFBB28"];

// Function to transform data for recharts (handle null _id and object-to-array conversion)
const formatChartData = (data) => {
  if (!data) return [];

  // Handle property types (object to array)
  if (!Array.isArray(data)) {
    return Object.entries(data).map(([key, value]) => ({
      _id: key,
      count: value,
    }));
  }

  // Handle arrays (e.g., cityWise, subscriptions) with null _id
  return data.map((item) => ({
    ...item,
    _id: item._id === null ? "None" : item._id,
  }));
};

const PropertyTypeBarChart = () => {
  // Fetch data using react-query
  const { data: propertyTypes, isLoading: isLoadingPropertyTypes, isError: isErrorPropertyTypes } = useQuery({
    queryKey: ["propertyTypes"],
    queryFn: getPropertyTypeCountsAPI,
  });

  const { data: cityWise, isLoading: isLoadingCityWise, isError: isErrorCityWise } = useQuery({
    queryKey: ["cityWise"],
    queryFn: getCityWiseChartAPI,
  });

  const { data: subscriptions, isLoading: isLoadingSubscriptions, isError: isErrorSubscriptions } = useQuery({
    queryKey: ["subscriptions"],
    queryFn: getSubscriptionChartAPI,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["user-role-counts"],
    queryFn: getUserRoleCountsAPI,
  });

  const chartData = [
    { name: "Agents", value: data?.agent || 0 },
    { name: "Owners", value: data?.owner || 0 },
    { name: "Customers", value: data?.customer || 0 },
  ];



  // Transform data for charts
  const propertyTypeData = formatChartData(propertyTypes);
  const cityWiseData = formatChartData(cityWise);
  const subscriptionData = formatChartData(subscriptions);

  // Debugging logs
  console.log("Transformed Property Types Data:", propertyTypeData);
  console.log("Transformed City Wise Data:", cityWiseData);
  console.log("Transformed Subscriptions Data:", subscriptionData);

  // Handle loading state
  if (isLoadingPropertyTypes || isLoadingCityWise || isLoadingSubscriptions) {
    return <div className="text-center text-gray-600">Loading charts...</div>;
  }

  // Handle error state
  if (isErrorPropertyTypes || isErrorCityWise || isErrorSubscriptions) {
    return <div className="text-center text-red-600">Error loading charts</div>;
  }

  return (
    <div className="min-h-screen flex">
      <AdminSideBar />
      <div className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-4 shadow rounded">
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
                <Tooltip  />
                <Legend />
              </PieChart>
            )}
          </div>


      {/* City-wise Property Doughnut Chart */}
      <div className="bg-white p-4 shadow rounded flex flex-col md:flex-row justify-between">
  <div className="w-full md:w-2/3">
    <h2 className="text-xl font-semibold mb-4">Properties by District</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={cityWiseData}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={100}
          fill="#82ca9d"
          label
        >
          {cityWiseData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* District Names Only */}
  <div className="w-full md:w-1/3 mt-6 md:mt-0 md:pl-4">
    <h3 className="text-md font-medium mb-2">Districts</h3>
    <ul className="space-y-2">
      {cityWiseData.map((entry, index) => (
        <li key={index} className="flex items-center">
          <span
            className="inline-block w-3 h-3 rounded-full mr-2"
            style={{ backgroundColor: COLORS[index % COLORS.length] }}
          ></span>
          {entry._id}
        </li>
      ))}
    </ul>
  </div>
</div>




      {/* Property Type Bar Chart */}
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Properties by Type</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={propertyTypeData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>



      {/* Subscription Line Chart */}
     
      <div className="bg-white p-4 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Subscriptions</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={subscriptionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#ff7f50" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
   
  );
};

export default PropertyTypeBarChart;