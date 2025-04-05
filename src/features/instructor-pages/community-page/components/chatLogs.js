import React, { useRef, useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import { 
  Box, 
  Grid, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem 
} from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

/**
 * ChatLog component for displaying paginated messages with encryption banner and design
 * @param {Object} props - Component props
 * @param {Object} props.socket - Socket connection for real-time updates
 * @param {Array} props.Messages - Array of message objects
 */
const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const messageRefs = useRef(new Map());
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [hasMoreNewer, setHasMoreNewer] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isWindowFocused, setIsWindowFocused] = useState(document.hasFocus());
  const [readMessages, setReadMessages] = useState(new Set());
  const messagesPerPage = 5;

  // Process and validate messages
  const processMessages = useCallback((messageList) => {
    if (!messageList || messageList.length === 0) return [];
    
    return messageList.map(msg => ({
      ...msg,
      message: msg.message || "Empty message",
      sender_name: msg.sender_name || "Unknown",
      createdAt: msg.createdAt || new Date().toISOString()
    }));
  }, []);

  // Format message date function with enhanced relative date display
  const formatMessageDate = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    
    // Reset hours to compare just the dates
    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const messageDateOnly = new Date(messageDate.getFullYear(), messageDate.getMonth(), messageDate.getDate());
    
    // Calculate difference in days
    const diffTime = todayDate.getTime() - messageDateOnly.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return "Today";
    } else if (diffDays === 1) {
      return "Yesterday";
    } else if (diffDays > 1 && diffDays <= 7) {
      // Show day of week for messages within the past week
      return messageDate.toLocaleDateString('en-US', { weekday: 'long' });
    } else {
      // For older messages, show the month, day and year
      return messageDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    }
  };

  // Group messages by date
  const groupMessagesByDate = useCallback((messages) => {
    const groups = [];
    let currentDate = null;
    
    messages?.forEach(msg => {
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
  }, []);

  // Initial message setup
  useEffect(() => {
    if (!Messages || Messages.length === 0) {
      setAllMessages([]);
      setDisplayedMessages([]);
      setHasMoreOlder(false);
      setHasMoreNewer(false);
      return;
    }
    
    const validatedMessages = processMessages(Messages);
    setAllMessages(validatedMessages);
    
    const totalPages = Math.ceil(validatedMessages.length / messagesPerPage);
    const lastPageIndex = Math.max(0, totalPages - 1);
    const startIdx = lastPageIndex * messagesPerPage;
    const endIdx = validatedMessages.length;
    
    setDisplayedMessages(validatedMessages.slice(startIdx, endIdx));
    setCurrentPageIndex(lastPageIndex);
    setHasMoreOlder(lastPageIndex > 0);
    setHasMoreNewer(false);
    
    setInitialLoadComplete(false);
    setTimeout(() => {
      setInitialLoadComplete(true);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [Messages, processMessages]);

  // Window focus detection for message read tracking
  useEffect(() => {
    const handleFocus = () => setIsWindowFocused(true);
    const handleBlur = () => setIsWindowFocused(false);
    
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // Scroll to bottom when new messages are added
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [displayedMessages]);

  // Load older messages
  const loadOlderMessages = useCallback(() => {
    if (!hasMoreOlder || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    const container = chatContainerRef.current;
    const initialScrollHeight = container ? container.scrollHeight : 0;
    
    const prevPageIndex = currentPageIndex - 1;
    const startIdx = prevPageIndex * messagesPerPage;
    const endIdx = currentPageIndex * messagesPerPage;
    
    setTimeout(() => {
      const olderMessages = allMessages.slice(startIdx, endIdx);
      const updatedMessages = [...olderMessages, ...displayedMessages];
      
      setDisplayedMessages(updatedMessages);
      setCurrentPageIndex(prevPageIndex);
      setHasMoreOlder(prevPageIndex > 0);
      setHasMoreNewer(true);
      
      setTimeout(() => {
        if (container) {
          const newScrollHeight = container.scrollHeight;
          const scrollHeightDiff = newScrollHeight - initialScrollHeight;
          container.scrollTop = scrollHeightDiff;
        }
        
        setIsLoadingMore(false);
      }, 50);
    }, 300);
  }, [allMessages, currentPageIndex, displayedMessages, hasMoreOlder, isLoadingMore]);

  // Handle message read status
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
  }, [displayedMessages, isWindowFocused, readMessages]);

  const triggerMessageRead = (messageId) => {
    const msg = allMessages.find((m) => m._id === messageId);
    if (msg && !readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: instructor?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  };

  // Delete message handler
  const handleDeleteMessage = useCallback((messageId) => {
    if (!socket || !messageId) return;
    
    const updatedAllMessages = allMessages.filter(message => message._id !== messageId);
    setAllMessages(updatedAllMessages);
    
    const updatedDisplayed = displayedMessages.filter(message => message._id !== messageId);
    setDisplayedMessages(updatedDisplayed);
    
    socket.emit("deleteMessage", { 
      messageId, 
      userId: instructor?._id 
    });
    
    const totalPages = Math.ceil(updatedAllMessages.length / messagesPerPage);
    setHasMoreOlder(currentPageIndex > 0);
    setHasMoreNewer(currentPageIndex < totalPages - 1);
  }, [socket, allMessages, displayedMessages, currentPageIndex, instructor?._id]);

  const handleOpenMenu = (event, messageId) => {
    setAnchorEl(event.currentTarget);
    setSelectedMessage(messageId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedMessage(null);
  };

  const handleDeleteMessageFromMenu = () => {
    if (selectedMessage) {
      handleDeleteMessage(selectedMessage);
    }
    handleCloseMenu();
  };

  // Group the displayed messages by date
  const groupedMessages = groupMessagesByDate(displayedMessages);

  return (
    <Box
      ref={chatContainerRef}
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
      {/* <Box
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
      </Box> */}

      {hasMoreOlder && (
        <Box 
          sx={{ 
            display: "flex", 
            justifyContent: "center", 
            mb: 2 
          }}
        >
          <Typography 
            variant="button"
            onClick={loadOlderMessages}
            sx={{ 
              cursor: "pointer",
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "white",
              padding: "8px 16px",
              borderRadius: "16px"
            }}
          >
            {isLoadingMore ? "Loading..." : "Load Older Messages"}
          </Typography>
        </Box>
      )}

      {groupedMessages.map((item, index) => (
        item.type === 'date' ? (
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
          <Grid
            container
            key={item.message._id}
            justifyContent={item.message.sender === instructor?._id ? "flex-end" : "flex-start"}
            sx={{ marginBottom: "8px" }}
            ref={(el) => messageRefs.current.set(item.message._id, el)}
          >
            <Grid item xs={9} sm={7} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: item.message.sender === instructor?._id ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: item.message.sender === instructor?._id ? "#61C554" : "#E8ECEF",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    minWidth: "180px",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                  }}
                  data-id={item.message._id}
                  onClick={(event) => handleOpenMenu(event, item.message._id)}
                >
                  {item.message.sender !== instructor?._id && (
                    <Typography sx={{ fontSize: "10px", fontWeight: 600 }}>
                      {item.message.sender_name}
                    </Typography>
                  )}
                  <Typography
                    variant="body1"
                    sx={{
                      color: item.message.sender === instructor?._id ? "white" : "#000",
                      fontSize: "14px",
                      fontWeight: 400,
                      textAlign: "left",
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

                    {item.message.sender === instructor?._id &&
                      (item.message.status?.some((s) => s.delivered) ? (
                        item.message.status?.every((s) => s.read) ? (
                          <DoneAllIcon sx={{ color: "#0D6EFD", width: "16px" }} />
                        ) : (
                          <DoneAllIcon sx={{ color: "white", width: "16px" }} />
                        )
                      ) : (
                        <DoneIcon sx={{ color: "white", width: "16px" }} />
                      ))}

                    {item.message.sender === instructor?._id && (
                      <IconButton
                        onClick={() => handleDeleteMessage(item.message._id)}
                        sx={{ color: "white", padding: "2px" }}
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

      {displayedMessages.length === 0 && (
        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body1" sx={{ color: "white" }}>
            No messages yet. Start the conversation!
          </Typography>
        </Box>
      )}

      <div ref={chatEndRef} />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleCloseMenu}>
        <MenuItem onClick={handleDeleteMessageFromMenu}>Delete Message</MenuItem>
      </Menu>
    </Box>
  );
};

// PropTypes for type checking
ChatLog.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    emit: PropTypes.func.isRequired
  }),
  Messages: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sender: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  })).isRequired
};

export default ChatLog;