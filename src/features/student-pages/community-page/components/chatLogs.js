import React from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';

const messages = [
  { id: 1, sender: 'other', text: 'Hi there, How are you?', time: '3 days ago' },
  { id: 2, sender: 'me', text: 'I am good, thank you! How about you?', time: '10:02 AM' },
  { id: 3, sender: 'other', text: 'I am fine too. Thanks for asking.', time: '10:05 AM' },
  { id: 4, sender: 'me', text: 'Great to hear!', time: '10:06 AM' },
];

const ChatLog = () => {
  return (
    <Box sx={{ padding: '16px', height: '100%', overflowY: 'auto' }}>
      {messages.map((message) => (
        <Grid
          container
          key={message.id}
          justifyContent={message.sender === 'me' ? 'flex-end' : 'flex-start'}
          sx={{ marginBottom: '8px' }}
        >
          {/* {message.sender === 'other' && (
            <Grid item>
              <Avatar sx={{ marginRight: '8px' }}>O</Avatar>
            </Grid>
          )} */}
          <Grid item xs={8} sm={7} md={6}>
          <Typography
                sx={{
                  color: '#0B3048',
                  fontSize : "12px",
                  fontWeight : 400,
                  opacity : "0.7",
                  marginBottom: '10px',
                  textAlign : message.sender === 'me' ? 'end' : 'start',
                //   py : "10px",
                }}
              >
                {message.time}
              </Typography>
            <Box
              sx={{
                // border: message.sender === 'me' ? '1px solid #DCF8C6' : 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.sender === 'me' ? 'flex-end' : 'flex-start',
              }}
            >
              <Typography variant="body1" 
              sx={{ 
                wordBreak: 'break-word',
                backgroundColor: message.sender === 'me' ? '#61C554' : '#E8ECEF',  
                padding: '15px 20px 16px 15px',
                borderRadius: '10px',
                color : message.sender === 'me' ? "white" : "#000000",
                fontSize : "14px",
                fontWeight : 400,  
                }}
                >
                {message.text}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default ChatLog;
