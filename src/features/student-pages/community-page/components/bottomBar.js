import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import EmojiIcon from "assets/icons/EmojiIcon";
import EmojiPicker from "./EmojiPicker";
import { getStudentDetails } from "store/atoms/authorized-atom";

const BottomBar = ({ socket, community }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const student = getStudentDetails();
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
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage((prevMessage) => prevMessage + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleSendClick = () => {
    if (!message.trim()) return;
    setMessage("");
    setShowEmojiPicker(false);
    socket.emit(
      "sendMessage",
      {
        content: message,
        senderId: student?._id,
        groupId: community?._id,
        name: student?.full_name || student?.first_name
      },
      (response) => {}
    );
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event?.key === "Enter" || event?.key === 13) {
        if (message?.length !== 0) {
          handleSendClick();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
      <div ref={emojiPickerRef} style={{ }}>
        <IconButton onClick={handleEmojiClick}>
          <EmojiIcon />
        </IconButton>
        
        {showEmojiPicker && (
          <div style={{}}>
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
            boxShadow: "none !important", // Ensures no shadow
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused": {
              boxShadow: "none !important", // Removes focus shadow
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent !important",
              boxShadow: "none !important", // Extra safeguard to remove any lingering shadow
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "10px 14px",
          },
        }}
        InputProps={{
          endAdornment: <InputAdornment position="end" />
        }}
      />

      <IconButton onClick={handleSendClick}>
        <SendIcon sx={{ color: "#000000" }} />
      </IconButton>
    </Box>
  );
};

export default BottomBar;