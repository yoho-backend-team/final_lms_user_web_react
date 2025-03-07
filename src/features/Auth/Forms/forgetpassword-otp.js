// import * as React from "react";
// import PropTypes from "prop-types";
// import {  useRef } from "react";
// import { Box, Typography, Button, CircularProgress } from "@mui/material";
// import { styled } from "@mui/system";
// import { useTheme } from "@emotion/react";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useStudentOtpVerify } from "../services/index";
// import { useAtomValue,useAtom } from "jotai";
// import { studentOtpAtom } from "store/atoms/authAtoms";
// import { studentLoginStepAtom } from "store/atoms/authAtoms";
// import { Student_Login_Step } from "lib/constants";
// import toast from "react-hot-toast";
// import { useSpinner } from "context/SpinnerProvider";
// import { EnterNewPassword_Step, Login_Step } from "lib/constants";

// const InputElement = styled("input")(
//   ({ theme }) => `
//   width: 40px;
//   height: 50px;
//   font-family: 'IBM Plex Sans', sans-serif;
//   font-size: 1rem;
//   font-weight: 500;
//   line-height: 1.5;
//   padding: 8px 0px;
//   border-radius: 8px;
//   text-align: center;
//   color: ${theme.palette.text.primary};
//   background: ${theme.palette.background.paper};
//   border: 2px solid ${theme.palette.primary.main};
//   transition: all 0.3s ease;

//   &:hover {
//     border-color: ${theme.palette.primary.dark};
//   }

//   &:focus {
//     border-color: ${theme.palette.primary.main};
//     outline: none;
//     box-shadow: 0 0 0 3px ${theme.palette.primary.light};
//   }

//   &:focus-visible {
//     outline: none;
//   }
// `,
// );

// function OTP({ separator, length, value, onChange }) {
//   const inputRefs = React.useRef(new Array(length).fill(null));

//   const focusInput = (targetIndex) => {
//     inputRefs.current[targetIndex]?.focus();
//   };

//   const selectInput = (targetIndex) => {
//     inputRefs.current[targetIndex]?.select();
//   };

//   const handleKeyDown = (event, currentIndex) => {
//     switch (event.key) {
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
//       case "Backspace":
//         event.preventDefault();
//         if (currentIndex > 0) {
//           focusInput(currentIndex - 1);
//           selectInput(currentIndex - 1);
//         }
//         onChange((prevOtp) => prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1));
//         break;
//       default:
//         break;
//     }
//   };

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
//     <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
//       {new Array(length).fill(null).map((_, index) => (
//         <React.Fragment key={index}>
//           <InputElement
//             ref={(ele) => (inputRefs.current[index] = ele)}
//             value={value[index] ?? ""}
//             onChange={(event) => handleChange(event, index)}
//             onKeyDown={(event) => handleKeyDown(event, index)}
//             aria-label={`Digit ${index + 1} of OTP`}
//           />
//           {index < length - 1 && separator}
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

// export default function OTPInput() {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const theme = useTheme();
//   const verifyOTP = useStudentOtpVerify();
//   const navigate = useNavigate();
//   const [, setLoginStep] = useAtom(studentLoginStepAtom);
//   const { showSpinner,hideSpinner } = useSpinner();
//   const [showResend, setShowResend] = useState(false);
//   const otpData = useAtomValue(studentOtpAtom);
//   const [otpAtom, setOtpAtom] = useAtom(studentOtpAtom);
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
  
  
//   // Initialize timeLeft from localStorage or set to 600 (10 minutes) if no stored value
// const [timeLeft, setTimeLeft] = useState(() => {
//   const endTime = localStorage.getItem('otpEndTime');
//   if (endTime) {
//     const remaining = Math.floor((parseInt(endTime) - Date.now()) / 1000);
//     return remaining > 0 ? remaining : 0;
//   }
//   // If no stored endTime, set a new one and return 300 (5 minutes)
//   const newEndTime = Date.now() + 300 * 1000;  // Set to 300 seconds for 5 minutes
//   localStorage.setItem('otpEndTime', newEndTime.toString());
//   return 300;  // 300 seconds = 5 minutes
// });

  
//   const timerRef = useRef(null);

