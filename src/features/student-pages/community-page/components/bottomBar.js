import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import AddBoxPlusIcon from "assets/icons/AddBoxPlusIcon"; // Your custom plus icon
import RecordIcon from "assets/icons/RecordIcon";
import EmojiIcon from "assets/icons/EmojiIcon";
import EmojiPicker from "./EmojiPicker";
import { getStudentDetails } from "store/atoms/authorized-atom";

const BottomBar = ({ socket, community }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [isRecording, setIsRecording] = useState(false); // New state for voice recording
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

  const toggleRecording = () => {
    // Start or stop voice recording
    setIsRecording((prev) => !prev);

    if (!isRecording) {
      console.log("Voice recording started...");
      // Add your voice recording logic here (e.g., access microphone, start recording audio)
    } else {
      console.log("Voice recording stopped.");
      // Add logic to stop recording and handle the recorded file
    }
  };

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

      {/* Plus Button */}
      <IconButton
        aria-label="Add more options"
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "green",
          },
        }}
      >
        <AddBoxPlusIcon />
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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="Attach a file"
                sx={{
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    color: "purple",
                  },
                }}
              >
                <AttachFileIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Voice Note Button */}
      <IconButton
        onClick={toggleRecording}
        aria-label={isRecording ? "Stop recording voice note" : "Start recording voice note"}
        sx={{
          "&:hover": {
            backgroundColor: "rgba(255, 0, 0, 0.1)", // Light red background on hover
          },
        }}
      >
        <RecordIcon
          sx={{
            color: isRecording ? "red" : "black",
            "&:hover": {
              color: isRecording ? "darkred" : "gray",
            },
          }}
        />
      </IconButton>

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
