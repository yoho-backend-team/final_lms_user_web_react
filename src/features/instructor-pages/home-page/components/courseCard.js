// import React from "react";
// import { Box, Typography, CircularProgress, Paper } from "@mui/material";
// import { styled } from "@mui/system";

// const StyledPaper = styled(Paper)(({ theme }) => ({
//   width: "100%",
//   height: "100%",
//   position: "relative",
//   background: "#FFDCB3",
//   boxShadow: "0px 0px 26px rgba(234.17, 155.39, 64.79, 0.50)",
//   borderRadius: 8,
//   overflow: "hidden",
//   border: "1px solid #D39349",
//   padding: theme.spacing(2),
// }));

// const SlantedBox = styled(Box)(({ backgroundColor }) => ({
//   backgroundColor,
//   borderRadius: 10,
//   padding: "16px",
//   position: "relative",
//   clipPath: "polygon(0 0, 100% 15%, 100% 75%, 0% 100%)",
// }));

// const ProgressCircle = styled(CircularProgress)(({ progressColor }) => ({
//   color: progressColor,
//   position: "absolute",
//   top: "11.12px",
//   left: "11.12px",
// }));

// const ProgressCircleContainer = styled(Box)({
//   width: "89.25px",
//   height: "89.25px",
//   position: "absolute",
//   top: "0",
//   right: "0",
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });

// const CourseProgress = () => {
//   const batches = [
//     {
//       name: "Batch A",
//       registered: 78,
//       progress: 32,
//       progressColor: "#B40000",
//       backgroundColor: "#FDCBCB",
//     },
//     {
//       name: "Batch B",
//       registered: 78,
//       progress: 82,
//       progressColor: "#60CB50",
//       backgroundColor: "#C9FEC1",
//     },
//     {
//       name: "Batch C",
//       registered: 78,
//       progress: 52,
//       progressColor: "#23A2CB",
//       backgroundColor: "#A9E5F8",
//     },
//     {
//       name: "Batch D",
//       registered: 78,
//       progress: 80,
//       progressColor: "#6600EB",
//       backgroundColor: "#D2AFFF",
//     },
//   ];

//   return (
//     <StyledPaper>
//       <Typography
//         variant="h5"
//         sx={{
//           position: "absolute",
//           top: "22px",
//           left: "30px",
//           color: "#481D0C",
//           fontFamily: "Nunito Sans",
//           fontWeight: 900,
//           lineHeight: "20px",
//         }}
//       >
//         Course Progress
//       </Typography>
//       <Box sx={{ position: "absolute", top: "66px", left: "19px" }}>
//         {batches.map((batch, index) => (
//           <SlantedBox
//             key={index}
//             backgroundColor={batch.backgroundColor}
//             sx={{ marginBottom: "16px", width: "321px", height: "89px" }}
//           >
//             <Typography
//               sx={{
//                 position: "absolute",
//                 top: "24px",
//                 left: "20px",
//                 color: "#272835",
//                 fontSize: "13px",
//                 fontFamily: "Poppins",
//                 fontWeight: 600,
//               }}
//             >
//               {batch.name}
//             </Typography>
//             <Typography
//               sx={{
//                 position: "absolute",
//                 top: "45px",
//                 left: "20px",
//                 color: "#403B3B",
//                 fontSize: "13px",
//                 fontFamily: "Poppins",
//                 fontWeight: 400,
//               }}
//             >
//               {batch.registered} Registered
//             </Typography>
//             <ProgressCircleContainer>
//               <CircularProgress
//                 variant="determinate"
//                 value={100}
//                 sx={{
//                   color: batch.backgroundColor,
//                   zIndex: 1,
//                   position: "absolute",
//                 }}
//                 size={67.01}
//               />
//               <ProgressCircle
//                 variant="determinate"
//                 value={batch.progress}
//                 progressColor={batch.progressColor}
//                 size={67.01}
//               />
//               <Typography
//                 sx={{
//                   position: "absolute",
//                   color: "black",
//                   fontSize: "17.06px",
//                   fontFamily: "Poppins",
//                   fontWeight: 400,
//                 }}
//               >
//                 {batch.progress}%
//               </Typography>
//             </ProgressCircleContainer>
//           </SlantedBox>
//         ))}
//       </Box>
//     </StyledPaper>
//   );
// };

