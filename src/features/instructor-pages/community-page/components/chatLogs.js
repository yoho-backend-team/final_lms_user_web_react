import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatRef = useRef(null);
  const messageRefs = useRef(new Map());
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());
  const [messages, setMessages] = useState(Messages);

  useEffect(() => {
    setMessages(Messages);
  }, [Messages]);

  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    socket.on("messageDeleted", (updatedMessages) => {
      setMessages(updatedMessages); 
    });
    return () => {
      socket.off("messageDeleted");
    };
  }, [socket]);

  const handleDeleteMessage = (messageId) => {
    console.log("Delete clicked for message:", messageId); 
    socket.emit("deleteMessage", { messageId, userId: instructor?._id });

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.filter(
        (message) => message._id !== messageId
      );
      console.log("Updated messages after delete:", updatedMessages); 
      return updatedMessages;
    });
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <Box
      sx={{
        height: "200vh",
        overflowY: "auto",
        backgroundImage:
          "url('https://i.pinimg.com/originals/62/8a/06/628a064e53d4d2afa7ef36075e98f1b1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "transparent",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "15px",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          padding: "5px 10px",
          borderRadius: "6px",
          color: "white",
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "90%",
          margin: "10px auto",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: "16px", marginRight: "6px" }} />
        Messages are end-to-end encrypted. No one outside of this chat, not even
        WhatsApp, can read or listen to them.
      </Box>

      {messages?.map((msg) => (
        <Grid
          container
          key={msg._id}
          data-id={msg._id}
          justifyContent={
            msg.sender === instructor?._id ? "flex-end" : "flex-start"
          }
          sx={{ marginBottom: "8px" }}
          ref={(el) => messageRefs.current.set(msg._id, el)}
        >
          <Grid item xs={8} sm={7} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === instructor?._id ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: msg.sender === instructor?._id ? "#61C554" : "#E8ECEF",
                  borderRadius: "10px",
                  padding: msg.sender === instructor?._id ? "10px 15px" : "4px 15px",
                  minWidth: "200px",
                }}
              >
                {msg?.sender !== instructor?._id && (
                  <Typography sx={{ fontSize: "10px", alignSelf: "start" }}>
                    {msg.sender_name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                    color: msg.sender === instructor?._id ? "white" : "#000000",
                    fontSize: "14px",
                    fontWeight: 400,
                    textAlign: msg.sender === instructor?._id ? "left" : "start",
                  }}
                >
                  {msg.message}
                </Typography>
                <Typography
                  sx={{
                    textAlign: msg?.sender === instructor?._id ? "end" : "end",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "-3px",
                  }}
                >
                  {msg?.sender === instructor?._id && msg?.status?.some((s) => s.delivered) &&
                    !msg?.status?.every((s) => s.delivered) && (
                      <DoneIcon
                        sx={{ color: "white", width: "17px", height: "17px" }}
                      />
                    )}

                  {msg?.sender === instructor?._id &&
                    msg?.status?.every((s) => s.delivered) &&
                    !msg?.status?.every((s) => s.read) && (
                      <DoneAllIcon
                        sx={{ color: "white", width: "17px", height: "17px" }}
                      />
                    )}

                  {msg?.sender === instructor?._id &&
                    msg?.status?.every((s) => s.read) && (
                      <DoneAllIcon
                        sx={{ color: "#0D6EFD", width: "17px", height: "17px" }}
                      />
                    )}

                  {msg.sender === instructor?._id && (
                    <DeleteIcon
                      onClick={() => handleDeleteMessage(msg._id)}
                      sx={{ color: "white", cursor: "pointer", marginLeft: "10px" }}
                    />
                  )}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "5px" }}>
                <Typography
                  sx={{
                    color: msg.sender === instructor?._id ? "white" : "#727272",
                    fontSize: "11px",
                    fontWeight: 500,
                    textAlign: "end",
                    marginTop: "auto",
                  }}
                >
                  {formatTime(msg?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
      <div ref={chatRef} />
    </Box>
  );
};

export default ChatLog;
