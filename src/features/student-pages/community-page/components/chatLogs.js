import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatLog = ({ socket, Messages }) => {
  const student = getStudentDetails();
  const chatEndRef = useRef(null);
  const messageRefs = useRef({});
  const [messages, setMessages] = useState(Messages);
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const messageId = entry.target.getAttribute("data-id");
          if (entry.isIntersecting && isWindowFocused && messageId && !readMessages.has(messageId)) {
            setTimeout(() => {
              if (entry.isIntersecting && isWindowFocused) {
                triggerMessageRead(messageId);
              }
            }, 1500);
          }
        });
      },
      { threshold: 0.8 }
    );

    Object.values(messageRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [Messages, isWindowFocused, readMessages]);

  const triggerMessageRead = (messageId) => {
    const msg = Messages.find((m) => m._id === messageId);
    if (msg && !readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: student?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  useEffect(() => {
    setMessages(Messages);
  }, [Messages]);

  useEffect(() => {
    const handleDeleteMessage = (updatedMessages) => {
      setMessages(updatedMessages);
    };

    socket.on("messageDeleted", handleDeleteMessage);
    return () => {
      socket.off("messageDeleted", handleDeleteMessage);
    };
  }, [socket]);

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", { messageId, userId: student?._id });
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message._id !== messageId)
    );
  };

  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        backgroundImage:
          "url('https://i.pinimg.com/originals/62/8a/06/628a064e53d4d2afa7ef36075e98f1b1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {/* Banner */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          padding: "6px 12px",
          borderRadius: "15px",
          color: "white",
          textAlign: "center",
          fontSize: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "80%",
          margin: "10px auto",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <LockOutlinedIcon sx={{ fontSize: "16px", marginRight: "6px" }} />
        Messages are end-to-end encrypted. No one outside this chat can read them.
      </Box>

      {/* Messages */}
      {messages?.map((msg) => (
        <Grid
          container
          key={msg._id}
          data-id={msg._id}
          ref={(el) => (messageRefs.current[msg._id] = el)}
          justifyContent={msg.sender === student?._id ? "flex-end" : "flex-start"}
        >
          <Grid item xs={9} sm={7} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: msg.sender === student?._id ? "flex-end" : "flex-start",
              }}
            >
              <Box
                sx={{
                  backgroundColor: msg.sender === student?._id ? "#61C554" : "#E8ECEF",
                  borderRadius: "10px",
                  padding: "8px 12px",
                  minWidth: "180px",
                  maxWidth: "100%",
                  wordWrap: "break-word",
                }}
              >
                {msg.sender !== student?._id && (
                  <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                    {msg.sender_name}
                  </Typography>
                )}
                <Typography
                  variant="body1"
                  sx={{
                    color: msg.sender === student?._id ? "white" : "#000",
                    fontSize: "14px",
                    fontWeight: 400,
                  }}
                >
                  {msg.message}
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "4px",
                  }}
                >
                  <Typography sx={{ fontSize: "11px", color: "#727272" }}>
                    {formatTime(msg?.createdAt)}
                  </Typography>

                  {msg.sender === student?._id && (
                    <>
                      {msg.status?.some((s) => s.delivered) ? (
                        msg.status?.every((s) => s.read) ? (
                          <DoneAllIcon sx={{ color: "#0D6EFD", width: "16px" }} />
                        ) : (
                          <DoneAllIcon sx={{ color: "white", width: "16px" }} />
                        )
                      ) : (
                        <DoneIcon sx={{ color: "white", width: "16px" }} />
                      )}

                      <IconButton
                        onClick={() => handleDeleteMessage(msg._id)}
                        sx={{ color: "white", padding: "2px" }}
                      >
                        <DeleteIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}

      {/* Scroll to bottom anchor */}
      <div ref={chatEndRef} />
    </Box>
  );
};

export default ChatLog;
