// import React from "react";
// import { Box } from "@mui/material";
// import ClassCard from "../card/ClassCard";
// import FilterHeader from "./FilterCard";


// const defaultStyles = {
//   calendarColor: "#000000",
//   timerColor: "#2AAD37",
//   durationTextColor: "rgba(32, 201, 151, 1)",
//   durationColor: "rgba(210, 244, 234, 1)",
// };

// const ClassHistory = ({ data, classType, group, image }) => {
//   const [filters, setFilters] = React.useState({
//     class: "",
//     course: "",
//     month: "",
//     year: "",
//   });

//   const handleFilterChange = (filter, value) => {
//     setFilters((prev) => ({ ...prev, [filter]: value }));
//   };

//   const handleResetFilters = () => {
//     setFilters({
//       class: "",
//       course: "",
//       month: "",
//       year: "",
//     });
//   };

//   console.log(data,"data")
//   return (
//     <>
//       <FilterHeader
//         filters={filters}
//         onFilterChange={handleFilterChange}
//         onResetFilters={handleResetFilters}
//       />
//       <Box sx={{ mt: "1px", px: "40px" }}>
//         {data?.map((cls) => (
//           <ClassCard
//             key={cls.id}
//             cls={cls}
//             style={defaultStyles}
//             type={classType}
//             group={group}
//             img={image}
//           />
//         ))}
//       </Box>
//     </>
//   );
// };

// export default ClassHistory;

import React, { useState } from "react";
import Joyride from "react-joyride";
import { Box } from "@mui/material";
import ClassCard from "../card/ClassCard";
import FilterHeader from "./FilterCard";

const defaultStyles = {
  calendarColor: "#000000",
  timerColor: "#2AAD37",
  durationTextColor: "rgba(32, 201, 151, 1)",
  durationColor: "rgba(210, 244, 234, 1)",
};

const ClassHistory = ({ data, classType, group, image }) => {
  const [filters, setFilters] = useState({
    class: "",
    course: "",
    month: "",
    year: "",
  });

  const [runTour, setRunTour] = useState(true);

  const handleFilterChange = (filter, value) => {
    setFilters((prev) => ({ ...prev, [filter]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      class: "",
      course: "",
      month: "",
      year: "",
    });
  };

  const tourSteps = [
    {
      target: "#filter-section",
      content: "Use these filters to refine your class history!",
      placement: "bottom",
      disableBeacon: true,
    },
    {
      target: "#class-list",
      content: "Here you can view your class history.",
      placement: "top",
      disableBeacon: true,
    },
    {
      target: "#class-card",
      content:
        "Each card represents a class history with details like subject, date, and duration.",
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
      <Box id="filter-section">
        <FilterHeader
          filters={filters}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
        />
      </Box>
      <Box id="class-list" sx={{ mt: "1px", px: "40px" }}>
        {data?.map((cls) => (
          <Box key={cls.id} id="class-card">
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

export default ClassHistory;
