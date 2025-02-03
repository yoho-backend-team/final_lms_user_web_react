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
import { calcLength } from "framer-motion";

const CustomAvatar = ({ src, alt, size = 60 }) => (
  <Avatar
    src={src ? getImageUrl(src) : profilePlaceholder}
    alt={alt}
    sx={{
      width: size,
      height: size,
      border: "2px solid #ddd",
      boxShadow: 2,
    }}
  />
);

const ChatGroupDetails = ({ currentChat, setViewGroup }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        
        overflowY:"hidden",
        padding: 2,
        backgroundColor: "background.default",
        color: "text.primary",
        display: "flex",
        flexDirection: "column",
      
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => setViewGroup(false)}
        sx={{
          alignSelf: "flex-start",
          marginBottom: 2,
          color: "primary.main",
          "&:hover": {
            backgroundColor: "primary.light",
          },
        }}
      >
        <ArrowBackIcon />
      </IconButton>

      {/* Group Image and Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Box
          sx={{
            width: { xs: "80%", sm: "50%", md: "30%" },
            height: 130,
            backgroundImage: `url(${
              currentChat?.batch?.course?.image
                ? getImageUrl(currentChat?.batch?.course?.image)
                : imagePlaceholder
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            boxShadow: 3,
            marginBottom: 1,
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            wordWrap: "break-word",
            marginBottom: 1,
          }}
        >
          {currentChat?.batch?.batch_name || "Group Name"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontStyle: "italic",
            color: "text.secondary",
          }}
        >
          {currentChat?.batch?.description || "No description available."}
        </Typography>
      </Box>

      {/* Scrollable Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
        }}
      >
        {/* Admins Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          Admins
        </Typography>
        <List sx={{ padding: 0, marginBottom: 2 }}>
          {currentChat?.admin?.map((admin) => (
            <ListItem
              key={admin.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
              }}
            >
              <ListItemAvatar>
                <CustomAvatar
                  src={admin.image}
                  alt={admin.full_name}
                  size={50}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 500,
                    }}
                  >
                    {admin.full_name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>

        {/* Users Section */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          Users
        </Typography>
        <List sx={{ padding: 0 }}>
          {currentChat?.users?.map((user) => (
            <ListItem
              key={user.id}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 1,
              }}
            >
              <ListItemAvatar>
                <CustomAvatar
                  src={user.image}
                  alt={user.full_name}
                  size={50}
                />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 400,
                    }}
                  >
                    {user.full_name}
                  </Typography>
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default ChatGroupDetails;
