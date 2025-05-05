import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography, Menu, MenuItem } from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messageRefs = useRef(new Map());
  const [messages, setMessages] = useState(Messages || []);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

  // Handle window focus
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

  // Observe visibility to mark as read
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && isWindowFocused) {
            const messageId = entry.target.getAttribute("data-id");
            if (!readMessages.has(messageId)) {
              setTimeout(() => {
                if (entry.isIntersecting && isWindowFocused) {
                  triggerMessageRead(messageId);
                }
              }, 1500);
            }
          }
        });
      },
      { threshold: 0.8 }
    );

    messageRefs.current.forEach((ref) => {
      if (ref instanceof Element) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [messages, isWindowFocused, readMessages]);

  // Trigger message read
  const triggerMessageRead = (messageId) => {
    const msg = messages.find((m) => m._id === messageId);
    if (msg && !readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: instructor?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  // Scroll to bottom
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update messages from props
  useEffect(() => {
    setMessages(Messages);
    scrollToBottom();
  }, [Messages]);

  // Listen for message deletion
  useEffect(() => {
    socket.on("messageDeleted", (updatedMessages) => {
      setMessages(updatedMessages);
    });

    return () => {
      socket.off("messageDeleted");
    };
  }, [socket]);

  // Listen for new message being received
  useEffect(() => {
    socket.on("messageSent", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.off("messageSent");
    };
  }, [socket]);

  // Handle message menu
  const handleOpenMenu = (event, messageId, senderId) => {
    if (String(senderId) !== String(instructor?._id)) return;
    setAnchorEl(event.currentTarget);
    setSelectedMessage(messageId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessage = () => {
    if (selectedMessage) {
      socket.emit("deleteMessage", { messageId: selectedMessage, userId: instructor?._id });
      setMessages((prev) => prev.filter((msg) => msg._id !== selectedMessage));
    }
    handleCloseMenu();
  };

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
        Messages are end-to-end encrypted. No one outside of this chat can read or listen to them.
      </Box>

      {messages.map((msg) => {
        const isUser = String(msg.sender) === String(instructor?._id);
        return (
          <Grid
            container
            key={msg._id}
            justifyContent={isUser ? "flex-end" : "flex-start"}
            sx={{ marginBottom: "8px" }}
            ref={(el) => messageRefs.current.set(msg._id, el)}
          >
            <Grid item xs={8} sm={7} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isUser ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  data-id={msg._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: isUser ? "#61C554" : "#E8ECEF",
                    borderRadius: "10px",
                    padding: "10px 15px",
                    minWidth: "200px",
                    cursor: isUser ? "pointer" : "default",
                  }}
                  onClick={(event) => handleOpenMenu(event, msg._id, msg.sender)}
                >
                  {!isUser && (
                    <Typography sx={{ fontSize: "10px", alignSelf: "start" }}>
                      {msg.sender_name}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      wordBreak: "break-word",
                      color: isUser ? "white" : "#000000",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {msg.message}
                  </Typography>
                  <Typography sx={{ textAlign: "end", fontSize: "11px", marginTop: "3px" }}>
                    {formatTime(msg?.createdAt)}
                  </Typography>

                  {isUser &&
                    (msg.status?.some((s) => s.delivered) ? (
                      msg.status?.every((s) => s.read) ? (
                        <DoneAllIcon sx={{ color: "#0D6EFD", width: "16px" }} />
                      ) : (
                        <DoneAllIcon sx={{ color: "white", width: "16px" }} />
                      )
                    ) : (
                      <DoneIcon sx={{ color: "white", width: "16px" }} />
                    ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        );
      })}

      <div ref={messagesEndRef} />

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMessage}>Delete Message</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatLog;
