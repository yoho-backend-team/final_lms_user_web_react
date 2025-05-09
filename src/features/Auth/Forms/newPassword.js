import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import toast from "react-hot-toast";
import { useChangePassword } from "../services";
import { studentOtpAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";

const EnterNewPassword = () => {
  const changePassword = useChangePassword();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [otpAtom] = useAtom(studentOtpAtom);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    setConfirmPasswordError("");
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

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
      const response = await changePassword({ new_password : password,confirm_password:confirmPassword });
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
        height: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Box
        sx={{
          width: 400,
          padding: 4,
          backgroundColor: "#fff",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h2"
          sx={{ fontWeight: "bold", color: "#242424", textAlign: "center" }}
        >
          Enter New Password
        </Typography>

        <FormControl fullWidth sx={{ mt: 3 }} error={!!passwordError}>
          <Typography variant="body2" sx={{ color: "#333", mb: 1 }}>
            Password
          </Typography>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            aria-describedby="password-error-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {passwordError && <FormHelperText>{passwordError}</FormHelperText>}
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2 }} error={!!confirmPasswordError}>
          <Typography variant="body2" sx={{ color: "#333", mb: 1 }}>
            Confirm Password
          </Typography>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            aria-describedby="confirm-password-error-text"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {confirmPasswordError && (
            <FormHelperText>{confirmPasswordError}</FormHelperText>
          )}
        </FormControl>

        <Button
          variant="contained"
          onClick={handleSubmit}
          fullWidth
          sx={{
            backgroundColor: "#0D6EFD",
            mt: 3,
            borderRadius: 2,
            px: 2,
            py: 1,
            "&:hover": {
              backgroundColor: "#0B5ED7",
            },
          }}
        >
          CONFRIM
        </Button>
      </Box>
    </Box>
  );
};

export default EnterNewPassword;