//   useEffect(() => {
//     timerRef.current = setInterval(() => {
//       const endTime = localStorage.getItem('otpEndTime');
//       if (endTime) {
//         const remaining = Math.floor((parseInt(endTime) - Date.now()) / 1000);
//         if (remaining <= 0) {
//           clearInterval(timerRef.current);
//           setTimeLeft(0);
//           localStorage.removeItem('otpEndTime');
//         } else {
//           setTimeLeft(remaining);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(timerRef.current);
//     };
//   }, []);

//   const resetTimer = () => {
//     clearInterval(timerRef.current);
//     const endTime = Date.now() + 600 * 1000;
//     localStorage.setItem('otpEndTime', endTime.toString());
//     setTimeLeft(600);
    
//     timerRef.current = setInterval(() => {
//       const remaining = Math.floor((parseInt(endTime) - Date.now()) / 1000);
//       if (remaining <= 0) {
//         clearInterval(timerRef.current);
//         setTimeLeft(0);
//         localStorage.removeItem('otpEndTime');
//       } else {
//         setTimeLeft(remaining);
//       }
//     }, 1000);
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
//     try {
//       const response = await verifyOTP(otp);
//       if (response.status === "success") {
//         setOtpAtom({ ...otpAtom, otp });
//         setLoginStep(EnterNewPassword_Step);
//       }
//     } catch {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const handleBack = () => {
//     try {
//       showSpinner();
//       clearInterval(timerRef.current);
//       localStorage.removeItem('otpEndTime');
//       setLoginStep(Student_Login_Step);
//     } catch (error) {
//       toast.error("Try again");
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
//         mr:"20px"
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
//             mr:"20px"
//           }}
//         >
//           Enter the Code that sent to your entered mail id
//         </Typography>
//       </Box>
//       <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary ,mt:10,}}>
//         Your OTP: {otpData?.otp}
//       </Typography>
//       <OTP value={otp} onChange={setOtp} length={6} separator="-" />
//       {error && (
//         <Typography color="error" variant="body2">
//           {error}
//         </Typography>
//       )}
//       <Typography mt={5} mr={100}>
//         {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
//       </Typography>

//       <Button
//         disabled={timeLeft > 0}
//         onClick={handleResend}
//         sx={{
//           mt: 3,
//           mr:"400px",
//           borderRadius: 5,
//           color: timeLeft > 0 ? theme.palette.text.disabled : theme.palette.primary.main,
//           fontSize: "14px",
//           textDecoration: "underline",
//           fontWeight: 700,
//           padding: "0px",
//           ":hover": { 
//             border: "none", 
//             backgroundColor: timeLeft > 0 ? "transparent" : theme.palette.background.default 
//           },
//         }}
//       >
//         Resend
//       </Button>
       
      

//       <Typography 
//         onClick={handleBack} 
//         sx={{ 
//           textDecoration: "underline", 
//           cursor: "pointer",
//           ml:"250px",
//           mt:"-70px"
//         }}
//         onMouseEnter={(e) => {
//           e.target.style.color = "#4c55eb";
//           e.target.style.textShadow = "0px 2px 4px rgba(102, 108, 255, 0.5)";
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.color = "#666cff";
//           e.target.style.textShadow = "none";
//         }}
//       >
//         Back to Login
//       </Typography>

//       <Button
//         sx={{
//           backgroundColor: theme.palette.primary.main,
//           color: "white",
//           borderRadius: "36px",
//           boxShadow: "0px 8.582px 26.405px -5.281px rgba(13, 110, 253, 0.23)",
//           fontSize: "13px",
//           fontWeight: 700,
//           width: "101px",
//           mt: 5,
//           ml: "250px",
//           height: "37px",
//           "&:hover": {
//             background: "linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)",
//             transform: "scale(1.05)",
//             boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
//           },
//         }}
//         onClick={handleVerify}
//       >
//         Verify
//       </Button>
//     </Box>
//   );
// }

