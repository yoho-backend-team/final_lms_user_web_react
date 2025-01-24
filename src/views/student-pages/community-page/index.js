import { Box, Grid, Skeleton, Fade } from "@mui/material";
import SideBar from "features/student-pages/community-page/components/Sidebar";
import Chat from "features/student-pages/community-page/components/Chat";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentCommunities } from "features/student-pages/community-page/redux/thunks";
import {
  selectStudentCommunity,
  selectLoading,
} from "features/student-pages/community-page/redux/selectors";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectStudentCommunity);
  const loading = useSelector(selectLoading); // Selector for loading state
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false); // To manage fade-in after loading is done

  useEffect(() => {
    const getCommunities = async () => {
      try {
        dispatch(getAllStudentCommunities());
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
    getCommunities();
  }, [dispatch]);

  useEffect(() => {
    const socket = io(process.env.REACT_APP_URL);
    setSocket(socket);
  }, []);

  // Simulate content loading with a timeout, after which set isLoaded to true
  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsLoaded(true), 1000); // Delay for fade-in effect
    }
  }, [loading]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        height: "95vh", // Full-screen height
        backgroundColor: "#f9f9f9", // Light background for better visual appearance
      }}
    >
      {/* Show loader while content is loading */}
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // Full height for loader
            width: "100%",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Skeleton Loader for Content */}
          <Skeleton variant="rectangular" width="100%" height="100%" sx={{ borderRadius: "16px" }} />
          <Skeleton variant="text" width="60%" height={40} sx={{ marginTop: 2 }} />
          <Skeleton variant="text" width="40%" height={30} />
          <Skeleton variant="rectangular" width="100%" height={180} sx={{ marginTop: 3 }} />
        </Box>
      ) : (
        // Content section after loading is complete
        <Fade in={isLoaded} timeout={1000}>
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              border: "1px solid #C3C3C3",
              boxShadow: "0px 0px 64px 0px rgba(0, 0, 0, 0.10)",
              height: "90%", // Adjusted height
              width: "100%",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden", // Prevent content overflow
              mt: "60px",
            }}
          >
            <Grid container sx={{ flex: 1 }}>
              {/* Sidebar Section */}
              <Grid
                item
                xs={4}
                sx={{
                  borderRadius: "16px 0 0 16px", // Rounded left corners
                  overflow: "hidden", // Ensures no overflow from children
                  borderRight: "1px solid #E0E0E0", // Subtle divider
                }}
              >
                <SideBar
                  communities={communities}
                  socket={socket}
                  currentChat={currentChat}
                  setCurrentChat={setCurrentChat}
                  Messages={Messages}
                  setMessages={setMessages}
                />
              </Grid>

              {/* Chat Section */}
              <Grid
                item
                xs={8}
                sx={{
                  display: "flex",
                  borderRadius: "0 16px 16px 0", // Rounded right corners
                  overflow: "hidden",
                }}
              >
                <Chat
                  currentChat={currentChat}
                  socket={socket}
                  setCurrentChat={setCurrentChat}
                  Messages={Messages}
                  setMessages={setMessages}
                />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default CommunityPage;
