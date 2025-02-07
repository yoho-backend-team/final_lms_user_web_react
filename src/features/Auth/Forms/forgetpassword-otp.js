import * as React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentOtpVerify } from "../services/index";
import { useAtomValue,useAtom } from "jotai";
import { studentOtpAtom } from "store/atoms/authAtoms";
import { studentLoginStepAtom } from "store/atoms/authAtoms";
import { Student_Login_Step } from "lib/constants";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  height: 50px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.text.primary};
  background: ${theme.palette.background.paper};
  border: 2px solid ${theme.palette.primary.main};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.palette.primary.dark};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    outline: none;
    box-shadow: 0 0 0 3px ${theme.palette.primary.light};
  }

  &:focus-visible {
    outline: none;
  }
`,
);

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    inputRefs.current[targetIndex]?.focus();
  };

  const selectInput = (targetIndex) => {
    inputRefs.current[targetIndex]?.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case "ArrowRight":
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        onChange((prevOtp) => prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1));
        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    onChange((prev) => {
      const otpArray = prev.split("");
      otpArray[currentIndex] = currentValue;
      return otpArray.join("");
    });
    if (currentValue !== "" && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <InputElement
            ref={(ele) => (inputRefs.current[index] = ele)}
            value={value[index] ?? ""}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
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
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [isLoginPage, setIsLoginPage] = useState(true); // Manage current step
  const theme = useTheme();
  const verifyOTP = useStudentOtpVerify();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const { showSpinner,hideSpinner } = useSpinner()
  const otpData = useAtomValue(studentOtpAtom);

  // Timer state for OTP expiry
  const [timeLeft, setTimeLeft] = useState(() => {
    const startTime = localStorage.getItem("otpStartTime");
    const duration = 600; // 10 minutes in seconds
    
    if (!startTime) {
      const now = Date.now();
      localStorage.setItem("otpStartTime", now.toString());
      return duration;
    }
    
    const elapsed = Math.floor((Date.now() - parseInt(startTime)) / 1000);
    return Math.max(0, duration - elapsed);
  });

  // Timer state for resend button
  const [resendTimeLeft, setResendTimeLeft] = useState(() => {
    const resendStartTime = localStorage.getItem("resendStartTime");
    const duration = 600; // 10 minutes in seconds
    
    if (!resendStartTime) {
      return 0; // Allow immediate first resend
    }
    
    const elapsed = Math.floor((Date.now() - parseInt(resendStartTime)) / 1000);
    return Math.max(0, duration - elapsed);
  });

  // Effect for OTP expiry timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Effect for resend button timer
  useEffect(() => {
    if (resendTimeLeft === 0) {
      setIsResendDisabled(false);
      return;
    }

    setIsResendDisabled(true);
    const timer = setInterval(() => {
      setResendTimeLeft((prevTime) => Math.max(0, prevTime - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    const now = Date.now();
    localStorage.setItem("otpStartTime", now.toString());
    localStorage.setItem("resendStartTime", now.toString());
    setTimeLeft(600); // Reset OTP timer to 10 minutes
    setResendTimeLeft(600); // Reset resend timer to 10 minutes
    setIsResendDisabled(true);
    // Add your resend OTP API call here
  };

  const handleVerify = async () => {
    if (otp.length !== 6 || otp.includes(" ")) {
      setError("Please enter all OTP digits.");
      return;
    }
    setError("");
    try {
      await verifyOTP(otp);
      navigate("/student/home");
    } catch (error) {
      setError("Invalid OTP. Please try again.");
    }
  };


  const handleBack = () => {
    try {
      showSpinner()
      setLoginStep(Student_Login_Step)     
    } catch (error) {
      toast.error("Try again")
    }finally{
      hideSpinner()
    }
  }


  return (
    <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
    }}
  >
    <Box>
      <Typography
        sx={{
          color: "#242424",
          fontSize: "31px",
          fontWeight: 700,
          lineHeight: "30px",
          textAlign: "center",
        }}
      >
        Enter the Code that sent to your entered mail id
      </Typography>
    </Box>
      <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary ,mt:10}}>
        Your OTP: {otpData?.otp}
      </Typography>
      <OTP value={otp} onChange={setOtp} length={6} separator="-" />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", px: 5, pt: 5,mt:5 }}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>
            OTP expires in: {formatTime(timeLeft)}
          </Typography>
          <Button
            disabled={isResendDisabled}
            onClick={handleResend}
            sx={{
              mt: 7,
              borderRadius: 5,
              color: isResendDisabled ? theme.palette.text.disabled : theme.palette.primary.main,
              fontSize: "14px",
              textDecoration: "underline",
              fontWeight: 700,
              padding: "0px",
              ":hover": { 
                border: "none", 
                backgroundColor: isResendDisabled ? "transparent" : theme.palette.background.default 
              },
            }}
          >
              Resend
          </Button>
        </Box>
        <Box>

          <Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer",ml:2}}
              onMouseEnter={(e) => {
                e.target.style.color = "#4c55eb"; // Lighter shade on hover
                e.target.style.textShadow = "0px 2px 4px rgba(102, 108, 255, 0.5)"; // Subtle shadow effect
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#666cff"; // Revert to original color
                e.target.style.textShadow = "none"; // Remove shadow
              }} >
              Back to Login
              </Typography>

          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: "36px",
              boxShadow: "0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)",
              fontSize: "13px",
              fontWeight: 700,
              width: "101px",
              mt: 5,
              mr: 5,
              height: "37px",
              "&:hover": {
                background: "linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)",
                transform: "scale(1.05)",
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
            onClick={handleVerify}
          >
            Verify
        
        </Button>
        </Box>
      </Box>
    </Box>
  );
}

