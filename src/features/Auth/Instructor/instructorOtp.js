// import * as React from "react";
// import PropTypes from "prop-types";
// import { Box, Typography, Button } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { useState, useEffect } from "react";
// import { useVerifyOTP } from "../services/index";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useSpinner } from "context/SpinnerProvider";
// import { useAtomValue } from "jotai";
// import { instructorOtpAtom } from "store/atoms/authAtoms";

// // OTP component for input field handling
// function OTP({ separator, length, value, onChange }) {
//   const inputRefs = React.useRef(new Array(length).fill(null));

//   const focusInput = (targetIndex) => {
//     const targetInput = inputRefs.current[targetIndex];
//     targetInput.focus();
//   };

//   const selectInput = (targetIndex) => {
//     const targetInput = inputRefs.current[targetIndex];
//     targetInput.select();
//   };

//   const handleKeyDown = (event, currentIndex) => {
//     switch (event.key) {
//       case "ArrowUp":
//       case "ArrowDown":
//       case " ":
//         event.preventDefault();
//         break;
//       case "ArrowLeft":
//         event.preventDefault();
//         if (currentIndex > 0) {
//           focusInput(currentIndex - 1);
//           selectInput(currentIndex - 1);
//         }
//         break;
//       case "ArrowRight":
//         event.preventDefault();
//         if (currentIndex < length - 1) {
//           focusInput(currentIndex + 1);
//           selectInput(currentIndex + 1);
//         }
//         break;
//       case "Delete":
//         event.preventDefault();
//         onChange((prevOtp) => {
//           const otp =
//             prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
//           return otp;
//         });
//         break;
//       case "Backspace":
//         event.preventDefault();
//         if (currentIndex > 0) {
//           focusInput(currentIndex - 1);
//           selectInput(currentIndex - 1);
//         }
//         onChange((prevOtp) => {
//           const otp =
//             prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
//           return otp;
//         });
//         break;
//       default:
//         break;
//     }
//   };

//   const handleChange = (event, currentIndex) => {
//     const currentValue = event.target.value;
//     let indexToEnter = 0;

//     while (indexToEnter <= currentIndex) {
//       if (
//         inputRefs.current[indexToEnter].value &&
//         indexToEnter < currentIndex
//       ) {
//         indexToEnter += 1;
//       } else {
//         break;
//       }
//     }
//     onChange((prev) => {
//       const otpArray = prev.split("");
//       const lastValue = currentValue[currentValue.length - 1];
//       otpArray[indexToEnter] = lastValue;
//       return otpArray.join("");
//     });
//     if (currentValue !== "") {
//       if (currentIndex < length - 1) {
//         focusInput(currentIndex + 1);
//       }
//     }
//   };

//   const handleClick = (event, currentIndex) => {
//     selectInput(currentIndex);
//   };

//   const handlePaste = (event, currentIndex) => {
//     event.preventDefault();
//     const clipboardData = event.clipboardData;

//     if (clipboardData.types.includes("text/plain")) {
//       let pastedText = clipboardData.getData("text/plain");
//       pastedText = pastedText.substring(0, length).trim();
//       let indexToEnter = 0;

//       while (indexToEnter <= currentIndex) {
//         if (
//           inputRefs.current[indexToEnter].value &&
//           indexToEnter < currentIndex
//         ) {
//           indexToEnter += 1;
//         } else {
//           break;
//         }
//       }

//       const otpArray = value.split("");

//       for (let i = indexToEnter; i < length; i += 1) {
//         const lastValue = pastedText[i - indexToEnter] ?? " ";
//         otpArray[i] = lastValue;
//       }

