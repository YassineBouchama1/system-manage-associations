"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Download } from "lucide-react";
import { useTranslations } from "next-intl";
export default function PieChart({ chartData }:{chartData:any}) {
  const chartRef: any = useRef<Chart | null>(null);
  const [hoveredData, setHoveredData] = useState<any>(null); // State to store hovered data

  //  get translator
  const t = useTranslations("ui");

  useEffect(() => {
    if (chartRef.current) {
      console.log(chartData);
      if (chartRef.current.chart) {
        //  chartRef.current.data = chartData.data;
        //  chartRef.current.update();
        chartRef.current.chart.destroy();
      }

      const context = chartRef.current.getContext("2d");

      const label = ["safi", "marrakech", "casa", "rabat"];
      const data = [2, 20, 17, 10];

      const newChart = new Chart(context, {
        type: "pie",
        data: {
          labels: label,
          datasets: [
            {
              // barPercentage: 0.9,
              // barThickness: 50,
              label: t("chart_Patient"),
              data: data,
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
                "green",
              ],
              hoverOffset: 4,
              borderColor: ["rgb(54, 162, 235)"],
              borderWidth: 0,
              // borderRadius: 10,
            },
          ],
        },
        options: {
          plugins: {
            // aspectRatio: 2,
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: t("chart_title_Patient"),
            },
          },
          layout: {
            padding: 0,
          },
          scales: {
            // x: {
            //   type: "category",
            // },
            // y: {
            //   beginAtZero: true,
            // },
          },
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [chartData, t]);

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  interface TimeframeOption {
    value: string;
    label: string;
  }
  const timeframeOptions: TimeframeOption[] = [
    { value: "last30days", label: t("chart_30_days") },
    { value: "last90days", label: t("chart_90_days") },
    { value: "lastWeek", label: t("chart_7_days") },
    { value: "allTime", label: t("chart_All_time") },
  ];

  const handleSelectNewDate = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedTimeframe = event.target.value as string; // Type casting for safety
    router.push(`${pathname}/?timeframe=${selectedTimeframe}`);
  };

  function handleDownload() {
    if (chartRef.current) {
      const file = chartRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = file;
      link.download = "PieChart.png";
      link.click();
    }
  }
  return (
    <div
      style={{ position: "relative" }}
      className="flex justify-center flex-col w-[100%]  lg:w-1/2 h-auto bg-white rounded-md my-4 px-4"
    >
      <div className=" p-4 flex justify-between">
        <button onClick={handleDownload}>
          <Download size={20} className="text-theme-color" />
        </button>
        <select
          onChange={handleSelectNewDate}
          value={searchParams.get("timeframe") || ""}
        >
          {timeframeOptions.map((option) => (
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
