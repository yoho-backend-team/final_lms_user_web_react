// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import logo from "assets/images/logo.png"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Box,
//   Typography,
// } from "@mui/material";
// import jsPDF from "jspdf";

// const useStyles = makeStyles({
//   table: {
//     backgroundColor: "transparent",
//   },
  
//   header: {
//     backgroundColor: "transparent",
//     color: "#000000",
//     fontSize: "25px", // Increased font size
//     fontWeight: 700,
//     lineHeight: "30px", // Adjusted line height to match the font size
//     border: "none",
//   },
  
//   cell: {
//     backgroundColor: "transparent",
//     fontSize: "16px",
//     fontWeight: "500",
//     lineHeight: "24px",
//     borderBottom: "1px solid #D9D9D9",
//   },
//   button: {
//     backgroundColor: "#DFC7FF",
//     color: "#5611B1",
//     textTransform: "none",
//     borderRadius: "54px",
//     border: "1px solid #A77DDE",
//     transition: "transform 0.3s, background-color 0.3s",
//     "&:hover": {
//       backgroundColor: "#C5A4F7",
//       transform: "scale(1.05)",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    
//     },
//   },
//   container: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//   },
// });

// const SalaryDetailsTable = ({ data, months }) => {
//   const classes = useStyles();
//   const [employeeName] = useState("chandran");
//   const [designation] = useState("developer");
//   const [monthYear] = useState("2024 feb");
//   const [earnings] = useState({
//     basicDA: "0",
//     hra: "0",
//     conveyance: "no salary",
//   });
//   const [deductions] = useState({
//     pf: "0",
//     esi: "0",
//     loan: "0",
//   });

//   const getMonth = (date) => {
//     const new_date = new Date(date).getMonth();
//     return months[new_date];
//   };

//   const handleGeneratePDF = (data) => {
//     const doc = new jsPDF("portrait");
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     const padding = 5;
//     const margin = 5;

//     doc.setLineWidth(0.5);
//     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

//     const text = "This is an example of text with borders and padding in jsPDF.";
//     const xPos = margin + padding;
//     const yPos = margin + padding + 10;
    

//     doc.text(text, xPos, yPos);
   
      

  
//     doc.save(`chandran_salary_slip.pdf`);
//   };
      

//   return (
//     <Box sx={{ px: "40px" }}>
//       <Box sx={{ mb: "28px" }}>
//         <Typography
//           sx={{ fontSize: "28px", fontWeight: 900, lineHeight: "24px", mt: 10, mb: 10 }}
//         >
//           Salary Detail
//         </Typography>
//       </Box>
//       <TableContainer className={classes.container}>
//         <Table className={classes.table} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell className={classes.header}>Month</TableCell>
//               <TableCell className={classes.header} align="center">
//                 Amount Received
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Working Days
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Absent
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Deductions
//               </TableCell>
//               <TableCell className={classes.header} align="center"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.payment_date}>
//                 <TableCell component="th" scope="row" className={classes.cell}>
//                   {getMonth(row.payment_date)}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row?.salary_amount}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.workingDays}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.absent}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.deductions}
//                 </TableCell>
//                 <TableCell align="center" sx={{ border: "none" }} className={classes.cell}>
//                   <Button
//                     variant="contained"
//                     className={classes.button}
//                     onClick={() => handleGeneratePDF(row)}
//                   >
//                     Download Slip
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default SalaryDetailsTable;

// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import logo from "assets/images/logo.png";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   Button,
// } from "@mui/material";
// import jsPDF from "jspdf";

// const useStyles = makeStyles({
//   table: {
//     backgroundColor: "transparent",
//   },

//   header: {
//     backgroundColor: "transparent",
//     color: "#000000",
//     fontSize: "25px",
//     fontWeight: 700,
//     lineHeight: "30px",
//     border: "none",
//   },

//   cell: {
//     backgroundColor: "transparent",
//     fontSize: "16px",
//     fontWeight: "500",
//     lineHeight: "24px",
//     borderBottom: "1px solid #D9D9D9",
//   },
  
//   button: {
//     backgroundColor: "#DFC7FF",
//     color: "#5611B1",
//     textTransform: "none",
//     borderRadius: "54px",
//     border: "1px solid #A77DDE",
//     transition: "transform 0.3s, background-color 0.3s",
//     "&:hover": {
//       backgroundColor: "#C5A4F7",
//       transform: "scale(1.05)",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     },
//   },

//   container: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//   },
// });

