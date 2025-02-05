import React, { useState,useEffect } from "react";
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
import ChatGroupDetails from "./Models/Chatgroupdetails";

const Chat = ({ currentChat, socket, Messages, setMessages }) => {
  const theme = useTheme();
  const [viewGroup, setViewGroup] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        height: "76vh",
        display: "flex",
        flexDirection: "column",
       
        
      }}
    >
          {viewGroup ? (
        <ChatGroupDetails 
          currentChat={currentChat} 
          setViewGroup={setViewGroup} 
        />
      ) : (
      
        currentChat ? (
        <Card
          sx={{
            height: "99%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            
            borderRadius: "20px",  // Curved edges for the main card
            overflow: "hidden",
          }}
        >
          {/* Chat Header */}
          <ChatHeader 
              currentChat={currentChat} 
              onViewGroup={setViewGroup} 
            />

          {/* Message Log */}
          <Box
            sx={{
              
              
              flex: 1,
             
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10
            
            }}
          >
           {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "0px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FEECDC",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  maxWidth: "480px",
                  textAlign: "center",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#312E40" }} />
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#312E40",
                    fontWeight: 400,
                  }}
                >
                  Messages are end-to-end encrypted. No one outside of this
                  chat, not even WhatsApp, can read or listen to them.
                </Typography>
              </Box>
            </Box>*/}
            <ChatLog socket={socket} Messages={Messages} />
          </Box>

          {/* Bottom Bar */}
          <Box
            sx={{
              padding: "8px",
              borderTop: "1px solid #ddd",
              backgroundColor: "#FFFFFF", // Bottom bar background color
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
            ml:"10px"
          }}
        >

<Box
    sx={{
      display: "flex",
      flexDirection: "column", // Stack image and text vertically
      alignItems: "center", // Keep the image and text centered
    }}
  >

            <img
              src="data:image/png;base64,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"
              alt="No Chat Selected"
            />
            <Typography
      sx={{
        color:"blue",
        fontSize: "14px",
        fontWeight: 500,
        lineHeight: "24px",
        ml: "20px", // Add margin only for the text
      }}
    >
      Send and receive messages here...
    </Typography>
  </Box>
  </Box>
      )
)}
  </Box>

  );
};

export default Chat;