// import * as React from "react";
// import PropTypes from "prop-types";
// import { useRef, useState, useEffect } from "react";
// import { Box, Typography, Button } from "@mui/material";
// import { styled } from "@mui/system";
// import { useTheme } from "@emotion/react";
// import { useNavigate } from "react-router-dom";
// import { useStudentOtpVerify } from "../services/index";
// import { useAtomValue, useAtom } from "jotai";
// import { studentOtpAtom, studentLoginStepAtom } from "store/atoms/authAtoms";
// import { Student_Login_Step, EnterNewPassword_Step } from "lib/constants";
// import toast from "react-hot-toast";
// import { useSpinner } from "context/SpinnerProvider";

// const InputElement = styled("input")(({ theme }) => `
//   width: 40px;
//   height: 50px;
//   font-size: 1rem;
//   font-weight: 500;
//   text-align: center;
//   border-radius: 8px;
//   border: 2px solid ${theme.palette.primary.main};
//   transition: all 0.3s ease;
//   &:hover { border-color: ${theme.palette.primary.dark}; }
//   &:focus { border-color: ${theme.palette.primary.main}; outline: none; }
// `);

// function OTP({ separator, length, value, onChange }) {
//   const inputRefs = useRef(new Array(length).fill(null));

//   const handleKeyDown = (event, index) => {
//     if (event.key === "Backspace" && !value[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleChange = (event, index) => {
//     const newValue = event.target.value.slice(-1);
//     const newOtp = value.split("");
//     newOtp[index] = newValue;
//     onChange(newOtp.join(""));

//     if (newValue && index < length - 1) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", gap: 1, justifyContent: "center", alignItems: "center" }}>
//       {new Array(length).fill(null).map((_, index) => (
//         <React.Fragment key={index}>
//           <InputElement
//             ref={(el) => (inputRefs.current[index] = el)}
//             value={value[index] ?? ""}
//             onChange={(event) => handleChange(event, index)}
//             onKeyDown={(event) => handleKeyDown(event, index)}
//             aria-label={`Digit ${index + 1} of OTP`}
//           />
//           {index < length - 1 && separator}
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

// export default function OTPInput() {
//   const [otp, setOtp] = useState("");
//   const [error, setError] = useState("");
//   const theme = useTheme();
//   const verifyOTP = useStudentOtpVerify();
//   const navigate = useNavigate();
//   const [, setLoginStep] = useAtom(studentLoginStepAtom);
//   const { showSpinner, hideSpinner } = useSpinner();
//   const otpData = useAtomValue(studentOtpAtom);
//   const [otpAtom, setOtpAtom] = useAtom(studentOtpAtom);
//   const timerRef = useRef(null);

//   // Initialize timer state from localStorage
//   const [timeLeft, setTimeLeft] = useState(() => {
//     const storedEndTime = localStorage.getItem("otpEndTime");
//     if (storedEndTime) {
//       const remaining = Math.floor((parseInt(storedEndTime) - Date.now()) / 1000);
//       return remaining > 0 ? remaining : 0;
//     }
//     return 300; // Default to 5 minutes (300 seconds)
//   });

//   useEffect(() => {
//     if (timeLeft <= 0) {
//       clearInterval(timerRef.current);
//       return;
//     }

//     timerRef.current = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(timerRef.current);
//           localStorage.removeItem("otpEndTime");
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timerRef.current);
//   }, []);

//   const resetTimer = () => {
//     const newEndTime = Date.now() + 300 * 1000; // 5 minutes from now
//     localStorage.setItem("otpEndTime", newEndTime.toString());
//     setTimeLeft(300);
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
//     try {
//       const response = await verifyOTP(otp);
//       if (response.status === "success") {
//         setOtpAtom({ ...otpAtom, otp });
//         setLoginStep(EnterNewPassword_Step);
//       }
//     } catch {
//       setError("Invalid OTP. Please try again.");
//     }
//   };

