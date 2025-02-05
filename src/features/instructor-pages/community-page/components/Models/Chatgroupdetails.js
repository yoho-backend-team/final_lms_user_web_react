import React from "react";
import { 
  Box, 
  Typography, 
  Avatar, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";

const ChatGroupDetails = ({ currentChat, setViewGroup }) => {
  const allMembers = [
    ...(currentChat?.admin?.map(a => ({...a, role: 'Admin'})) || []),
    ...(currentChat?.users?.map(u => ({...u, role: 'Member'})) || [])
  ];

  return (
    <Box sx={{ 
      height: '100vh', 
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Fullscreen Background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${
          currentChat?.batch?.course?.image 
            ? getImageUrl(currentChat?.batch?.course?.image) 
            : imagePlaceholder
        })`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(50%)',
        zIndex: 1
      }} />

      {/* Back Button */}
      <IconButton 
        onClick={() => {
          
          setViewGroup(false);
        }}
        sx={{ 
          position: 'absolute', 
          top: 10, 
          left: 10, 
          zIndex: 3,
          color: 'white' 
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Group Details Overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        p: 3
      }}>
        {/* Group Name and Description */}
        <Box sx={{
          textAlign: 'center',
          pt: 10,
          px: 3,
          
        }}>
          <Typography variant="h4" sx={{ 
            fontWeight: 'bold', 
            mb: 1,
            color:"white",
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}>
            {currentChat?.batch?.batch_name || 'Group Name'}
          </Typography>
          <Typography variant="h6" sx={{ 
            mb: 3,
            opacity: 0.8,
            color:"white",
            textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
          }}>
            {currentChat?.batch?.description || 'No description available'}
          </Typography>
        </Box>

        {/* Members List */}
        <Box sx={{ 
          maxWidth: '500px', 
          width: '100%', 
          maxHeight: '300px', 
          overflowY: 'auto',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: 2,
          p: 2
        }}>
          <Typography variant="h6" sx={{color: 'white', mb: 2 }}>
            {`Members (${allMembers.length})`}
          </Typography>
          <List>
            {allMembers.map((member) => (
              <ListItem 
                key={member.id} 
                sx={{ 
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: 1,
                  mb: 1
                }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={member.image ? getImageUrl(member.image) : profilePlaceholder}
                    sx={{ width: 40, height: 40 }}
                  />
                </ListItemAvatar>
                <ListItemText 
                  primary={
                    <Typography variant="body1" sx={{ color: 'white' }}>
                      {member.full_name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                      {member.role}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatGroupDetails;
