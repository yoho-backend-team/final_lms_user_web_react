// import React, { useState, useEffect } from 'react';
// import { Box, Grid, Card } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { selectInstructorCommunities } from "features/instructor-pages/community-page/redux/selectors";
// import getandAddCommunity from "features/instructor-pages/community-page/redux/thunks";
// import toast from "react-hot-toast";
// import { useSocket } from "context/instructorSocket";
// import SideBar from "features/instructor-pages/community-page/components/Sidebar";
// import Chat from "features/instructor-pages/community-page/components/Chat";

// const SidebarSkeleton = () => (
//   <Box>
//     {/* Search bar container */}
//     <Box sx={{ paddingLeft: "32px", paddingTop: "20px", paddingRight: "12px" }}>
//       <Box 
//         sx={{ 
//           height: "56px",
//           backgroundColor: "#E0E0E0",
//           borderRadius: "24px",
//           animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
//           "@keyframes pulse": {
//             "0%, 100%": {
//               opacity: 1
//             },
//             "50%": {
//               opacity: .7
//             }
//           }
//         }} 
//       />
//     </Box>

//     {/* Communities list container */}
//     <Box sx={{ padding: "30px", height: "60vh", overflow: "auto" }}>
//       {[...Array(5)].map((_, index) => (
//         <Box
//           key={index}
//           sx={{
//             display: "flex",
//             padding: "12px",
//             width: "100%",
//             justifyContent: "space-between",
//             borderRadius: "8px",
//             cursor: "pointer",
//             mb: 2,
//             "&:hover": {
//               backgroundColor: "#D1E4E8",
//             }
//           }}
//         >
//           {/* Left side with image and text */}
//           <Box sx={{ display: "flex", gap: "10px" }}>
//             <Box 
//               sx={{ 
//                 width: 60, 
//                 height: 60, 
//                 borderRadius: "50%",
//                 backgroundColor:"#E0E0E0",
//                 animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//               }} 
//             />
//             <Box sx={{
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               py: "10px",
//               width: "150px",
//               gap: "12px"
//             }}>
//               <Box sx={{ 
//                 height: "24px", 
//                 width: "80%", 
//                 backgroundColor:  "#E0E0E0",
//                 borderRadius: 1,
//                 animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//               }} />
//               <Box sx={{ 
//                 height: "16px", 
//                 width: "60%", 
//                 backgroundColor:  "#E0E0E0",
//                 borderRadius: 1,
//                 animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//               }} />
//             </Box>
//           </Box>

//           {/* Right side with time and status */}
//           <Box sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             gap: "12px",
//             py: 1
//           }}>
//             <Box sx={{ 
//               height: "16px", 
//               width: "40px", 
//               backgroundColor:"#E0E0E0",
//               borderRadius: 1,
//               animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//             }} />
//             <Box sx={{ textAlign: "end" }}>
//               <Box sx={{ 
//                 width: 20, 
//                 height: 20, 
//                 borderRadius: "50%",
//                 backgroundColor: "#E0E0E0",
//                 animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//               }} />
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </Box>
//   </Box>
// );

// const ChatSkeleton = () => (
//   <Box sx={{
//     width: "100%",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F6F6F6",
//     padding: "20px"
//   }}>
//     <Card sx={{
//       height: "73vh",
//       width: "100%",
//       display: "flex",
//       flexDirection: "column",
//       boxShadow: "none",
//       borderRadius: "8px",
//       backgroundColor: "#FFFFFF",
//     }}>
//       {/* Chat Header */}
//       <Box sx={{ 
//         p: 3, 
//         borderBottom: "1px solid #E0E0E0",
//         display: "flex",
//         alignItems: "center",
//         gap: 3
//       }}>
//         <Box sx={{ 
//           width: 48, 
//           height: 48, 
//           borderRadius: "50%",
//           backgroundColor:  "#E0E0E0",
//           animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//         }} />
//         <Box sx={{ 
//           height: "28px", 
//           width: "200px", 
//           backgroundColor:  "#E0E0E0",
//           borderRadius: 1,
//           animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//         }} />
//       </Box>

