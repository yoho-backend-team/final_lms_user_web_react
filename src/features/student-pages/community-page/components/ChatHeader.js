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
import GroupDetails from "./Models/GroupDetails"; // Import the GroupDetails component

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

  const totalMembers =
    (currentChat?.users?.length || 0) + (currentChat?.admin?.length || 0);

  // Render the group details page if `viewGroup` is true
  if (viewGroup) {
    return <GroupDetails currentChat={currentChat} setViewGroup={setViewGroup} />;
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
          <Typography variant="body2" sx={{ color: "#666" }}>
            {totalMembers} {totalMembers === 1 ? "member" : "members"}
          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AvatarGroup max={3}>
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
              padding: "14px 8px",
              borderRadius: "12px",
              border: "1px solid #DCDCDC",
              // boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
              "& .MuiMenuItem-root": {
                padding: "10px 20px",
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
          <MenuItem onClick={handleViewGroup}>View Group</MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

export default ChatHeader;
