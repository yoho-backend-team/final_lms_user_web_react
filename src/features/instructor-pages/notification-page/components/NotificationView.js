import { Avatar, Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { useState } from "react";

const NotificationView = ({ selectedNotification, onDelete }) => {
  const [visible, setVisible] = useState(true);

  const handleDelete = () => {
    setVisible(false);
    if (onDelete) {
      onDelete(selectedNotification?.id);
    }
  };

  if (!visible) return null;

  return (
    <Box
      sx={{
        height: "90vh",
        backgroundColor: "#FFF",
        color: "0px 0px 64px 0px #0000001a",
        padding: "31px 28px 18px 24px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", gap: "13px" }}>
          <Box>
            <Avatar
              src={
                selectedNotification?.staff?.image
                  ? getImageUrl(selectedNotification?.staff?.image)
                  : profilePlaceholder
              }
              alt="image"
              sx={{
                width: "52px",
                height: "52px",
                borderRadius: "52px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 700 }}>
              {selectedNotification?.title}
            </Typography>
            <Typography>{selectedNotification?.body}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "22px", alignItems: "center" }}>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon sx={{ color: "#7F7F7F" }} />
          </IconButton>
          <Box>
            <Typography sx={{ color: "#7F7F7F", fontSize: "11.5px", fontWeight: 400 }}>
              {new Date().toLocaleDateString()} : {new Date().toLocaleTimeString()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>
          <Typography sx={{ color: "#000000", fontSize: "23px", fontWeight: 400, py: "22px" }}>
            UI project : Client Dashboard
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: "#7F7F7F", fontSize: "11.4px", fontWeight: 400, lineHeight: "normal" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis tellus id interdum velit laoreet. Enim eu turpis egestas pretium. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Convallis tellus id interdum velit laoreet. Enim eu turpis egestas pretium
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationView;