"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { Bar } from "react-chartjs-2";

// Register ChartJS components using ChartJS.register
ChartJS.register(
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

const BarChart: React.FC<PropsTypes> = ({ chartData }) => {
  const { labels, data } = chartData;
console.log(chartData);
  const pathname = usePathname();
  const router = useRouter();

  const chartRef = useRef();

  const options = {
    responsive: true,

    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  const configChart = {
    labels: labels,
    datasets: [
      {
        label: "Patients",
        data: data,
        backgroundColor: "#4178c1",
        tension: 0.5,
        pointRadius: 4,
      },
    ],
  };

  return (
    <>
      <div>
        {" "}
        <button
          onClick={() => {
            router.push(`${pathname}/?timeframe=last90days`);
          }}
        >
          last 90 Months
        </button>
      </div>
      <div className="relative md:w-1/2 w-[90%] bg-white">
        <Bar options={options} ref={chartRef} data={configChart} />
      </div>
    </>
  );
};

export default BarChart;
