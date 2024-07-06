import { Box } from "@mui/material";

const StudentClassLayout = ({ children }) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        backgroundColor: "#F2F2F2",
      }}
    >
      <Box
        sx={{
          padding: "67px 40px 40px 40px",
          width: "100vw",
          height: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default StudentClassLayout;
