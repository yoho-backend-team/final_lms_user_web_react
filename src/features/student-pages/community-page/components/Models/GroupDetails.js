import React from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";

const CustomAvatar = ({ src, alt, size = 48 }) => (
  <Avatar
    src={src ? getImageUrl(src) : profilePlaceholder}
    alt={alt}
    sx={{
      width: size,
      height: size,
      border: "1px solid #ddd",
      boxShadow: 1,
    }}
  />
);

const GroupDetails = ({ currentChat, setViewGroup }) => {
  return (
    <Box sx={{ height: "100vh", overflowY: "auto", backgroundColor: "#fff" }}>
      {/* Top Section with Background Image */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "220px",
          backgroundImage: `url(${
            currentChat?.batch?.course?.image ? getImageUrl(currentChat?.batch?.course?.image) : imagePlaceholder
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "flex-end",
          padding: "16px",
          color: "white",
          "&::before": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: 0,
            left: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.6), rgba(0,0,0,0))",
          },
        }}
      >
        <IconButton
          onClick={() => setViewGroup(false)}
          sx={{
            position: "absolute",
            top: "12px",
            left: "12px",
            color: "white",
            backgroundColor: "rgba(255,255,255,0.2)",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {currentChat?.batch?.batch_name || "Group Name"}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {currentChat?.batch?.description || "No description available."}
          </Typography>
        </Box>
      </Box>

      {/* Group Members Section */}
      <Box sx={{ padding: "16px" }}>
        {/* Admins Section */}
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666", mb: 1 }}>
          Admins
        </Typography>
        <List sx={{ padding: 0 }}>
          {currentChat?.admin?.map((admin) => (
            <ListItem
              key={admin.id}
              sx={{
                padding: "10px 16px",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemAvatar>
                <CustomAvatar src={admin.image} alt={admin.full_name} size={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: "500", color: "#333" }}>{admin.full_name}</Typography>}
                secondary="Admin"
                secondaryTypographyProps={{ sx: { color: "#888", fontSize: "12px" } }}
              />
            </ListItem>
          ))}
        </List>

        {/* Users Section */}
        <Typography variant="body2" sx={{ fontWeight: "bold", color: "#666", mt: 3, mb: 1 }}>
          Participants
        </Typography>
        <List sx={{ padding: 0 }}>
          {currentChat?.users?.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                padding: "10px 16px",
                "&:hover": { backgroundColor: "#f5f5f5" },
              }}
            >
              <ListItemAvatar>
                <CustomAvatar src={user.image} alt={user.full_name} size={40} />
              </ListItemAvatar>
              <ListItemText
                primary={<Typography sx={{ fontWeight: "500", color: "#333" }}>{user.full_name}</Typography>}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default GroupDetails;
