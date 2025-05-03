import React, { useState, useEffect } from "react";
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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Tabs,
  Tab,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Switch,
  FormControlLabel,
  Tooltip,
  Paper,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import EditIcon from "@mui/icons-material/Edit";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PaidIcon from "@mui/icons-material/Paid";
import WorkIcon from "@mui/icons-material/Work";
import PersonIcon from "@mui/icons-material/Person";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import PaymentsIcon from "@mui/icons-material/Payments";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SummarizeIcon from "@mui/icons-material/Summarize";
import jsPDF from "jspdf";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import sign from '../../../../assets/sign.png';
import Client from "../../../../api/index";

const useStyles = makeStyles({
  table: {
    backgroundColor: "transparent",
  },

  header: {
    backgroundColor: "#F5F0FF",
    color: "#5611B1",
    fontSize: "18px",
    fontWeight: 700,
    lineHeight: "30px",
    border: "1px solid #DFC7FF",
    borderRadius: "4px",
    padding: "8px 16px",
    textAlign: "center",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },

  headerIcon: {
    verticalAlign: "middle",
    marginRight: "8px",
    fontSize: "20px",
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
  
  dialogTitle: {
    backgroundColor: "#F5F0FF",
    padding: "16px 24px",
  },
  
  tabPanel: {
    padding: "24px",
  },
  
  formField: {
    marginBottom: "16px",
  },
  
  statusChip: {
    fontWeight: "bold",
    padding: "8px 12px",
  },
  
  statusPaid: {
    backgroundColor: "#D1F7C4",
    color: "#2E7D32",
  },
  
  statusPending: {
    backgroundColor: "#FFECB3",
    color: "#FF8F00",
  },
  
  filterPaper: {
    padding: "16px",
    marginBottom: "24px",
    backgroundColor: "#F8F5FF",
    borderRadius: "8px",
  },
  
  paymentDetailsSection: {
    marginTop: "16px",
    padding: "16px",
    border: "1px solid #E0E0E0",
    borderRadius: "8px",
  },

  pageTitle: {
    fontSize: "32px",
    fontWeight: 900,
    lineHeight: "40px",
    color: "#5611B1",
    position: "relative",
    paddingBottom: "10px",
    marginBottom: "20px",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "80px",
      height: "4px",
      backgroundColor: "#A77DDE",
      borderRadius: "2px",
    },
  },

  headerContent: {
    display: "flex",
    alignItems: "center",
  },

  currentMonthRow: {
    backgroundColor: "#F5F0FF",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#EFE5FF",
    },
  }
});

