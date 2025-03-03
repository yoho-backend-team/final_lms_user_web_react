// import React from "react";
// import { Box, Typography } from "@mui/material";
// import { CourseCardBg } from "utils/images";
// import StarIcon from "@mui/icons-material/Star";
// import UpdateIcon from "@mui/icons-material/Update";
// import CircularProgressWithLabel from "./cirularProgresswithLabel";
// import NoteIcon from "assets/icons/noteIcon";
// import CertificateIcon from "assets/icons/certificateIcon";
// import LanguageIcon from "assets/icons/languageIcon";
// import { getImageUrl } from "utils/common/imageUtlils";

// const CourseDetails = ({ Course }) => {
//   const Benefits = [
//     {
//       icon: <LanguageIcon color="white" />,
//       id: "benifit1",
//       title: "English & Tamil",
//       background: "#5F1AA4",
//       shadow: "0px 0px 50px 0px rgba(95, 26, 164, 0.63)",
//     },
//     {
//       icon: <CertificateIcon color="white" padding="17px 41px 10px 40px" />,
//       id: "benifit2",
//       title: "3 Certificates",
//       background: "#0051C8",
//       shadow: "0px 0px 50px 0px rgba(0, 81, 200, 0.63)",
//     },
//     {
//       icon: (
//         <NoteIcon color="white" fill={"white"} padding="17px 41px 10px 40px" />
//       ),
//       id: "benifit3",
//       title: "Notes",
//       background: "#0F8D0D",
//       shadow: "0px 0px 50px 0px rgba(15, 141, 13, 0.63)",
//     },
//   ];
//   return (
//     <Box sx={{ pr: "60px", overflowY: "auto", maxHeight: "100vh" }}>
//       <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
//         <Box
//           sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}
//         >
//           <Typography
//             sx={{
//               color: "#4B4B4B",
//               fontSize: "16px",
//               fontWeight: 800,
//               lineHeight: "24px",
//             }}
//           >
//             Course Details
//           </Typography>
//           <Typography>
//             <span
//               style={{
//                 color: "#4B4B4B",
//                 fontSize: "12px",
//                 lineHeight: "14px",
//                 fontWeight: 600,
//               }}
//             >
//               Purchased on:
//             </span>
//             <span
//               style={{
//                 color: "#000000",
//                 fontSize: "12px",
//                 lineHeight: "14px",
//                 fontWeight: 600,
//               }}
//             >
//               23 Jan 2024
//             </span>
//           </Typography>
//         </Box>
//         <Box sx={{ pb: "27px" }}>
//           <img
//             src={getImageUrl(Course?.image)}
//             style={{
//               width: "100%",
//               maxWidth: "400px",
//               height: "auto",
//               borderRadius: "16px",
//               boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
//             }}
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
//               textTransform: "uppercase",
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
//         <Box>
//           <Typography
//             sx={{
//               color: "#6C757D",
//               fontSize: "12px",
//               fontWeight: 400,
//               lineHeight: "16px",
//             }}
//           >
//             {Course?.description}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", gap: "40px", pt: "40px" }}>
//           <Box
//             sx={{
//               border: "1px solid #2A2A2A",
//               padding: "10px",
//               borderRadius: "7px",
//               display: "inline-flex",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#000000",
//                 fontSize: "16px",
//                 fontWeight: 700,
//                 lineHeight: "24px",
//               }}
//             >
//               Durations:
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#0051C8",
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 lineHeight: "24px",
//               }}
//             >
//               {" "}
//               {Course?.duration} months
//             </Typography>
//           </Box>
//           <Box
//             sx={{
//               border: "1px solid #2A2A2A",
//               padding: "10px",
//               borderRadius: "7px",
//               display: "inline-flex",
//             }}
//           >
//             <Typography
//               sx={{
//                 color: "#000000",
//                 fontSize: "16px",
//                 fontWeight: 700,
//                 lineHeight: "24px",
//               }}
//             >
//               Type:
//             </Typography>
//             <Typography
//               sx={{
//                 color: "#0051C8",
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 lineHeight: "24px",
//               }}
//             >
//               {" "}
//               {Course?.class_type?.[0]}{" "}
//             </Typography>
//           </Box>
//           <Box
//             sx={{ display: "inline-flex", gap: "15px", alignItems: "center" }}
//           >
//             <Typography>Status:</Typography>
//             <CircularProgressWithLabel />
//           </Box>
//         </Box>
//         <Box>
//            <Box sx={{ pt: "40px", pb: "20px" }}>
//             <Typography
//               sx={{
//                 color: "#4B4B4B",
//                 fontSize: "16px",
//                 fontWeight: 600,
//                 lineHeight: "14px",
//               }}
//             >
//               Benefits
//             </Typography>
//           </Box>
//           <Box sx={{ display: "flex", gap: "40px", flexWrap: "wrap" }}>
//             {Benefits?.map((item) => (
//               <Box
//                 key={item.id}
//                 sx={{
//                   backgroundColor: item.background,
//                   boxShadow: item.shadow,
//                   display: "flex",
//                   flexDirection: "column",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   borderRadius: "11px",
//                   transition: "transform 0.3s",
//                   '&:hover': {
//                     transform: "scale(1.05)",
//                   },
//                 }}
//               >
//                 <Typography sx={{ padding: "17px 41px 10px 40px" }}>
//                   {item.icon}
//                 </Typography>
//                 <Typography
//                   sx={{
//                     color: "#FFFFFF",
//                     fontSize: "14px",
//                     fontWeight: 600,
//                     lineHeight: "23px",
//                     px: "10px",
//                     pb: "11px",
//                   }}
//                 >
//                   {item.title}
//                 </Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>
//     </Box> 
//   );
// };

