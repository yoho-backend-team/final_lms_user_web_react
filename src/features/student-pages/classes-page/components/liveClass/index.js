import React from "react";
import { Box } from "@mui/material";
import ClassCard from "../card/ClassCard";


const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(13, 110, 253, 1)",
  durationColor: "rgba(61, 139, 253, 0.22)",
};

const LiveClassList = ({ data, classType,group }) => {
  return (
    <Box sx={{ mt: 3, px: "40px" }}>
      {data.map((cls) => (
        <ClassCard
          key={cls.id}
          cls={cls}
          style={defaultStyles}
          type={classType}
          group={group}
        />
      ))}
    </Box>
  );
};

export default LiveClassList;
