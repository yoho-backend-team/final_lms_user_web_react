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
import { Box } from "@mui/material";
import ClassCard from "../card/ClassCard";

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
      <Joyride
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
      />
      <Box id="upcoming-class-list" sx={{ mt: 3, px: "40px" }}>
        {data?.map((cls) => (
          <Box key={cls.id} id="upcoming-class-card">
            <ClassCard
              cls={cls}
              style={defaultStyles}
              type={classType}
              group={group}
              img={image}
            />
          </Box>
        ))}
      </Box>
    </>
  );
};

export default UpcomingClassList;
