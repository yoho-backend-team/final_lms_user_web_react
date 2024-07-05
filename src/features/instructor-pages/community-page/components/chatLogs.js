import React, { useRef, useEffect } from 'react';
import { Box, Grid, Typography, Avatar } from '@mui/material';
import { getInstructorDetails } from 'store/atoms/authorized-atom';


const ChatLog = ({socket,Messages}) => {
  const instructor = getInstructorDetails()
  const chatRef = useRef(null)

  const scrollToBottom = () => {
    if(chatRef.current){
      chatRef.current.scrollIntoView({ behavior : 'smooth' })
    }
  }

  useEffect(()=>{
  scrollToBottom()
  },[Messages])
  
  return (
    <Box sx={{ padding: '16px', height: '100%', overflowY: 'auto' }}>
      {Messages?.map((msg)=>(
         <Grid
         container
         key={msg.id}
         justifyContent={msg.user === instructor?._id ? 'flex-end' : 'flex-start'}
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
                 textAlign : msg.user === instructor?._id ? 'end' : 'start',
               //   py : "10px",
               }}
             >
               {msg.date}
             </Typography>
           <Box
             sx={{
               // border: message.sender === 'me' ? '1px solid #DCF8C6' : 'none',
               display: 'flex',
               flexDirection: 'column',
               alignItems: msg.user === instructor?._id ? 'flex-end' : 'flex-start',
             }}
           >
             <Typography variant="body1" 
             sx={{ 
               wordBreak: 'break-word',
               backgroundColor:msg.user === instructor?._id ? '#61C554' : '#E8ECEF',  
               padding: '15px 20px 16px 15px',
               borderRadius: '10px',
               color : msg.user === instructor?._id ? "white" : "#000000",
               fontSize : "14px",
               fontWeight : 400,  
               }}
               >
               {msg.message}
             </Typography>
           </Box>
         </Grid>
       </Grid>
      ))}
      <div ref={chatRef} />
    </Box>
  );
};

export default ChatLog;
