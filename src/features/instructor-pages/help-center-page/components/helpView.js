import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
} from "@mui/material";

const StudentHelpView = ({ categories }) => {
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);

  const handleCategoryChange = (index) => {
    setCurrentCategoryIndex(index);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#EDE0FF",
        border: "1px solid #C3C3C3",
        borderRadius: "18px",
        boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
        padding: "20px",
      }}
    >
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              alignItems: "start",
              pb: "40px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "19px",
                color: "#000000",
                padding: "2px",
              }}
            >
              {categories[currentCategoryIndex].question}
            </Typography>
            <Typography
              sx={{
                color: "#321658",
                fontSize: "16px",
                fontWeight: 400,
                lineHeight: "25px",
              }}
            >
              {categories[currentCategoryIndex].answer}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Example of navigation buttons */}
      <Box mt={2} display="flex" justifyContent="center">
        {categories.map((category, index) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(index)}
            style={{
              marginRight: "10px",
              backgroundColor:
                index === currentCategoryIndex ? "#C3C3C3" : "transparent",
              border: "none",
              borderRadius: "5px",
              padding: "5px 10px",
              cursor: "pointer",
            }}
          >
           
          </button>
        ))}
      </Box>
    </Box>
  );
};

export default StudentHelpView;
