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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) setEmailError("");
  };

  const handleBackToLogin = () => {
    showSpinner();
    setTimeout(() => {
      setLoginStep(instructorLoginStepAtom);
      hideSpinner();
    }, 1000);
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
    
    showSpinner();
    try {
      const response = await forgetPassword(email);
      if (response?.status === "success") {
        const { token } = response.data;
        setOtpAtom({ email, token });
        setTimeout(() => {
          setLoginStep(ForgetPassword_Otp_Step);
          hideSpinner();
        }, 1000);
      } else {
        setEmailError("Email not found.");
        hideSpinner();
      }
    } catch (error) {
      toast.error(error?.message || "An error occurred. Please try again.");
      hideSpinner();
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
          width: 500,
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

        <FormControl fullWidth error={!!emailError} sx={{ mt: 5 }}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            sx={{
              fontSize: "1rem",
              padding: "12px",
              border: "1px solid #ddd",
              borderRadius: "8px",
            }}
          />
          {emailError && <FormHelperText>{emailError}</FormHelperText>}
        </FormControl>

        {/* Buttons Aligned Properly */}
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 10 }}>
          {/* Back to Login Button (Left) */}
          <Button
            variant="outlined"
            onClick={handleBackToLogin}
            sx={{
              color: "#5611B1",
              borderColor: "#5611B1",
              py: 1,
              px: 4,
              borderRadius: 2,
              fontSize: "1rem",
              textTransform: "none",
              ":hover": { borderColor: "#6302e3", color: "#6302e3" },
            }}
          >
            <ChevronLeftIcon sx={{ width: 20, height: 20, mr: 1 }} />
            Back to Login
          </Button>

          {/* Verify Button (Right) */}
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#5611B1",
              color: "white",
              py: 1,
              px: 4,
              borderRadius: 2,
              fontSize: "1rem",
              textTransform: "none",
              boxShadow: "none",
              ":hover": { backgroundColor: "#6302e3" },
            }}
          >
            Verify
          </Button>
        </Box>
      </Card>
    </Box>
  );
};

export default ForgetPasswordPage;
