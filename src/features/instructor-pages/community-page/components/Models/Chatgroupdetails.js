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
    <Box sx={{ height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Group Wallpaper */}
      <Box sx={{
        width: '100%',
        height: '350px', // Adjust height as needed
        backgroundImage: `url(${currentChat?.batch?.course?.image ? getImageUrl(currentChat?.batch?.course?.image) : imagePlaceholder})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'brightness(50%)',
        position: 'relative'
      }}>
        {/* Back Button */}
        <IconButton 
          onClick={() => setViewGroup(false)}
          sx={{ 
            position: 'absolute', 
            top: 10, 
            left: 10, 
            color: 'black' 
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>

      {/* Group Details */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        p: 3,
        color: 'black'
      }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
          {currentChat?.batch?.batch_name || 'Group Name'}
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, opacity: 0.8, textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}>
          {currentChat?.batch?.description || 'No description available'}
        </Typography>

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
          <Typography variant="h6" sx={{ color: 'black', mb: 2 }}>
            {`Members (${allMembers.length})`}
          </Typography>
          <List>
            {allMembers.map((member) => (
              <ListItem 
                key={member.id} 
                sx={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 1, mb: 1 }}
              >
                <ListItemAvatar>
                  <Avatar 
                    src={member.image ? getImageUrl(member.image) : profilePlaceholder}
                    sx={{ width: 40, height: 40 }}
                  />
                </ListItemAvatar>
                <ListItemText 
                  primary={<Typography variant="body1" sx={{ color: 'black' }}>{member.full_name}</Typography>}
                  secondary={<Typography variant="body2" sx={{ color: 'rgba(20, 16, 16, 0.7)' }}>{member.role}</Typography>}
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

