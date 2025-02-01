import { Box, Grid, Fade, Skeleton, Card } from "@mui/material";
import SideBar from "features/student-pages/community-page/components/Sidebar";
import Chat from "features/student-pages/community-page/components/Chat";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudentCommunities } from "features/student-pages/community-page/redux/thunks";
import { selectStudentCommunity, selectLoading } from "features/student-pages/community-page/redux/selectors";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

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
    const socketConnection = io(process.env.REACT_APP_URL);
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect(); // Cleanup on unmount
    };
  }, []);

  useEffect(() => {
    if (!loading) {
      setIsLoaded(true);
    }
  }, [loading]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = communities.filter((community) =>
        community?.batch?.batch_name
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      
      
      setFilteredCommunities(filtered);
    } else {
      setFilteredCommunities(communities);
    }
  }, [searchTerm, communities]);
 
  

  const SidebarSkeleton = () => (
    <Box sx={{ padding: "30px", height: "60vh", overflow: "auto" }}>
      {[...Array(5)].map((_, index) => (
        <Box key={index} sx={{ display: "flex", padding: "8px", width: "100%", justifyContent: "space-between", borderRadius: "8px", cursor: "pointer", mb: 1 }}>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Skeleton variant="circular" width={60} height={60} />
            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", py: "10px", width: "150px" }}>
              <Skeleton variant="text" width="80%" height={24} />
              <Skeleton variant="text" width="60%" height={16} />
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "10px" }}>
            <Skeleton variant="text" width={40} height={16} />
            <Box sx={{ textAlign: "end" }}>
              <Skeleton variant="circular" width={17} height={17} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );

  const ChatSkeleton = () => (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#F6F6F6", padding: "20px" }}>
      <Card sx={{ height: "73vh", width: "100%", display: "flex", flexDirection: "column", boxShadow: "none", borderRadius: "8px", backgroundColor: "#FFFFFF" }}>
        <Box sx={{ p: 2, borderBottom: "1px solid #E0E0E0", display: "flex", alignItems: "center", gap: 2 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="text" width={200} height={24} />
        </Box>

        <Box sx={{ flex: 1, padding: "20px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "20px" }}>
          {[...Array(4)].map((_, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: index % 2 === 0 ? "flex-start" : "flex-end", maxWidth: "70%", alignSelf: index % 2 === 0 ? "flex-start" : "flex-end" }}>
              <Skeleton variant="rectangular" width="100%" height={60} sx={{ borderRadius: "8px" }} />
            </Box>
          ))}
        </Box>

        <Box sx={{ padding: "10px", borderTop: "1px solid #E0E0E0" }}>
          <Skeleton variant="rectangular" height={56} sx={{ borderRadius: "8px" }} />
        </Box>
      </Card>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "30px", height: "95vh", backgroundColor: "#f9f9f9" }}>
      <Fade in={isLoaded} timeout={1000}>
        <Box sx={{ backgroundColor: "#FFFFFF", borderRadius: "16px", border: "1px solid #C3C3C3", height: "90%", width: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <Grid container sx={{ flex: 1 }}>
            <Grid item xs={4} sx={{ borderRadius: "16px 0 0 16px", overflow: "hidden", borderRight: "1px solid #E0E0E0" }}>
              {loading ? <SidebarSkeleton /> : <SideBar communities={filteredCommunities} socket={socket} currentChat={currentChat} setCurrentChat={setCurrentChat} Messages={Messages} setMessages={setMessages} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}
            </Grid>
            <Grid item xs={8} sx={{ display: "flex", borderRadius: "0 16px 16px 0", overflow: "hidden" }}>
              {loading ? <ChatSkeleton /> : <Chat currentChat={currentChat} socket={socket} setCurrentChat={setCurrentChat} setMessages={setMessages} Messages={Messages} />}
            </Grid>
          </Grid>
        </Box>
      </Fade>
    </Box>
  );
};

export default CommunityPage;



