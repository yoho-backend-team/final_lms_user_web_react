import { Box, Grid } from "@mui/material";
import { JavaCourseImage, SqlCourseImage } from "utils/images";
import SideBar from "features/instructor-pages/community-page/components/Sidebar";
import Chat from "features/instructor-pages/community-page/components/Chat";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorCommunities } from "features/instructor-pages/community-page/redux/selectors";
import getandAddCommunity from "features/instructor-pages/community-page/redux/thunks";
import { io } from "socket.io-client";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { useSocket } from "context/instructorSocket";

const Community = () => {
  const dispatch = useDispatch();
  const communities = useSelector(selectInstructorCommunities);
  const [currentChat, setCurrentChat] = useState(null);
  const [Messages, setMessages] = useState([]);
  const { showSpinner, hideSpinner} = useSpinner()
  const socket = useSocket()

  const getAllCommunities = () => {
    try{
      showSpinner()
      dispatch(getandAddCommunity());
    }catch(error){
      toast.error(error?.message)
    }finally{
      hideSpinner()
    }
  };

  useEffect(() => {
    getAllCommunities();
  }, [dispatch]);


  
  return (
    <>
    <Box
      sx={{
        height: "85vh",
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
          <Grid item xs={4}>
            <SideBar
              communities={communities}
              socket={socket}
              currentChat={currentChat}
              setCurrentChat={setCurrentChat}
              Messages = { Messages}
              setMessages ={ setMessages}
            />
          </Grid>
          <Grid item xs={8} sx={{ display: "flex" }}>
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
