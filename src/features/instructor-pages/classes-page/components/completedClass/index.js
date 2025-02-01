import React from "react";
import { Box } from "@mui/material";
import ClassCard, { ClassCardHeader } from "../card/ClassCard";

const classes = [
  {
    id: "1",
    title: "End Of Html class",
    subject: "HTML",
    date: "14 Feb 2024",
    time: "10:30 AM",
    duration: "45min",
  },
  {
    id: "2",
    title: "Css Media Query Test",
    subject: "CSS",
    date: "14 Feb 2024",
    time: "10:30 AM",
    duration: "45min",
  },
  {
    id: "3",
    title: "Js Call Back function explain",
    subject: "JS",
    date: "14 Feb 2024",
    time: "10:30 AM",
    duration: "45min",
  },
];

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(253, 143, 13, 1)",
  durationColor: "rgba(253, 176, 61, 0.22)",
};

const CompletedClassList = ({ data, classType, group, image }) => {
  return (
    <Box
      sx={{
        mt: 3,
        px: "40px",
        height: "calc(100vh - 100px)", // Dynamic height to fit the viewport
        overflowY: "auto", // Enable vertical scrolling
        pb: 2, // Reduce bottom padding for less space
        scrollBehavior: "smooth", // Add smooth scrolling behavior
      }}
    >
      <ClassCardHeader />
      {data?.map((cls) => (
        <ClassCard
          key={cls.id}
          cls={cls}
          style={defaultStyles}
          type={classType}
          group={group}
          img={image}
        />
      ))}
    </Box>
  );
};

export default CompletedClassList;