//       {/* Chat Messages */}
//       <Box sx={{
//         flex: 1,
//         padding: "24px",
//         overflowY: "auto",
//         display: "flex",
//         flexDirection: "column",
//         gap: "28px"
//       }}>
//         {[...Array(4)].map((_, index) => (
//           <Box
//             key={index}
//             sx={{
//               display: "flex",
//               justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
//               maxWidth: "70%",
//               alignSelf: index % 2 === 0 ? "flex-start" : "flex-end"
//             }}
//           >
//             <Box sx={{ 
//               width: "100%",
//               height: "70px",
//               backgroundColor: "#E0E0E0",
//               borderRadius: "12px",
//               animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//             }} />
//           </Box>
//         ))}
//       </Box>

//       {/* Bottom Bar */}
//       <Box sx={{
//         padding: "16px",
//         borderTop: "1px solid #E0E0E0"
//       }}>
//         <Box sx={{ 
//           height: "60px",
//           backgroundColor: "#E0E0E0",
//           borderRadius: "12px",
//           animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
//         }} />
//       </Box>
//     </Card>
//   </Box>
// );

// const Community = () => {
//   const dispatch = useDispatch();
//   const communities = useSelector(selectInstructorCommunities);
//   const [currentChat, setCurrentChat] = useState(null);
//   const [Messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const socket = useSocket();

//   const getAllCommunities = async () => {
//     try {
//       setIsLoading(true);
//       await dispatch(getandAddCommunity());
//     } catch(error) {
//       toast.error(error?.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     getAllCommunities();
//   }, [dispatch]);

//   return (
//     <Box
//       sx={{
//         height: "87vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: "40px",
//       }}
//     >
//       <Box
//         sx={{
//           backgroundColor: "#FFFFFF",
//           borderRadius: "18px",
//           border: "1px solid #C3C3C3",
//           boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
//           height: "100%",
//           width: "100%",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Grid container sx={{ flex: 1 }}>
//           <Grid item xs={4}>
//             {isLoading ? (
//               <SidebarSkeleton />
//             ) : (
//               <SideBar
//                 communities={communities}
//                 socket={socket}
//                 currentChat={currentChat}
//                 setCurrentChat={setCurrentChat}
//                 Messages={Messages}
//                 setMessages={setMessages}
//               />
//             )}
//           </Grid>
//           <Grid item xs={8}>
//             {isLoading  ? (
//               <ChatSkeleton />
//             ) : (
//               <Chat
//                 currentChat={currentChat}
//                 socket={socket}
//                 setCurrentChat={setCurrentChat}
//                 setMessages={setMessages}
//                 Messages={Messages}
//               />
//             )}
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   );
// };

// export default Community;
import React, { useState, useEffect } from 'react';
import Joyride from "react-joyride";
import { Box, Grid, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorCommunities } from "features/instructor-pages/community-page/redux/selectors";
import getandAddCommunity from "features/instructor-pages/community-page/redux/thunks";
import toast from "react-hot-toast";
import { useSocket } from "context/instructorSocket";
import SideBar from "features/instructor-pages/community-page/components/Sidebar";
import Chat from "features/instructor-pages/community-page/components/Chat";

const Community = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectInstructorCommunities);
  const [currentChat, setCurrentChat] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const socket = useSocket();
  const [runTour, setRunTour] = useState(true);

  const tourSteps = [
    {
      target: "#community-sidebar",
      content: "This sidebar lists all the available communities you can join and interact with.",
      placement: "right",
      disableBeacon: true,
    },
    {
      target: "#community-chat",
      content: "This is the chat window where you can communicate with your community members.",
      placement: "left",
      disableBeacon: true,
    },
  ];

  const getAllCommunities = async () => {
    try {
      setIsLoading(true);
      await dispatch(getandAddCommunity());
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllCommunities();
  }, [dispatch]);

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
      <Box
        sx={{
          height: "87vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "18px",
            border: "1px solid #C3C3C3",
            boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Grid container sx={{ flex: 1 }}>
            <Grid item xs={4} id="community-sidebar">
              <SideBar
                communities={communities}
                socket={socket}
                currentChat={currentChat}
                setCurrentChat={setCurrentChat}
                Messages={Messages}
                setMessages={setMessages}
              />
            </Grid>
            <Grid item xs={8} id="community-chat">
              <Chat
                currentChat={currentChat}
                socket={socket}
                setCurrentChat={setCurrentChat}
                setMessages={setMessages}
                Messages={Messages}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Community;
