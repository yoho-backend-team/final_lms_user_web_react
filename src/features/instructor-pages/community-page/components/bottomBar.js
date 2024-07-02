import React, { useState } from 'react';
import { Box, IconButton, TextField, InputAdornment } from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import AddBoxPlusIcon from 'assets/icons/AddBoxPlusIcon';
import RecordIcon from 'assets/icons/RecordIcon';
import EmojiIcon from 'assets/icons/EmojiIcon';
import EmojiPicker from './EmojiPicker';

const BottomBar = ({socket}) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState('');

  const handleEmojiClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiSelect = (emoji) => {
    setMessage(message + emoji.native);
  };

  const handleSendClick = () => {
    console.log('Sending message:', message);
    setMessage('');
    socket.emit("sendMessage",{message:message,user:"user"},(response)=>{
      console.log(response,"response")
    })
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        justifyContent: 'flex-end',
        position: 'static',
        bottom: '0',
        backgroundColor: '#F6F6F6',
      }}
    >
      {showEmojiPicker && <EmojiPicker onSelect={handleEmojiSelect} />}
      
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
          margin: '0 8px',
          backgroundColor: '#fff',
          borderRadius: '20px',
          '& .MuiOutlinedInput-root': {
            paddingRight: 0,
            '& fieldset': {
              borderColor: 'transparent',
            },
            '&:hover fieldset': {
              borderColor: 'transparent',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'transparent',
            },
          },
          '& .MuiOutlinedInput-input': {
            padding: '10px 14px',
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
        <SendIcon sx={{ color: '#000000' }} />
      </IconButton>
      <IconButton>
        <RecordIcon />
      </IconButton>
    </Box>
  );
};

export default BottomBar;
