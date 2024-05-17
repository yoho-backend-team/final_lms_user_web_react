import * as React from "react";
import PropTypes from "prop-types";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, display, styled } from "@mui/system";
import { useTheme } from "@emotion/react";
import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";

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

    // Check if there is text data in the clipboard
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

export default function OTPInput() {
  const [otp, setOtp] = React.useState("");
  const [timeLeft, setTimeLeft] = useState(60);

  const theme = useTheme();

  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = () => {
    // Place your logic here to resend OTP
    console.log("Resending OTP...");
    setTimeLeft(60); // Reset timer
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <OTP value={otp} onChange={setOtp} length={4} />
      <Box>
        <Typography variant="body1">
          Time remaining: {Math.floor(timeLeft / 60)}:
          {timeLeft % 60 < 10 ? "0" : ""}
          {timeLeft % 60}
        </Typography>
        {timeLeft === 0 && (
          <Box>
            <Button
              variant="tonal"
              color="warning"
              
              onClick={handleResend}
              sx={{ mt: 2,borderRadius:5 }}
            >
              Resend
            </Button>
          </Box>
        )}
      </Box>
      {/* <span>Entered value: {otp}</span> */}
    </Box>
  );
}

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
      ? theme.palette.primary.main[300]
      : theme.palette.primary.main[900]
  };
  background: ${
    theme.palette.mode === "dark" ? theme.palette.primary.main[900] : "#fff"
  };
  border: 1px solid ${
    theme.palette.mode === "dark"
      ? theme.palette.primary.main[700]
      : theme.palette.primary.main[200]
  };
  box-shadow: 0px 2px 4px ${
    theme.palette.mode === "dark"
      ? theme.palette.secondary[500]
      : theme.palette.secondary[500]
  };

  &:hover {
    border-color: ${theme.palette.primary.main[400]};
  }

  &:focus {
    border-color: ${theme.palette.primary.main[400]};
    box-shadow: 0 0 0 3px ${
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.main
    };
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
