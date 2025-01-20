import * as React from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useInstituteForgetPasswordOtpVerify } from "../services/index";
import { useNavigate, Link } from "react-router-dom";  // Import Link
import { useAtom } from "jotai";


import {
  instructorLoginStepAtom,
  instructorOtpAtom,
  
} from "store/atoms/authAtoms";
import { EnterNewPassword_Step } from "lib/constants";

const InputElement = styled("input")(
  ({ theme }) => `
  width: 40px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.primary.main
  };
  background: ${
    theme.palette.mode === "dark" ? theme.palette.primary.main : "#fff"
  };
  border: 1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.primary.main
      : theme.palette.primary.main
  };
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark"
      ? theme.palette.secondary
      : theme.palette.secondary
  };

  &:hover {
    border-color: ${theme.palette.primary.main};
  }

  &:focus {
    border-color: ${theme.palette.primary.main};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.main
    };
  }

  &:focus-visible {
    outline: 0;
  }
`
);

function OTP({ separator, length, value, onChange }) {
  const inputRefs = React.useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        event.preventDefault();
        break;
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
      case "Delete":
        event.preventDefault();
        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;
      case "Backspace":
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }

        onChange((prevOtp) => {
          const otp =
            prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
          return otp;
        });
        break;

      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    let indexToEnter = 0;

    while (indexToEnter <= currentIndex) {
      if (
        inputRefs.current[indexToEnter].value &&
        indexToEnter < currentIndex
      ) {
        indexToEnter += 1;
      } else {
        break;
      }
    }
    onChange((prev) => {
      const otpArray = prev.split("");
      const lastValue = currentValue[currentValue.length - 1];
      otpArray[indexToEnter] = lastValue;
      return otpArray.join("");
    });
    if (currentValue !== "") {
      if (currentIndex < length - 1) {
        focusInput(currentIndex + 1);
      }
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes("text/plain")) {
      let pastedText = clipboardData.getData("text/plain");
      pastedText = pastedText.substring(0, length).trim();
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
        if (
          inputRefs.current[indexToEnter].value &&
          indexToEnter < currentIndex
        ) {
          indexToEnter += 1;
        } else {
          break;
        }
      }

      const otpArray = value.split("");

      for (let i = indexToEnter; i < length; i += 1) {
        const lastValue = pastedText[i - indexToEnter] ?? " ";
        otpArray[i] = lastValue;
      }

      onChange(otpArray.join(""));
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <BaseInput
            slots={{
              input: InputElement,
            }}
            style={{
              border: "1.213px solid #A8A8A8",
              background: "#FFFFFF",
              borderRadius: "8px",
            }}
            aria-label={`Digit ${index + 1} of OTP`}
            slotProps={{
              input: {
                ref: (ele) => {
                  inputRefs.current[index] = ele;
                },
                onKeyDown: (event) => handleKeyDown(event, index),
                onChange: (event) => handleChange(event, index),
                onClick: (event) => handleClick(event, index),
                onPaste: (event) => handlePaste(event, index),
                value: value[index] ?? "",
              },
            }}
          />
          {index === length - 1 ? null : separator}
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

export default function ForgetPasswordOTPInput() {
  const [otp, setOtp] = React.useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
    // Get the remaining time from localStorage if available, otherwise default to 600 seconds (10 minutes)
    const savedTime = localStorage.getItem("otpTimeLeft");
    return savedTime ? parseInt(savedTime, 10) : 600; // 10 minutes (600 seconds)
  });
  const [error, setError] = useState("");
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const theme = useTheme();
  const verifyOTP = useInstituteForgetPasswordOtpVerify();
  const navigate = useNavigate();
  const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime - 1;
        localStorage.setItem("otpTimeLeft", newTime);  // Save time to localStorage
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(600); // Reset time to 600 seconds (10 minutes)
    localStorage.setItem("otpTimeLeft", 600);  // Reset time in localStorage
  };

  const handleVerify = async () => {
    if (otp.length !== 6 || otp.includes(" ")) {
      setError("Please enter all OTP digits.");
      return;
    }
    setError("");

    try {
      const response = await verifyOTP(otp);
      const { email, token } = response.data;
      
      if (response.status === "success") {
        setOtpAtom({
          email: otpAtom.email,
          token: otpAtom.token,
          otp: otp,
        });
        setLoginStep(EnterNewPassword_Step);
      }
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
            mb:10,
          }}
        >
          Enter the Code that sent to your entered mail Id
        </Typography>
      </Box>
      <OTP value={otp} onChange={setOtp} length={6} />
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          px: "40px",
          pt: "32px",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#000000",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "21px",
            }}
          >
            {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
            {timeLeft % 60}
          </Typography>
          {timeLeft === 0 && (
            <Button
              variant="outlined"
              onClick={handleResend}
              sx={{
                mt: 1,
                borderRadius: 5,
                color: "#8D8E90",
                fontSize: "14px",
                textDecoration: "underline",
                fontWeight: 700,
                border: "none",
                ":hover": { border: "none", backgroundColor: "#F8F7FA" },
                padding: "0px",
              }}
            >
              Resend
            </Button>
          )}
        </Box>
        <Box>
          <Button
            sx={{
              backgroundColor: "#5611B1",
              color: "white",
              borderRadius: "36px",
              boxShadow:
                "0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)",
              fontSize: "13px",
              fontWeight: 700,
              lineHeight: "15px",
              width: "101px",
              height: "37px",
              ":hover": {
                backgroundColor: "#5611B1", // Keep the same background color
                transform: "scale(1.1)", // Boom animation: scale up
                transition: "transform 0.3s ease-in-out", // Smooth transition for the scaling effect
              },
              ":active": {
                transform: "scale(1)", // Ensure it shrinks back after the click (for a "boom" effect)
              },
            }}
            onClick={handleVerify}
          >
            Verify
          </Button>
        </Box>
      </Box>

      
      <Link
  to="/"  // Update this with the desired path
  style={{
    textDecoration: "none",
    marginTop: "20px",
  }}
>
  <Button
    variant="text"
    sx={{
      color: "#5611B1",
      fontWeight: 700,
      transition: "all 0.2s ease-in-out", // Smooth transition for hover effects
      ":hover": {
        color: "#22034a", // Hover color change
        transform: "scale(1.05)", // Slight zoom effect
        textDecoration: "underline", // Underline on hover
      },
    }}
  >
    Go to Main Page
  </Button>
</Link> 

      
       

    </Box>
  );
}
