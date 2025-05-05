import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiIcon from "assets/icons/EmojiIcon";
import EmojiPicker from "./EmojiPicker";
import { getInstructorDetails } from "store/atoms/authorized-atom";

const BottomBar = ({ sendMessage }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const instructor = getInstructorDetails();
  const emojiPickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEmojiClick = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSendClick = () => {
    if (!message.trim()) return;
    sendMessage(message); // ✅ Use passed-in function
    setMessage("");
    setShowEmojiPicker(false);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event?.key === "Enter" || event?.keyCode === 13) && message.trim()) {
        handleSendClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [message]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "1px",
        mb: "1px",
        justifyContent: "flex-end",
        position: "static",
        backgroundColor: "#F6F6F6",
      }}
    >
      <div ref={emojiPickerRef}>
        <IconButton onClick={handleEmojiClick}>
          <EmojiIcon />
        </IconButton>
        {showEmojiPicker && (
          <div>
            <EmojiPicker onSelect={handleEmojiSelect} />
          </div>
        )}
      </div>

      <TextField
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        variant="outlined"
        placeholder="Type a message"
        fullWidth
        sx={{
          margin: "0 8px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          "& .MuiOutlinedInput-root": {
            paddingRight: 0,
            boxShadow: "none !important",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent !important",
              boxShadow: "none !important",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px 14px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end" />,
        }}
      />

      <IconButton onClick={handleSendClick}>
        <SendIcon sx={{ color: "#000000" }} />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
