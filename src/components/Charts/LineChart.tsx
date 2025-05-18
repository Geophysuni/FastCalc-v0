import React from "react";
import { Line } from "react-chartjs-2";
import { 
  Chart as ChartJS, 
  LineElement, 
  PointElement, 
  LinearScale, 
  CategoryScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      yAxisID?: string;
      borderWidth?: number;
      pointRadius?: number;
    }>;
  };
  options?: any;
}

const LineChart: React.FC<LineChartProps> = ({ data, options }) => {
  const defaultOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    ...options
  };

  return <Line data={data} options={defaultOptions} />;
};

export default LineChart;