import React, { useState } from "react";
import {
  Avatar,
  Box,
  Typography,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import KeyboardBackspaceSharpIcon from "@mui/icons-material/KeyboardBackspaceSharp";
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";
import { formatDate, formatTime } from "utils/formatDate";
import { deleteNotification } from "../services";

const NotificationView = ({ handleBack, selectedNotification }) => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  // Handles notification deletion
  const handleDelete = async (id) => {
    try {
      await deleteNotification({ uuid: id });
      setSuccessMessage("Notification deleted successfully.");
      setErrorMessage("");
    } catch (error) {
      console.error("Error deleting notification:", error);
      setErrorMessage("Failed to delete the notification. Please try again.");
    } finally {
      setOpenSnackbar(true);
    }
  };

  // Confirm deletion
  const handleConfirmDelete = () => setConfirmDeleteOpen(true);

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
        height: "90vh",
        backgroundColor: "#FFF",
        padding: "24px",
        ml:"40px",
        mb:"60px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      {/* Header Section */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IconButton onClick={handleBack} aria-label="Go back" sx={{ color: "#4A4A4A" }}>
          <KeyboardBackspaceSharpIcon fontSize="medium" />
        </IconButton>
        <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <IconButton
            onClick={handleConfirmDelete}
            aria-label="Delete notification"
            sx={{
              color: "#F44336",
              ":hover": { backgroundColor: "rgba(244, 67, 54, 0.1)" },
            }}
          >
            <DeleteOutlineOutlinedIcon fontSize="medium" />
          </IconButton>
          <Typography sx={{ color: "#7F7F7F", fontSize: "16px", fontWeight: 400 }}>
            {selectedNotification?.createdAt
              ? `${formatDate(selectedNotification.createdAt)} - ${formatTime(
                  selectedNotification.createdAt
                )}`
              : "No date available"}
          </Typography>
        </Box>
      </Box>

      {/* Notification Details */}
      <Box sx={{ display: "flex", gap: "30px", mt: 2 }}>
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
        </Box>
      </Box>

      {/* Body Section */}
      <Box sx={{ flex: 1, mt: 8 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 400, color: "#000", lineHeight: 1.5 }}>
          {selectedNotification?.body || "No details provided."}
        </Typography>
        <Typography sx={{ fontSize: "16px", color: "#7F7F7F", mt: 2 }}>
          {selectedNotification?.title || ""}
        </Typography>
      </Box>

      {/* Snackbar for Feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={errorMessage ? "error" : "success"}
          sx={{ width: "100%" }}
        >
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
          <Button
            onClick={() => setConfirmDeleteOpen(false)}
            color="primary"
            sx={{
              ":hover": {
                backgroundColor: "rgba(25, 118, 210, 0.08)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteConfirm}
            color="error"
            sx={{
              ":hover": {
                backgroundColor: "rgba(244, 67, 54, 0.1)",
                color: "#D32F2F",
              },
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default NotificationView;
