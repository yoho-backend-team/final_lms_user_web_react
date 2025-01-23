import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Typography,
} from "@mui/material";
import jsPDF from "jspdf";

const useStyles = makeStyles({
  table: {
    backgroundColor: "transparent",
  },
  
  header: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: "25px", // Increased font size
    fontWeight: 700,
    lineHeight: "30px", // Adjusted line height to match the font size
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
  const [employeeName] = useState("chandran");
  const [designation] = useState("developer");
  const [monthYear] = useState("2024 feb");
  const [earnings] = useState({
    basicDA: "0",
    hra: "0",
    conveyance: "no salary",
  });
  const [deductions] = useState({
    pf: "0",
    esi: "0",
    loan: "0",
  });

  const getMonth = (date) => {
    const new_date = new Date(date).getMonth();
    return months[new_date];
  };

  const handleGeneratePDF = (data) => {
    const doc = new jsPDF("portrait");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const padding = 5;
    const margin = 5;

    doc.setLineWidth(0.5);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    const text = "This is an example of text with borders and padding in jsPDF.";
    const xPos = margin + padding;
    const yPos = margin + padding + 10;

    doc.text(text, xPos, yPos);

    doc.save(`chandran_salary_slip.pdf`);
  };

  return (
    <Box sx={{ px: "40px" }}>
      <Box sx={{ mb: "28px" }}>
        <Typography
          sx={{ fontSize: "28px", fontWeight: 900, lineHeight: "24px", mt: 10, mb: 10 }}
        >
          Salary Detail
        </Typography>
      </Box>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
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
