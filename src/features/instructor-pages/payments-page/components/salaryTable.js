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
  const [employeeName] = useState("Albert Einstein");
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

    
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    doc.addImage(logo, 'PNG', 15, 15, 40, 20);

   
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

   
    let yPosition = 48;
    const xPosition = margin + 10; 
    const lineWidth = 100; 

    employeeDetails.forEach((detail) => {
      doc.setFont("helvetica", "bold"); 
      doc.text(detail.label, xPosition, yPosition);

      doc.setLineWidth(0.5); 
      doc.line(xPosition + 35, yPosition, xPosition + 35 + lineWidth, yPosition); 

      yPosition += 10; 
    });

doc.setFontSize(12);
doc.text("", margin, yPosition);
yPosition += 10;


const tableData = [

  ["Earning", "", "Deductions", ""], 
  ["Basic & DA", "5,200.00", "Provident Fund", "358.00"],
  ["HRA", "3,000.00", "E.S.I", "120.00"],
  ["Conveyance", "500.00", "Loan", "-"],
  ["", "", "Profession Tax", "-"],
  ["", "", "TSD/IT", "-"],
  ["", "", "", ""],
  ["Total Addition", "8,700.00", "Total Deduction", "478.00"],
  ["-", "-", "NET Salary", "8,222.00"],
  ["", "", "", ""], 
];


let tableX = margin + 5;
let tableY = yPosition;
const rowHeight = 8;
const colWidth = 45; 
const tableWidth = colWidth * 4; 


doc.setFont("helvetica", "normal");
tableData.forEach((row) => {
  row.forEach((cell, index) => {
    const xPos = tableX + (index * colWidth);
    const yPos = tableY + (rowHeight / 2); 

    if (cell === "Earning" || cell === "Deductions" || cell === "NET Salary" || cell === "8,222.00") {
      doc.setFont("helvetica", "bold");
    } else {
      doc.setFont("helvetica", "normal");
    }

    doc.text(cell, xPos + colWidth / 2, yPos, { align: "center", baseline: "middle" });
  });
  tableY += rowHeight;
});

doc.setLineWidth(0.5);

for (let colIndex = 0; colIndex <= 4; colIndex++) {
  doc.line(tableX + colIndex * colWidth, yPosition, tableX + colIndex * colWidth, tableY);
}


for (let rowIndex = 0; rowIndex < tableData.length + 1; rowIndex++) {
  const rowStartY = yPosition + rowIndex * rowHeight;
  doc.line(tableX, rowStartY, tableX + tableWidth, rowStartY); 
}


    

doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Dollars Eight Thousand Two Hundred Twenty Two Only", margin + 10, pageHeight - 105);


doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Cheque No. ____________________", margin + 10, pageHeight - 95);
doc.text("Name of Bank: ____________________", margin + 110, pageHeight - 95);

// Date Field
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Date: ___________________________", margin + 10, pageHeight - 85);

// Signature Lines
doc.setFont("helvetica", "normal");
doc.setFontSize(12);
doc.text("Signature of Employee: ____________________", margin + 10, pageHeight - 75);
doc.text("Director: _________________________", margin + 110, pageHeight - 75);
doc.setFont("helvetica", "bold");
doc.setFontSize(12);
doc.text("Salary Slip Template", margin + 145, pageHeight - 65);



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
