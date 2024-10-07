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
  Tooltip, Badge
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
  const open = Boolean(anchorEl);

  const [muteOpen, setMuteOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [wallpaperOpen, setWallpaperOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMuteOpen = () => {
    setMuteOpen(true);
    handleMenuClose();
  };

  const handleReportOpen = () => {
    setReportOpen(true);
    handleMenuClose();
  };

  const handleWallpaperOpen = () => {
    setWallpaperOpen(true);
    handleMenuClose();
  };

  const handleMediaOpen = () => {
    setMediaOpen(true);
    handleMenuClose();
  };

  const handleSearchOpen = () => {
    setSearchOpen(true);
  };

  const handleSearchClose = () => {
    setSearchOpen(false);
    setSearchText("");
  };

  const handleCall = () => {
    
    console.log("Initiating a call...");
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

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
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
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
            <Avatar
              key={user?.id}
              alt={user?.full_name}
              src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
            />
          ))}
          {currentChat?.admin?.map((user) => (
            <Avatar
              key={user?.id}
              alt={user?.full_name}
              src={user?.image ? getImageUrl(user?.image) : profilePlaceholder}
            />
          ))}
        </AvatarGroup>
        <Tooltip title="Call feature coming soon!">
          <Badge
            badgeContent="Soon"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f0a500",
                color: "white",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                padding: "0 4px",
              },
            }}
          >
            <IconButton onClick={handleCall} disabled>
              <CallIcon />
            </IconButton>
         </Badge>
        </Tooltip>
        <Tooltip title="Search feature coming soon!">
          <Badge
            badgeContent="Soon"
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f0a500",
                color: "white",
                fontSize: "10px",
                fontWeight: "bold",
                borderRadius: "4px",
                padding: "0 4px",
              },
            }}
          >
             <IconButton onClick={handleSearchOpen} disabled>
                <SearchIcon />
             </IconButton>
          </Badge>
        </Tooltip>
       
        <IconButton
          onClick={handleMenuOpen}
          sx={{ backgroundColor: open ? "#0D6EFD" : "white" }}
        >
          <ExpandMoreRoundedIcon
            sx={{ color: open ? "white" : "#130F26", cursor: "pointer" }}
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
                justifyItems: "center",
                alignItems: "center",
                "&:hover": {
                  backgroundColor: "#0D6EFD",
                  color: "#FFFFFF",
                },
              },
            },
          }}
        >
           <MenuItem onClick={handleMuteOpen} disabled>
            Mute Notification
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "#f0a500",
                fontStyle: "italic",
                position: "relative",
                right: "-20px",
              }}
            >
              Coming Soon
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleReportOpen} disabled>
            Report
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "#f0a500",
                fontStyle: "italic",
                position: "relative",
                right: "-20px",
              }}
            >
              Coming Soon
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleWallpaperOpen} disabled>
            Wallpaper
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "#f0a500",
                fontStyle: "italic",
                position: "relative",
                right: "-20px",
              }}
            >
              Coming Soon
            </Typography>
          </MenuItem>
          <MenuItem onClick={handleMediaOpen} disabled>
            Group Media
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "#f0a500",
                fontStyle: "italic",
                position: "relative",
                right: "-20px",
              }}
            >
              Coming Soon
            </Typography>
          </MenuItem>

          <MenuItem disabled>
            Batch
            <Typography
              sx={{
                marginLeft: "auto",
                fontSize: "12px",
                color: "#f0a500",
                fontStyle: "italic",
                position: "relative",
                right: "-20px",
              }}
            >
              Coming Soon
            </Typography>
          </MenuItem>
        </Menu>
      </Box>

      <MuteNotificationModel open={muteOpen} setMuteOpen={setMuteOpen} />
      <ReportModel open={reportOpen} setReportOpen={setReportOpen} />
      <AddWallpaper open={wallpaperOpen} setWallpaperOpen={setWallpaperOpen} />
      <MediaModel open={mediaOpen} setMediaOpen={setMediaOpen} />

      {/* Search Dialog */}
      <Dialog open={searchOpen} onClose={handleSearchClose}>
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
          <Button onClick={handleSearchClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSearchClose} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ChatHeader;
