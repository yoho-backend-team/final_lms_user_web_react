import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import ChatHeader from "./ChatHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChatLog from "./chatLogs";
import BottomBar from "./bottomBar";
import GroupDetails from "./Models/GroupDetails";

const Chat = ({ currentChat, socket, Messages, setMessages }) => {
  const theme = useTheme();
  const [viewGroup, setViewGroup] = useState(false);


  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("newMessage", handleMessage);

    return () => {
      socket.off("newMessage", handleMessage);
    };
  }, [socket, setMessages]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "80vh",
        
        display: "flex",
       
        flexDirection: "column",
      }}
    >
      {viewGroup ? (
        <GroupDetails currentChat={currentChat} setViewGroup={setViewGroup} />
      ) : currentChat ? (
        <Card
          sx={{
            height: "99%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            borderRadius: "20px", 
            overflow: "hidden",
          }}
        >
         
          <ChatHeader currentChat={currentChat} onViewGroup={setViewGroup} />

          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <ChatLog socket={socket} Messages={Messages} />
          </Box>

          <Box
            sx={{
              padding: "8px",
              borderTop: "1px solid #ddd",
              backgroundColor: "#FFFFFF", 
            }}
          >
            <BottomBar socket={socket} community={currentChat} />
          </Box>
        </Card>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            
            ml: "10px",
          }}
        >
         
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/9388/9388030.png"
            alt="Group Chat Logo"
            sx={{
              width: isTablet ? "100px" : "120px", // Adjust size for tablets
              height: isTablet ? "100px" : "120px", // Adjust size for tablets
              borderRadius: "50%",
            }}
          />
         
          
          <Typography
            sx={{
              color: "#747474",
              fontSize: isTablet ? "14px" : "16px", // Adjust font size for tablets
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Select a chat to start messaging.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
