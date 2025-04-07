import React, { useRef, useEffect, useState } from "react";
import { Box, Grid, Typography, IconButton, Button } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatLog = ({ socket, Messages, messagePagination, setMessagePagination, FetchMessages }) => {
  const student = getStudentDetails();
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState(Messages);
  const messagesEndRef = useRef(null);
  const messageRefs = useRef(new Map());
  const messageContainerRef = useRef(null);
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());
  const [isFetching, setIsFetching] = useState(false);
  const [isUserAtBottom, setIsUserAtBottom] = useState(true);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScroll = () => {
    if (messageContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
      setIsUserAtBottom(scrollTop + clientHeight >= scrollHeight - 10);
    }
  };

  useEffect(() => {
    if (isUserAtBottom) {
      scrollToBottom();
    }
  }, [Messages]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const messageId = entry.target.getAttribute("data-id");
            if (messageId && !readMessages.has(messageId)) {
              triggerMessageRead(messageId);
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
  }, [Messages, readMessages]);

  const triggerMessageRead = (messageId) => {
    if (!readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: student?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  const handleDeleteMessage = (messageId) => {
    socket.emit("deleteMessage", { messageId, userId: student?._id });
  };

  const handleLoadMore = async () => {
    if (messagePagination.currentPage < messagePagination.totalPages) {
      const chatContainer = messagesEndRef.current.parentElement;
      const scrollOffset = chatContainer.scrollHeight - chatContainer.scrollTop;

      setIsFetching(true);
      const nextPage = messagePagination.currentPage + 1;
      await FetchMessages(nextPage);
      setIsFetching(false);

      setTimeout(() => {
        chatContainer.scrollTop = chatContainer.scrollHeight - scrollOffset;
      }, 0);
    }
  };

  // Enhanced function to format date with "Today", "Yesterday", weekday names, or full date
  const formatMessageDate = (date) => {
    const messageDate = new Date(date);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    // Compare year, month, and day
    const isSameDay = (date1, date2) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };
    
    // Check if date is today
    if (isSameDay(messageDate, today)) {
      return "Today";
    }
    
    // Check if date is yesterday
    if (isSameDay(messageDate, yesterday)) {
      return "Yesterday";
    }
    
    // Check if date is within the last week (7 days)
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(today.getDate() - 6); // 6 days ago + today = 7 days total
    
    if (messageDate >= oneWeekAgo) {
      // Return day name
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[messageDate.getDay()];
    }
    
    // For older dates, return month, day, year
    return messageDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Group messages by date
  const groupMessagesByDate = () => {
    const groups = [];
    let currentDate = null;
    
    Messages?.forEach(msg => {
      const msgDate = formatMessageDate(msg.createdAt);
      
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({
          type: 'date',
          date: msgDate
        });
      }
      
      groups.push({
        type: 'message',
        message: msg
      });
    });
    
    return groups;
  };

  const groupedMessages = groupMessagesByDate();

  return (
    <Box
      ref={messageContainerRef}
      onScroll={handleScroll}
      sx={{
        height: "100vh",
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
      {messagePagination?.currentPage < messagePagination?.totalPages && (
        <Box
          sx={{
            textAlign: "center",
            marginBottom: "10px",
          }}
        >
          <Button
            onClick={handleLoadMore}
            variant="contained"
            disabled={isFetching}
            sx={{
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              "&:hover": {
                backgroundColor: "rgba(0, 0, 0, 0.9)",
              },
            }}
          >
            {isFetching ? "Loading..." : "Load More Messages"}
          </Button>
        </Box>
      )}

      {groupedMessages.map((item, index) => (
        item.type === 'date' ? (
          // Date divider
          <Box 
            key={`date-${index}`} 
            sx={{ 
              textAlign: 'center', 
              margin: '10px 0',
            }}
          >
            <Typography
              sx={{
                display: 'inline-block',
                backgroundColor: 'rgba(225, 245, 254, 0.8)',
                borderRadius: '8px',
                padding: '4px 12px',
                fontSize: '12px',
                fontWeight: 500,
                color: '#455A64',
                boxShadow: '0 1px 1px rgba(0,0,0,0.1)'
              }}
            >
              {item.date}
            </Typography>
          </Box>
        ) : (
          // Message
          <Grid
            container
            key={item.message._id}
            justifyContent={
              item.message.sender === student?._id ? "flex-end" : "flex-start"
            }
            sx={{ marginBottom: "8px" }}
            data-id={item.message._id}
            ref={(el) => messageRefs.current.set(item.message._id, el)}
          >
            <Grid item xs={9} sm={7} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: item.message.sender === student?._id ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: item.message.sender === student?._id ? "#61C554" : "#E8ECEF",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    minWidth: "180px",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                  }}
                >
                  {item.message.sender !== student?._id && (
                    <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                      {item.message.sender_name}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: item.message.sender === student?._id ? "white" : "#000",
                      fontSize: "14px",
                      fontWeight: 400,
                    }}
                  >
                    {item.message.message}
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
                      {formatTime(item.message?.createdAt)}
                    </Typography>

                    {item.message.sender === student?._id &&
                      (item.message.status?.some((s) => s.delivered) ? (
                        item.message.status?.every((s) => s.read) ? (
                          <DoneAllIcon sx={{ color: "#0D6EFD", width: "16px" }} />
                        ) : (
                          <DoneAllIcon sx={{ color: "white", width: "16px" }} />
                        )
                      ) : (
                        <DoneIcon sx={{ color: "white", width: "16px" }} />
                      ))}

                    {item.message.sender === student?._id && (
                      <IconButton
                        onClick={() => handleDeleteMessage(item.message._id)}
                        sx={{ color: "white", padding: "2px", display: "none" }}
                      >
                        <DeleteIcon sx={{ fontSize: "16px" }} />
                      </IconButton>
                    )}
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        )
      ))}

      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatLog;