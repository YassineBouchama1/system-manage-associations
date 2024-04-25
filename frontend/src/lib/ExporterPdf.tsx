// "use client";
// import jsPDF from "jspdf";
// import html2canvas from "html2canvas";
// import { useRef } from "react";

// interface ExporterPdfProps {
//   children: React.ReactNode;
// }

// export const ExporterPdf = async ({ children }: ExporterPdfProps) => {
//   const pdfRef = useRef<HTMLDivElement>(null);

//   const handleGeneratePdf = async () => {
//     const inputData : HTMLDivElement | null = pdfRef.current;


//     try {
//       const canvas = await html2canvas(inputData);
//       const imgData = canvas.toDataURL("image/png");
//       const pdf = new jsPDF({
//         orientation: "portrait",
//         unit: "px",
//         format: "a4",
//       });

//       const width = pdf.internal.pageSize.getWidth();
//       const height = pdf.internal.pageSize.getHeight();

//       pdf.addImage(imgData, "PNG", 0, 0, width, height);
//       pdf.save("pdffile.pdf");
//     } catch (error) {
//       console.error("Error in export:", error); // Improved error handling
//     }
//   };

//   return (
//     <>
//       <div ref={pdfRef}>{children}</div>
//       <button onClick={handleGeneratePdf}>Export</button>
//     </>
//   );
// };