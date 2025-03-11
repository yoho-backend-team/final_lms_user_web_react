// import React from "react";
// import { Box } from "@mui/material";
// import ClassCard from "../card/ClassCard";


// const defaultStyles = {
//   calendarColor: "#000000",
//   timerColor: "#2AAD37",
//   durationTextColor: "rgba(13, 110, 253, 1)",
//   durationColor: "rgba(61, 139, 253, 0.22)",
// };

// const LiveClassList = ({ data, classType, group, image }) => {
//   return (
//     <Box sx={{ mt: 3, px: "40px" }}>
//       {data?.map((cls) => (
//         <ClassCard
//           key={cls.id}
//           cls={cls}
//           style={defaultStyles}
//           type={classType}
//           group={group}
//           img={image}
//         />
//       ))}
//     </Box>
//   );
// };

// export default LiveClassList;




import React, { useState } from "react";
import Joyride from "react-joyride";
import { Box, Typography } from "@mui/material";
import ClassCard from "../card/ClassCard";
import { ClassCardHeader } from "../card/ClassCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(13, 110, 253, 1)",
  durationColor: "rgba(61, 139, 253, 0.22)",
};

const LiveClassList = ({ data, classType, group, image }) => {
  const [runTour, setRunTour] = useState(true);

  const tourSteps = [
    {
      target: "#live-class-list",
      content: "This section displays your live classes.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#live-class-card",
      content: "Each card represents a live class with relevant details.",
      placement: "top",
      disableBeacon: true,
    },
  ];

  return (
    <>
      {/* <Joyride
        steps={tourSteps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        disableOverlayClose={true}
        spotlightClicks={true}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      /> */}
      <Box id="live-class-list" sx={{ mt: 3, px: "40px" }}>
        {data && data.length > 0 ? (
          data.map((cls) => (
            <Box key={cls.id} id="live-class-card">
              <ClassCardHeader />
              <ClassCard cls={cls} style={defaultStyles} type={classType} group={group} img={image} />
            </Box>
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
    </>
  );
};

export default LiveClassList;
