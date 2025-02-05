import { Box, Grid } from "@mui/material";
import PaymentHistory from "./paymentHistory";
import CourseStudentDetails from "./CourseDetails";

const paymentData = [
  { date: "2025-01-01", amount: "$200", status: "Completed" },
  { date: "2024-12-15", amount: "$150", status: "Completed" },
  { date: "2024-11-30", amount: "$180", status: "Pending" },
];
const CourseDetailStudentPaymentCard = () => {
  return (
    <Box sx={{ p: "40px" }}>
      <Grid container xs={12}>
        <Grid item xs={6} sx={{ display: "flex", flexDirection: "column" }}>
          <Box>
            <CourseStudentDetails/>
          </Box>
          
           <Box> <PaymentHistory   payments={paymentData}  /></Box> 
        </Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetailStudentPaymentCard;