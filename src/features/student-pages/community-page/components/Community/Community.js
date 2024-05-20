import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { Card, Grid, useMediaQuery, useTheme, Avatar, AvatarGroup } from '@mui/material';
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import {
  Search,
  AttachFile,
  InsertEmoticon,
  Send,
  Mic,
  CreateNewFolder
} from '@mui/icons-material';
import WifiCalling3Icon from '@mui/icons-material/WifiCalling3';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function Community() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5),
    width: 'auto',
    height: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    background: theme.palette.mode === 'dark' ? '#1A2027' : 'linear-gradient(90deg, rgba(238,174,202,1) 0%, rgba(162,148,233,0.76234243697479) 100%)',
  }));

  const messages = [
    { id: 1, text: 'Hello!', datetime: '2024-05-16 12:45', daysAgo: 3, sender: 'me' },
    { id: 2, text: 'How are you?', datetime: '2024-05-17 15:30', daysAgo: 3, sender: 'other' },
    { id: 3, text: 'what are you doing', datetime: '2024-05-18 12:45', daysAgo: 2, sender: 'me' },
    { id: 4, text: 'I learning from Java', datetime: '2024-05-18 15:30', daysAgo: 2, sender: 'other' },
    { id: 5, text: 'And You', datetime: '2024-05-19 20:45', isYesterday: 0, sender: 'me' },
    { id: 6, text: 'I`m going to study in React ', datetime: '2024-05-20 13:30', isToday: 0, sender: 'other' }
  ];

  return (
    <StyledPaper elevation={3}>
      <Card>
        <Grid container spacing={2} sx={{ padding: '20px' }}>
          <Grid item xs={isSmallScreen ? 12 : 6} style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant='h3'>Community</Typography>
          </Grid>
          <Grid item xs={isSmallScreen ? 12 : 6} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Grid item xs={isSmallScreen ? 12 : 6} style={{ display: 'flex', alignItems: 'center', justifyContent: "space-between" }}>
              <AvatarGroup max={4}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
                <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                <Avatar alt="Agnes Walker" src="/static/images/avatar/4.jpg" />
                <Avatar alt="Trevor Henderson" src="/static/images/avatar/5.jpg" />
              </AvatarGroup>
              <WifiCalling3Icon />
              <Search />
              <KeyboardArrowDownIcon />
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12}>
            <Box display="flex" flexDirection="column" width="100%">
              <Box display="flex" justifyContent="center" width="100%" alignItems="center" padding={1}>
                <Typography variant="body2" style={{width:"45%", backgroundColor:"lightyellow"}}>Messages are end-to-end encrypted. No one outside of this chat. not even WhatsApp can read or listen to them. Click to learn more.</Typography>
              </Box>
              <Box padding={4} overflow="auto" flexGrow={1}>
                {messages.map((msg) => (
                  <Box key={msg.id} marginBottom={2} display="flex" flexDirection="column" alignItems={msg.sender === 'me' ? 'flex-end' : 'flex-start'}>
                    <Box padding={2} bgcolor={msg.sender === 'me' ? '#d1c4e9' : '#b2dfdb'} borderRadius={1} maxWidth="60%">
                      <Typography variant="body1">{msg.text}</Typography>
                    </Box>
                    <Typography variant="caption" color="textSecondary">
                      {msg.datetime} ({msg.daysAgo} days ago)
                    </Typography>
                  </Box>
                ))}
              </Box>
              <Box display="flex" alignItems="center" padding={2} borderTop="1px solid #ccc">
                <IconButton>
                  <InsertEmoticon />
                </IconButton>
                <IconButton>
                  <CreateNewFolder />
                </IconButton>
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Type a message"
                  sx={{ marginLeft: 1, flex: 1 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton component="label">
                          <AttachFile />
                          <input type="file" hidden />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <IconButton color="primary">
                  <Send />
                </IconButton>
                <IconButton>
                  <Mic />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Card>
    </StyledPaper>
  );
}

export default Community;