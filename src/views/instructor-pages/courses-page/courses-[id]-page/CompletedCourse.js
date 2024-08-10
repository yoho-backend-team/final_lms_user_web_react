// import { Box, Typography,StarIcon,UpdateIcon } from '@mui/material'
// import React from 'react'
// import { getImageUrl } from 'utils/common/imageUtlils'

// const CompletedCourse = () => {

//   return (
//     <Box sx={{ pr: "60px", overflowY: "auto", maxHeight: "100vh" }}>
//       <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
//       <Box sx={{ pb: "27px" }}>
//           <img
//             src={getImageUrl(Course?.image)}
//             style={{ width: "363px", height: "160px", borderRadius: "25px" }}
//             alt="course"
//           />
//         </Box>
//         <Box sx={{ pb: "12px", display: "flex", gap: "21px" }}>
//           <Typography
//             sx={{
//               color: "#000000",
//               fontSize: "16px",
//               fontWeight: 700,
//               lineHeight: "32px",
//             }}
//           >
//             {Course?.course_name}
//           </Typography>
//           <Typography
//             sx={{ display: "inline-flex", gap: "5px", alignItems: "center" }}
//           >
//             <StarIcon sx={{ color: "#EEBA02" }} />
//             <span
//               style={{
//                 color: "#000000",
//                 fontSize: "12px",
//                 fontWeight: 700,
//                 lineHeight: "13px",
//               }}
//             >
//               ( 4.0 )
//             </span>
//           </Typography>
//         </Box>
//         <Box
//           sx={{
//             display: "flex",
//             gap: "20px",
//             alignItems: "center",
//             pb: "21px",
//           }}
//         >
//           <Typography
//             sx={{
//               color: "#000000",
//               fontSize: "14px",
//               fontWeight: 700,
//               lineHeight: "10px",
//             }}
//           >
//             By Rajalakshmi Institute
//           </Typography>
//           <Typography
//             sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
//           >
//             <UpdateIcon sx={{ color: "black" }} />
//             <span
//               style={{
//                 color: "#000000",
//                 fontSize: "14px",
//                 fontWeight: 600,
//                 lineHeight: "10px",
//               }}
//             >
//               12hrs
//             </span>
//           </Typography>
//         </Box>

//       </Box>
//     </Box>
   
//   )
// }

// export default CompletedCourse