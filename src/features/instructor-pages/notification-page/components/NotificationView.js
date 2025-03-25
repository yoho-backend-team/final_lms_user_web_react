import { Avatar, Box, IconButton, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteInstructorNotifications } from "features/common/redux/thunks";
import { get } from "lodash";

const NotificationView = ({ selectedNotification, onDelete }) => {
  const dispatch = useDispatch();
  console.log(selectedNotification, "selectedNotification");

  const handleDelete = () => {
    dispatch(deleteInstructorNotifications({uuid: selectedNotification?.uuid}));
  };

  const getFormattedTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <Box
      sx={{
        height: "90vh",
        backgroundColor: "#FFF",
        color: "0px 0px 64px 0px #0000001a",
        padding: "31px 28px 18px 24px",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
        <Box sx={{ display: "flex", gap: "8px" }}>
          <Box>
            {/* <Avatar
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
            /> */}
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: 700 }}>
              {selectedNotification?.title}
            </Typography>
            <Typography sx={{width: '80%'}}>{selectedNotification?.body}</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <IconButton onClick={handleDelete}>
            <DeleteOutlineOutlinedIcon sx={{ color: "red" }} />
          </IconButton>
          <Box>
            <Typography sx={{ color: "#7F7F7F", fontSize: "11px", fontWeight: 400 }}>
              {getFormattedTime(selectedNotification?.createdAt)}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationView;