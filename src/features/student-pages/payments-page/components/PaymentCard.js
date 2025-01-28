const { Box, Typography } = require("@mui/material");

const PaymentCardStudent = ({ icon, title, amount, style, border }) => {
  return (
    <Box
      sx={{
        display: "grid",
        flexDirection: "row",
        p: "10px 65px 13px 20px",
        justifyContent: "space-between",
        flexWrap: "wrap",
        border: border && "1px solid #C3C3C3",
        backgroundColor: style?.bg,
        borderRadius: "10px",
        gap: "8px",
        "&:hover": {
          backgroundColor: style?.hoverBg || "#ADD8E6", 
          transform: "scale(1.02)", 
        },
      }}
    >
      <Box >{icon}</Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "2px" }}>
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

export default PaymentCardStudent;
