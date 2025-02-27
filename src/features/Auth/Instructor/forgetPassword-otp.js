// import * as React from "react";
// import { useState, useEffect, useRef } from "react";
// import { Box, Typography, Button, Card, useTheme } from "@mui/material";
// import { styled } from "@mui/system";
// import { useInstituteForgetPasswordOtpVerify } from "../services/index";
// import { useAtom } from "jotai";
// import { instructorLoginStepAtom, instructorOtpAtom } from "store/atoms/authAtoms";
// import { EnterNewPassword_Step, Login_Step } from "lib/constants";
// import { useSpinner } from "context/SpinnerProvider"; // Spinner Context

// const InputElement = styled("input")(() => ({
//   width: "57px",
//   height: "50px",
//   fontSize: "20px",
//   fontWeight: "600",
//   textAlign: "center",
//   borderRadius: "8px",
//   border: "2px solid #A8A8A8",
//   background: "#FFFFFF",
//   transition: "0.3s",
//   outline: "none",
//   "&:focus": {
//     borderColor: "#5611B1",
//     boxShadow: "0px 0px 8px rgba(86, 17, 177, 0.5)",
//   },
// }));

// const OTPInput = ({ length, value, onChange }) => {
//   const inputRefs = useRef(new Array(length).fill(null));

//   const handleChange = (event, index) => {
//     const newValue = event.target.value.slice(-1);
//     const newOtp = value.split("");
//     newOtp[index] = newValue;
//     onChange(newOtp.join(""));

//     if (newValue && index < length - 1) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
//       {Array.from({ length }).map((_, index) => (
//         <InputElement
//           key={index}
//           ref={(el) => (inputRefs.current[index] = el)}
//           value={value[index] || ""}
//           onChange={(e) => handleChange(e, index)}
//           maxLength={1}
//         />
//       ))}
//     </Box>
//   );
// };

// export default function ForgetPasswordOTPInput() {
//   const [otp, setOtp] = useState("");
//   const [timeLeft, setTimeLeft] = useState(300);
//   const [error, setError] = useState("");
//   const [, setLoginStep] = useAtom(instructorLoginStepAtom);
//   const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);
//   const verifyOTP = useInstituteForgetPasswordOtpVerify();
//   const timerRef = useRef(null);
//   const theme = useTheme();
//   const [showResend, setShowResend] = useState(false);
//   const { showSpinner, hideSpinner } = useSpinner(); // Spinner Context

//   useEffect(() => {
//     const savedExpiration = localStorage.getItem("otpExpirationTime");
//     const currentTime = Math.floor(Date.now() / 1000);

//     if (savedExpiration) {
//       const remainingTime = parseInt(savedExpiration, 10) - currentTime;
//       if (remainingTime > 0) {
//         setTimeLeft(remainingTime);
//       } else {
//         resetTimer();
//       }
//     } else {
//       resetTimer();
//     }

//     startTimer();
//     return () => clearInterval(timerRef.current);
//   }, []);

//   const startTimer = () => {
//     clearInterval(timerRef.current);
//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           setShowResend(true);
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//   };

//   const resetTimer = () => {
//     const expirationTime = Math.floor(Date.now() / 1000) + 300;
//     localStorage.setItem("otpExpirationTime", expirationTime.toString());
//     setTimeLeft(300);
//     setShowResend(false);
//     startTimer();
//   };

//   const handleResend = () => {
//     resetTimer();
//   };

//   const handleVerify = async () => {
//     if (otp.trim().length !== 6) {
//       setError("Please enter a valid 6-digit OTP.");
//       return;
//     }
//     setError("");
//     showSpinner(); // Show spinner while verifying OTP

//     try {
//       const response = await verifyOTP(otp);
//       if (response.status === "success") {
//         setOtpAtom({ ...otpAtom, otp });
//         setLoginStep(EnterNewPassword_Step);
//       } else {
//         setError("Invalid OTP. Please try again.");
//       }
//     } catch {
//       setError("Invalid OTP. Please try again.");
//     } finally {
//       hideSpinner(); // Hide spinner after process
//     }
//   };

//   const handleBackToLogin = () => {
//     const confirmBack = window.confirm(
//       "Are you sure you want to go back to the login page? You will need to request a new OTP if you return."
//     );
//     if (confirmBack) {
//       localStorage.removeItem("otpExpirationTime");
//       setLoginStep(Login_Step);
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//       <Card sx={{ padding: 5, boxShadow: 3, textAlign: "center", borderRadius: "16px", maxWidth: "400px" }}>
//         <Typography variant="h2" fontWeight={700} mb={2}>
//           Enter OTP
//         </Typography>
//         <Typography variant="h4" color="textSecondary" mb={3}>
//           Enter the Code sent to your entered mail ID
//         </Typography>
//         <OTPInput value={otp} onChange={setOtp} length={6} />
//         {error && <Typography color="error" mt={1}>{error}</Typography>}
//         <Typography mt={5}>
//           {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
//         </Typography>

