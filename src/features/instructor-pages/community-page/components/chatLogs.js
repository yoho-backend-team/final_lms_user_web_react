import React, { useRef, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";

const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  return (
    <Box sx={{ padding: "16px", height: "100%", overflowY: "auto" }}>
      {Messages?.map((msg) => (
        <>
        <Grid
          container
          key={msg.id}
          justifyContent={
            msg.sender === instructor?._id ? "flex-end" : "flex-start"
          }
          sx={{ marginBottom: "8px" }}
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
                    color:  msg.sender === instructor?._id ? "white" : "#727272",
                    fontSize: "11px",
                    fontWeight: 500,
                    textAlign: msg.sender === instructor?._id ? "end" : "end",
                    marginTop: "auto",
                  }}
                >
                  {formatTime(msg?.createdAt)}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        </>
      ))}
      <div ref={chatRef} />
    </Box>
  );
};

export default ChatLog;
