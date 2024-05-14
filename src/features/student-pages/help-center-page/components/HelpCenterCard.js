import { Box, Grid, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import React from "react";
// import { Link } from "react-router-dom";

const DummyData = [
  {
    title: "Mail",
    description:
      "Explaining design to someone who doesn't understand what it is",
  },
  {
    title: "Message",
    description: "Understanding the basics of messaging systems",
  },
  {
    title: "Notification",
    description: "How to handle notifications effectively messaging systems",
  },
  {
    title: "Profile",
    description: "Creating an appealing user profile messaging systems",
  },
  {
    title: "Settings",
    description: "How to handle notifications effectively messaging systems",
  },
];

const HelpCenterCard = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      {DummyData.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              borderRadius: 8,
            }}
          >
            <Box>
              <Box
                sx={{
                  padding: 2.5,
                  backgroundColor: "#e2e8ee",
                }}
              >
                <Typography
                  variant="h6"
                  color={"black"}
                  sx={{
                    backgroundColor: "#fcfcfc",
                    width: "fit-content",
                    padding: 1,
                    borderRadius: 5,
                    display: "inline-block",
                  }}
                >
                  {item.title}
                </Typography>
                <Typography
                  color={"black"}
                  sx={{ marginTop: 2 }}
                  variant="body2"
                  fontWeight={"bold"}
                >
                  {item.description}
                </Typography>
              </Box>

              <Box sx={{ backgroundColor: "#fcfcfc", padding: 2.5 }}>
                <Typography variant="body2" color={"black"}>
                  Click to view
                </Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HelpCenterCard;
