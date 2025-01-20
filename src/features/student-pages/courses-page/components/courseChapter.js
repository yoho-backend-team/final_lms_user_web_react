import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

const chapters = [
  {
    title: "Foundation of Python & SQL Basics",
    classes: 12,
    background: "linear-gradient(120deg, #0068FF 2.28%, #141BC4 100%)",
    color: "#84B6FF",
  },
  {
    title: "Frame Work and Styling",
    classes: 12,
    background: "linear-gradient(118deg, #CF75FF 1.82%, #670BC3 97.62%)",
    color: "#DEAEFF",
  },
  {
    title: "Prototype and Functionalities",
    classes: 12,
    background: "linear-gradient(118deg, #FADB39 1.75%, #F90 100%)",
    color: "#A58C06",
  },
  {
    title: "Foundation of Python & SQL Basics",
    classes: 12,
    background: "linear-gradient(120deg, #0068FF 2.28%, #141BC4 100%)",
    color: "#84B6FF",
  },
];

const CourseStudentChapters = ({ Chapters , Course}) => {
// const classes = Course?.batches[0]?.classes|| [];

  return (
    <Box sx={{ pl: { xs: "20px", sm: "50px", md: "91px" },
    pr: { xs: "20px", sm: "30px", md: "50px" },
    height: "80vh",
    overflowY: "auto",}}>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{
            color: "#4B4B4B",
            fontSize: "16px",
            fontWeight: 800,
            lineHeight: "24px",
            fontFamily:"Nunito Sans"
          }}
        >
          Course Chapters / Topics
        </Typography>
        <Typography
          sx={{
            color: "#4B4B4B",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            fontFamily:"Nunito Sans",
           
          }}
        >
          •  {Chapters?.coursemodules?.length} Chapters
        </Typography>
        <Box>
        <Typography
          sx={{
            color: "#4B4B4B",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
            fontFamily:"Nunito Sans",
            marginRight:21
           
          }}
        >
         •  {Chapters?.batches?.[0]?.classes?.length} Classes
        </Typography>
        
        </Box>
      </Box>
      {Chapters?.coursemodules?.map((chapter, index) => (
        <Paper
          key={index}
          sx={{
            mb: 2,
            p: 2,
            background: chapters[index].background,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
            padding: "30px",
            width: "100%",
            height: "180px",
            borderRadius: "16px",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between",alignItems: "center", }}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 800,
                  lineHeight: "27px",
                  fontFamily:"Nunito Sans"
                }}
              >
                {chapter.title}
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "9px" }}
              >
                <Typography
                  sx={{
                    color: "black",
                    background: "white",
                    padding: "16px",
                    borderRadius: "10px",
                    fontSize: "24px",
                    fontWeight: 900,
                    lineHeight: "17px",
                    fontFamily:"Nunito Sans"
                  }}
                >
                  12
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "14px",
                    fontWeight: "800",
                    lineHeight: "17px",
                    fontFamily:"Nunito Sans"
                  }}
                >
                  classes
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pt: "29px",
              }}
            >
              <Typography
                sx={{
                  color: chapters[index].color,
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "17px",
                  minWidth: "138px",
                  fontFamily:"Nunito Sans"
                }}
              >
                {chapter.description}
              </Typography>
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 700,
                  lineHeight: "17px",
                  color: "white",
                  textAlign: "end",
                  fontFamily:"Nunito Sans"
                }}
              >
                Enrolled
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default CourseStudentChapters;
