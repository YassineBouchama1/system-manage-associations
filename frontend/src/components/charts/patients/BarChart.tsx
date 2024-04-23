"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
export default function BarChart({ chartData }:{chartData:any}) {
  const chartRef: any = useRef<Chart | null>(null);

// 
const t = useTranslations('ui')


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
              label: t("chart_Patient"),
              data: data,
              backgroundColor: "#4880FF",
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
              text: t("chart_title_Patient"),
            },
          },
          layout: {
            padding: 0,
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
  }, [chartData, t]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams()
 
interface TimeframeOption {
  value: string;
  label: string; 
}
const timeFrameOptions: TimeframeOption[] = [
  { value: "last30days", label: t("chart_30_days") },
  { value: "last90days", label: t("chart_90_days") },
  { value: "lastWeek", label: t("chart_7_days") },
  { value: "allTime", label: t("chart_All_time") },
];


// change  time frame 
  const handleSelectNewDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeframe = event.target.value as string;
    router.push(`${pathname}/?timeFrame=${selectedTimeframe}`);
  };

  // for download img of charts
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
    <div className="flex justify-center flex-col w-[100%]   h-auto bg-white rounded-md my-4 p-4">
      <div className=" p-4 flex justify-between">
        <button onClick={handleDownload}>
          <Download size={20} className="text-theme-color" />
        </button>
        <select
          onChange={handleSelectNewDate}
          value={searchParams.get("timeFrame") || ""}
        >
          {timeFrameOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <canvas ref={chartRef} />
    </div>
  );
}
