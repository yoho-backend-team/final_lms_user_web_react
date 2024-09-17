import React from 'react';
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    TextField
} from '@mui/material';
import logo from "assets/images/logo.png"

const SalarySlip = () => {
    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 3, border: '1px solid black', mt: "40px" }}>
            <Box sx={{ display: "flex" }}>
                <Box sx={{ textAlign: "start" }}>
                    <img src={logo} width={"116px"} height={"56px"} alt="Company Logo" />
                </Box>
                <Box sx={{ flex: "0.8", textAlign: 'center' }} mb={2}>
                    <Typography variant="h1">Company Name</Typography>
                    <Typography variant="body2">[Address]</Typography>
                    <Typography variant="h6" mt={1}>Salary Slip</Typography>
                </Box>
            </Box>

            <Grid container spacing={2} my={2}>
                <Grid item xs={12}>
                    <TextField fullWidth label="Employee Name" variant="standard" InputProps={{ disableUnderline: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Designation" variant="standard" InputProps={{ disableUnderline: true }} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth label="Month & Year" variant="standard" InputProps={{ disableUnderline: true }} />
                </Grid>
            </Grid>


                <Table
                    sx={{
                        border: '1px solid #000',
                        borderCollapse: 'collapse',
                        '& th, & td': {
                            border: '1px solid #000',
                            padding: '0px', 
                        },
                        '& th': {
                            paddingRight: '0px',
                            paddingTop: '0px', 
                            paddingBottom: '0px',
                        },
                        '& td': {
                            paddingRight: '0px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                        },
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Earnings</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell>Deductions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Earnings */}
                        <TableRow>
                            <TableCell padding="none" >Basic & DA</TableCell>
                            <TableCell padding="none" >5,200.00</TableCell>
                            <TableCell padding="none" >Provident Fund</TableCell>
                            <TableCell padding="none" >358.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none" >HRA</TableCell>
                            <TableCell padding="none" >3,000.00</TableCell>
                            <TableCell padding="none" >E.S.I.</TableCell>
                            <TableCell padding="none" >120.00</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell padding="none" >Conveyance</TableCell>
                            <TableCell padding="none" >500.00</TableCell>
                            <TableCell padding="none" >Loan</TableCell>
                            <TableCell padding="none" >-</TableCell>
                        </TableRow>

                        {/* Total Addition and Deduction */}
                        <TableRow>
                            <TableCell padding="none" >Total Addition</TableCell>
                            <TableCell padding="none" >8,700.00</TableCell>
                            <TableCell padding="none" >Total Deduction</TableCell>
                            <TableCell padding="none" >478.00</TableCell>
                        </TableRow>

                        {/* Net Salary */}
                        <TableRow>
                            <TableCell padding="none" ></TableCell>
                            <TableCell padding="none" ></TableCell>
                            <TableCell padding="none" >NET Salary</TableCell>
                            <TableCell padding="none" >8,222.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            

            {/* Footer */}
            <Box my={2}>
                <Typography variant="body2">
                    Dollars Eight Thousand Two Hundred Twenty Two Only
                </Typography>
                <Grid container spacing={2} my={1}>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Cheque No." variant="standard" InputProps={{ disableUnderline: true }} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Name of Bank" variant="standard" InputProps={{ disableUnderline: true }} />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField fullWidth label="Date" variant="standard" InputProps={{ disableUnderline: true }} />
                    </Grid>
                </Grid>

                <Grid container spacing={2} mt={2}>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Signature of the Employee" variant="standard" InputProps={{ disableUnderline: true }} />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField fullWidth label="Director" variant="standard" InputProps={{ disableUnderline: true }} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}

export default SalarySlip;