// TabPanel component for Dialog tabs
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`salary-tabpanel-${index}`}
      aria-labelledby={`salary-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SalaryDetailsTable = ({ data = [], months, attendance_data }) => {
  const classes = useStyles();
  const user = getInstructorDetails();
  const [employeeData, setEmployeeData] = useState({
    // Staff details
    name: user?.full_name || "Employee Name",
    designation: "Instructor",
    employeeId: user?.staffId || "EMP001",
    address: "123 Education Street",
    
    // Bank details
    accountNumber: "12345678901",
    bankBranch: "Main Branch",
    ifscNumber: "IFSC0001234",
    
    // Salary structure
    monthlyBasic: 5200,
    hra: 3000,
    conveyance: 500,
    travelAllowance: 800,
    homeAllowance: 1200,
  });
  
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [paymentDetailsOpen, setPaymentDetailsOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterActive, setFilterActive] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [attendanceReport, setAttendanceReport] = useState(null);
  
  // Generate sample payment data if none provided
  const [paymentData, setPaymentData] = useState([]);
  
  useEffect(() => {
    // Fetch attendance report on component load
    fetchAttendanceReport();
  }, []);
  
  useEffect(() => {
    if (data && data.length > 0) {
      setPaymentData(data);
    } else {
      // Generate sample data for the current year using attendance data if available
      const sampleData = generateSampleData(selectedYear);
      setPaymentData(sampleData);
    }
  }, [data, selectedYear, attendance_data]);

  const fetchAttendanceReport = async () => {
    try {
      const user = getInstructorDetails();
      const response = await Client.Instructor.attendance.get({
        userId: user.uuid, 
        month: getCurrentMonth()
      });
      setAttendanceReport(response?.data);
    } catch (error) {
      console.error("Error fetching attendance report:", error);
    }
  };
  
  const years = [2023, 2024, 2025,];
  
  if (!months) {
    months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
  }

  const getCurrentMonth = () => {
    const date = new Date();
    return months[date.getMonth()];
  };

  const getMonth = (date) => {
    const new_date = new Date(date).getMonth();
    return months[new_date];
  };
  
  const handleOpenDialog = (row) => {
    setSelectedEmployee(row);
    setDialogOpen(true);
  };
  
  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedEmployee(null);
  };
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleInputChange = (field, value) => {
    setEmployeeData({
      ...employeeData,
      [field]: value,
    });
  };
  
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
    // Regenerate sample data for the selected year
    const sampleData = generateSampleData(event.target.value);
    setPaymentData(sampleData);
  };
  
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
  };
  
  const handlePaymentDetailsOpen = (row) => {
    setSelectedPayment(row);
    setPaymentDetailsOpen(true);
  };
  
  const handlePaymentDetailsClose = () => {
    setPaymentDetailsOpen(false);
    setSelectedPayment(null);
  };
  
  // Check if a date corresponds to the current month
  const isCurrentMonth = (dateString) => {
    const date = new Date(dateString);
    const currentDate = new Date();
    return date.getMonth() === currentDate.getMonth() && 
           date.getFullYear() === currentDate.getFullYear();
  };
  
  // Generate sample data for the selected year, incorporating attendance data when available
  const generateSampleData = (year) => {
    const data = [];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    const totalEarnings = employeeData.monthlyBasic + employeeData.hra + 
                           employeeData.conveyance + employeeData.travelAllowance + 
                           employeeData.homeAllowance;
    
    for (let i = 0; i < 12; i++) {
      // For past months and current month in current year, or all months in past years
      if ((year < currentYear) || (year === currentYear && i <= currentMonth)) {
        let workingDays = 22;
        let absentDays = 0;
        
        // Use actual attendance data if available for current month
        if (year === currentYear && i === currentMonth && attendance_data) {
          workingDays = attendance_data.totalWorkingDays || 22;
          absentDays = attendance_data.absentDays || 0;
        } else {
          // Generate random values for past months
          workingDays = 22 - Math.floor(Math.random() * 3); // 20-22 working days
          absentDays = Math.floor(Math.random() * 3); // 0-2 absent days
        }
        
        const presentDays = workingDays - absentDays;
        // Calculate deductions based on absent days
        const dailyRate = totalEarnings / workingDays;
        const deductions = Math.round(dailyRate * absentDays);
        const salaryAmount = totalEarnings - deductions;
        
        // Set status: current month should be "pending", all others "paid"
        const status = (year === currentYear && i === currentMonth) ? "pending" : "paid";
        
        data.push({
          payment_date: `${year}-${(i + 1).toString().padStart(2, '0')}-15`, // 15th of each month
          salary_amount: salaryAmount.toFixed(2),
          workingDays,
          present: presentDays,
          absent: absentDays,
          deductions,
          status,
          paymentMethod: Math.random() > 0.5 ? "Bank Transfer" : "Check",
          dateAndTime: `${year}-${(i + 1).toString().padStart(2, '0')}-15 10:00 AM`,
        });
      }
    }
    
    return data;
  };

  const handleGeneratePDF = (row) => {
    const doc = new jsPDF("portrait");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const margin = 10;
    const padding = 5;

    // Border around the page
    doc.setLineWidth(0.5);
    doc.rect(margin, margin, pageWidth - 2 * margin, pageHeight - 2 * margin);

    // Add the company logo or placeholder if logo is not available
    try {
      doc.addImage(logo, 'PNG', 15, 15, 40, 20);
    } catch (error) {
      // Draw a placeholder rectangle if logo can't be loaded
      doc.setFillColor(200, 200, 200);
      doc.rect(15, 15, 40, 20, 'F');
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(8);
      doc.text("Company Logo", 35, 25, { align: "center" });
    }

    // Employee photo placeholder on the right side
    doc.setFillColor(230, 230, 230);
    doc.rect(pageWidth - 50, 15, 35, 35, 'F');
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.text("Employee Photo", pageWidth - 32.5, 32.5, { align: "center" });
    
    // Company information
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 0, 0);
    doc.text("Education Institute", pageWidth / 2, 25, { align: "center" });

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("123 Learning Avenue, Education City", pageWidth / 2, 30, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Salary Slip", pageWidth / 2, 35, { align: "center" });

    // Employee details section
    doc.setFontSize(12);
    const employeeDetails = [
      { label: "Employee Name:", value: employeeData.name },
      { label: "Employee ID:", value: employeeData.employeeId },
      { label: "Designation:", value: employeeData.designation },
      { label: "Bank Account:", value: employeeData.accountNumber },
      { label: "Bank Branch:", value: employeeData.bankBranch },
      { label: "IFSC Code:", value: employeeData.ifscNumber },
      { label: "Month & Year:", value: `${getMonth(row?.payment_date)} ${new Date(row?.payment_date).getFullYear()}` },
    ];

    // Draw employee details with values
    let yPosition = 60; // Adjusted yPosition to accommodate photo
    const xPosition = margin + 10;
    const valuePosition = xPosition + 70;

    employeeDetails.forEach((detail) => {
      doc.setFont("helvetica", "bold");
      doc.text(detail.label, xPosition, yPosition);
      
      doc.setFont("helvetica", "normal");
      doc.text(detail.value || "", valuePosition, yPosition);

      yPosition += 8;
    });

    yPosition += 10;

    // Table data for salary details
    const tableData = [
      ["Earning", "", "Deductions", ""],
      ["Basic & DA", `${employeeData.monthlyBasic.toFixed(2)}`, "Provident Fund", "358.00"],
      ["HRA", `${employeeData.hra.toFixed(2)}`, "E.S.I", "120.00"],
      ["Conveyance", `${employeeData.conveyance.toFixed(2)}`, "Loan", "-"],
      ["Travel Allowance", `${employeeData.travelAllowance.toFixed(2)}`, "Profession Tax", "-"],
      ["Home Allowance", `${employeeData.homeAllowance.toFixed(2)}`, "TSD/IT", "-"],
      ["", "", "", ""],
    ];
    
    // Calculate totals
    const totalAdditions = employeeData.monthlyBasic + employeeData.hra + 
                           employeeData.conveyance + employeeData.travelAllowance + 
                           employeeData.homeAllowance;
    const totalDeductions = 358 + 120; // PF + ESI
    const netSalary = totalAdditions - totalDeductions;
    
    tableData.push(["Total Addition", `${totalAdditions.toFixed(2)}`, "Total Deduction", `${totalDeductions.toFixed(2)}`]);
    tableData.push(["-", "-", "NET Salary", `${netSalary.toFixed(2)}`]);
    tableData.push(["", "", "", ""]);

    // Draw the salary details table
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

        if (cell === "Earning" || cell === "Deductions" || cell === "NET Salary" || cell === `${netSalary.toFixed(2)}`) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }

        doc.text(cell, xPos + colWidth / 2, yPos, { align: "center", baseline: "middle" });
      });
      tableY += rowHeight;
    });

    // Draw table grid lines
    doc.setLineWidth(0.5);

    for (let colIndex = 0; colIndex <= 4; colIndex++) {
      doc.line(tableX + colIndex * colWidth, yPosition, tableX + colIndex * colWidth, tableY);
    }

    for (let rowIndex = 0; rowIndex < tableData.length + 1; rowIndex++) {
      const rowStartY = yPosition + rowIndex * rowHeight;
      doc.line(tableX, rowStartY, tableX + tableWidth, rowStartY);
    }

    // Amount in words
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(`Rupees ${numberToWords(netSalary)} Only`, margin + 10, tableY + 10);

    // Payment details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Cheque No. ____________________", margin + 10, tableY + 20);
    doc.text("Name of Bank: ____________________", margin + 110, tableY + 20);

    // Date Field
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Date: ___________________________", margin + 10, tableY + 30);

    // Signature Lines
   // Assuming 'sign' is a base64 image or data URL (e.g., "data:image/png;base64,...")

// Set up fonts
doc.setFont("helvetica", "normal");
doc.setFontSize(12);

// Add text labels
doc.text("Signature of Employee: _______________________", margin + 10, tableY + 40);
doc.text("Director:", margin + 110, tableY + 40);

// Add director's signature image
doc.addImage(sign, 'PNG', margin + 130, tableY + 25, 50, 20); 

    
    // QR Code Placeholder
    doc.setFillColor(240, 240, 240);
    doc.rect(pageWidth - 50, tableY - 30, 35, 35, 'F');
    doc.setFontSize(8);
    doc.text("QR Code", pageWidth - 32.5, tableY - 12.5, { align: "center" });
    
    // Stamp/Seal Placeholder
    doc.setFillColor(245, 245, 245);
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.5);
    doc.circle(pageWidth - 35, tableY + 20, 15, 'DF');
    doc.setFontSize(6);
    doc.text("COMPANY", pageWidth - 35, tableY + 18, { align: "center" });
    doc.text("SEAL", pageWidth - 35, tableY + 22, { align: "center" });
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Salary Slip", margin + 145, tableY + 50);

    // Save the PDF
    doc.save(`${employeeData.name}_salary_slip_${row.payment_date}.pdf`);
  };
  
  // Helper function to convert number to words
  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    
    if (num === 0) return 'Zero';
    
    // Handle rupees and paisa
    let rupees = Math.floor(num);
    const paisa = Math.round((num - rupees) * 100);
    
    let result = '';
    
    if (rupees >= 1000) {
      result += ones[Math.floor(rupees / 1000)] + ' Thousand ';
      rupees = rupees % 1000;
    }
    
    if (rupees >= 100) {
      result += ones[Math.floor(rupees / 100)] + ' Hundred ';
      rupees = rupees % 100;
    }
    
    if (rupees >= 20) {
      result += tens[Math.floor(rupees / 10)] + ' ';
      rupees = rupees % 10;
    } else if (rupees >= 10) {
      result += teens[rupees - 10] + ' ';
      rupees = 0;
    }
    
    if (rupees > 0) {
      result += ones[rupees] + ' ';
    }
    
    return result.trim();
  };
  
  // Filter the payment data based on selected filters
  const filteredPayments = paymentData.filter(payment => {
    if (statusFilter === "all") return true;
    return payment.status === statusFilter;
  });

  // Table header icons with labels
  const tableHeaders = [
    { label: "Month", icon: <CalendarMonthIcon className={classes.headerIcon} /> },
    { label: "Amount Received", icon: <PaidIcon className={classes.headerIcon} /> },
    { label: "Working Days", icon: <WorkIcon className={classes.headerIcon} /> },
    { label: "Present", icon: <PersonIcon className={classes.headerIcon} /> },
    { label: "Absent", icon: <PersonOffIcon className={classes.headerIcon} /> },
    { label: "Deductions", icon: <MoneyOffIcon className={classes.headerIcon} /> },
    { label: "Status", icon: <PaymentsIcon className={classes.headerIcon} /> },
    { label: "Actions", icon: <MoreHorizIcon className={classes.headerIcon} /> },
  ];

  return (
    <Box sx={{ px: "40px" }}>
      <Box sx={{ mb: "28px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Typography className={classes.pageTitle}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <SummarizeIcon sx={{ fontSize: 36, marginRight: 2, color: "#5611B1" }} />
            Salary Detail
          </Box>
        </Typography>
        
        {/* Employee details and settings button */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <FormControl variant="outlined" size="small">
            <InputLabel id="year-select-label">Year</InputLabel>
            <Select
              labelId="year-select-label"
              id="year-select"
              value={selectedYear}
              onChange={handleYearChange}
              label="Year"
              sx={{ minWidth: 100 }}
            >
              {years.map((year) => (
                <MenuItem key={year} value={year}>{year}</MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Button 
            variant="contained" 
            className={classes.button}
            onClick={() => setDialogOpen(true)}
            startIcon={<EditIcon />}
          >
            Employee Details
          </Button>
        </Box>
      </Box>
      
      {/* Filters section */}
      <Paper className={classes.filterPaper}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: "#5611B1" }}>Payment Filters</Typography>
          <FormControlLabel
            control={
              <Switch 
                checked={filterActive} 
                onChange={() => setFilterActive(!filterActive)}
                color="primary"
              />
            }
            label="Show Filters"
          />
        </Box>
        
        {filterActive && (
          <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel id="status-filter-label">Payment Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                onChange={handleStatusFilterChange}
                label="Payment Status"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="paid">Paid</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
      </Paper>
      
      <TableContainer className={classes.container}>
        <Table className={classes.table} aria-label="salary details table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header, index) => (
                <TableCell key={index} className={classes.header}>
                  <div className={classes.headerContent}>
                    {header.icon}
                    {header.label}
                  </div>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPayments.map((row) => (
              <TableRow key={row.payment_date} className={isCurrentMonth(row.payment_date) ? classes.currentMonthRow : ""}>
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
                  {row.present}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.absent}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.deductions}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  <Chip 
                    label={row.status === "paid" ? "Paid" : "Pending"} 
                    className={`${classes.statusChip} ${row.status === "paid" ? classes.statusPaid : classes.statusPending}`}
                  />
                </TableCell>
                <TableCell align="center" sx={{ border: "none" }} className={classes.cell}>
                  <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                    <Tooltip title="Download Salary Slip">
                      <Button
                        variant="contained"
                        className={classes.button}
                        onClick={() => handleGeneratePDF(row)}
                        startIcon={<CloudDownloadIcon />}
                        size="small"
                      >
                        Slip
                      </Button>
                    </Tooltip>
                    
                    <Tooltip title="View Payment Details">
                      <Button
                        variant="outlined"
                        className={classes.button}
                        onClick={() => handlePaymentDetailsOpen(row)}
                        size="small"
                      >
                        Details
                      </Button>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      {/* Employee Details Dialog */}
      <Dialog 
        open={dialogOpen} 
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Employee Settings</Typography>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="employee settings tabs">
            <Tab label="Staff Details" />
            <Tab label="Bank Details" />
            <Tab label="Salary Structure" />
          </Tabs>
          </Box>
        
        <DialogContent>
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employee Name"
                  value={employeeData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  value={employeeData.designation}
                  onChange={(e) => handleInputChange('designation', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  value={employeeData.employeeId}
                  onChange={(e) => handleInputChange('employeeId', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={employeeData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className={classes.formField}
                  multiline
                  rows={3}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  value={employeeData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bank Branch"
                  value={employeeData.bankBranch}
                  onChange={(e) => handleInputChange('bankBranch', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IFSC Number"
                  value={employeeData.ifscNumber}
                  onChange={(e) => handleInputChange('ifscNumber', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </TabPanel>
          
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Monthly Basic"
                  type="number"
                  value={employeeData.monthlyBasic}
                  onChange={(e) => handleInputChange('monthlyBasic', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="HRA"
                  type="number"
                  value={employeeData.hra}
                  onChange={(e) => handleInputChange('hra', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Conveyance"
                  type="number"
                  value={employeeData.conveyance}
                  onChange={(e) => handleInputChange('conveyance', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Travel Allowance"
                  type="number"
                  value={employeeData.travelAllowance}
                  onChange={(e) => handleInputChange('travelAllowance', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Home Allowance"
                  type="number"
                  value={employeeData.homeAllowance}
                  onChange={(e) => handleInputChange('homeAllowance', e.target.value)}
                  className={classes.formField}
                />
              </Grid>
            </Grid>
          </TabPanel>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCloseDialog} color="primary" variant="contained">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Payment Details Dialog */}
      <Dialog 
        open={paymentDetailsOpen} 
        onClose={handlePaymentDetailsClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle className={classes.dialogTitle}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Payment Details</Typography>
            <IconButton onClick={handlePaymentDetailsClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent>
          {selectedPayment && (
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Month:</Typography>
                  <Typography>{getMonth(selectedPayment.payment_date)}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Amount:</Typography>
                  <Typography>{selectedPayment.salary_amount}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Working Days:</Typography>
                  <Typography>{selectedPayment.workingDays}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Present Days:</Typography>
                  <Typography>{selectedPayment.present}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Absent Days:</Typography>
                  <Typography>{selectedPayment.absent}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Deductions:</Typography>
                  <Typography>{selectedPayment.deductions}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Status:</Typography>
                  <Chip 
                    label={selectedPayment.status === "paid" ? "Paid" : "Pending"} 
                    className={`${classes.statusChip} ${selectedPayment.status === "paid" ? classes.statusPaid : classes.statusPending}`}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1" gutterBottom>Payment Method:</Typography>
                  <Typography>{selectedPayment.paymentMethod}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" gutterBottom>Date & Time:</Typography>
                  <Typography>{selectedPayment.dateAndTime}</Typography>
                </Grid>
              </Grid>
              
              
            </Box>
          )}
        </DialogContent>
        
        <DialogActions>
          <Button onClick={handlePaymentDetailsClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SalaryDetailsTable;
