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
    doc.addImage(logo, 'PNG', 15, 15, 40, 20); // Adjust the width and height as needed

    // Header Section: Company Name and Salary Slip Title
    // doc.setFontSize(20);
    // doc.text("Company Name", pageWidth / 2, 15, { align: "center" });
    doc.setFontSize(20);
    doc.text("Company Name", pageWidth / 2, 25, { align: "center" }); // Moved down from 15 to 30
    doc.setFontSize(10);
    doc.text("[Company Address]", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.text("Salary Slip", pageWidth / 2, 33, { align: "center" });

    // Employee Details Section
    doc.setFontSize(12);
    const employeeDetails = [
      `Employee Name: ${employeeName}`,
      `Designation: ${designation}`,
      `Month & Year: ${monthYear}`,
    ];
    let yPosition = 50;
    employeeDetails.forEach((detail) => {
      doc.text(detail, margin, yPosition);
      yPosition += 10;
    });

    // Salary Breakdown Section
    doc.setFontSize(14);
    doc.text("Salary Details:", margin, yPosition);
    yPosition += 10;
    doc.text(`Amount Received: ${row.salary_amount}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Working Days: ${row.workingDays}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Absent: ${row.absent}`, margin, yPosition);
    yPosition += 10;
    doc.text(`Deductions: ${row.deductions}`, margin, yPosition);
    yPosition += 10;

    // Footer Section: Signature Lines
    doc.text("Employee Signature: ____________________", margin, pageHeight - 40);
    doc.text("Authorized Signature: ____________________", margin + 100, pageHeight - 40);

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
