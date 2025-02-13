import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useVerifyOTP } from "../services/index";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { useAtomValue } from "jotai";
import { instructorOtpAtom } from "store/atoms/authAtoms";

// OTP Input Component
function OTP({ separator, length, value, onChange }) {
  const inputRefs = useRef([...Array(length)].map(() => React.createRef()));

  const handleChange = (event, index) => {
    const { value: inputValue } = event.target;
    const newOtp = value.split("");

    newOtp[index] = inputValue.slice(-1);
    onChange(newOtp.join(""));

    if (inputValue && index < length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1].current.focus();
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {Array.from({ length }, (_, index) => (
        <React.Fragment key={index}>
          <input
            type="text"
            ref={inputRefs.current[index]}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            value={value[index] ?? ""}
            style={{
              width: "40px",
              fontSize: "1rem",
              padding: "8px",
              borderRadius: "8px",
              textAlign: "center",
              border: "1px solid #A8A8A8",
              background: "#fff",
            }}
            maxLength={1}
          />
          {index < length - 1 && separator}
        </React.Fragment>
      ))}
    </Box>
  );
}

OTP.propTypes = {
  length: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  separator: PropTypes.node,
  value: PropTypes.string.isRequired,
};

// OTP Verification Component
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
      navigate("/");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <Typography sx={{ fontSize: "24px", fontWeight: 700, textAlign: "center" }}>
        Enter the Code Sent to Your Email
      </Typography>
      <Typography sx={{ fontSize: "18px", fontWeight: 500, textAlign: "center", my: 1 }}>
        Your OTP: {otpData?.otp}
      </Typography>

      <OTP value={otp} onChange={setOtp} length={6} />

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", px: "40px", pt: "16px" }}>
        <Typography sx={{ fontSize: "16px", fontWeight: 700 }}>
          {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </Typography>
        {timeLeft === 0 && (
          <Button
            variant="text"
            onClick={handleResend}
            sx={{
              fontSize: "14px",
              fontWeight: 700,
              textDecoration: "underline",
              color: "#8D8E90",
              ":hover": { backgroundColor: "transparent" },
            }}
          >
            Resend
          </Button>
        )}
      </Box>

      <Button
        sx={{
          backgroundColor: "#5611B1",
          color: "white",
          borderRadius: "36px",
          fontSize: "14px",
          fontWeight: 700,
          width: "120px",
          height: "40px",
          ":hover": { backgroundColor: "#5611B1" },
        }}
        onClick={handleVerify}
      >
        Verify
      </Button>
    </Box>
  );
}
