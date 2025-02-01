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

const GroupDetails = ({ currentChat, setViewGroup }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        padding: "16px",
        backgroundColor: "#fff",
      }}
    >
      {/* Back Button */}
      <IconButton
        onClick={() => setViewGroup(false)}
        sx={{
          marginBottom: "16px",
          color: "#4caf50",
          "&:hover": {
            backgroundColor: "#4caf50",
            color: "#fff",
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
          marginBottom: "24px",
        }}
      >
        <Box
          sx={{
            width: "30%",
            maxWidth: "300px",
            height: "130px",
            backgroundImage: `url(${currentChat?.batch?.course?.image ? getImageUrl(currentChat?.batch?.course?.image) : imagePlaceholder})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            // boxShadow: 3,
            marginBottom: "16px",
          }}
        />
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#333",
            wordWrap: "break-word",
            marginBottom: "8px",
          }}
        >
          {currentChat?.batch?.batch_name || "Group Name"}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            fontStyle: "italic",
            color: "#555",
          }}
        >
          {currentChat?.batch?.description || "No description available."}
        </Typography>
      </Box>

      {/* Admins Section */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          marginBottom: "8px",
          color: "#333",
        }}
      >
        Admins
      </Typography>
      <List sx={{ marginBottom: "16px" }}>
        {currentChat?.admin?.map((admin) => (
          <ListItem
            key={admin.id}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <ListItemAvatar>
              <CustomAvatar src={admin.image} alt={admin.full_name} size={50} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontWeight: "500",
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
          marginBottom: "8px",
          color: "#333",
        }}
      >
        Users
      </Typography>
      <List>
        {currentChat?.users?.map((user) => (
          <ListItem
            key={user.id}
            sx={{
              
              display: "flex",
              alignItems: "center",
              padding: "8px 16px",
            }}
          >
            <ListItemAvatar>
              <CustomAvatar src={user.image} alt={user.full_name} size={50} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography
                  variant="body1"
                  sx={{
                    color: "#333",
                    fontWeight: "400",
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
  );
};

export default GroupDetails;
