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
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";
import ChatGroupDetails from "./Models/Chatgroupdetails"; // Import the GroupDetails component

const ChatHeader = ({ currentChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [viewGroup, setViewGroup] = useState(false); // State to toggle group details view

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleViewGroup = () => {
    setViewGroup(true);
    handleMenuClose();
  };

  // Render the group details page if `viewGroup` is true
  if (viewGroup) {
    return <ChatGroupDetails currentChat={currentChat} setViewGroup={setViewGroup} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
      
        
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
          />
        </Grid>
        <Grid item>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {currentChat?.batch?.batch_name}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AvatarGroup
          max={3}
          total={currentChat?.users?.length + currentChat?.admin?.length}
        >
          {currentChat?.users?.map((user) => (
            <Tooltip title={user?.full_name} key={user?.id}>
              <Avatar
                alt={user?.full_name}
                src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          ))}
          {currentChat?.admin?.map((user) => (
            <Tooltip title={user?.full_name} key={user?.id}>
              <Avatar
                alt={user?.full_name}
                src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
                sx={{ cursor: "pointer" }}
              />
            </Tooltip>
          ))}
        </AvatarGroup>

        <IconButton
  onClick={handleMenuOpen}
  sx={{
    backgroundColor: open ? "#0D6EFD" : "blue",
    color: open ? "white" : "white",
    "&:hover": { backgroundColor: open ? "#0B5ED7" : "#6B0FB2" },
  }}
>
  <ExpandMoreRoundedIcon />
</IconButton>
<Menu
  anchorEl={anchorEl}
  open={open}
  onClose={handleMenuClose}
  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
  transformOrigin={{ vertical: "top", horizontal: "right" }}
  PaperProps={{
    elevation: 3,
    sx: {
      p: 2,
      borderRadius: 3,
      border: "1px solid #E0E0E0",
      boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.1)",
      "& .MuiMenuItem-root": {
        px: 2,
        py: 0.5,
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "black",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      },
    },
  }}
>
  <MenuItem onClick={handleViewGroup}>View Group</MenuItem>
</Menu>

      </Box>
    </Box>
  );
};

export default ChatHeader;
