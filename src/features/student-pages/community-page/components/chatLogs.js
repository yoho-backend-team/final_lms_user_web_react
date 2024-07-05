import React, { useEffect, useRef } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { getStudentDetails } from 'store/atoms/authorized-atom';

const ChatLog = ({ socket, Messages }) => {
  const student = getStudentDetails();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [Messages]);

  return (
    <Box sx={{ padding: '16px', height: '100%', overflowY: 'auto' }}>
      {Messages.map((message) => (
        <Grid
          container
          key={message.id}
          justifyContent={message.user === student?._id ? 'flex-end' : 'flex-start'}
          sx={{ marginBottom: '8px' }}
        >
          <Grid item xs={8} sm={7} md={6}>
            <Typography
              sx={{
                color: '#0B3048',
                fontSize: '12px',
                fontWeight: 400,
                opacity: '0.7',
                marginBottom: '10px',
                textAlign: message.user === student?._id ? 'end' : 'start',
              }}
            >
              {message.time}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: message.user === student?._id ? 'flex-end' : 'flex-start',
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  wordBreak: 'break-word',
                  backgroundColor: message.user === student?._id ? '#61C554' : '#E8ECEF',
                  padding: '15px 20px 16px 15px',
                  borderRadius: '10px',
                  color: message.user === student?._id ? 'white' : '#000000',
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                {message.message}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatLog;
