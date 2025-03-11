import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  FormControl,
  Input,
  InputAdornment,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useInstructorChangePassword } from "../services";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import * as yup from "yup";

const passwordSchema = yup.object({
  new_password: yup.string().min(8, "Password must be at least 8 characters").required("New Password is required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password")], "Passwords do not match")
    .required("Confirm Password is required"),
});

export default function EnterNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const changePassword = useInstructorChangePassword();
  const { showSpinner, hideSpinner } = useSpinner();

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  const handleSubmit = async () => {
    try {
      await passwordSchema.validate({ new_password: password, confirm_password: confirmPassword }, { abortEarly: false });
      showSpinner();
      const response = await changePassword({ new_password: password, confirm_password: confirmPassword });
      toast.success(response.message);
    } catch (error) {
      if (error.inner) {
        const validationErrors = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors);
      } else {
        toast.error("Error resetting password");
      }
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card sx={{ padding: 5, boxShadow: 3, textAlign: "center", borderRadius: "16px", maxWidth: "600px" }}>
        <Typography variant="h2" fontWeight={700} mb={2}>
          Set New Password
        </Typography>
        <Typography variant="h4" color="textSecondary" mb={3}>
          Enter your new password below
        </Typography>

        {/* Password Input */}
        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.new_password}>
          <Typography variant="body1" fontWeight={500} color="textSecondary">
            New Password
          </Typography>
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.new_password && <FormHelperText>{errors.new_password}</FormHelperText>}
        </FormControl>

        {/* Confirm Password Input */}
        <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.confirm_password}>
          <Typography variant="body1" fontWeight={500} color="textSecondary">
            Confirm Password
          </Typography>
          <Input
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={toggleShowConfirmPassword}>
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors.confirm_password && <FormHelperText>{errors.confirm_password}</FormHelperText>}
        </FormControl>

        <Button fullWidth variant="contained" sx={{ backgroundColor: "#5611B1", borderRadius: "8px" }} onClick={handleSubmit}>
        CONFIRM
        </Button>
      </Card>
    </Box>
  );
}