//       onChange(otpArray.join(""));
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
//       {new Array(length).fill(null).map((_, index) => (
//         <React.Fragment key={index}>
//           <input
//             type="text"
//             ref={(ele) => {
//               inputRefs.current[index] = ele;
//             }}
//             onKeyDown={(event) => handleKeyDown(event, index)}
//             onChange={(event) => handleChange(event, index)}
//             onClick={(event) => handleClick(event, index)}
//             onPaste={(event) => handlePaste(event, index)}
//             value={value[index] ?? ""}
//             style={{
//               width: "40px",
//               fontFamily: "'IBM Plex Sans', sans-serif",
//               fontSize: "0.875rem",
//               padding: "8px 0px",
//               borderRadius: "8px",
//               textAlign: "center",
//               border: "1px solid #A8A8A8",
//               background: "#fff",
//             }}
//             aria-label={`Digit ${index + 1} of OTP`}
//           />
//           {index === length - 1 ? null : separator}
//         </React.Fragment>
//       ))}
//     </Box>
//   );
// }

// OTP.propTypes = {
//   length: PropTypes.number.isRequired,
//   onChange: PropTypes.func.isRequired,
//   separator: PropTypes.node,
//   value: PropTypes.string.isRequired,
// };

// export default function InstructorOTPInput() {
//   const [otp, setOtp] = React.useState("");
//   const [timeLeft, setTimeLeft] = useState(600);
//   const [error, setError] = useState("");
//   const theme = useTheme();
//   const verifyOTP = useVerifyOTP();
//   const navigate = useNavigate();
//   const { showSpinner, hideSpinner } = useSpinner();
//   const otpData = useAtomValue(instructorOtpAtom);

//   useEffect(() => {
//     if (timeLeft === 0) return;

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => prevTime - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   const handleResend = () => {
//     setTimeLeft(60);
//   };

//   const handleVerify = async () => {
//     if (otp.length < 6 || otp.includes(" ")) {
//       setError("Please enter all OTP digits.");
//       toast.error("Please enter all OTP digits.");
//       return;
//     }
//     setError("");
//     try {
//       showSpinner();
//       const response = await verifyOTP(otp);
//       toast.success(response?.message);
//       navigate("/"); // Navigate to home page after OTP is verified
//     } catch (error) {
//       setError("Invalid OTP. Please try again.");
//       toast.error(error?.message);
//     } finally {
//       hideSpinner();
//     }
//   };

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: 2,
//       }}
//     >
//       <Box>
//         <Typography
//           sx={{
//             color: "#242424",
//             fontSize: "31px",
//             fontWeight: 700,
//             lineHeight: "30px",
//             textAlign: "center",
//           }}
//         >
//           Enter the Code that sent to your entered mail iD
//         </Typography>
//         <Typography
//           sx={{
//             color: "#242424",
//             fontSize: "20px",
//             fontWeight: 500,
//             lineHeight: "30px",
//             textAlign: "center",
//             my: "10px",
//           }}
//         >
//           Your OTP is - {otpData?.otp}
//         </Typography>
//       </Box>
//       <OTP value={otp} onChange={setOtp} length={6} />
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}
//       <Box
//         sx={{
//           display: "flex",
//           justifyContent: "space-between",
//           width: "100%",
//           px: "40px",
//           pt: "32px",
//         }}
//       >
//         <Box>
//           <Typography
//             sx={{
//               color: "#000000",
//               fontSize: "16px",
//               fontWeight: 700,
//               lineHeight: "21px",
//             }}
//           >
//             {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? "0" : ""}
//             {timeLeft % 60}
//           </Typography>
//           {timeLeft === 0 && (
//             <Button
//               variant="outlined"
//               onClick={handleResend}
//               sx={{
//                 mt: 2,
//                 borderRadius: 5,
//                 color: "#8D8E90",
//                 fontSize: "14px",
//                 textDecoration: "underline",
//                 fontWeight: 700,
//                 border: "none",
//                 ":hover": { border: "none", backgroundColor: "#F8F7FA" },
//                 padding: "0px",
//               }}
//             >
//               Resend
//             </Button>
//           )}
//         </Box>
//         <Box>
//           <Button
//             sx={{
//               backgroundColor: "#5611B1",
//               color: "white",
//               borderRadius: "36px",
//               boxShadow:
//                 "0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)",
//               fontSize: "13px",
//               fontWeight: 700,
//               lineHeight: "15px",
//               width: "101px",
//               height: "37px",
//               ":hover": { backgroundColor: "#5611B1" },
//             }}
//             onClick={handleVerify}
//           >
//             Verify
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// }
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
