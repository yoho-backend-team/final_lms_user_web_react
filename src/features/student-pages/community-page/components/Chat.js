import React, { useState, useEffect } from "react";
import { Box, Typography, Card } from "@mui/material";
import ChatHeader from "./ChatHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChatLog from "./chatLogs";
import BottomBar from "./bottomBar";

const Chat = ({ currentChat, socket, setCurrentChat, Messages, setMessages }) => {

  useEffect(() => {
    const handleMessage = (message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket?.on("newMessage", handleMessage); // Ensure socket event name matches

    return () => {
      socket?.off("newMessage", handleMessage); // Corrected the event name here
    };
  }, [socket, setMessages]); // Make sure to include setMessages in the dependency array

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {currentChat ? (
        <Card
          sx={{
            height: "73vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
          }}
        >
          <ChatHeader currentChat={currentChat} />
          <Box sx={{ padding: "20px", flex: 1, overflowY: "auto" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#FEECDC",
                  display: "none", // Consider changing this to "block" if you want to show it
                  width: "482px",
                  px: "24px",
                  py: "12px",
                  gap: "10px",
                  borderRadius: "12px",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#312E40" }} />
                <Typography sx={{ fontSize: "10px", fontWeight: 400 }}>
                  Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp can read or listen to them. Click to learn more.
                </Typography>
              </Box>
            </Box>
            <ChatLog socket={socket} Messages={Messages} />
          </Box>
          <Box sx={{ padding: "10px" }}>
            <BottomBar socket={socket} community={currentChat} />
          </Box>
        </Card>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              color: "#747474",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Click chat to send and see messages
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Chat;
