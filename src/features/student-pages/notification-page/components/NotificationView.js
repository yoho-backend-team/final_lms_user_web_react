import React, { useState, useEffect } from "react";
import {
  Avatar,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { formatDate, formatTime } from "utils/formatDate";
import { deleteNotification, updateNotificationStatus } from "../services";
import { useDispatch } from "react-redux";
import { setSelectedNotification } from "features/common/redux/slices";

const NotificationView = ({ selectedNotification, handleDeleteNotification }) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  useEffect(() => {
    if (selectedNotification?.uuid) {
      markNotificationAsRead(selectedNotification.uuid);
    }
  }, [selectedNotification]);

  const markNotificationAsRead = async (id) => {
    try {
      await updateNotificationStatus({ uuid: id, status: "read" });
      console.log("Notification marked as read.");
    } catch (error) {
      console.error("Error updating notification status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification({ uuid: id });
      setSuccessMessage("Notification deleted successfully.");
      setErrorMessage("");
      dispatch(setSelectedNotification(null));
      handleDeleteNotification(id);
    } catch (error) {
      console.error("Error deleting notification:", error);
      setErrorMessage("Failed to delete the notification. Please try again.");
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleDeleteConfirm = () => {
    if (selectedNotification?.uuid) {
      handleDelete(selectedNotification.uuid);
    }
    setConfirmDeleteOpen(false);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setSuccessMessage("");
    setErrorMessage("");
  };

  if (!selectedNotification) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",                                                                 
          height: "100vh",
          backgroundColor: "#FFF",
          padding: "24px",
          textAlign: "center",
        }}
      >
        <Typography sx={{ fontSize: "18px", color: "#757575", fontWeight: 600 }}>
          No Notifications Available
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100vh",
        backgroundColor: "#FFF",
        padding: "16px",
      }}
    >
      <Box sx={{ paddingBottom: "12px" }}>
        <Typography variant="h5" sx={{ fontWeight: 600, color: "#333" }}>
          Notification Details
        </Typography>
        <Typography sx={{ fontSize: "14px", color: "#757575" }}>
          View the full details of the notification.
        </Typography>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box sx={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <Avatar
            src={
              selectedNotification?.student?.image
                ? getImageUrl(selectedNotification.student.image)
                : profilePlaceholder
            }
            alt="Profile"
            sx={{ width: "50px", height: "50px", border: "2px solid #F0F0F0" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "#000" }}>
              {selectedNotification?.title || "No Title"}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              {selectedNotification?.body || "No additional details available."}
            </Typography>
            <Typography sx={{ fontSize: "12px", color: "#7F7F7F" }}>
              {selectedNotification?.createdAt
                ? `${formatDate(selectedNotification.createdAt)} - ${formatTime(selectedNotification.createdAt)}`
                : "No date available"}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "end" }}>
        <IconButton
          onClick={() => setConfirmDeleteOpen(true)}
          aria-label="Delete notification"
          sx={{ color: "#F44336" }}
        >
          <DeleteOutlineOutlinedIcon fontSize="large" />
        </IconButton>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity={errorMessage ? "error" : "success"}>
          {successMessage || errorMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={confirmDeleteOpen}
        onClose={() => setConfirmDeleteOpen(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Delete Notification</DialogTitle>
        <DialogContent>
          <Typography id="delete-dialog-description">
            Are you sure you want to delete this notification? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationView;
