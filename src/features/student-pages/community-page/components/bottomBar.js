import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiIcon from "assets/icons/EmojiIcon";
import EmojiPicker from "./EmojiPicker";
import { getStudentDetails } from "store/atoms/authorized-atom";

const BottomBar = ({ socket, community }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const isTablet = useMediaQuery("(max-width: 768px)"); // Check for tablet devices
  const student = getStudentDetails();

  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleSendMessage = useCallback(() => {
    if (!message.trim()) return;

    socket.emit(
      "sendMessage",
      {
        groupId: community?._id,
        content: message.trim(),
        senderId: student?._id,
        name: student?.full_name || student?.first_name,
      },
      (response) => {
        // Handle response if needed
      }
    );

    setMessage(""); // Clear the input field after sending
  }, [socket, community?._id, message, student]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: isTablet ? "8px" : "8px 16px",
        justifyContent: isTablet ? "space-between" : "flex-end",
        flexDirection: isTablet ? "column" : "row",
        gap: isTablet ? 1 : 0,
        backgroundColor: "#F6F6F6",
        borderTop: "1px solid #E0E0E0",
      }}
    >
      {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}

      {/* Emoji Picker Toggle */}
      <IconButton
        onClick={toggleEmojiPicker}
        aria-label="Toggle emoji picker"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)", // Change background color on hover
            color: "blue",
          },
        }}
      >
        <EmojiIcon />
      </IconButton>

      {/* Text Input for Messages */}
      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        placeholder="Type a message..."
        fullWidth
        sx={{
          margin: isTablet ? "8px 0" : "0 8px",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            paddingRight: 0,
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px 14px",
          },
        }}
      />

      {/* Send Button */}
      <IconButton
        onClick={handleSendMessage}
        aria-label="Send message"
        disabled={!message.trim()}
        className={`send-button ${message.trim() ? "enabled" : "disabled"}`}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
