import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Card, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import { useVerifyOTP } from "../services/index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { useAtomValue } from "jotai";
import { instructorOtpAtom } from "store/atoms/authAtoms";

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

export default function InstructorOTPInput() {
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(60);
  const [error, setError] = useState("");
  const theme = useTheme();
  const verifyOTP = useVerifyOTP();
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useSpinner();
  const otpData = useAtomValue(instructorOtpAtom);

  useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    setOtp("");
    toast.success("OTP resent successfully!");
  };

  const handleVerify = async () => {
    if (otp.length < 6 || otp.includes(" ")) {
      setError("Please enter all OTP digits.");
      toast.error("Please enter all OTP digits.");
      return;
    }
    setError("");

    try {
      showSpinner();
      const response = await verifyOTP(otp);
      toast.success(response?.message);
      navigate("/instructor/home");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Card sx={{ padding: 5, boxShadow: 3, textAlign: "center", borderRadius: "16px", maxWidth: "400px" }}>
        <Typography variant="h2" fontWeight={700} mb={2}>
          Enter OTP
        </Typography>
        <Typography variant="h4" color="textSecondary" mb={3}>
          Enter the Code sent to your registered email
        </Typography>
        <Typography sx={{ fontSize: "18px", fontWeight: 500, textAlign: "center", my: 1 }}>
        Your OTP: {otpData?.otp}
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
      </Card>
    </Box>
  );
}
