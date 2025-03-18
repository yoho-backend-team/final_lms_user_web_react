import * as React from "react";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useStudentOtpVerify } from "../services/index";
import { useAtomValue, useAtom } from "jotai";
import { studentOtpAtom, studentLoginStepAtom } from "store/atoms/authAtoms";
import { Student_Login_Step, EnterNewPassword_Step, Login_Step } from "lib/constants"; 
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";

const InputElement = styled("input")(({ theme }) => `
  width: 40px;
  height: 50px;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  border-radius: 8px;
  border: 2px solid ${theme.palette.primary.main};
  transition: all 0.3s ease;
  &:hover { border-color: ${theme.palette.primary.dark}; }
  &:focus { border-color: ${theme.palette.primary.main}; outline: none; }
`);

function OTP({ separator, length, value, onChange }) {
  const inputRefs = useRef(new Array(length).fill(null));

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleChange = (event, index) => {
    const newValue = event.target.value.replace(/\D/g, "").slice(-1); // Allow only digits
    const newOtp = value.split("");
    newOtp[index] = newValue;
    onChange(newOtp.join(""));

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pastedData = event.clipboardData.getData("text").trim().replace(/\D/g, "").slice(0, length);
    
    if (pastedData.length === length) {
      onChange(pastedData);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <InputElement
            ref={(el) => (inputRefs.current[index] = el)}
            value={value[index] ?? ""}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onPaste={handlePaste} 
            aria-label={`Digit ${index + 1} of OTP`}
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

export default function OTPInput() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const theme = useTheme();
  const verifyOTP = useStudentOtpVerify();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const { showSpinner, hideSpinner } = useSpinner();
  const otpData = useAtomValue(studentOtpAtom);
  const [otpAtom, setOtpAtom] = useAtom(studentOtpAtom);
  const timerRef = useRef(null);

  const getTimeLeft = () => {
    const storedEndTime = localStorage.getItem("otpEndTime");
    if (storedEndTime) {
      const remaining = Math.floor((parseInt(storedEndTime, 10) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return 300; 
  };

  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          localStorage.removeItem("otpEndTime");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); 
  }, [timeLeft]);

  const resetTimer = () => {
    const newEndTime = Date.now() + 300 * 1000; 
    localStorage.setItem("otpEndTime", newEndTime.toString());
    setTimeLeft(300);
  };

  const handleResend = () => {
    resetTimer();
    toast.success("OTP Resent Successfully!");     
  };

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(otp.trim())) {
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

  const handleBack = () => {
    try {
      showSpinner();
      clearInterval(timerRef.current);
      localStorage.removeItem("otpEndTime");
      setLoginStep(Student_Login_Step);
    } catch (error) {
      toast.error("Try again");
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
      <Typography sx={{ color: "#242424", fontSize: "24px", fontWeight: 700, textAlign: "center" }}>
        Enter the OTP sent to your email
      </Typography>

      <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary, mt: 2 }}>
        Your OTP: {otpData?.otp}
      </Typography>

      <OTP value={otp} onChange={setOtp} length={6} separator="-" />

      {error && <Typography color="error" variant="body2">{error}</Typography>}

      <Typography mt={2} sx={{ fontSize: "14px", fontWeight: "bold" }}>
        {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
      </Typography>

      {timeLeft === 0 && (
        <Button onClick={handleResend} sx={{ mt: 2, color: theme.palette.primary.main, fontSize: "14px", fontWeight: 700, textDecoration: "underline", ":hover": { backgroundColor: "transparent" } }}>
          Resend OTP
        </Button>
      )}

      <Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer", mt: 2 }}>
        Back to Login
      </Typography>

      <Button sx={{ mt: 3, backgroundColor: theme.palette.primary.main, color: "white", borderRadius: "20px", fontSize: "14px", fontWeight: 700, width: "100px", "&:hover": { background: theme.palette.primary.dark } }} onClick={handleVerify}>
        Verify
      </Button>
    </Box>
  );
}
