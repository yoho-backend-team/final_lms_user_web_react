import React, { useEffect } from "react";
import { Box, Typography, Card, Grid, useTheme, useMediaQuery } from "@mui/material";
import ChatHeader from "./ChatHeader";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ChatLog from "./chatLogs";
import BottomBar from "./bottomBar";

const Chat = ({ currentChat, socket, Messages, setMessages }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

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
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isSmallScreen ? "10px" : "20px",
      }}
    >
      {currentChat ? (
        <Card
          sx={{
            height: "73vh",
            width: "100%",
            maxWidth: isSmallScreen ? "100%" : "600px",
            display: "flex",
            flexDirection: "column",
            boxShadow: "none",
            borderRadius: isSmallScreen ? "8px" : "12px",
            overflow: "hidden",
          }}
        >
          <ChatHeader currentChat={currentChat} />
          <Box
            sx={{
              padding: isSmallScreen ? "10px" : "20px",
              flex: 1,
              overflowY: "auto",
            }}
          >
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
                  display: "flex",
                  width: isSmallScreen ? "100%" : "482px",
                  px: isSmallScreen ? "16px" : "24px",
                  py: "12px",
                  gap: "10px",
                  borderRadius: "12px",
                }}
              >
                <LockOutlinedIcon sx={{ color: "#312E40" }} />
                <Typography
                  sx={{
                    fontSize: isSmallScreen ? "8px" : "10px",
                    fontWeight: 400,
                  }}
                >
                  Messages are end-to-end encrypted. No one outside of this chat, not even WhatsApp can read or listen to them. Click to learn more.
                </Typography>
              </Box>
            </Box>
            <ChatLog socket={socket} Messages={Messages} />
          </Box>
          <Box sx={{ padding: isSmallScreen ? "8px" : "10px" }}>
            <BottomBar socket={socket} community={currentChat} />
          </Box>
        </Card>
      ) : (
        <Grid xs={12} item>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              textAlign: "center",
              padding: isSmallScreen ? "20px" : "40px",
            }}
          >
            <Typography
              sx={{
                color: "#747474",
                fontSize: isSmallScreen ? "12px" : "14px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
          
            </Typography>
          </Box>
        </Grid>
      )}
    </Box>
  );
};

export default Chat;
