// chart.tsx (or a dedicated chart component file)

import React, { useEffect, useRef } from "react";
import { Chart } from "chart.js";
import {
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

Chart.register(
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

interface ChartData {
  labels: string[];
  datasets: { label: string; data: number[] }[];
}

interface ChartOptions {
  // Add any custom options you want to support in your charts
}

const useChart = (
  data: ChartData,
  options: ChartOptions,
  type:  "line"
): React.RefObject<HTMLCanvasElement> => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      // Initialize the chart if it hasn't been created yet
      if (!chartInstance.current) {
        chartInstance.current = new Chart(chartRef.current, {
          type: type,
          data,
          options,
        });
      } else {
        // Update the existing chart
        // chartInstance.current.type = 'line' ;
        chartInstance.current.data = data;
        chartInstance.current.options = options;
        chartInstance.current.update(); // Call `update` to reflect changes
      }
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [data, options, type]);

  return chartRef;
};

export default useChart;