// const SalaryDetailsTable = ({ data, months }) => {
//   const classes = useStyles();
//   const [employeeName] = useState("Chandran");
//   const [designation] = useState("Developer");
//   const [monthYear] = useState("2024 Feb");

//   const getMonth = (date) => {
//     const new_date = new Date(date).getMonth();
//     return months[new_date];
//   };

//   const handleGeneratePDF = (row) => {
//     const doc = new jsPDF("portrait");
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     const margin = 10;
//     const padding = 5;

//     // Set document margins
//     doc.setLineWidth(0.5);
//     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

//     // Add company logo
    
//     doc.addImage(logo, 'PNG', 10, 10, 80, 40);  // Reduced size

    

//     // Header Section: Company Name and Salary Slip Title
//     doc.setFontSize(18);
//     doc.text("Company Name", pageWidth / 2, 15, { align: "center" });
//     doc.setFontSize(10);
//     doc.text("[Company Address]", pageWidth / 2, 25, { align: "center" });
//     doc.setFontSize(12);
//     doc.text("Salary Slip", pageWidth / 2, 35, { align: "center" });

//     // Employee Details Section
//     doc.setFontSize(12);
//     const employeeDetails = [
//       `Employee Name: ${employeeName}`,
//       `Designation: ${designation}`,
//       `Month & Year: ${monthYear}`,
//     ];
//     let yPosition = 50;
//     employeeDetails.forEach((detail) => {
//       doc.text(detail, margin, yPosition);
//       yPosition += 10;
//     });

//     // Salary Breakdown Section
//     doc.setFontSize(14);
//     doc.text("Salary Details:", margin, yPosition);
//     yPosition += 10;
//     doc.text(`Amount Received: ${row.salary_amount}`, margin, yPosition);
//     yPosition += 10;
//     doc.text(`Working Days: ${row.workingDays}`, margin, yPosition);
//     yPosition += 10;
//     doc.text(`Absent: ${row.absent}`, margin, yPosition);
//     yPosition += 10;
//     doc.text(`Deductions: ${row.deductions}`, margin, yPosition);
//     yPosition += 10;

//     // Footer Section: Signature Lines
//     doc.text("Employee Signature: ____________________", margin, pageHeight - 40);
//     doc.text("Authorized Signature: ____________________", margin + 100, pageHeight - 40);

//     // Save the PDF
//     doc.save(`${employeeName}_salary_slip_${row.payment_date}.pdf`);
//   };

//   return (
//     <Box sx={{ px: "40px" }}>
//       <Box sx={{ mb: "28px" }}>
//         <Typography sx={{ fontSize: "28px", fontWeight: 900, lineHeight: "24px", mt: 10, mb: 10 }}>
//           Salary Detail
//         </Typography>
//       </Box>
//       <TableContainer className={classes.container}>
//         <Table className={classes.table} aria-label="salary details table">
//           <TableHead>
//             <TableRow>
//               <TableCell className={classes.header}>Month</TableCell>
//               <TableCell className={classes.header} align="center">
//                 Amount Received
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Working Days
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Absent
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Deductions
//               </TableCell>
//               <TableCell className={classes.header} align="center"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.payment_date}>
//                 <TableCell component="th" scope="row" className={classes.cell}>
//                   {getMonth(row.payment_date)}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row?.salary_amount}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.workingDays}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.absent}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.deductions}
//                 </TableCell>
//                 <TableCell align="center" sx={{ border: "none" }} className={classes.cell}>
//                   <Button
//                     variant="contained"
//                     className={classes.button}
//                     onClick={() => handleGeneratePDF(row)}
//                   >
//                     Download Slip
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default SalaryDetailsTable;
// import React, { useState } from "react";
// import { makeStyles } from "@mui/styles";
// import logo from "assets/images/logo.png";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Box,
//   Typography,
//   Button,
// } from "@mui/material";
// import jsPDF from "jspdf";

// const useStyles = makeStyles({
//   table: {
//     backgroundColor: "transparent",
//   },

//   header: {
//     backgroundColor: "transparent",
//     color: "#000000",
//     fontSize: "25px",
//     fontWeight: 700,
//     lineHeight: "30px",
//     border: "none",
//   },

//   cell: {
//     backgroundColor: "transparent",
//     fontSize: "16px",
//     fontWeight: "500",
//     lineHeight: "24px",
//     borderBottom: "1px solid #D9D9D9",
//   },

