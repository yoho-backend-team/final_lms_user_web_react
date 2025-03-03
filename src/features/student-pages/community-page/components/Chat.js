import React, { useEffect } from "react";
import { Box, Typography, Card, useMediaQuery } from "@mui/material";
import ChatHeader from "./ChatHeader";
import ChatLog from "./chatLogs";
import BottomBar from "./bottomBar";

const Chat = ({ currentChat, socket, setCurrentChat, Messages, setMessages }) => {
  const isTablet = useMediaQuery("(max-width: 768px)"); 

  useEffect(() => {
    // Handle incoming messages
    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    // Ensure socket is initialized and listen for new messages
    if (socket) {
      socket.on("newMessage", handleMessage);
    }

    // Cleanup function to remove the listener
    return () => {
      if (socket) {
        socket.off("newMessage", handleMessage);
      }
    };
  }, [socket, setMessages]);

  // Function to send a message
  const sendMessage = (messageContent) => {
    if (socket && currentChat) {
      const message = {
        content: messageContent,
        chatId: currentChat.id,
        senderId: socket.id, 
        timestamp: new Date().toISOString(),
      };
      socket.emit("sendMessage", message); 
      setMessages((prev) => [...prev, message]); 
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
      }}
    >
      {currentChat ? (
        <Card
          sx={{
            height: "78vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            borderRadius: "8px", 
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Chat Header */}
          <ChatHeader currentChat={currentChat} />

          {/* Chat Log Section */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {/* Chat Log */}
            <ChatLog socket={socket} Messages={Messages} />
          </Box>

          {/* Bottom Bar for Sending Messages */}
          <Box
            sx={{
              paddingBottom: "1px",
              borderTop: "1px solid #E0E0E0",
            }}
          >
            <BottomBar socket={socket} community={currentChat} sendMessage={sendMessage} />
          </Box>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            gap: "16px",
            padding: "1px",
          }}
        >
          {/* Placeholder when no chat is selected */}
          <Box
            component="img"
            src="https://cdn-icons-png.flaticon.com/512/9388/9388030.png"
            alt="Group Chat Logo"
            sx={{
              width: isTablet ? "100px" : "120px", 
              height: isTablet ? "100px" : "120px", 
              borderRadius: "50%",
            }}
          />
          <Typography
            sx={{
              color: "#747474",
              fontSize: isTablet ? "14px" : "16px", 
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