// export default CourseDetails;
import React from "react";
import { Box, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import UpdateIcon from "@mui/icons-material/Update";
import CircularProgressWithLabel from "./cirularProgresswithLabel";
import { getImageUrl } from "utils/common/imageUtlils";

const CourseDetails = ({ Course }) => {
  return (
    <Box sx={{ pr: "60px", overflowY: "auto", maxHeight: "100vh" }}>
      <Box sx={{ display: "flex", flexDirection: "column", pr: "90px" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", pb: "20px" }}
        >
          <Typography
            sx={{
              color: "#4B4B4B",
              fontSize: "16px",
              fontWeight: 800,
              lineHeight: "24px",
            }}
          >
            Course Details
          </Typography>
          <Typography>
            <span
              style={{
                color: "#4B4B4B",
                fontSize: "12px",
                lineHeight: "14px",
                fontWeight: 600,
              }}
            >
              Purchased on:
            </span>
            <span
              style={{
                color: "#000000",
                fontSize: "12px",
                lineHeight: "14px",
                fontWeight: 600,
              }}
            >
              23 Jan 2024
            </span>
          </Typography>
        </Box>
        <Box sx={{ pb: "27px" }}>
          <img
            src={getImageUrl(Course?.image)}
            style={{
              width: "100%",
              maxWidth: "400px",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
            }}
            alt="course"
          />
        </Box>
        <Box sx={{ pb: "12px", display: "flex", gap: "21px" }}>
          <Typography
            sx={{
              color: "#000000",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "32px",
            }}
          >
            {Course?.course_name}
          </Typography>
          <Typography
            sx={{ display: "inline-flex", gap: "5px", alignItems: "center" }}
          >
            <StarIcon sx={{ color: "#EEBA02" }} />
            <span
              style={{
                color: "#000000",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight: "13px",
              }}
            >
              ( 4.0 )
            </span>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            pb: "21px",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "14px",
              fontWeight: 700,
              lineHeight: "10px",
              textTransform: "uppercase",
            }}
          >
            By Rajalakshmi Institute
          </Typography>
          <Typography
            sx={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
          >
            <UpdateIcon sx={{ color: "black" }} />
            <span
              style={{
                color: "#000000",
                fontSize: "14px",
                fontWeight: 600,
                lineHeight: "10px",
              }}
            >
              12hrs
            </span>
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              color: "#6C757D",
              fontSize: "12px",
              fontWeight: 400,
              lineHeight: "16px",
            }}
          >
            {Course?.description}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: "40px", pt: "40px" }}>
          <Box
            sx={{
              border: "1px solid #2A2A2A",
              padding: "10px",
              borderRadius: "7px",
              display: "inline-flex",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              Durations:
            </Typography>
            <Typography
              sx={{
                color: "#0051C8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              {Course?.duration} months
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid #2A2A2A",
              padding: "10px",
              borderRadius: "7px",
              display: "inline-flex",
            }}
          >
            <Typography
              sx={{
                color: "#000000",
                fontSize: "16px",
                fontWeight: 700,
                lineHeight: "24px",
              }}
            >
              Type:
            </Typography>
            <Typography
              sx={{
                color: "#0051C8",
                fontSize: "16px",
                fontWeight: 600,
                lineHeight: "24px",
              }}
            >
              {Course?.class_type?.[0]}
            </Typography>
          </Box>
          <Box
            sx={{ display: "inline-flex", gap: "15px", alignItems: "center" }}
          >
            <Typography>Status:</Typography>
            <CircularProgressWithLabel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CourseDetails;
