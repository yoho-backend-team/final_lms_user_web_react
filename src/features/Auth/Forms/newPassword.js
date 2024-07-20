import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  Input,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import toast from "react-hot-toast";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  container: {
    padding: theme.spacing(4),
    backgroundColor: "#fff",
    borderRadius: theme.spacing(1),
    boxShadow: theme.shadows[3],
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const EnterNewPassword = () => {
  const classes = useStyles();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (e) => {
    if (password !== confirmPassword) {
      console.log(setPassword, "set");
      console.log(confirmPassword, "confirm");
      alert("Passwords do not match");
      return;
    }
    try {
         
    } catch (error) {
      console.error("Error resetting password", error);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "50px",
      }}
    >
      <Box>
        <Typography variant="h5" component="h1" sx={{ fontWeight: "bold" ,color: "#242424", fontSize: "1.5rem" }}>
          Enter New Password
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: "12.80px",
            color: "black",
            fontWeight: 100,
            paddingTop: 5,
          }}
        >
          Enter New Password
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <Input
            type="email"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormControl>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: "12.80px",
            color: "black",
            fontWeight: 100,
            paddingTop: 5,
          }}
        >
          Password
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <Input
            type="email"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </FormControl>
        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: "#0D6EFD",
            maxWidth: 100,
            marginTop: 5,
            alignSelf: "flex-end",
            borderRadius: 20,
            px: 2,
            py: 1,
            "&:hover": {
              backgroundColor: "#0D6EFD",
            },
          }}
        >
          VERIFY
        </Button>
      </Box>
    </Box>
  );
};

export default EnterNewPassword;
