import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Card, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useInstituteForgetPasswordOtpVerify } from "../services/index";
import { useAtom } from "jotai";
import { instructorLoginStepAtom, instructorOtpAtom } from "store/atoms/authAtoms";
import { EnterNewPassword_Step, Login_Step } from "lib/constants";

const InputElement = styled("input")(() => ({
  width: "57px",
  height: "50px",
  fontSize: "20px",
  fontWeight: "600",
  textAlign: "center",
  borderRadius: "8px",
  border: "2px solid #A8A8A8",
  background: "#FFFFFF",
  transition: "0.3s",
  outline: "none",
  '&:focus': {
    borderColor: "#5611B1",
    boxShadow: "0px 0px 8px rgba(86, 17, 177, 0.5)",
  },
}));

const OTPInput = ({ length, value, onChange }) => {
  const inputRefs = useRef(new Array(length).fill(null));

  const handleChange = (event, index) => {
    const newValue = event.target.value.slice(-1);
    const newOtp = value.split("");
    newOtp[index] = newValue;
    onChange(newOtp.join(""));

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
      {Array.from({ length }).map((_, index) => (
        <InputElement
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          value={value[index] || ""}
          onChange={(e) => handleChange(e, index)}
          maxLength={1}
        />
      ))}
    </Box>
  );
};

export default function ForgetPasswordOTPInput() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(600);
  const [error, setError] = useState("");
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);
  const verifyOTP = useInstituteForgetPasswordOtpVerify();
  const timerRef = useRef(null);
  const theme = useTheme();

  useEffect(() => {
    const savedExpiration = localStorage.getItem("otpExpirationTime");
    const currentTime = Math.floor(Date.now() / 1000);

    if (savedExpiration) {
      const remainingTime = parseInt(savedExpiration, 10) - currentTime;
      if (remainingTime > 0) {
        setTimeLeft(remainingTime);
      } else {
        resetTimer();
      }
    } else {
      resetTimer();
    }

    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    const expirationTime = Math.floor(Date.now() / 1000) + 600;
    localStorage.setItem("otpExpirationTime", expirationTime.toString());
    setTimeLeft(600);
    startTimer();
  };

  const handleResend = () => {
    resetTimer();
  };

  const handleVerify = async () => {
    if (otp.trim().length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setError("");
    try {
      const response = await verifyOTP(otp);
      if (response.status === "success") {
        setOtpAtom({ ...otpAtom, otp });
        setLoginStep(EnterNewPassword_Step);
      }
    } catch {
      setError("Invalid OTP. Please try again.");
    }
  };

  const handleBackToLogin = () => {
    localStorage.removeItem("otpExpirationTime"); // Remove stored timer so new OTP starts fresh
    setLoginStep(Login_Step);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card sx={{ padding: 5, boxShadow: 3, textAlign: "center", borderRadius: "16px", maxWidth: "400px" }}>
        <Typography variant="h2" fontWeight={700} mb={2}>
          Enter OTP
        </Typography>
        <Typography variant="h4" color="textSecondary" mb={3}>
          Enter the Code sent to your entered mail ID
        </Typography>
        <OTPInput value={otp} onChange={setOtp} length={6} />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Typography mt={5}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Typography>

        <Button
          disabled={timeLeft > 0}
          onClick={handleResend}
          sx={{
            mt: 2,
            borderRadius: 5,
            color: timeLeft > 0 ? theme.palette.text.disabled : theme.palette.primary.main,
            fontSize: "14px",
            textDecoration: "underline",
            fontWeight: 700,
            padding: "0px",
            ":hover": {
              border: "none",
              backgroundColor: timeLeft > 0 ? "transparent" : theme.palette.background.default,
            },
          }}
        >
          Resend OTP
        </Button>

        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 5, backgroundColor: "#5611B1", borderRadius: "8px" }}
          onClick={handleVerify}
        >
          Verify OTP
        </Button>

        <Button
          fullWidth
          variant="text"
          sx={{ mt: 2, color: "#5611B1" }}
          onClick={handleBackToLogin}
        >
          Back to Login
        </Button>
      </Card>
    </Box>
  );
}
