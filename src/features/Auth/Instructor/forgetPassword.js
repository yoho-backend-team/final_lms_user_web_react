import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  FormHelperText,
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

  // Validate email with a regex
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  // Handle back navigation
  const handleBackToLogin = () => {
    showSpinner();
    setLoginStep(instructorLoginStepAtom);
    hideSpinner();
  };

  // Handle form submission
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
      console.error("Error during email submission:", error);
      toast.error(error?.message || "An error occurred. Please try again.");
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
      {/* Card Container */}
      <Box
        sx={{
          width: "360px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 3,
          borderRadius: 2,
          fontFamily: '"Zen Kaku Gothic Antique"',
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#242424",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
        >
          Forgot Password?
        </Typography>

        {/* Subtitle */}
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "#757575",
            fontSize: "0.875rem",
            fontWeight: 400,
            marginBottom: "20px",
          }}
        >
          Enter your email address below
        </Typography>

        {/* Email Input */}
        <FormControl fullWidth error={!!emailError}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            aria-describedby="email-error-text"
            placeholder="Enter your email"
            sx={{
              color: "#212121",
              fontSize: "1rem",
              fontWeight: 400,
              lineHeight: "22.5px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
          {emailError && (
            <FormHelperText id="email-error-text">{emailError}</FormHelperText>
          )}
        </FormControl>

        {/* Action Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            marginTop: "30px",
          }}
        >
          
          <Typography
  onClick={handleBackToLogin}
  sx={{
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: "#5611B1",
    fontSize: "0.9375rem",
    fontWeight: 500,
    textDecoration: "none",
    transition: "all 0.2s ease-in-out",
    ":hover": {
      color: "#22034a",
      transform: "scale(1.05)", // Slight zoom effect
      textDecoration: "underline", // Add underline on hover
    },
  }}
>
  <ChevronLeftIcon sx={{ width: "20px", height: "20px", mr: 0.5 }} />
  Back to Login
</Typography>


          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#5611B1",
              color: "white",
              maxWidth: 100,
              borderRadius: 20,
              px: 3,
              py: 1,
              fontSize: "0.9375rem",
              fontWeight: 600,
              textTransform: "none",
              ":hover": {
                backgroundColor: "#6302e3",
                transform: "scale(1.05)",
              },
            }}
          >
            Verify
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ForgetPasswordPage;
