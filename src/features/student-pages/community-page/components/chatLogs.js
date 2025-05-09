import React, { useRef, useEffect, useState, useCallback } from "react";
import { Box, Grid, Typography, IconButton, Button, Menu, MenuItem, Popover } from "@mui/material";
import { getStudentDetails } from "store/atoms/authorized-atom";
import { formatTime } from "utils/formatDate";
import DoneIcon from "@mui/icons-material/Done";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
// Removed unused LockOutlinedIcon import

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
  
  // Emoji reaction states
  const [emojiMenuAnchorEl, setEmojiMenuAnchorEl] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [messageReactions, setMessageReactions] = useState({});
  
  // Reaction details popover
  const [reactionDetailsAnchorEl, setReactionDetailsAnchorEl] = useState(null);
  const [selectedReactionEmoji, setSelectedReactionEmoji] = useState(null);
  const [selectedReactionMessage, setSelectedReactionMessage] = useState(null);
  
  // Enhanced emoji options with categories
  const emojiCategories = {
    popular: ["👍", "❤️", "😂", "😮", "😢", "🙏"],
    faces: ["😀", "😊", "🤔", "😎", "🥳", "😴"],
    gestures: ["👋", "✌️", "👏", "🤝", "🙌", "🫂"],
    symbols: ["⭐", "🔥", "💯", "✅", "⚡", "💪"]
  };
  
  // Track current emoji category
  const [currentEmojiCategory, setCurrentEmojiCategory] = useState("popular");

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
  }, [Messages, isUserAtBottom]);

  // Using useCallback to memoize triggerMessageRead function
  const triggerMessageRead = useCallback((messageId) => {
    if (!readMessages.has(messageId)) {
      socket.emit("messageRead", { messageId, userId: student?._id });
      setReadMessages((prev) => new Set([...prev, messageId]));
    }
  }, [readMessages, socket, student?._id]);

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
  }, [Messages, readMessages, triggerMessageRead]);

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

  // Handle right click or long press to open emoji menu
  const handleRightClick = (event, messageId) => {
    event.preventDefault();
    setEmojiMenuAnchorEl(event.currentTarget);
    setSelectedMessageId(messageId);
    setCurrentEmojiCategory("popular"); // Reset to popular category when opening menu
  };

  // Close emoji menu
  const handleCloseEmojiMenu = () => {
    setEmojiMenuAnchorEl(null);
    setSelectedMessageId(null);
  };

  // Change emoji category
  const handleChangeEmojiCategory = (category) => {
    setCurrentEmojiCategory(category);
  };

  // Show reaction details (who reacted) when clicking on an emoji
  const handleShowReactionDetails = (event, messageId, emoji) => {
    event.stopPropagation();
    setReactionDetailsAnchorEl(event.currentTarget);
    setSelectedReactionEmoji(emoji);
    setSelectedReactionMessage(messageId);
  };

  // Close reaction details popover
  const handleCloseReactionDetails = () => {
    setReactionDetailsAnchorEl(null);
    setSelectedReactionEmoji(null);
    setSelectedReactionMessage(null);
  };

  // Add an emoji reaction to a message with optimistic update and proper backend syncing
  const handleAddReaction = (emoji) => {
    if (selectedMessageId) {
      // Prepare reaction data
      const reactionData = {
        messageId: selectedMessageId,
        userId: student?._id,
        username: student?.name,
        emoji: emoji,
        timestamp: new Date().toISOString() // Add timestamp for sorting/tracking
      };
      
      // Optimistic update for UI responsiveness
      setMessageReactions(prev => {
        const updatedReactions = { ...prev };
        if (!updatedReactions[selectedMessageId]) {
          updatedReactions[selectedMessageId] = [];
        }
        
        // Check if user already reacted with this emoji
        const existingReactionIndex = updatedReactions[selectedMessageId].findIndex(
          r => r.emoji === emoji && r.userId === student?._id
        );
        
        if (existingReactionIndex >= 0) {
          // Remove reaction if it already exists (toggle behavior)
          updatedReactions[selectedMessageId].splice(existingReactionIndex, 1);
        } else {
          // Add new reaction
          updatedReactions[selectedMessageId].push({
            emoji,
            userId: student?._id,
            username: student?.name,
            timestamp: reactionData.timestamp
          });
        }
        
        return updatedReactions;
      });
      
      // Emit socket event for reaction with proper error handling
      socket.emit("messageReaction", reactionData, (acknowledgement) => {
        if (acknowledgement && acknowledgement.error) {
          console.error("Error saving reaction:", acknowledgement.error);
          // Revert optimistic update if there was an error
          socket.emit("getMessageReactions", { messageId: selectedMessageId }, (response) => {
            if (response && response.reactions) {
              setMessageReactions(prev => ({
                ...prev,
                [selectedMessageId]: response.reactions
              }));
            }
          });
        }
      });
      
      handleCloseEmojiMenu();
    }
  };
  
  // Remove a specific reaction (when clicking on an existing reaction)
  const handleRemoveReaction = (messageId, emoji) => {
    // Check if the reaction belongs to current user before allowing removal
    const userHasThisReaction = messageReactions[messageId]?.some(
      r => r.emoji === emoji && r.userId === student?._id
    );
    
    if (userHasThisReaction) {
      // Optimistic update
      setMessageReactions(prev => {
        const updatedReactions = { ...prev };
        if (updatedReactions[messageId]) {
          updatedReactions[messageId] = updatedReactions[messageId].filter(
            r => !(r.emoji === emoji && r.userId === student?._id)
          );
        }
        return updatedReactions;
      });
      
      // Send to backend
      socket.emit("removeMessageReaction", {
        messageId,
        userId: student?._id,
        emoji
      });
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

  // Listen for reaction updates from socket
  useEffect(() => {
    if (socket) {
      // Handle reaction updates
      socket.on("messageReactionUpdate", (data) => {
        if (data && data.messageId) {
          setMessageReactions(prev => ({
            ...prev,
            [data.messageId]: data.reactions
          }));
        }
      });
      
      // Handle reaction removals
      socket.on("messageReactionRemoved", (data) => {
        if (data && data.messageId) {
          setMessageReactions(prev => {
            const updatedReactions = { ...prev };
            if (updatedReactions[data.messageId]) {
              // Remove the specific reaction
              updatedReactions[data.messageId] = updatedReactions[data.messageId].filter(
                r => !(r.userId === data.userId && r.emoji === data.emoji)
              );
            }
            return updatedReactions;
          });
        }
      });
      
      // Initialize reactions from existing messages if they have them
      const initialReactions = {};
      Messages?.forEach(msg => {
        if (msg.reactions && msg.reactions.length > 0) {
          initialReactions[msg._id] = msg.reactions;
        }
      });
      setMessageReactions(initialReactions);
      
      return () => {
        socket.off("messageReactionUpdate");
        socket.off("messageReactionRemoved");
      };
    }
  }, [socket, Messages]);

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
                  onContextMenu={(e) => handleRightClick(e, item.message._id)}
                  // Add long-press support for mobile
                  onTouchStart={(e) => {
                    const longPressTimer = setTimeout(() => {
                      handleRightClick(e, item.message._id);
                    }, 500);
                    
                    // Clear timeout if touch ends before long press triggers
                    e.currentTarget.addEventListener('touchend', () => {
                      clearTimeout(longPressTimer);
                    }, { once: true });
                  }}
                  sx={{
                    backgroundColor: item.message.sender === student?._id ? "#61C554" : "#E8ECEF",
                    borderRadius: "10px",
                    padding: "8px 12px",
                    minWidth: "180px",
                    maxWidth: "100%",
                    wordWrap: "break-word",
                    position: "relative",
                    cursor: "default"
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
                  
                  {/* WhatsApp-style reactions display without background color */}
                  {messageReactions[item.message._id] && messageReactions[item.message._id].length > 0 && (
                    <Box
                      sx={{
                        position: "absolute",
                        bottom: -10,
                        [item.message.sender === student?._id ? "left" : "right"]: "10px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        padding: "2px 4px",
                        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                        display: "flex",
                        gap: "2px",
                        zIndex: 1
                      }}
                    >
                      {/* Group same emoji reactions and count them */}
                      {Object.entries(
                        messageReactions[item.message._id].reduce((acc, reaction) => {
                          acc[reaction.emoji] = (acc[reaction.emoji] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([emoji, count], i) => (
                        <Box
                          key={i}
                          onClick={(e) => handleShowReactionDetails(e, item.message._id, emoji)}
                          sx={{
                            fontSize: "12px",
                            padding: "1px 3px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            gap: "2px"
                          }}
                        >
                          <span>{emoji}</span>
                          {count > 1 && <span>{count}</span>}
                        </Box>
                      ))}
                    </Box>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
        )
      ))}

      {/* Enhanced emoji reaction menu with categories */}
      <Menu
        anchorEl={emojiMenuAnchorEl}
        open={Boolean(emojiMenuAnchorEl)}
        onClose={handleCloseEmojiMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {/* Category selector */}
        <MenuItem sx={{ display: "flex", justifyContent: "space-between", padding: "4px" }}>
          {Object.keys(emojiCategories).map((category) => (
            <Button
              key={category}
              onClick={() => handleChangeEmojiCategory(category)}
              variant={currentEmojiCategory === category ? "contained" : "text"}
              size="small"
              sx={{
                minWidth: "unset",
                padding: "2px 6px",
                fontSize: "11px",
                textTransform: "capitalize"
              }}
            >
              {category}
            </Button>
          ))}
        </MenuItem>
        
        {/* Emoji grid */}
        <MenuItem sx={{ display: "flex", flexWrap: "wrap", gap: 1, maxWidth: "280px" }}>
          {emojiCategories[currentEmojiCategory].map((emoji, index) => (
            <Box
              key={index}
              onClick={() => handleAddReaction(emoji)}
              sx={{
                cursor: "pointer",
                fontSize: "20px",
                padding: "2px 4px",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                  borderRadius: "4px",
                },
              }}
            >
              {emoji}
            </Box>
          ))}
        </MenuItem>
      </Menu>

      {/* WhatsApp-style reactions details popover - shows who reacted with a specific emoji */}
      <Popover
        open={Boolean(reactionDetailsAnchorEl)}
        anchorEl={reactionDetailsAnchorEl}
        onClose={handleCloseReactionDetails}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box sx={{ padding: "8px 12px", maxWidth: "200px" }}>
          <Typography variant="subtitle2" sx={{ borderBottom: "1px solid #eee", pb: 1, mb: 1 }}>
            {selectedReactionEmoji} {messageReactions[selectedReactionMessage]?.filter(r => r.emoji === selectedReactionEmoji).length} 
          </Typography>
          
          {/* List of users who reacted with this emoji */}
          {messageReactions[selectedReactionMessage]?.filter(r => r.emoji === selectedReactionEmoji).map((reaction, index) => (
            <Box 
              key={index} 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                gap: 1, 
                mb: 0.5
              }}
            >
              <Typography variant="body2" sx={{ 
                fontWeight: reaction.userId === student?._id ? 600 : 400,
                fontSize: "13px"
              }}>
                {reaction.userId === student?._id ? "You" : reaction.username}
              </Typography>
            </Box>
          ))}
          
          {/* Remove reaction button if the current user has this reaction */}
          {messageReactions[selectedReactionMessage]?.some(r => r.emoji === selectedReactionEmoji && r.userId === student?._id) && (
            <Button 
              variant="text" 
              size="small" 
              onClick={() => {
                handleRemoveReaction(selectedReactionMessage, selectedReactionEmoji);
                handleCloseReactionDetails();
              }}
              sx={{ 
                mt: 1, 
                fontSize: "12px",
                color: "#F44336"
              }}
            >
              Remove
            </Button>
          )}
        </Box>
      </Popover>

      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatLog;