import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatRef = useRef(null);
  const messageRefs = useRef(new Map());
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());

  console.log(instructor,Messages)

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
      if (ref instanceof Element) {
        observer.observe(ref);
      }
    });
  
    return () => {
      observer.disconnect();
    };
  }, [Messages, isWindowFocused, readMessages]);
  

  const triggerMessageRead = (messageId) => {
    const msg = Messages.find((m) => m._id === messageId);

    if (msg && !readMessages.has(messageId)) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      console.log(formattedTime, messageId, msg);
      socket.emit("messageRead",{ messageId: messageId, userId: instructor?._id})
      setReadMessages((prevReadMessages) => new Set([...prevReadMessages, messageId]));
    }
  };

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  

  return (
    <Box
      sx={{
        padding: "16px",
        height: "100%",
        overflowY: "auto",
        backgroundImage: "url('https://w0.peakpx.com/wallpaper/557/521/HD-wallpaper-whatsapp-v-background-doodle-pattern-patterns-whatsapp-thumbnail.jpg')", // Add wallpaper image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {Messages?.map((msg) => (
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
                    justifyContent: "flex-end",
                    marginTop: "-3px"
                  }}
                >
                   {msg?.sender === instructor?._id && msg?.status?.some(s => s.delivered) && !msg?.status?.every(s => s.delivered) && (
                     <DoneIcon sx={{ color: "white", width: "17px", height: "17px" }} />
                   )}
                 
                   {msg?.sender === instructor?._id && msg?.status?.every(s => s.delivered) && !msg?.status?.every(s => s.read) && (
                     <DoneAllIcon sx={{  color: "white", width: "17px", height: "17px" }} />
                   )}
                 
                   { msg?.sender === instructor?._id && msg?.status?.every(s => s.read) && (
                     <DoneAllIcon sx={{ color: "#0D6EFD", width: "17px", height: "17px" }} />
                   )}
                </Typography>
              </Box>
              <Box sx={{ marginTop: "5px"}} >
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
