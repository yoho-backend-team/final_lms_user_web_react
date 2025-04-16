import React, { useState } from "react";
import {
  Box,
  Grid,
  Avatar,
  IconButton,
  Typography,
  AvatarGroup,
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  Badge,
  Dialog,
  // DialogTitle removed as it's not used
  DialogContent,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemIcon,
  Switch,
  TextField,
  InputAdornment,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import SearchIcon from "@mui/icons-material/Search";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import DeleteIcon from "@mui/icons-material/Delete";
import LockIcon from "@mui/icons-material/Lock";
import StarIcon from "@mui/icons-material/Star";
import ReportIcon from "@mui/icons-material/Report";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import GroupIcon from "@mui/icons-material/Group";
import ImageIcon from "@mui/icons-material/Image";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import LinkIcon from "@mui/icons-material/Link";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";

const ChatHeader = ({ currentChat, onViewGroup }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [groupDialogOpen, setGroupDialogOpen] = useState(false);
  const [moreOptionsAnchorEl, setMoreOptionsAnchorEl] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  
  const open = Boolean(anchorEl);
  const moreOptionsOpen = Boolean(moreOptionsAnchorEl);

  const totalUsers = (currentChat?.users?.length || 0) + (currentChat?.admin?.length || 0);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewGroup = () => {
    setGroupDialogOpen(true);
    handleMenuClose();
  };

  const handleCloseGroupDialog = () => {
    setGroupDialogOpen(false);
  };

  const handleMoreOptionsOpen = (event) => {
    setMoreOptionsAnchorEl(event.currentTarget);
  };

  const handleMoreOptionsClose = () => {
    setMoreOptionsAnchorEl(null);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleStarred = () => {
    setIsStarred(!isStarred);
  };

  const handleSearchMessages = () => {
    // Implement search functionality
    handleMenuClose();
  };

  const handleViewMedia = () => {
    setGroupDialogOpen(true);
    setCurrentTab(1);
    handleMenuClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px",
        backgroundColor: "#F8F9FA",
        borderBottom: "1px solid #E0E0E0",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            sx={{ width: 65, height: 40 }}
            src={
              currentChat?.batch?.course?.image
                ? getImageUrl(currentChat?.batch?.course?.image)
                : imagePlaceholder
            }
            variant="square"
            onClick={handleViewGroup}
            style={{ cursor: "pointer" }}
          />
        </Grid>
        <Grid item sx={{ cursor: "pointer" }} onClick={handleViewGroup}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {currentChat?.batch?.batch_name}
          </Typography>
          <Typography variant="body2" sx={{ color: "gray" }}>
            {totalUsers} members • {isMuted ? "🔇 Muted" : "🔊 Active"}
            {isStarred && " • ⭐ Starred"}
          </Typography>
        </Grid>
      </Grid> 
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <IconButton onClick={handleSearchMessages}>
          <SearchIcon />
        </IconButton>
        
        <AvatarGroup
          max={3}
          total={totalUsers}
          sx={{ cursor: "pointer" }}
          onClick={handleViewGroup}
        >
          {currentChat?.users?.map((user) => (
            <Tooltip title={user?.full_name} key={user?.id}>
              <Avatar
                alt={user?.full_name}
                src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
              />
            </Tooltip>
          ))}
          {currentChat?.admin?.map((user) => (
            <Tooltip title={user?.full_name + " (Admin)"} key={user?.id}>
              <Avatar
                alt={user?.full_name}
                src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
              />
            </Tooltip>
          ))}
        </AvatarGroup>

        <IconButton
          onClick={handleMenuOpen}
          sx={{
            backgroundColor: open ? "#0D6EFD" : "transparent",
            borderRadius: "50%",
            padding: "8px",
            transition: "background-color 0.3s ease",
            "&:hover": {
              backgroundColor: "#0D6EFD",
            },
          }}
        >
          <ExpandMoreRoundedIcon
            sx={{
              color: open ? "white" : "#130F26",
              transition: "color 0.3s ease",
            }}
          />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          PaperProps={{
            elevation: 3,
            sx: {
              width: "220px",
              padding: "8px",
              borderRadius: "12px",
              border: "1px solid #DCDCDC",
              "& .MuiMenuItem-root": {
                padding: "10px 12px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "#333",
                borderRadius: "8px",
                "&:hover": {
                  backgroundColor: "#0D6EFD",
                  color: "#FFFFFF",
                },
              },
            },
          }}
        >
          <MenuItem onClick={handleViewGroup}>
            <ListItemIcon>
              <GroupIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Group info</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleSearchMessages}>
            <ListItemIcon>
              <SearchIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Search messages</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleViewMedia}>
            <ListItemIcon>
              <PhotoLibraryIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Media, links, docs</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleToggleMute}>
            <ListItemIcon>
              <NotificationsOffIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{isMuted ? "Unmute notifications" : "Mute notifications"}</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleToggleStarred}>
            <ListItemIcon>
              <StarIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{isStarred ? "Unstar chat" : "Star chat"}</ListItemText>
          </MenuItem>
          <Divider sx={{ my: 1 }} />
          <MenuItem sx={{ color: "#e53935" }}>
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" sx={{ color: "#e53935" }} />
            </ListItemIcon>
            <ListItemText>Exit group</ListItemText>
          </MenuItem>
        </Menu>
      </Box>

      {/* WhatsApp-style Group Details Dialog */}
      <Dialog 
        open={groupDialogOpen} 
        onClose={handleCloseGroupDialog}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: "12px",
            overflowY: "visible"
          }
        }}
      >
        <Box sx={{ position: "relative" }}>
          <Box 
            sx={{ 
              height: "200px", 
              backgroundColor: "#128C7E", 
              backgroundImage: currentChat?.batch?.course?.image 
                ? `url(${getImageUrl(currentChat?.batch?.course?.image)})` 
                : undefined,
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              position: "relative"
            }}
          >
            <IconButton 
              onClick={handleCloseGroupDialog}
              sx={{ 
                position: "absolute", 
                top: 8, 
                left: 8,
                backgroundColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.5)",
                }
              }}
            >
              <CloseIcon sx={{ color: "white" }} />
            </IconButton>
            
            <IconButton 
              onClick={handleMoreOptionsOpen}
              sx={{ 
                position: "absolute", 
                top: 8, 
                right: 8,
                backgroundColor: "rgba(255,255,255,0.3)",
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.5)",
                }
              }}
            >
              <MoreVertIcon sx={{ color: "white" }} />
            </IconButton>
            
            <Box sx={{ padding: "16px", color: "white" }}>
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {currentChat?.batch?.batch_name}
              </Typography>
              <Typography variant="body2">
                Group • {totalUsers} participants
              </Typography>
            </Box>
          </Box>
          
          <Tabs
            value={currentTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{ borderBottom: 1, borderColor: 'divider' }}
          >
            <Tab label="Info" />
            <Tab label="Media" />
            <Tab label="Files" />
            <Tab label="Links" />
          </Tabs>
          
          <DialogContent sx={{ p: 0, mt: 2 }}>
            {currentTab === 0 && (
              <Box>
                <Box sx={{ p: 2, backgroundColor: "#F8F9FA" }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Description
                  </Typography>
                  <Typography variant="body2">
                    {currentChat?.description || "No description available for this group. As a group admin, you can add a description."}
                  </Typography>
                </Box>
                
                <List sx={{ pt: 0 }}>
                  <ListItem>
                    <ListItemIcon>
                      <NotificationsOffIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Mute notifications" 
                      secondary={isMuted ? "Muted" : "Receive notifications"} 
                    />
                    <Switch 
                      checked={isMuted}
                      onChange={handleToggleMute}
                      edge="end"
                    />
                  </ListItem>
                  
                  <ListItem>
                    <ListItemIcon>
                      <StarIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Starred messages" 
                      secondary="View starred messages"
                    />
                    <Switch 
                      checked={isStarred}
                      onChange={handleToggleStarred}
                      edge="end"
                    />
                  </ListItem>
                  
                  <Divider />
                  
                  <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {totalUsers} participants
                    </Typography>
                    
                    <Box sx={{ display: "flex", alignItems: "center", my: 1 }}>
                      <TextField
                        placeholder="Search participants"
                        variant="outlined"
                        fullWidth
                        size="small"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <SearchIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Box>
                    
                    <Box sx={{ mt: 2, maxHeight: "300px", overflowY: "auto" }}>
                      {/* Admin list */}
                      {currentChat?.admin?.map((user) => (
                        <ListItem key={user.id}>
                          <ListItemAvatar>
                            <Badge 
                              overlap="circular"
                              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                              badgeContent={
                                <Box
                                  sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: '#4CAF50',
                                    border: '2px solid white',
                                  }}
                                />
                              }
                            >
                              <Avatar
                                alt={user?.full_name}
                                src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
                              />
                            </Badge>
                          </ListItemAvatar>
                          <ListItemText 
                            primary={user?.full_name}
                            secondary="Group admin" 
                          />
                        </ListItem>
                      ))}
                      
                      {/* Regular participants */}
                      {currentChat?.users?.map((user) => (
                        <ListItem key={user.id}>
                          <ListItemAvatar>
                            <Avatar
                              alt={user?.full_name}
                              src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
                            />
                          </ListItemAvatar>
                          <ListItemText primary={user?.full_name} />
                        </ListItem>
                      ))}
                    </Box>
                  </Box>
                  
                  <Divider />
                  
                  <ListItem sx={{ color: "#0D6EFD" }}>
                    <ListItemIcon>
                      <PersonAddIcon sx={{ color: "#0D6EFD" }} />
                    </ListItemIcon>
                    <ListItemText primary="Add participant" />
                  </ListItem>
                  
                  <ListItem sx={{ color: "#e53935" }}>
                    <ListItemIcon>
                      <ExitToAppIcon sx={{ color: "#e53935" }} />
                    </ListItemIcon>
                    <ListItemText primary="Exit group" />
                  </ListItem>
                  
                  <ListItem sx={{ color: "#e53935" }}>
                    <ListItemIcon>
                      <ReportIcon sx={{ color: "#e53935" }} />
                    </ListItemIcon>
                    <ListItemText primary="Report group" />
                  </ListItem>
                </List>
              </Box>
            )}
            
            {currentTab === 1 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
                  <ImageIcon sx={{ fontSize: 40, opacity: 0.5, mb: 1 }} />
                  <br />
                  No media found in this group.
                </Typography>
              </Box>
            )}
            
            {currentTab === 2 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
                  <InsertDriveFileIcon sx={{ fontSize: 40, opacity: 0.5, mb: 1 }} />
                  <br />
                  No documents found in this group.
                </Typography>
              </Box>
            )}
            
            {currentTab === 3 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body1" color="textSecondary" sx={{ textAlign: "center" }}>
                  <LinkIcon sx={{ fontSize: 40, opacity: 0.5, mb: 1 }} />
                  <br />
                  No links found in this group.
                </Typography>
              </Box>
            )}
          </DialogContent>
        </Box>
      </Dialog>
      
      {/* More options menu */}
      <Menu
        anchorEl={moreOptionsAnchorEl}
        open={moreOptionsOpen}
        onClose={handleMoreOptionsClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          elevation: 3,
          sx: {
            width: "180px",
            padding: "8px",
            borderRadius: "12px",
          },
        }}
      >
        <MenuItem onClick={handleMoreOptionsClose}>
          <ListItemIcon>
            <LockIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Privacy" />
        </MenuItem>
        <MenuItem onClick={handleMoreOptionsClose}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" sx={{ color: "#e53935" }} />
          </ListItemIcon>
          <ListItemText primary="Delete chat" sx={{ color: "#e53935" }} />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default ChatHeader;