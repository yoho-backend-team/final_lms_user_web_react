import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  Typography,
  FormHelperText,
  Card,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useAtom } from "jotai";
import toast from "react-hot-toast";
import {
  instructorLoginStepAtom,
  instructorOtpAtom,
} from "store/atoms/authAtoms";
import { useInstructorforgetPassword } from "../services";
import { ForgetPassword_Otp_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const forgetPassword = useInstructorforgetPassword();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setOtpAtom] = useAtom(instructorOtpAtom);
  const { showSpinner, hideSpinner } = useSpinner();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleBackToLogin = () => {
    showSpinner();
    setLoginStep(instructorLoginStepAtom);
    hideSpinner();
  };

  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Enter your email address.");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    try {
      const response = await forgetPassword(email);
      if (response?.status === "success") {
        const { token } = response.data;
        setOtpAtom({ email, token });
        setLoginStep(ForgetPassword_Otp_Step);
      } else {
        setEmailError("Email not found.");
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card
        sx={{
          width: 450,
          padding: 4,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={2}>
          Forgot Password?
        </Typography>
        <Typography variant="h4" color="textSecondary" mb={3}>
        Enter your email address below
        </Typography>

        <FormControl fullWidth error={!!emailError}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            sx={{
              fontSize: "1rem",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              mb: 2,
            }}
          />
          {emailError && <FormHelperText>{emailError}</FormHelperText>}
        </FormControl>

        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          sx={{
            backgroundColor: "#5611B1",
            color: "white",
            py: 1.5,
            mt: 2,
            borderRadius: 2,
            fontSize: "1rem",
            ":hover": { backgroundColor: "#6302e3" },
          }}
        >
         Verify
        </Button>

        <Typography
          onClick={handleBackToLogin}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#5611B1",
            fontSize: "0.9375rem",
            fontWeight: 500,
            mt: 6,
            textDecoration: "none",
            ":hover": { textDecoration: "underline" },
          }}
        >
          <ChevronLeftIcon sx={{ width: 20, height: 20, mr: 0.5 }} />
          Back to Login
        </Typography>
      </Card>
    </Box>
  );
};

export default ForgetPasswordPage;
