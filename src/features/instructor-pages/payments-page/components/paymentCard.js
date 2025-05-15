import { Box, Typography } from "@mui/material";
import { keyframes } from "@mui/system";

const boomEffect = keyframes`
  0% { transform: scale(1); box-shadow: none; }
  50% { transform: scale(1.1); box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.3); }
  100% { transform: scale(1.05); box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.25); }
`;

const PaymentCard = ({ icon, title, amount, style, border }) => {
  return (
    <Box
      sx={{
        display: "flex", 
        flexDirection: "row",
        p: "12px 65px 13px 20px",
        border: border && "1px solid #C3C3C3",
        backgroundColor: style?.bg,
        borderRadius: "10px",
        gap: "10px",
        transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: style?.hoverBg || "#EAEAEA",
          animation: `${boomEffect} 1s ease-in-out`,
        },
      }}
    >
      <Box>{icon}</Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Box>
          <Typography
            sx={{
              color: "#495057",
              fontSize: "16px",
              fontWeight: "700",
              lineHeight: "24px",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: style?.color,
              fontSize: "14px",
              fontWeight: "600",
              lineHeight: "24px",
            }}
          >
            {amount}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentCard;