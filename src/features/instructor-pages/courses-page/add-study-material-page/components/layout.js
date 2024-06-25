import { Box } from "@mui/material";

const AddStudyMaterialLayout = ({children}) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        boxSizing: "border-box", 
        padding: "60px 40px 32px 40px",
        overflow: "auto" 
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          border: "1px solid #C3C3C3",
          borderRadius: "18px",
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
          overflow: "auto" 
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AddStudyMaterialLayout;
