// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

const doughnutData = {
    labels: ['Label 1', 'Label 2', 'Label 3'],
    datasets: [
      {
        data: [30, 40, 30],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      },
    ],
  };
  
  // Line Chart Data
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
    datasets: [
      {
        label: 'Line Chart',
        data: [100, 150, 120, 80, 110],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  
function LineChart() {
  return <Line data={lineData} />;
}
export default (LineChart);