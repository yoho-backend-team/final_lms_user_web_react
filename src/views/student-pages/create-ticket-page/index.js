import React, { useState } from "react";
import logo from "../../../assets/images/pages/auth-v2-forgot-password-illustration-light.png";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  useTheme,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
const CreateTicketPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedProblem, setSelectedProblem] = useState("");
  const [description, setDescription] = useState("");
  const [openCancelDialog, setOpenCancelDialog] = useState(false);

  const handleFileUpload = () => {};

  const handleCancel = () => {
    setOpenCancelDialog(true);
  };

  const handleCloseCancelDialog = () => {
    setOpenCancelDialog(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#F8F7FA",
        padding: "16px",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container>
        <Paper
          style={{
            padding: "16px",
            marginBottom: "16px",
            position: "relative",
            paddingLeft: "40px",
            paddingRight: "40px",
          }}
        >
          <Typography
            variant="h6"
            style={{
              textAlign: "left",
              marginTop: "16px",
              fontWeight: "bold",
              fontSize: "15px",
              color: "black",
            }}
          >
            Create Ticket for Your Problem
          </Typography>
          <div
            style={{ width: "100%", marginTop: "24px", marginBottom: "16px" }}
          >
            <InputLabel htmlFor="dropdown">Select your Problem</InputLabel>
            <Select
              id="dropdown"
              value={selectedProblem}
              style={{
                width: "230px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#F8F7FA",
                color: "black",
              }}
              onChange={(e) => setSelectedProblem(e.target.value)}
            >
              <MenuItem value={1}>Attendance issue</MenuItem>
              <MenuItem value={2}>Issue 2</MenuItem>
              <MenuItem value={3}>Issue 3</MenuItem>
            </Select>
          </div>
          <div
            style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
          >
            <InputLabel htmlFor="description">Description</InputLabel>
            <TextField
              id="description"
              multiline
              rows={4}
              style={{
                width: "70%",
                height: "auto",
                display: "flex",
                justifyContent: "center",
                background: "#F8F7FA",
                color: "black",
              }}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div
            style={{ width: "100%", marginTop: "16px", marginBottom: "16px" }}
          >
            <InputLabel htmlFor="attachment">Attachment</InputLabel>
            <Button
              component="label"
              variant="contained"
              tabIndex={-1}
              style={{
                width: "230px",
                height: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#d7e4f7",
                color: "#2c74e8",
              }}
            >
              <CloudUploadIcon style={{ fontSize: 24, marginRight: "5px" }} />
              Upload
              <input
                type="file"
                id="attachment"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </Button>
          </div>
          {/* <img src={logo} alt="Logo" style={{display:{ xs: 'none', sm: 'block' }, width: '140px', height: 'auto', position: 'absolute', top: '40%', right: '40px', transform: 'translateY(-50%)' }} /> */}
          <img
            src={logo}
            alt="Logo"
            style={{
              display: isMobile ? "none" : "block",
              width: "140px",
              height: "auto",
              position: "absolute",
              top: "40%",
              right: "40px",
              transform: "translateY(-50%)",
            }}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: "50px",
            }}
          >
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ErrorOutlineIcon style={{ color: "blue" }} />
                <Typography sx={{ marginLeft: "8px" }} color="blue">
                  How it works ?
                </Typography>
              </Box>
            </Box>
            <div style={{ marginLeft: "auto" }}>
              <Button
                variant="contained"
                color="secondary"
                style={{
                  backgroundColor: "#F8F7FA",
                  color: "black",
                  marginRight: "8px",
                  "&:hover": { boxShadow: `0 0 10px #F8F7FA` },
                }}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{
                  textTransform: "none",
                  "&:hover": {
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                  },
                }}
              >
                Confirm Ticket
              </Button>
            </div>
          </div>
        </Paper>
      </Container>

      <Dialog
        open={openCancelDialog}
        onClose={handleCloseCancelDialog}
        aria-labelledby="cancel-dialog-title"
        aria-describedby="cancel-dialog-description"
        style={{ padding: "5px" }}
      >
        <DialogContent style={{ textAlign: "center" }}>
          <DialogContentText
            style={{ color: "black" }}
            id="cancel-dialog-description"
          >
            Do you want to discard?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button
            onClick={handleCloseCancelDialog}
            style={{
              border: "1px solid #0043b0",
              borderRadius: "30px",
              width: "100px",
              height: "30px",
              fontSize: "12px",
              marginRight: "12px",
              color: "#0043b0",
              "&:hover": { color: "white", backgroundColor: "#005cf2" },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCloseCancelDialog}
            style={{
              border: "1px solid #0043b0",
              borderRadius: "30px",
              width: "100px",
              height: "30px",
              fontSize: "12px",
              marginRight: "12px",
              color: "#FFFFFF",
              backgroundColor: "#005cf2",
              "&:hover": {
                color: "#000000",
                backgroundColor: "#005cf2",
              },
            }}
            autoFocus
          >
            Discard
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateTicketPage;
