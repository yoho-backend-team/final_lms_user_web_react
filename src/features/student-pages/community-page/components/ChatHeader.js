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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";
import CallIcon from "assets/icons/callIcon";

const ChatHeader = ({ currentChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogState, setDialogState] = useState({
    muteOpen: false,
    reportOpen: false,
    wallpaperOpen: false,
    mediaOpen: false,
    userDetailsOpen: false,
  });

  const isTablet = useMediaQuery("(max-width: 768px)"); // Check for tablet screen size
  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const toggleDialog = (type, state) => {
    setDialogState((prevState) => ({ ...prevState, [type]: state }));
    if (state === false) handleMenuClose();
  };

  const handleCall = () => console.log("Initiating a call...");

  const handleAvatarClick = () => {
    toggleDialog("userDetailsOpen", true); // Open the dialog to show all users
  };

  const menuItems = [
    { label: "Mute Notification", action: () => toggleDialog("muteOpen", true) },
    { label: "Report", action: () => toggleDialog("reportOpen", true) },
    { label: "Wallpaper", action: () => toggleDialog("wallpaperOpen", true) },
    { label: "Group Media", action: () => toggleDialog("mediaOpen", true) },
  ];

  const totalMembers =
    (currentChat?.users?.length || 0) + (currentChat?.admin?.length || 0);

  const allUsers = [...(currentChat?.users || []), ...(currentChat?.admin || [])];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: isTablet ? "center" : "space-between",
        alignItems: "center",
        flexDirection: isTablet ? "column" : "row",
        padding: isTablet ? "12px" : "16px",
        gap: isTablet ? 2 : 0,
      }}
    >
      {/* Left Section */}
      <Grid
        container
        alignItems="center"
        spacing={2}
        justifyContent={isTablet ? "center" : "flex-start"}
      >
        <Grid item>
          <Avatar
            sx={{ width: isTablet ? 50 : 40, height: isTablet ? 50 : 40 }}
            src={
              currentChat?.batch?.course?.image
                ? getImageUrl(currentChat?.batch?.course?.image)
                : imagePlaceholder
            }
            variant="square"
          />
        </Grid>
        <Grid item>
          <Typography
            variant={isTablet ? "h5" : "h6"}
            sx={{ fontWeight: 700, textAlign: isTablet ? "center" : "left" }}
          >
            {currentChat?.batch?.batch_name || "Chat Name"}
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ textAlign: isTablet ? "center" : "left" }}
          >
            {`Group Members: ${totalMembers}`}
          </Typography>
        </Grid>
      </Grid>

      {/* Right Section */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: isTablet ? 1 : 2,
          justifyContent: isTablet ? "center" : "flex-end",
          flexWrap: isTablet ? "wrap" : "nowrap",
        }}
      >
        <AvatarGroup
          max={isTablet ? 4 : 3}
          total={totalMembers}
          sx={{ justifyContent: "center" }}
        >
          {allUsers.map((user) => (
            <Avatar
              key={user?.id}
              alt={user?.full_name}
              src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
              onClick={handleAvatarClick} // Show all user details on click
              sx={{ cursor: "pointer", width: isTablet ? 45 : 40, height: isTablet ? 45 : 40 }}
            />
          ))}
        </AvatarGroup>

        <IconButton
          onClick={handleCall}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#E0E0E0",
              color: "#0D6EFD",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
            width: isTablet ? 48 : "auto",
            height: isTablet ? 48 : "auto",
          }}
          aria-label="Initiate call"
        >
          <CallIcon />
        </IconButton>

        <IconButton
          onClick={handleMenuOpen}
          sx={{
            backgroundColor: openMenu ? "#0D6EFD" : "white",
            width: isTablet ? 48 : "auto",
            height: isTablet ? 48 : "auto",
          }}
          aria-controls={openMenu ? "menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
        >
          <ExpandMoreRoundedIcon
            sx={{ color: openMenu ? "white" : "#130F26", fontSize: isTablet ? 30 : "default" }}
          />
        </IconButton>

        <Menu
          id="menu"
          anchorEl={anchorEl}
          open={openMenu}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            elevation: 0,
            sx: {
              padding: isTablet ? "16px" : "24px 21px 44px 21px",
              borderRadius: "28px",
              border: "1px solid #DCDCDC",
              boxShadow: "0px 4px 54px 0px rgba(0, 0, 0, 0.25)",
              "& .MuiMenuItem-root": {
                padding: "10px",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "28px",
                color: "black",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#0D6EFD",
                  color: "#FFFFFF",
                },
              },
            },
          }}
        >
          {menuItems.map((item, index) => (
            <MenuItem key={index} onClick={item.action}>
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* All Users Dialog */}
      <Dialog
        open={dialogState.userDetailsOpen}
        onClose={() => toggleDialog("userDetailsOpen", false)}
      >
        <DialogTitle>All Users</DialogTitle>
        <DialogContent>
          <List>
            {allUsers.map((user) => (
              <ListItem key={user?.id} sx={{ marginBottom: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    src={
                      user?.image
                        ? getImageUrl(user?.image)
                        : profilePlaceholder
                    }
                    alt={user?.full_name}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={user?.full_name || "Name not available"}
                  secondary={
                    <>
                      <Typography variant="body2" color="textSecondary">
                        {user?.email || "Email not available"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user?.phone || "Phone number not available"}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user?.role || "Role not available"}
                      </Typography>
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => toggleDialog("userDetailsOpen", false)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHeader;
