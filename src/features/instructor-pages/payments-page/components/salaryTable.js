import React from "react";
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

const useStyles = makeStyles({
  table: {
    // minWidth: 650,
    backgroundColor: "transparent",
  },
  header: {
    backgroundColor: "transparent",
    color: "#000000",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "24px",
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
  },
  container: {
    backgroundColor: "transparent",
    boxShadow: "none",
  },
});

const rows = [
  {
    month: "April",
    amountReceived: "40,000",
    workingDays: 28,
    absent: 3,
    deductions: "1200 + 3,800",
  },
  {
    month: "March",
    amountReceived: "43,800",
    workingDays: 31,
    absent: 0,
    deductions: "1200",
  },
  {
    month: "February",
    amountReceived: "43,800",
    workingDays: 28,
    absent: 0,
    deductions: "1200",
  },
  {
    month: "January",
    amountReceived: "38,100",
    workingDays: 26,
    absent: 5,
    deductions: "1200 + 4,700",
  },
];

const SalaryDetailsTable = () => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        px: "40px",
      }}
    >
      <Box sx={{ mb: "28px" }}>
        <Typography
          sx={{ fontSize: "16px", fontWeight: 900, lineHeight: "24px" }}
        >
          Salary Detail
        </Typography>
      </Box>
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.header}>Month</TableCell>
              <TableCell className={classes.header} align="left">
                Amount Received
              </TableCell>
              <TableCell className={classes.header} align="left">
                Working Days
              </TableCell>
              <TableCell className={classes.header} align="left">
                Absent
              </TableCell>
              <TableCell className={classes.header} align="left">
                Deductions
              </TableCell>
              <TableCell className={classes.header} align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.month}>
                <TableCell component="th" scope="row" className={classes.cell}>
                  {row.month}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  {row.amountReceived}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  {row.workingDays}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  {row.absent}
                </TableCell>
                <TableCell align="left" className={classes.cell}>
                  {row.deductions}
                </TableCell>
                <TableCell
                  align="center"
                  sx={{ border: "none" }}
                  className={classes.cell}
                >
                  <Button variant="contained" className={classes.button}>
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
