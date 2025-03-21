import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, Grid, Typography, IconButton, CircularProgress, Fade } from "@mui/material";
import { getInstructorDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

const ChatLog = ({ socket, Messages }) => {
  const instructor = getInstructorDetails();
  const chatContainerRef = useRef(null);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMoreOlder, setHasMoreOlder] = useState(true);
  const [hasMoreNewer, setHasMoreNewer] = useState(false);
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);
  const messagesPerPage = 12; // Increased from 8 for better user experience
  
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

  // Initial setup of messages
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
    const lastPageIndex = totalPages - 1;
    const startIdx = lastPageIndex * messagesPerPage;
    const endIdx = validatedMessages.length;
    
    setDisplayedMessages(validatedMessages.slice(startIdx, endIdx));
    setCurrentPageIndex(lastPageIndex);
    setHasMoreOlder(lastPageIndex > 0);
    setHasMoreNewer(false);
    
    setInitialLoadComplete(false);
    setTimeout(() => setInitialLoadComplete(true), 500);
  }, [Messages, processMessages]);

  // Scroll to bottom on initial load with a smooth animation
  useEffect(() => {
    if (displayedMessages.length > 0 && !hasMoreNewer && !initialLoadComplete) {
      const container = chatContainerRef.current;
      if (container) {
        setTimeout(() => {
          container.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth'
          });
          setInitialLoadComplete(true);
        }, 300);
      }
    }
  }, [displayedMessages, hasMoreNewer, initialLoadComplete]);

  // Socket event handler for deleted messages
  useEffect(() => {
    if (!socket) return;
    
    const handleDeleteMessage = (updatedMessages) => {
      if (!updatedMessages || !Array.isArray(updatedMessages)) {
        console.error("Received invalid message data:", updatedMessages);
        return;
      }
      
      const processedMessages = processMessages(updatedMessages);
      setAllMessages(processedMessages);
      
      // Recalculate current page after deletion
      const totalPages = Math.ceil(processedMessages.length / messagesPerPage);
      const validPageIndex = Math.min(currentPageIndex, Math.max(0, totalPages - 1));
      
      const startIdx = validPageIndex * messagesPerPage;
      const endIdx = Math.min(processedMessages.length, startIdx + messagesPerPage);
      
      setDisplayedMessages(processedMessages.slice(startIdx, endIdx));
      setCurrentPageIndex(validPageIndex);
      setHasMoreOlder(validPageIndex > 0);
      setHasMoreNewer(validPageIndex < totalPages - 1);
    };

    socket.on("messageDeleted", handleDeleteMessage);
    return () => {
      socket.off("messageDeleted", handleDeleteMessage);
    };
  }, [socket, currentPageIndex, processMessages]);

  // Improved scroll handling with debounce
  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container || isLoadingMore) return;

    let scrollTimeout;
    let isScrollingDown = false;
    let lastScrollTop = container.scrollTop;
    let scrollStartTime = 0;

    const handleScroll = () => {
      // Don't process scroll events during loading
      if (isLoadingMore) return;
      
      clearTimeout(scrollTimeout);
      
      const currentScrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      
      // Track scroll direction
      isScrollingDown = currentScrollTop > lastScrollTop;
      
      // Calculate scroll velocity for more natural loading
      const currentTime = Date.now();
      const timeDelta = currentTime - scrollStartTime;
      scrollStartTime = currentTime;
      
      // Debounce scroll event with higher threshold for smoother experience
      scrollTimeout = setTimeout(() => {
        // Check threshold based on scroll direction
        const topThreshold = isScrollingDown ? 100 : 60;
        const bottomThreshold = isScrollingDown ? 60 : 100;
        
        // Load older (top) with improved detection to prevent accidental triggers
        if (currentScrollTop < topThreshold && hasMoreOlder && !isScrollingDown && timeDelta > 50) {
          loadOlderMessages();
        }
        
        // Load newer (bottom)
        if (currentScrollTop + clientHeight > scrollHeight - bottomThreshold && hasMoreNewer && isScrollingDown && timeDelta > 50) {
          loadNewerMessages();
        }
        
        lastScrollTop = currentScrollTop;
      }, 200); // Slightly increased debounce time for better performance
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      container.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [hasMoreOlder, hasMoreNewer, isLoadingMore, currentPageIndex]);

  // Handle message deletion
  const handleDeleteMessage = useCallback((messageId) => {
    if (!socket || !messageId) return;
    
    // Optimistic UI update
    const updatedAllMessages = allMessages.filter(message => message._id !== messageId);
    setAllMessages(updatedAllMessages);
    
    const updatedDisplayed = displayedMessages.filter(message => message._id !== messageId);
    setDisplayedMessages(updatedDisplayed);
    
    // Server-side deletion
    socket.emit("deleteMessage", { messageId, userId: instructor?._id });
    
    // Recalculate pagination status
    const totalPages = Math.ceil(updatedAllMessages.length / messagesPerPage);
    setHasMoreOlder(currentPageIndex > 0);
    setHasMoreNewer(currentPageIndex < totalPages - 1);
  }, [socket, allMessages, displayedMessages, currentPageIndex, instructor?._id]);

  // Load older messages with improved transition and positioning
  const loadOlderMessages = useCallback(() => {
    if (!hasMoreOlder || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    const prevPageIndex = currentPageIndex - 1;
    const container = chatContainerRef.current;
    if (!container) {
      setIsLoadingMore(false);
      return;
    }
    
    const oldScrollHeight = container.scrollHeight;
    
    // Get scroll position before loading new content
    const scrollPosition = container.scrollTop;
    
    setTimeout(() => {
      // Get messages for the previous page
      const startIdx = prevPageIndex * messagesPerPage;
      const endIdx = (prevPageIndex + 1) * messagesPerPage;
      const olderMessages = allMessages.slice(startIdx, endIdx);
      
      setDisplayedMessages(olderMessages);
      setCurrentPageIndex(prevPageIndex);
      setHasMoreOlder(prevPageIndex > 0);
      setHasMoreNewer(true);
      
      // Position the scroll to maintain relative position
      requestAnimationFrame(() => {
        // Calculate new position to make the transition seamless
        const newScrollHeight = container.scrollHeight;
        const newPosition = scrollPosition + (newScrollHeight - oldScrollHeight);
        container.scrollTop = newPosition;
        
        // Mark loading as complete after the animation frame
        setTimeout(() => setIsLoadingMore(false), 50);
      });
    }, 200);
  }, [allMessages, currentPageIndex, hasMoreOlder, isLoadingMore]);

  // Load newer messages with improved handling
  const loadNewerMessages = useCallback(() => {
    if (!hasMoreNewer || isLoadingMore) return;
    
    setIsLoadingMore(true);
    
    const nextPageIndex = currentPageIndex + 1;
    const container = chatContainerRef.current;
    if (!container) {
      setIsLoadingMore(false);
      return;
    }
    
    // Save reference point for smooth transition
    const oldScrollHeight = container.scrollHeight;
    const oldScrollTop = container.scrollTop;
    const visibleHeight = container.clientHeight;
    const distanceFromBottom = oldScrollHeight - (oldScrollTop + visibleHeight);
    
    setTimeout(() => {
      // Calculate total number of pages
      const totalPages = Math.ceil(allMessages.length / messagesPerPage);
      
      // Get messages for the next page
      const startIdx = nextPageIndex * messagesPerPage;
      const endIdx = Math.min(allMessages.length, (nextPageIndex + 1) * messagesPerPage);
      const newerMessages = allMessages.slice(startIdx, endIdx);
      
      setDisplayedMessages(newerMessages);
      setCurrentPageIndex(nextPageIndex);
      setHasMoreNewer(nextPageIndex < totalPages - 1);
      setHasMoreOlder(true);
      
      // Position the scroll to maintain context
      requestAnimationFrame(() => {
        // If we were near the bottom of the previous page, scroll to bottom of new page
        if (distanceFromBottom < 200) {
          container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        } else {
          // Otherwise keep a similar position
          container.scrollTop = 20; // Near the top of the new page
        }
        
        setTimeout(() => setIsLoadingMore(false), 50);
      });
    }, 200);
  }, [allMessages, currentPageIndex, hasMoreNewer, isLoadingMore]);

  // Determine if we have any messages
  const hasMessages = displayedMessages && displayedMessages.length > 0;

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
        scrollBehavior: "smooth",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "rgba(0,0,0,0.1)",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "rgba(255,255,255,0.3)",
          borderRadius: "4px",
          transition: "all 0.3s ease",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          background: "rgba(255,255,255,0.5)",
        },
      }}
    >
      {/* Encrypted Chat Banner */}
      <Fade in={true} timeout={800}>
        <Box
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "8px 14px",
            borderRadius: "18px",
            color: "white",
            textAlign: "center",
            fontSize: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            maxWidth: "80%",
            margin: "10px auto",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            backdropFilter: "blur(5px)",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
            },
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: "16px", marginRight: "6px" }} />
          Messages are end-to-end encrypted. No one outside this chat can read them.
        </Box>
      </Fade>

      {/* Older Messages Indicator with Smooth Transition */}
      <Fade in={hasMoreOlder && !isLoadingMore} timeout={300}>
        <Box 
          sx={{ 
            display: hasMoreOlder ? "flex" : "none", 
            justifyContent: "center", 
            padding: "10px",
            cursor: hasMoreOlder && !isLoadingMore ? "pointer" : "default",
            opacity: hasMoreOlder ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={hasMoreOlder && !isLoadingMore ? loadOlderMessages : undefined}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: "white", 
              background: "rgba(0,0,0,0.5)", 
              padding: "6px 16px", 
              borderRadius: "16px",
              backdropFilter: "blur(3px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(0,0,0,0.6)",
                transform: "translateY(-2px)"
              }
            }}
          >
            {isLoadingMore ? (
              <CircularProgress size={16} sx={{ color: "white", marginRight: "8px" }} />
            ) : null}
            {isLoadingMore ? "Loading..." : "Load older messages"}
          </Typography>
        </Box>
      </Fade>

      {/* Loading indicator for scroll-based loading */}
      {isLoadingMore && (
        <Box 
          sx={{ 
            position: "absolute", 
            top: "50%", 
            left: "50%", 
            transform: "translate(-50%, -50%)",
            zIndex: 20
          }}
        >
          <CircularProgress 
            size={30} 
            sx={{ 
              color: "white",
              filter: "drop-shadow(0 0 4px rgba(0,0,0,0.5))"
            }} 
          />
        </Box>
      )}

      {/* No messages placeholder with enhanced styling */}
      {!hasMessages && (
        <Fade in={true} timeout={500}>
          <Box 
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
              width: "100%"
            }}
          >
            <Typography 
              variant="body1" 
              sx={{ 
                color: "white", 
                background: "rgba(0,0,0,0.6)", 
                padding: "16px 24px", 
                borderRadius: "20px",
                backdropFilter: "blur(4px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)" 
              }}
            >
              No messages yet. Start the conversation!
            </Typography>
          </Box>
        </Fade>
      )}

      {/* Messages with enhanced animations and styling */}
      {hasMessages && displayedMessages.map((msg, index) => {
        if (!msg || typeof msg !== 'object' || !msg._id) return null;
        
        // Display only the username for the first message from the same sender in a sequence
        const isFirstInSequence = index === 0 || 
          displayedMessages[index - 1]?.sender !== msg.sender;
        
        return (
          <Fade 
            in={true} 
            key={msg._id} 
            timeout={{ enter: 400, exit: 300 }} 
            style={{ 
              transitionDelay: `${Math.min(index * 40, 200)}ms`,
              transformOrigin: msg.sender === instructor?._id ? "right" : "left"
            }}
          >
            <Grid
              container
              justifyContent={
                msg.sender === instructor?._id ? "flex-end" : "flex-start"
              }
              sx={{ 
                marginBottom: "8px",
                opacity: isLoadingMore ? 0.7 : 1,
                transition: "opacity 0.3s ease"
              }}
            >
              <Grid item xs={9} sm={7} md={6}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: msg.sender === instructor?._id ? "flex-end" : "flex-start",
                  }}
                >
                  {/* Show username only for first message in sequence */}
                  {msg.sender !== instructor?._id && isFirstInSequence && (
                    <Typography 
                      sx={{ 
                        fontSize: "11px", 
                        fontWeight: 600, 
                        marginLeft: "12px",
                        marginBottom: "4px",
                        color: "rgba(255,255,255,0.9)"
                      }}
                    >
                      {msg.sender_name || "Unknown"}
                    </Typography>
                  )}
                  
                  <Box
                    sx={{
                      backgroundColor: msg.sender === instructor?._id 
                        ? "rgba(97, 197, 84, 0.95)" 
                        : "rgba(232, 236, 239, 0.95)",
                      borderRadius: msg.sender === instructor?._id 
                        ? "18px 4px 18px 18px" 
                        : "4px 18px 18px 18px",
                      padding: "12px 16px",
                      minWidth: "180px",
                      maxWidth: "100%",
                      wordWrap: "break-word",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                      transition: "all 0.25s ease",
                      "&:hover": {
                        boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
                        transform: "translateY(-1px)",
                      },
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        color: msg.sender === instructor?._id ? "white" : "#000",
                        fontSize: "14px",
                        fontWeight: 400,
                        textAlign: "left",
                        lineHeight: 1.5,
                        whiteSpace: "pre-wrap",
                        overflowWrap: "break-word",
                      }}
                    >
                      {msg.message || ""}
                    </Typography>
                    
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "6px",
                      }}
                    >
                      <Typography 
                        sx={{ 
                          fontSize: "11px", 
                          color: msg.sender === instructor?._id 
                            ? "rgba(255,255,255,0.7)" 
                            : "#727272" 
                        }}
                      >
                        {formatTime(msg?.createdAt) || "Unknown time"}
                      </Typography>

                      {/* Message Status Indicators with animations */}
                      {msg.sender === instructor?._id && msg.status && (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {msg.status?.some((s) => s.delivered) ? (
                            msg.status?.every((s) => s.read) ? (
                              <DoneAllIcon 
                                sx={{ 
                                  color: "#0D6EFD", 
                                  width: "16px",
                                  transition: "all 0.3s ease" 
                                }} 
                              />
                            ) : (
                              <DoneAllIcon 
                                sx={{ 
                                  color: "white", 
                                  width: "16px",
                                  transition: "all 0.3s ease" 
                                }} 
                              />
                            )
                          ) : (
                            <DoneIcon 
                              sx={{ 
                                color: "white", 
                                width: "16px",
                                transition: "all 0.3s ease" 
                              }} 
                            />
                          )}
                        </Box>
                      )}

                      {/* Delete Button with improved hover states */}
                      {msg.sender === instructor?._id && (
                        <IconButton
                          onClick={() => handleDeleteMessage(msg._id)}
                          sx={{ 
                            color: "white", 
                            padding: "3px",
                            opacity: 0,
                            transition: "all 0.25s ease",
                            backgroundColor: "transparent",
                            "&:hover": {
                              backgroundColor: "rgba(255,255,255,0.25)",
                              transform: "scale(1.1)"
                            },
                            ".MuiBox-root:hover &": {
                              opacity: 0.8
                            }
                          }}
                        >
                          <DeleteIcon sx={{ fontSize: "16px" }} />
                        </IconButton>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Fade>
        );
      })}

      {/* Newer Messages Indicator with interactive styling */}
      <Fade in={hasMoreNewer && !isLoadingMore} timeout={300}>
        <Box 
          sx={{ 
            display: hasMoreNewer ? "flex" : "none", 
            justifyContent: "center", 
            padding: "10px",
            cursor: hasMoreNewer && !isLoadingMore ? "pointer" : "default",
            opacity: hasMoreNewer ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          onClick={hasMoreNewer && !isLoadingMore ? loadNewerMessages : undefined}
        >
          <Typography 
            variant="caption" 
            sx={{ 
              color: "white", 
              background: "rgba(0,0,0,0.5)", 
              padding: "6px 16px", 
              borderRadius: "16px",
              backdropFilter: "blur(3px)",
              boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                background: "rgba(0,0,0,0.6)",
                transform: "translateY(2px)"
              }
            }}
          >
            {isLoadingMore ? (
              <CircularProgress size={16} sx={{ color: "white", marginRight: "8px" }} />
            ) : null}
            {isLoadingMore ? "Loading..." : "Load newer messages"}
          </Typography>
        </Box>
      </Fade>
      
      {/* Scroll to bottom FAB - shown when not at bottom and have newer messages */}
      {hasMessages && hasMoreNewer && !isLoadingMore && (
        <Fade in={true} timeout={300}>
          <Box
            onClick={loadNewerMessages}
            sx={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              backgroundColor: "rgba(97, 197, 84, 0.95)",
              color: "white",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 3px 10px rgba(0,0,0,0.3)",
              transition: "all 0.2s ease",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
              },
              zIndex: 100,
            }}
          >
            <Typography sx={{ fontSize: "20px" }}>↓</Typography>
          </Box>
        </Fade>
      )}
    </Box>
  );
};

export default ChatLog;