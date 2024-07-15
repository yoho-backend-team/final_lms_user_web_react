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
  return (
    <Box sx={{ pl: "91px", pr: "50px", height: "80vh", overflowY: "auto" }}>
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
          }}
        >
          {Chapters?.length} Chapters
        </Typography>
        <Typography
          sx={{
            color: "#4B4B4B",
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "24px",
          }}
        >
          146 classes
        </Typography>
      </Box>
      {Chapters?.map((chapter, index) => (
        <Paper
          key={index}
          sx={{
            mb: 2,
            p: 2,
            background: chapters[index].background,
            padding: "30px",
          }}
        >
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: 800,
                  lineHeight: "27px",
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
