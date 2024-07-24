import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import dummyVideoBg from "../../../../assets/instructor/help-center/dummy-video.svg";
import Client from "../../../../api/index";
import StudentMailTab from "./tap-pages/mailTab";

const StudentHelpView = ({categories,id}) => {
  console.log(categories,"categories")
 

  const items = [
    '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam',
    '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium dolorem',
    '"Sed ut perspiciatis unde omnis iste natus e',
    '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusan',
    '"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium"',
    '"Sed ut perspiciatis"',
  ];

  return (
    <Box
      sx={{
        backgroundColor: "#EDE0FF",
        border: "1px solid #C3C3C3",
        borderRadius: "18px",
        boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
      }}
    >
        <Box key={id} sx={{ padding: "70px" }}>
        {categories?.map((cate) => (
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
              
             
  <Box key={cate.id} mb={2}>
    <Typography
      variant="h3"
      sx={{
        fontSize: "16px",
        fontWeight: 700,
        lineHeight: "19px",
        color: "#000000",
       p :2
      }}
    >
      {cate.question}
    </Typography>
    <Typography
      sx={{
        color: "#321658",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "25px",
      }}
    >
      {cate.answer}
    </Typography>
  </Box>

            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "30px" }}>
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "39px",
                }}
              >
                Step by Step
              </Typography>
              <List>
                {items.map((item, index) => (
                  <ListItem
                    key={index}
                    sx={{ display: "flex", alignItems: "center" }}
                  >
                    <Box
                      component="span"
                      sx={{ marginRight: 1, color: "#000" }}
                    >
                      &#8226;
                    </Box>
                    <ListItemText
                      primary={item}
                      sx={{
                        color: "#321658",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: "25px",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
          <Divider></Divider>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                gap: "29px",
              }}
            >
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "19px",
                }}
              >
                video guide
              </Typography>
              <Box>
                <img src={dummyVideoBg} alt="image" />
              </Box>
            </Box>
          </Grid>
        </Grid>
        ))}
      </Box>
       {/* <StudentMailTab faqCategories={faqCategories} /> */}
    </Box>
);

};

export default StudentHelpView;