// export default CourseProgress;



import React from "react";
import { Box, Typography, CircularProgress, Paper } from "@mui/material";
import { styled } from "@mui/system";

// Styled components
const StyledPaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  height: "100%",
  position: "relative",
  background: "#FFDCB3",
  boxShadow: "0px 0px 26px rgba(234.17, 155.39, 64.79, 0.50)",
  borderRadius: 8,
  overflow: "hidden",
  border: "1px solid #D39349",
  padding: theme.spacing(2),
}));

const SlantedBox = styled(Box)(({ backgroundColor }) => ({
  backgroundColor,
  borderRadius: 10,
  padding: "15px",
  position: "relative",
  clipPath: "polygon(0 0, 100% 15%, 100% 75%, 0% 100%)",
}));

const ProgressCircle = styled(CircularProgress)(({ progressColor }) => ({
  color: progressColor,
  position: "absolute",
  top: "11.12px",
  left: "11.12px",
}));

const ProgressCircleContainer = styled(Box)(() => ({
  width: "89.25px",
  height: "89.25px",
  position: "absolute",
  top: "0",
  right: "0",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

const CourseProgress = () => {
  const batches = [
    {
      name: "Batch A",
      registered: 78,
      progress: 32,
      progressColor: "#B40000",
      backgroundColor: "#FDCBCB",
    },
    {
      name: "Batch B",
      registered: 78,
      progress: 82,
      progressColor: "#60CB50",
      backgroundColor: "#C9FEC1",
    },
    {
      name: "Batch C",
      registered: 78,
      progress: 52,
      progressColor: "#23A2CB",
      backgroundColor: "#A9E5F8",
    },
    {
      name: "Batch D",
      registered: 78,
      progress: 80,
      progressColor: "#6600EB",
      backgroundColor: "#D2AFFF",
    },
  ];

  return (
    <StyledPaper>
      <Typography
        variant="h5"
        sx={{
          position: "absolute",
          top: "22px",
          left: "30px",
          color: "#481D0C",
          fontFamily: "Nunito Sans",
          fontWeight: 900,
          lineHeight: "20px",
        }}
      >
        Course Progress
      </Typography>
      <Box sx={{ position: "absolute", top: "66px", left: "19px" }}>
        {batches.map((batch, index) => (
          <SlantedBox
            key={index}
            backgroundColor={batch.backgroundColor}
            sx={{ marginBottom: "16px", width: "321px", height: "89px" }}
          >
            <Typography
              sx={{
                position: "absolute",
                top: "24px",
                left: "20px",
                color: "#272835",
                fontSize: "13px",
                fontFamily: "Poppins",
                fontWeight: 600,
              }}
            >
              {batch.name}
            </Typography>
            <Typography
              sx={{
                position: "absolute",
                top: "45px",
                left: "20px",
                color: "#403B3B",
                fontSize: "13px",
                fontFamily: "Poppins",
                fontWeight: 400,
              }}
            >
              {batch.registered} Registered
            </Typography>
            <ProgressCircleContainer>
              <CircularProgress
                variant="determinate"
                value={100}
                sx={{
                  color: batch.backgroundColor,
                  zIndex: 1,
                  position: "absolute",
                }}
                size={67.01}
              />
              <ProgressCircle
                variant="determinate"
                value={batch.progress}
                progressColor={batch.progressColor}
                size={67.01}
              />
              <Typography
                sx={{
                  position: "absolute",
                  color: "black",
                  fontSize: "17.06px",
                  fontFamily: "Poppins",
                  fontWeight: 400,
                }}
              >
                {batch.progress}%
              </Typography>
            </ProgressCircleContainer>
          </SlantedBox>
        ))}
      </Box>
    </StyledPaper>
  );
};

export default CourseProgress;
