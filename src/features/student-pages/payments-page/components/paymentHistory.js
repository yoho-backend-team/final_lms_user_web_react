import { Box, Typography } from "@mui/material";

const PaymentHistory = ({ payments }) => {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Payment History
      </Typography>
      {payments?.map((payment, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            Date: {payment.date}
          </Typography>
          <Typography variant="body1" sx={{ color: "#00796b" }}>
            Amount: {payment.amount}
          </Typography>
          <Typography variant="body2" sx={{ color: payment.status === "Completed" ? "green" : "red" }}>
            Status: {payment.status}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default PaymentHistory;
