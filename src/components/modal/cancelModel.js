// src/components/CancelDialog.js
import React from "react";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  confirmButton: {
    "&:hover": {
      color: "#FFFFFF",
      fontSize: "16px",
      fontWeight: 400,
      backgroundColor: "#5611B1",
      borderRadius: "48px",
      px: "42px",
      py: "12px",
    },
  },
});

function CancelDialog({
  open,
  onClose,
  title,
  content,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}) {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <Box sx={{ bgcolor: "white", p: "80px" }}>
        {/* <DialogTitle id="alert-dialog-title">{title}</DialogTitle> */}
        <DialogContent sx={{ display: "flex", justifyContent: "center" }}>
          <DialogContentText
            id="alert-dialog-description"
            sx={{ color: "#000000", fontSize: "16px", fontWeight: 600 }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: "40px" }}>
          <Button
            onClick={onCancel}
            size={"small"}
            sx={{
              color: "#001E6C",
              fontSize: "16px",
              border: "1px solid #001E6C",
              borderRadius: "48px",
              fontWeight: 400,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              px: "38px",
              py: "12px",
            }}
            color="primary"
          >
            {cancelText}
          </Button>
          <Button
            onClick={onConfirm}
            className={classes.confirmButton}
            size="small"
            sx={{
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: 400,
              backgroundColor: "#5611B1",
              borderRadius: "48px",
              px: "42px",
              py: "12px",
            }}
            color="primary"
            autoFocus
          >
            {confirmText}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

CancelDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  cancelText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default CancelDialog;
