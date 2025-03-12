import React from "react";
import { Box,Typography } from "@mui/material";
import ClassCard, { ClassCardHeader } from "../card/ClassCard"


const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(13, 110, 253, 1)",
  durationColor: "rgba(61, 139, 253, 0.22)",
};

const LiveClassList = ({ data, classType,group }) => {
  return (
    <Box sx={{ mt: 3, px: "40px" }}> 
       {data.length > 0 ? (
      data.map((cls) => (
        <>
        <ClassCardHeader/>
        <ClassCard
          key={cls.id}
          cls={cls}
          style={defaultStyles}
          type={classType}
          group={group}
        />
        </>
      ))
    ) : (
      <Box sx={{ py: 5,textAlign:"center" }}>
         <img src="https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-illustration-download-in-svg-png-gif-file-formats--no-found-misplaced-files-business-pack-illustrations-8062128.png" alt="No data available" style={{ maxWidth: '100%', height: '270px' }} />
        <Typography variant="h6" color="textSecondary" fontSize={'32px'}>
          No Live Classes Available
        </Typography>
        <Typography variant="body2" color="textSecondary" fontSize={'25px'}>
          Stay tuned for upcoming sessions.
        </Typography>
      </Box>
    )}
    </Box>
  );
};

export default LiveClassList;
