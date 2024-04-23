'use client'
import * as XLSX from "xlsx";

export const GetExportXlsx = async (
  title?: string,
  worksheetname?: string,
  dataToExport?:any
) => {

      // Create Excel workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
      XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
      // Save the workbook as an Excel file
      XLSX.writeFile(workbook, `${title}.xlsx`);
  
};
