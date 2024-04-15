'use client'
import {
  Chart as ChartJS,
  BarController,
  LineController,
  PieController,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef } from "react";
import { Line } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
  BarController,
  LineController,
  PieController,
  LineElement,
  ArcElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartDataType {
  labels: string[];
  data: number[];
}

interface PropsTypes {
  chartData: any;
}

const LineChart: React.FC<PropsTypes> = ({ chartData }) => {
 
  return (
    <div className="relative md:w-1/2 w-[90%]">
      <Line options={options} ref={chartRef} data={configChart} />
    </div>
  );
};

export default LineChart;
