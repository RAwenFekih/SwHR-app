import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({ data }) => {
  // Transform the data to format the date
  const formattedData = data.map(item => ({
    ...item,
    // Convert ISO string to just date (YYYY-MM-DD)
    review_date: item.review_date.split('T')[0]
    
    // OR for just month/year format:
    // review_date: item.review_date.substring(0, 7) // "2025-07"
  }));

  console.log("Formatted data:", formattedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={formattedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="review_date" 
          label={{ value: 'Review Date', position: 'insideBottomRight', offset: -5 }}
        />
        <YAxis 
          label={{ value: 'Rating', angle: -90, position: 'insideLeft' }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="rating"
          name="Performance Rating"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 10 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;