import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  FormHelperText,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import toast from "react-hot-toast";
import { useChangePassword } from "../services";
import { studentOtpAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";

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
  const changePassword = useChangePassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpAtom, setOtpAtom] = useAtom(studentOtpAtom);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(""); 
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const handleSubmit = async () => {
    if (!password) {
      setPasswordError("Enter new password");
      return;
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Enter confirm password");
      return;
    }
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }
    try {
      console.log(otpAtom, "otpAtom");
      const response = await changePassword(confirmPassword);
      toast.success(response.message);
    } catch (error) {
      console.error("Error resetting password", error);
      toast.error("Error resetting password");
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
        <Typography
          variant="h5"
          component="h1"
          sx={{ fontWeight: "bold", color: "#242424", fontSize: "1.5rem" }}
        >
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
          Password
        </Typography>
        <FormControl fullWidth sx={{ maxWidth: 250 }} error={!!passwordError}>
          <Input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            aria-describedby="password-error-text"
          />
          {passwordError && (
            <FormHelperText id="password-error-text">
              {passwordError}
            </FormHelperText>
          )}
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
          Confirm Password
        </Typography>
        <FormControl
          fullWidth
          sx={{ maxWidth: 250 }}
          error={!!confirmPasswordError}
        >
          <Input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            aria-describedby="confirm-password-error-text"
          />
          {confirmPasswordError && (
            <FormHelperText id="confirm-password-error-text">
              {confirmPasswordError}
            </FormHelperText>
          )}
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
