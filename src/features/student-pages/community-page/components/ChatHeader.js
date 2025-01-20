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
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";
import CallIcon from "assets/icons/callIcon";
import SearchIcon from "assets/icons/searchIcon";
import MuteNotificationModel from "./Models/MuteNotification";
import ReportModel from "./Models/ReportDialog";
import AddWallpaper from "./Models/WallPaperModel";
import MediaModel from "./Models/Media";

const ChatHeader = ({ currentChat }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [dialogState, setDialogState] = useState({
    muteOpen: false,
    reportOpen: false,
    wallpaperOpen: false,
    mediaOpen: false,
    searchOpen: false,
  });
  const [searchText, setSearchText] = useState("");

  const openMenu = Boolean(anchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const toggleDialog = (type, state) => {
    setDialogState((prevState) => ({ ...prevState, [type]: state }));
    if (state === false) handleMenuClose();
  };

  const handleCall = () => console.log("Initiating a call...");

  const handleSearchChange = (event) => setSearchText(event.target.value);

  const menuItems = [
    { label: "Mute Notification", action: () => toggleDialog("muteOpen", true) },
    { label: "Report", action: () => toggleDialog("reportOpen", true) },
    { label: "Wallpaper", action: () => toggleDialog("wallpaperOpen", true) },
    { label: "Group Media", action: () => toggleDialog("mediaOpen", true) },
  ];

  const totalMembers =
    (currentChat?.users?.length || 0) + (currentChat?.admin?.length || 0);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
      }}
    >
      {/* Left Section */}
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            sx={{ width: 40, height: 40 }}
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
            {currentChat?.batch?.batch_name || "Chat Name"}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {`Group Members: ${totalMembers}`}
          </Typography>
        </Grid>
      </Grid>

      {/* Right Section */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <AvatarGroup max={3} total={totalMembers}>
          {currentChat?.users?.map((user) => (
            <Avatar
              key={user?.id}
              alt={user?.full_name}
              src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
            />
          ))}
          {currentChat?.admin?.map((admin) => (
            <Avatar
              key={admin?.id}
              alt={admin?.full_name}
              src={admin?.image ? getImageUrl(admin?.image) : profilePlaceholder}
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
          }}
          aria-label="Initiate call"
        >
          <CallIcon />
        </IconButton>

        <IconButton
          onClick={() => toggleDialog("searchOpen", true)}
          sx={{
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "#E0E0E0",
              color: "#0D6EFD",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            },
          }}
          aria-label="Search"
        >
          <SearchIcon />
        </IconButton>

        <IconButton
          onClick={handleMenuOpen}
          sx={{ backgroundColor: openMenu ? "#0D6EFD" : "white" }}
          aria-controls={openMenu ? "menu" : undefined}
          aria-haspopup="true"
          aria-expanded={openMenu ? "true" : undefined}
        >
          <ExpandMoreRoundedIcon
            sx={{ color: openMenu ? "white" : "#130F26" }}
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
              padding: "24px 21px 44px 21px",
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

      {/* Modals */}
      <MuteNotificationModel
        open={dialogState.muteOpen}
        setMuteOpen={(state) => toggleDialog("muteOpen", state)}
      />
      <ReportModel
        open={dialogState.reportOpen}
        setReportOpen={(state) => toggleDialog("reportOpen", state)}
      />
      <AddWallpaper
        open={dialogState.wallpaperOpen}
        setWallpaperOpen={(state) => toggleDialog("wallpaperOpen", state)}
      />
      <MediaModel
        open={dialogState.mediaOpen}
        setMediaOpen={(state) => toggleDialog("mediaOpen", state)}
      />

      {/* Search Dialog */}
      <Dialog
        open={dialogState.searchOpen}
        onClose={() => toggleDialog("searchOpen", false)}
      >
        <DialogTitle>Search</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Search..."
            type="text"
            fullWidth
            variant="outlined"
            value={searchText}
            onChange={handleSearchChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => toggleDialog("searchOpen", false)}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => toggleDialog("searchOpen", false)}
            color="primary"
          >
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHeader;
