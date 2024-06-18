import React from 'react';
import { AppBar, Toolbar, Typography, Paper, Box, Grid, Button, Divider, Card } from '@mui/material';
import { instructorPaymentCardData } from 'data/instructor';
import PaymentCard from 'features/instructor-pages/payments-page/components/paymentCard';
import { PaymentBg } from 'utils/images';
import SalaryDetailsTable from 'features/instructor-pages/payments-page/components/salaryTable';

const PaymentInterface = () => {

  

  return (
    <>
    <Box
    sx={{
      mx : "40px",
      mt : "40px",
      mb : "20px",
      borderRadius : "25px",
      boxShadow : "0px 0px 64px 0px rgba(0, 0, 0, 0.10);",
    }}
    >
    <Box
     sx={{
      backgroundImage : `url(${PaymentBg})`,
      backgroundSize : "cover",
      backgroundRepeat : "no-repeat",
      width : "100%"
     }}
    >
      <Box sx={{display:'flex',flexDirection:"row",p:"40px",justifyContent:"space-between"}}>
        <Box>
           <Typography sx={{color:"#151010",fontSize:"24px",fontWeight:"700",lineHeight:"32px"}} >Payment</Typography>
        </Box> 
        <Box sx={{textAlign:"end"}}>
           <Typography sx={{color:"#0D6EFD",fontSize:"16px",fontWeight:"700",lineHeight:"22px",textDecoration:"underline"}} >Raise A Ticket?</Typography>
           <Typography sx={{fontSize:"12px",fontWeight:"400",color:"#495057",lineHeight:"24px"}} >For any Queries, Please Raise your Ticket</Typography>
        </Box> 
      </Box> 

      <Box
      sx={{
        display : "flex",
        p : "40px",
        justifyContent : "space-between"
      }}
      >
        {
          instructorPaymentCardData.map((i) => <PaymentCard title={i.title} amount={i.amount} icon={i.icon} key={i.title} style={i.style} />)
        }
      </Box>
      <SalaryDetailsTable />
      </Box>
    </Box>
    </>
  );
};

export default PaymentInterface;