//   const handleBack = () => {
//     try {
//       showSpinner();
//       clearInterval(timerRef.current);
//       localStorage.removeItem("otpEndTime");
//       setLoginStep(Student_Login_Step);
//     } catch (error) {
//       toast.error("Try again");
//     } finally {
//       hideSpinner();
//     }
//   };

//   return (
//     <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 2 }}>
//       <Typography sx={{ color: "#242424", fontSize: "24px", fontWeight: 700, textAlign: "center" }}>
//         Enter the OTP sent to your email
//       </Typography>

//       <Typography variant="h6" sx={{ textAlign: "center", color: theme.palette.text.secondary, mt: 2 }}>
//         Your OTP: {otpData?.otp}
//       </Typography>

//       <OTP value={otp} onChange={setOtp} length={6} separator="-" />

//       {error && <Typography color="error" variant="body2">{error}</Typography>}

//       <Typography mt={2} sx={{ fontSize: "14px", fontWeight: "bold" }}>
//         {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
//       </Typography>

//       <Button
//         disabled={timeLeft > 0}
//         onClick={handleResend}
//         sx={{
//           mt: 2,
//           color: timeLeft > 0 ? theme.palette.text.disabled : theme.palette.primary.main,
//           fontSize: "14px",
//           fontWeight: 700,
//           textDecoration: "underline",
//           ":hover": { border: "none", backgroundColor: "transparent" },
//         }}
//       >
//         Resend OTP
//       </Button>

//       <Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer", mt: 2 }}>
//         Back to Login
//       </Typography>

//       <Button
//         sx={{
//           mt: 3,
//           backgroundColor: theme.palette.primary.main,
//           color: "white",
//           borderRadius: "20px",
//           fontSize: "14px",
//           fontWeight: 700,
//           width: "100px",
//           "&:hover": { background: theme.palette.primary.dark },
//         }}
//         onClick={handleVerify}
//       >
//         Verify
//       </Button>
//     </Box>
//   );
// }
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
import { Student_Login_Step, EnterNewPassword_Step } from "lib/constants";
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
    const newValue = event.target.value.slice(-1);
    const newOtp = value.split("");
    newOtp[index] = newValue;
    onChange(newOtp.join(""));

    if (newValue && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
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

  // Initialize timer state from localStorage
  const [timeLeft, setTimeLeft] = useState(() => {
    const storedEndTime = localStorage.getItem("otpEndTime");
    if (storedEndTime) {
      const remaining = Math.floor((parseInt(storedEndTime) - Date.now()) / 1000);
      return remaining > 0 ? remaining : 0;
    }
    return 300; // Default to 5 minutes (300 seconds)
  });

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
  }, [timeLeft]); // Added dependency to ensure effect runs when `timeLeft` changes

  const resetTimer = () => {
    const newEndTime = Date.now() + 300 * 1000; // 5 minutes from now
    localStorage.setItem("otpEndTime", newEndTime.toString());
    setTimeLeft(300);
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

      {/* Resend OTP Button - Shows only when timer reaches 0 */}
      {timeLeft === 0 && (
        <Button
          onClick={handleResend}
          sx={{
            mt: 2,
            color: theme.palette.primary.main,
            fontSize: "14px",
            fontWeight: 700,
            textDecoration: "underline",
            ":hover": { border: "none", backgroundColor: "transparent" },
          }}
        >
          Resend OTP
        </Button>
      )}

      <Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer", mt: 2 }}>
        Back to Login
      </Typography>

      <Button
        sx={{
          mt: 3,
          backgroundColor: theme.palette.primary.main,
          color: "white",
          borderRadius: "20px",
          fontSize: "14px",
          fontWeight: 700,
          width: "100px",
          "&:hover": { background: theme.palette.primary.dark },
        }}
        onClick={handleVerify}
      >
        Verify
      </Button>
    </Box>
  );
}