//   button: {
//     backgroundColor: "#DFC7FF",
//     color: "#5611B1",
//     textTransform: "none",
//     borderRadius: "54px",
//     border: "1px solid #A77DDE",
//     transition: "transform 0.3s, background-color 0.3s",
//     "&:hover": {
//       backgroundColor: "#C5A4F7",
//       transform: "scale(1.05)",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//     },
//   },

//   container: {
//     backgroundColor: "transparent",
//     boxShadow: "none",
//   },
// });

// const SalaryDetailsTable = ({ data, months }) => {
//   const classes = useStyles();
//   const [employeeName] = useState("Chandran");
//   const [designation] = useState("Developer");
//   const [monthYear] = useState("2024 Feb");

//   const getMonth = (date) => {
//     const new_date = new Date(date).getMonth();
//     return months[new_date];
//   };

//   const handleGeneratePDF = (row) => {
//     const doc = new jsPDF("portrait");
//     const pageWidth = doc.internal.pageSize.getWidth();
//     const pageHeight = doc.internal.pageSize.getHeight();

//     const margin = 10;
//     const padding = 5;

//     // Set document margins
//     doc.setLineWidth(0.5);
//     doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

//     // Add company logo to the top-left corner (adjusted position)
//     doc.addImage(logo, 'PNG', 15, 15, 40, 20); 

//     // Header Section: 
//     // doc.setFontSize(20);
//     // doc.text("Company Name", pageWidth / 2, 25, { align: "center" }); // Moved down from 15 to 30
//     doc.setFontSize(20);
// doc.setFont("helvetica", "bold"); // Set font to bold for company name
// doc.text("Company Name", pageWidth / 2, 25, { align: "center" });

//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text("[Company Address]", pageWidth / 2, 30, { align: "center" });
//     doc.setFontSize(10);
//     doc.setFont("helvetica", "normal");
//     doc.text("Salary Slip", pageWidth / 2, 35, { align: "center" });

    
//     doc.setFontSize(12);
//     const employeeDetails = [
//       { label: "Employee Name:" },
//       { label: "Designation:" },
//       { label: "Month & Year:" },
//     ];
    
//     let yPosition = 48; // Adjusted for proper spacing
//     const xPosition = margin + 10; // Shift to the right by adding more to the margin
//     const lineWidth = 100; // Adjust this value for line length
    
//     employeeDetails.forEach((detail) => {
//       doc.setFont("helvetica", "bold"); // Set font to bold for the labels
//       doc.text(detail.label, xPosition, yPosition); // Only display the label
    
//       // Draw a line next to each label
//       doc.setLineWidth(0.5); // Adjust the line thickness
//       doc.line(xPosition + 35, yPosition, xPosition + 35 + lineWidth, yPosition); // Draw line
      
//       yPosition += 10; // Move down for the next label
//     });
    

//     // Salary Breakdown Section
//     // doc.setFontSize(14);
//     // doc.text("Salary Details:", margin, yPosition);
//     // yPosition += 10;
//     // doc.text(`Amount Received: ${row.salary_amount}`, margin, yPosition);
//     // yPosition += 10;
//     // doc.text(`Working Days: ${row.workingDays}`, margin, yPosition);
//     // yPosition += 10;
//     // doc.text(`Absent: ${row.absent}`, margin, yPosition);
//     // yPosition += 10;
//     // doc.text(`Deductions: ${row.deductions}`, margin, yPosition);
//     // yPosition += 10;
     

//     // Footer Section: Signature Lines
//     // doc.text("Employee Signature: ____________________", margin, pageHeight - 40);
//     // doc.text("Authorized Signature: ____________________", margin + 100, pageHeight - 40);

//     // Save the PDF
//     doc.save(`${employeeName}_salary_slip_${row.payment_date}.pdf`);
    
//   };

//   return (
//     <Box sx={{ px: "40px" }}>
//       <Box sx={{ mb: "28px" }}>
//         <Typography sx={{ fontSize: "28px", fontWeight: 900, lineHeight: "24px", mt: 10, mb: 10 }}>
//           Salary Detail
//         </Typography>
//       </Box>
//       <TableContainer className={classes.container}>
//         <Table className={classes.table} aria-label="salary details table">
//           <TableHead>
//             <TableRow>
//               <TableCell className={classes.header}>Month</TableCell>
//               <TableCell className={classes.header} align="center">
//                 Amount Received
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Working Days
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Absent
//               </TableCell>
//               <TableCell className={classes.header} align="center">
//                 Deductions
//               </TableCell>
//               <TableCell className={classes.header} align="center"></TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data.map((row) => (
//               <TableRow key={row.payment_date}>
//                 <TableCell component="th" scope="row" className={classes.cell}>
//                   {getMonth(row.payment_date)}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row?.salary_amount}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.workingDays}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.absent}
//                 </TableCell>
//                 <TableCell align="center" className={classes.cell}>
//                   {row.deductions}
//                 </TableCell>
//                 <TableCell align="center" sx={{ border: "none" }} className={classes.cell}>
//                   <Button
//                     variant="contained"
//                     className={classes.button}
//                     onClick={() => handleGeneratePDF(row)}
//                   >
//                     Download Slip
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default SalaryDetailsTable;
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import logo from "assets/images/logo.png";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Button,
} from "@mui/material";
import jsPDF from "jspdf";