//         {showResend && (
//           <Button
//             onClick={handleResend}
//             sx={{
//               mt: 2,
//               borderRadius: 5,
//               color: theme.palette.primary.main,
//               fontSize: "14px",
//               textDecoration: "underline",
//               fontWeight: 700,
//               padding: "0px",
//               ":hover": {
//                 backgroundColor: theme.palette.background.default,
//               },
//             }}
//           >
//             Resend OTP
//           </Button>
//         )}

//         {/* Buttons in a single row */}
        
//           <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
//   <Button
//     variant="outlined" // Change to "outlined" for the border
//     sx={{
//       color: "#5611B1",
//       borderColor: "#5611B1", // Outline color
//       borderRadius: "8px",
//       textAlign: "center",
//       px: 3, // Padding for better spacing
//       "&:hover": {
//         backgroundColor: "rgba(86, 17, 177, 0.1)", // Light purple background on hover
//       },
//     }}
//     onClick={handleBackToLogin}
//   >
//     Back to Login
//   </Button>

//           <Button
//             variant="contained"
//             sx={{
//               backgroundColor: "#5611B1",
//               borderRadius: "8px",
//               textAlign: "center",
//               px: 4, // Padding for better button size
//             }}
//             onClick={handleVerify}
//           >
//             Verify OTP
//           </Button>
//         </Box>
//       </Card>
//     </Box>
//   );
// }
import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { Box, Typography, Button, Card, useTheme } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { useAtom } from "jotai";
import { instructorLoginStepAtom, instructorOtpAtom } from "store/atoms/authAtoms";
import { EnterNewPassword_Step, Login_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider"; // Spinner Context

const API_BASE_URL = "https://your-api-domain.com"; // Replace with actual API URL
const EMAIL = "teacher@gmail.com"; // Ensure correct email is used

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
  "&:focus": {
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
  const [timeLeft, setTimeLeft] = useState(300);
  const [error, setError] = useState("");
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [otpAtom, setOtpAtom] = useAtom(instructorOtpAtom);
  const timerRef = useRef(null);
  const theme = useTheme();
  const [showResend, setShowResend] = useState(false);
  const { showSpinner, hideSpinner } = useSpinner(); // Spinner Context

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
          setShowResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetTimer = () => {
    const expirationTime = Math.floor(Date.now() / 1000) + 300;
    localStorage.setItem("otpExpirationTime", expirationTime.toString());
    setTimeLeft(300);
    setShowResend(false);
    startTimer();
  };

  const handleResend = async () => {
    showSpinner();
    setError("");

    try {
      console.log("Sending OTP Resend Request..."); // Debug log
      const response = await axios.post(`${API_BASE_URL}/api/auth/resend-otp`, { email: "teacher@gmail.com" });

      console.log("Response:", response.data); // Log full response

      if (response.data.status === "success") {
        resetTimer();
      } else {
        console.error("Resend OTP failed:", response.data);
        setError(response.data.message || "Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error in resend OTP request:", error);
      setError(error.response?.data?.message || "Error resending OTP. Please try again later.");
    } finally {
      hideSpinner();
    }
  };

  const handleVerify = async () => {
    if (otp.trim().length !== 6) {
      setError("Please enter a valid 6-digit OTP.");
      return;
    }
    setError("");
    showSpinner(); // Show spinner while verifying OTP

    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, { 
        email: "teacher@gmail.com", // ✅ Ensure email is passed 
        otp 
      });

      if (response.data.status === "success") {
        setOtpAtom({ ...otpAtom, otp });
        setLoginStep(EnterNewPassword_Step);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      hideSpinner(); // Hide spinner after process
    }
  };

  const handleBackToLogin = () => {
    const confirmBack = window.confirm(
      "Are you sure you want to go back to the login page? You will need to request a new OTP if you return."
    );
    if (confirmBack) {
      localStorage.removeItem("otpExpirationTime");
      setLoginStep(Login_Step);
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
        <OTPInput value={otp} onChange={setOtp} length={6} />
        {error && <Typography color="error" mt={1}>{error}</Typography>}
        <Typography mt={5}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Typography>

        {showResend && (
          <Button
            onClick={handleResend}
            sx={{
              mt: 2,
              
              borderRadius: 5,
              color: theme.palette.primary.main,
              fontSize: "14px",
              textDecoration: "underline",
              fontWeight: 700,
              padding: "0px",
              ":hover": { backgroundColor: theme.palette.background.default },
            }}
          >
            Resend OTP
          </Button>
        )}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
          <Button variant="outlined" onClick={handleBackToLogin} sx={{ color: "#5611B1", borderRadius: "8px" }}>
            Back to Login
          </Button>
          <Button variant="contained" onClick={handleVerify} sx={{ backgroundColor: "#5611B1", borderRadius: "8px" }}>
            Verify OTP
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
