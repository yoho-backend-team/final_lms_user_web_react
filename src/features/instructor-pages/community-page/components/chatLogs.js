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
  const messageRefs = useRef(new Map());
  const [messages, setMessages] = useState(Messages);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    setMessages(Messages);
  }, [Messages]);

  useEffect(() => {
    socket.on("messageDeleted", (updatedMessages) => {
      setMessages(updatedMessages);
    });
    return () => {
      socket.off("messageDeleted");
    };
  }, [socket]);

  const handleOpenMenu = (event, messageId, senderId) => {
    // Only show delete option for messages sent by the instructor
    if (senderId !== instructor?._id) {
      return;
    }
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
      setMessages((prevMessages) => prevMessages.filter((msg) => msg._id !== selectedMessage));
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

      {messages?.map((msg) => (
        <Grid
          container
          key={msg._id}
          justifyContent={msg.sender === instructor?._id ? "flex-end" : "flex-start"}
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
                  padding: "10px 15px",
                  minWidth: "200px",
                  cursor: "pointer",
                }}
                onClick={(event) => handleOpenMenu(event, msg._id, msg.sender)}
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
                  }}
                >
                  {msg.message}
                </Typography>
                <Typography sx={{ textAlign: "end", fontSize: "11px", marginTop: "3px" }}>
                  {formatTime(msg?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      ))}
      
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMessage}>Delete Message</MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatLog;

