// import React from "react";
// import { Box } from "@mui/material";
// import ClassCard from "../card/ClassCard";

// const defaultStyles = {
//   calendarColor: "#000000",
//   timerColor: "#2AAD37",
//   durationTextColor: "#0D6EFD",
//   durationColor: "rgba(61, 139, 253, 0.22)",
// };

// const UpcomingClassList = ({ data, classType,group, image }) => {
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

// export default UpcomingClassList;
import React, { useState } from "react";
import Joyride from "react-joyride";
import { Box, Typography } from "@mui/material";
import ClassCard from "../card/ClassCard";
import { ClassCardHeader } from "../card/ClassCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "#0D6EFD",
  durationColor: "rgba(61, 139, 253, 0.22)",
};

const UpcomingClassList = ({ data, classType, group, image }) => {
  const [runTour, setRunTour] = useState(true);

  const tourSteps = [
    {
      target: "#upcoming-class-list",
      content: "This section shows your upcoming classes.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#upcoming-class-card",
      content:
        "Each card represents an upcoming class with details like subject, date, and time.",
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
      <Box id="upcoming-class-list" sx={{ mt: 3, px: "40px" }}>
        {data && data.length > 0 ? (
          data.map((cls) => (
            <Box key={cls.id} id="upcoming-class-card">
              <ClassCardHeader />
              <ClassCard cls={cls} style={defaultStyles} type={classType} group={group} img={image} />
            </Box>
          ))
        ) : (
          <Box sx={{ py: 5,textAlign:"center"  }}>
                   <img src="https://cdni.iconscout.com/illustration/premium/thumb/employee-is-unable-to-find-sensitive-data-illustration-download-in-svg-png-gif-file-formats--no-found-misplaced-files-business-pack-illustrations-8062128.png" alt="No data available" style={{ maxWidth: '100%', height: '270px' }} />
                  <Typography variant="h6" color="textSecondary" fontSize={'32px'} >
                    No Upcoming Classes
                  </Typography>
                  <Typography variant="body2" color="textSecondary" fontSize={'25px'}>
                    Check back later for updates.
                  </Typography>
                </Box>
        )}
      </Box>
    </>
  );
};

export default UpcomingClassList;