const useStyles = makeStyles({
  table: {
    backgroundColor: "transparent",
  },

  header: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: "25px",
    fontWeight: 700,
    lineHeight: "30px",
    border: "none",
  },

  cell: {
    backgroundColor: "transparent",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    borderBottom: "1px solid #D9D9D9",
  },

  button: {
    backgroundColor: "#DFC7FF",
    color: "#5611B1",
    textTransform: "none",
    borderRadius: "54px",
    border: "1px solid #A77DDE",
    transition: "transform 0.3s, background-color 0.3s",
    "&:hover": {
      backgroundColor: "#C5A4F7",
      transform: "scale(1.05)",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
    },
  },

  container: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

const SalaryDetailsTable = ({ data, months }) => {
  const classes = useStyles();
  const [employeeName] = useState("Chandran");
  const [designation] = useState("Developer");
  const [monthYear] = useState("2024 Feb");

  const getMonth = (date) => {
    const new_date = new Date(date).getMonth();
    return months[new_date];
  };

  const handleGeneratePDF = (row) => {
    const doc = new jsPDF("portrait");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 10;
    const padding = 5;

    // Set document margins
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add company logo to the top-left corner (adjusted position)
    doc.addImage(logo, 'PNG', 15, 15, 40, 20);

    // Header Section:
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Company Name", pageWidth / 2, 25, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("[Company Address]", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Salary Slip", pageWidth / 2, 35, { align: "center" });

    doc.setFontSize(12);
    const employeeDetails = [
      { label: "Employee Name:" },
      { label: "Designation:" },
      { label: "Month & Year:" },
    ];

    let yPosition = 48; // Adjusted for proper spacing
    const xPosition = margin + 10; // Shift to the right by adding more to the margin
    const lineWidth = 100; // Adjust this value for line length

    employeeDetails.forEach((detail) => {
      doc.setFont("helvetica", "bold"); // Set font to bold for the labels
      doc.text(detail.label, xPosition, yPosition); // Only display the label

      // Draw a line next to each label
      doc.setLineWidth(0.5); // Adjust the line thickness
      doc.line(xPosition + 35, yPosition, xPosition + 35 + lineWidth, yPosition); // Draw line

      yPosition += 10; // Move down for the next label
    });

    // Salary Breakdown Section
    // doc.setFontSize(14);
    // doc.text("", margin, yPosition);
    // yPosition += 10;

    // // Draw table for salary breakdown manually
    // const tableHeaders = ["Earning", "", "Deductions", ""];
    // const tableData = [
    //   ["Basic & DA", "5,200.00", "Provident Fund", "358.00"],
    //   ["HRA", "3,000.00", "E.S.I", "120.00"],
    //   ["Conveyance", "500.00", "Loan", "-"],
    //   ["", "", "Profession Tax", "-"],
    //   ["", "", "TSD/IT", "-"],
    //   ["", "", "", ""],
    //   ["Total Addition", "8,700.00", "Total Deduction", "478.00"],
    //   ["Overtime", "-", "-", "NET Salary","8,222.00"],
    //   ["", "", "", ""],

     
    // ];

    // // Table Header
    // let tableX = margin + 10;
    // let tableY = yPosition;
    // const headerHeight = 10;
    // const rowHeight = 8;
    
    // // Header row
    // tableHeaders.forEach((header, index) => {
    //   doc.setFont("helvetica", "bold");
    //   doc.text(header, tableX + (index * 45), tableY);
    // });

    // tableY += headerHeight;

    // // Table rows
    // tableData.forEach((row) => {
    //   row.forEach((cell, index) => {
    //     doc.setFont("helvetica", "normal");
    //     doc.text(cell, tableX + (index * 45), tableY);
    //   });

    //   tableY += rowHeight;
    // });

    // // Draw borders for table
    // doc.setLineWidth(0.5);
    // const tableWidth = 180; // Table width
    // doc.rect(tableX - 3, yPosition - 4, tableWidth, (tableData.length + 1) * rowHeight + headerHeight);
    doc.setFontSize(14);
    doc.text("Salary Breakdown:", margin, yPosition);
    yPosition += 10;

    // Draw table for salary breakdown manually
    const tableHeaders = ["Earning", "", "Deductions", ""];
    const tableData = [
      ["Basic & DA", "5,200.00", "Provident Fund", "358.00"],
      ["HRA", "3,000.00", "E.S.I", "120.00"],
      ["Conveyance", "500.00", "Loan", "-"],
      ["", "", "Profession Tax", "-"],
      ["", "", "TSD/IT", "-"],
      ["", "", "", ""],
      ["Total Addition", "8,700.00", "Total Deduction", "478.00"],
      ["Overtime", "-", "-", "-"],
      ["", "", "NET Salary", "8,222.00"],
      ["","","",""],
    ];

    // Table Header
    let tableX = margin + 10;
    let tableY = yPosition;
    const headerHeight = 10;
    const rowHeight = 8;

    // Draw the header row with lines
    tableHeaders.forEach((header, index) => {
      doc.setFont("helvetica", "bold");
      doc.text(header, tableX + (index * 45), tableY);
    });

    tableY += headerHeight;

    // Draw the table rows with lines
    tableData.forEach((row) => {
      row.forEach((cell, index) => {
        doc.setFont("helvetica", "normal");
        doc.text(cell, tableX + (index * 45), tableY);
      });

      tableY += rowHeight;
    });

    // Draw borders for each row and column
    doc.setLineWidth(0.5);
    const tableWidth = 180; // Table width

    // Draw vertical lines for columns
    tableData.forEach((_, rowIndex) => {
      const rowStartY = yPosition + rowIndex * rowHeight + headerHeight;
      for (let colIndex = 0; colIndex < tableHeaders.length; colIndex++) {
        doc.line(tableX + colIndex * 45, rowStartY, tableX + colIndex * 45, rowStartY + rowHeight); // Vertical lines
      }
    });

    // Draw horizontal lines for rows
    for (let rowIndex = 0; rowIndex < tableData.length + 1; rowIndex++) {
      const rowStartY = yPosition + rowIndex * rowHeight + headerHeight;
      doc.line(tableX, rowStartY, tableX + tableWidth, rowStartY); // Horizontal lines
    }

    // Draw outer border for the entire table
    doc.rect(tableX - 3, yPosition - 4, tableWidth, (tableData.length + 1) * rowHeight + headerHeight);

    // Footer Section: Signature Lines
    
// Amount in Words
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Dollars Eight Thousand Two Hundred Twenty Two Only", margin, pageHeight - 60);

// Cheque Number and Bank Information
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Cheque No. ____________________", margin, pageHeight - 50);
doc.text("Name of Bank: ____________________", margin + 100, pageHeight - 50);

// Date Field
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Date: ___________________________", margin, pageHeight - 40);

// Signature Lines
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Signature of Employee: ____________________", margin, pageHeight - 30);
doc.text("Director: ____________________", margin + 100, pageHeight - 30);



    // Save the PDF
    doc.save(`${employeeName}_salary_slip_${row.payment_date}.pdf`);
  };

  return (
    <Box sx={{ px: "40px" }}>
      <Box sx={{ mb: "28px" }}>
        <Typography sx={{ fontSize: "28px", fontWeight: 900, lineHeight: "24px", mt: 10, mb: 10 }}>
          Salary Detail
        </Typography>
      </Box>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="salary details table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Month</TableCell>
              <TableCell className={classes.header} align="center">
                Amount Received
              </TableCell>
              <TableCell className={classes.header} align="center">
                Working Days
              </TableCell>
              <TableCell className={classes.header} align="center">
                Absent
              </TableCell>
              <TableCell className={classes.header} align="center">
                Deductions
              </TableCell>
              <TableCell className={classes.header} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.payment_date}>
                <TableCell component="th" scope="row" className={classes.cell}>
                  {getMonth(row.payment_date)}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row?.salary_amount}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.workingDays}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.absent}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.deductions}
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }} className={classes.cell}>
                  <Button
                    variant="contained"
                    className={classes.button}
                    onClick={() => handleGeneratePDF(row)}
                  >
                    Download Slip
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SalaryDetailsTable;
