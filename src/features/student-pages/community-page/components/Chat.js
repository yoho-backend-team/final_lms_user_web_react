import React, { useState, useEffect } from "react";
import { Box, Typography, Card, useMediaQuery } from "@mui/material";
import ChatHeader from "./ChatHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChatLog from "./chatLogs";
import BottomBar from "./bottomBar";

const Chat = ({ currentChat, socket, setCurrentChat, Messages, setMessages }) => {
  const isTablet = useMediaQuery("(max-width: 768px)"); // Check for tablet screen size

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket?.on("newMessage", handleMessage);

    return () => {
      socket?.off("newMessage", handleMessage);
    };
  }, [socket, setMessages]);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F6F6F6",
        padding: isTablet ? "10px" : "20px", // Adjust padding for tablets
      }}
    >
      {currentChat ? (
        <Card
          sx={{
            height: { xs: "85vh", md: "73vh" }, // Responsive height
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            borderRadius: "8px", // Modern rounded design
            backgroundColor: "#FFFFFF",
          }}
        >
          {/* Chat Header */}
          <ChatHeader currentChat={currentChat} />

          {/* Chat Log Section */}
          <Box
            sx={{
              flex: 1,
              padding: isTablet ? "10px" : "20px", // Adjust padding for tablets
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: isTablet ? "12px" : "20px", // Reduce gap for tablets
            }}
          >
            {/* Info Box for Encryption */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FEECDC",
                  display: { xs: "none", md: "flex" }, // Hide on extra-small screens
                  width: "100%",
                  maxWidth: "482px",
                  padding: isTablet ? "8px 16px" : "12px 24px", // Adjust padding
                  gap: "10px",
                  borderRadius: "12px",
                  alignItems: "center",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#312E40" }} />
                <Typography
                  sx={{
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "#312E40",
                  }}
                >
                  Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp, can read or listen
                  to them. Click to learn more.
                </Typography>
              </Box>
            </Box>

            {/* Chat Log */}
            <ChatLog socket={socket} Messages={Messages} />
          </Box>

          {/* Bottom Bar for Sending Messages */}
          <Box
            sx={{
              padding: isTablet ? "8px" : "10px", // Adjust padding for tablets
              borderTop: "1px solid #E0E0E0",
            }}
          >
            <BottomBar socket={socket} community={currentChat} />
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
            padding: "20px",
          }}
        >
          {/* Placeholder when no chat is selected */}
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
