import React, { useState } from "react";
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
import { deleteNotification } from "../services";

const NotificationView = ({ selectedNotification }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await deleteNotification({ uuid: id });
      setSuccessMessage("Notification deleted successfully.");
      setErrorMessage(""); // Reset error message if successful
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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh", // Ensure the component occupies full viewport height
        backgroundColor: "#FFF",
        padding: "24px",
      }}
    >
      {/* Header Section */}
      <Box sx={{ width: "100%", maxWidth: "800px", paddingBottom: "20px" }}>
        <Typography
          variant="h3"
          sx={{ fontWeight: 600, color: "#333", paddingBottom: "8px" }}
        >
          Notification Details
        </Typography>
        <Typography sx={{ fontSize: "20px", color: "#757575" }}>
          View the full details of the notification.
        </Typography>
      </Box>

      {/* Notification Details */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: "100%",
          maxWidth: "600px", // Ensuring the content is readable on all screen sizes
          boxSizing: "border-box",
          padding: "24px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Notification Header (Profile + Title) */}
        <Box sx={{ display: "flex", gap: "16px", alignItems: "center" }}>
          <Avatar
            src={
              selectedNotification?.student?.image
                ? getImageUrl(selectedNotification.student.image)
                : profilePlaceholder
            }
            alt="Profile"
            sx={{ width: "60px", height: "60px", border: "2px solid #F0F0F0" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography sx={{ fontSize: "18px", fontWeight: 700, color: "#000" }}>
              {selectedNotification?.title || "No Title"}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#555" }}>
              {selectedNotification?.body || "No additional details available."}
            </Typography>
            <Typography sx={{ fontSize: "14px", color: "#7F7F7F" }}>
              {selectedNotification?.createdAt
                ? `${formatDate(selectedNotification.createdAt)} - ${formatTime(
                    selectedNotification.createdAt
                  )}`
                : "No date available"}
            </Typography>
          </Box>
        </Box>

        {/* Delete Button */}
        <Box sx={{ display: "flex", justifyContent: "end", marginTop: "auto" }}>
          <IconButton
            onClick={() => setConfirmDeleteOpen(true)}
            aria-label="Delete notification"
            sx={{ color: "#F44336" }}
          >
            <DeleteOutlineOutlinedIcon fontSize="large" />
          </IconButton>
        </Box>
      </Box>

      {/* Snackbar for Feedback */}
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

      {/* Delete Confirmation Dialog */}
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
