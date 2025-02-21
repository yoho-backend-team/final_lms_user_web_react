import React, { useState, useEffect } from "react";
import Joyride from "react-joyride";
import { Box, Grid, Fade, Skeleton, Card } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentCommunities } from "features/student-pages/community-page/redux/thunks";
import { selectStudentCommunity, selectLoading } from "features/student-pages/community-page/redux/selectors";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import SideBar from "features/student-pages/community-page/components/Sidebar";
import Chat from "features/student-pages/community-page/components/Chat";

const CommunityPage = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectStudentCommunity);
  const loading = useSelector(selectLoading);
  const [currentChat, setCurrentChat] = useState(null);
  const [socket, setSocket] = useState(null);
  const [Messages, setMessages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCommunities, setFilteredCommunities] = useState(communities);
  const[runTour,setruntour]=useState(true)


  useEffect(() => {
    dispatch(getAllStudentCommunities()).catch((error) => {
      toast.error(error?.response?.data?.message);
    });
  }, [dispatch]);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_URL);
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!loading) setIsLoaded(true);
  }, [loading]);

  useEffect(() => {
    setFilteredCommunities(
      searchTerm
        ? communities.filter((community) =>
            community?.batch?.batch_name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : communities
    );
  }, [searchTerm, communities]);

  const tourSteps = [
    {
      target: "#community-sidebar",
      content: "Find all your communities listed here.",
      disableBeacon: true,
    },
    {
      target: "#search-bar",
      content: "Use this search bar to find a specific community.",
      disableBeacon: true,

    },
    {
      target: "#community-list-item",
      content: "Click on a community to open its chat.",
      disableBeacon: true,
     
    },
    {
      target: "#community-chat",
      content: "This is where you can chat with community members.",
      disableBeacon: true,
      
    },
    {
      target: "#message-input",
      content: "Type your message here and press enter to send.",
      disableBeacon: true,
      
    },
  ];

  return (
    <>
      {/* <Joyride
  steps={tourSteps}
  run={runTour && isLoaded} // Ensure tour starts only when content is loaded
  continuous
  showSkipButton
  disableOverlayClose
  spotlightClicks
  disableScrolling
  styles={{ options: { zIndex: 10000 } }}
  
/> */}

      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px", height: "95vh", backgroundColor: "#f9f9f9" }}>
        <Fade in={isLoaded} timeout={1000}>
          <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #C3C3C3", height: "90%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <Grid container sx={{ flex: 1 }}>
              <Grid item xs={4} id="community-sidebar" sx={{ borderRight: "1px solid #E0E0E0" }}>
                <SideBar
                  communities={filteredCommunities}
                  socket={socket}
                  currentChat={currentChat}
                  setCurrentChat={setCurrentChat}
                  Messages={Messages}
                  setMessages={setMessages}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </Grid>
              <Grid item xs={8} id="community-chat" sx={{ display: "flex" }}>
                <Chat currentChat={currentChat} socket={socket} setCurrentChat={setCurrentChat} setMessages={setMessages} Messages={Messages} />
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default CommunityPage;
