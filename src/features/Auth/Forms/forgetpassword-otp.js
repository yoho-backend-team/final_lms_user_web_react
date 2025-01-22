import * as React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useStudentOtpVerify } from "../services/index";
import { useAtomValue } from "jotai";
import { studentOtpAtom } from "store/atoms/authAtoms";

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
  const [timeLeft, setTimeLeft] = useState(() => {
    const savedTime = localStorage.getItem("otpTimeLeft");
    return savedTime ? parseInt(savedTime, 10) : 600;
  });
  const [error, setError] = useState("");
  const theme = useTheme();
  const verifyOTP = useStudentOtpVerify();
  const navigate = useNavigate();
  const otpData = useAtomValue(studentOtpAtom);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("otpTimeLeft", newTime);
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    localStorage.setItem("otpTimeLeft", 60);
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
        Enter the Code that sent to your entered mail Id
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
      <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", px: 5, pt: 3 }}>
        <Box>
          <Typography variant="subtitle2" sx={{ color: theme.palette.text.primary }}>
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </Typography>
          {timeLeft === 0 && (
            <Button
            
              onClick={handleResend}
              sx={{
                mt: 1,
                borderRadius: 5,
                color: theme.palette.text.primary,
                fontSize: "14px",
                textDecoration: "underline",
                fontWeight: 700,
                padding: "0px",
                ":hover": { border: "none", backgroundColor: theme.palette.background.default },
              }}
            >
              Resend
            </Button>
          )}
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: "white",
              borderRadius: "36px",
              boxShadow: "0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)",
              fontSize: "13px",
              fontWeight: 700,
              width: "101px",
              mt:10,
              mr:40,
              height: "37px",
              "&:hover": {
                background: "linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)", // Reverse gradient on hover
                transform: "scale(1.05)", // Slightly enlarges the button
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
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

