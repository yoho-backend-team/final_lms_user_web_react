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
    setMessage((prevMessage) => prevMessage + emoji.native);
  };

  const handleSendClick = () => {
    setMessage("");
    socket.emit(
      "sendMessage",
      { content: message, senderId: instructor?._id, groupId : community?._id , name : instructor?.full_name || instructor?.first_name },
      (response) => {
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
        padding: "1px",
        mb:"1px",
        justifyContent: "flex-end",
        position: "static",
        backgroundColor: "#F6F6F6",
      }}
    >
      {showEmojiPicker && (
        <EmojiPicker
          onSelect={handleEmojiSelect}
        />
      )}

<IconButton
      onClick={handleEmojiClick}
      sx={{
        "&:hover": {
          boxShadow: "0 4px 8px rgba(231, 40, 136, 0.2)", // Adds shadow on hover
          transform: "scale(1.1)", // Slight scale effect on hover
          transition: "0.3s ease", // Smooth transition
        },
      }}
    >
      <EmojiIcon />
    </IconButton>
      <IconButton sx={{
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.1)",
          transition: "0.3s ease",
        },
      }}
    >
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
          "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds shadow on hover
          transform: "scale(1.02)", // Slight scale effect on hover
          transition: "0.3s ease", // Smooth transition
        },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton 
               sx={{
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  transform: "scale(1.1)",
                  transition: "0.3s ease",
                },
              }}>
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <IconButton onClick={handleSendClick}
      sx={{
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.1)",
          transition: "0.3s ease",
        },
      }}>
        <SendIcon sx={{ color: "#000000" }} />
      </IconButton>
      <IconButton sx={{
        "&:hover": {
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          transform: "scale(1.1)",
          transition: "0.3s ease",
        },
      }}>
        <RecordIcon />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
