"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { usePathname, useRouter } from "next/navigation";

export default function BarChartCut({ chartData }:{chartData:any}) {
  const chartRef: any = useRef<Chart | null>(null);
  // const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (chartRef.current) {
      console.log(chartData);
      if (chartRef.current.chart) {
        //  chartRef.current.data = chartData.data;
        //  chartRef.current.update();
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const label = chartData.labels;
      const data = chartData.data;

      const newChart = new Chart(context, {
        type: "bar",
        data: {
          labels: label,
          datasets: [
            {
              // barPercentage: 0.9,
              // barThickness: 50,
              label: "Info",
              data: data,
              backgroundColor: ["rgb(153, 102, 255, 0.2)"],
              borderColor: ["rgb(54, 162, 235)"],
              borderWidth: 1,
              borderRadius: 10,
            },
          ],
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: "Weight Name Info",
            },
          },
          layout: {
            padding: 40,
          },
          // responsive: true
          scales: {
            x: {
              type: "category",
            },
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [chartData]);

  const pathname = usePathname();
  const router = useRouter();


  function handleDownload() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "barChart.png";
      link.click();
    }
  }
  return (
    <div style={{ position: "relative", width: "90vw", height: "80vh" }}>
      <canvas ref={chartRef} />
      <button
        onClick={handleDownload}
        className="rounded-md bg-amber-600 bg-opacity-25 p-3 m-4 border border-amber-800"
      >
        Download Chart
      </button>
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
    </div>
  );
}
