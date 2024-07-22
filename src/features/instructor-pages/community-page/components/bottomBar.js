import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField, InputAdornment } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AddBoxPlusIcon from "assets/icons/AddBoxPlusIcon";
import RecordIcon from "assets/icons/RecordIcon";
import EmojiIcon from "assets/icons/EmojiIcon";
import EmojiPicker from "./EmojiPicker";
import { getInstructorDetails } from "store/atoms/authorized-atom";

const BottomBar = ({ socket, community}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const instructor = getInstructorDetails();

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleSendClick = () => {
    setMessage("");
    socket.emit(
      "sendMessage",
      { content: message, senderId: instructor?._id, groupId : community?._id , name : instructor?.full_name || instructor?.first_name },
      (response) => {
        console.log(response, "response");
      },
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
  }, [handleSendClick]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        justifyContent: "flex-end",
        position: "static",
        bottom: "0",
        backgroundColor: "#F6F6F6",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
          handleEmojiClick={handleEmojiClick}
        />
      )}

      <IconButton onClick={handleEmojiClick}>
        <EmojiIcon />
      </IconButton>
      <IconButton>
        <AddBoxPlusIcon />
      </IconButton>
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton onClick={handleSendClick}>
        <SendIcon sx={{ color: "#000000" }} />
      </IconButton>
      <IconButton>
        <RecordIcon />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
