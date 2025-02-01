import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
  FormHelperText,
} from "@mui/material";
import { studentOtpAtom, studentLoginStepAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useStudentforgetPassword } from "../services";
import toast from "react-hot-toast";
import { ForgetPassword_Otp_Step, Student_Login_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider";
import { getErrorMessage } from "utils/common/error";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const forgetPassword = useStudentforgetPassword();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);
  const { showSpinner,hideSpinner } = useSpinner()

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value) {
      setEmailError(""); 
    }
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async () => {
    if (!email) {
      setEmailError("Enter Mail ID");
      return;
    }
    if (!validateEmail(email)) {
      setEmailError("Enter a valid email address");
      return;
    }
    
    try {
      showSpinner()
      const response = await forgetPassword(email);
      if (response.status === "success") {
        const { token } = response.data;
        setOtpAtom({ email, token });
        setLoginStep(ForgetPassword_Otp_Step);
      } else {
        setEmailError("Email not found");
      }
    } catch (error) {
      const error_message = getErrorMessage(error)
      toast.error(error_message);
    }finally{
      hideSpinner()
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
      alignItems: "center",
      justifyContent: "center",
      padding: "50px",
      mr:15,
    
      minHeight: "100vh",
    }}
  >
     <Box
    sx={{
      width: "360px",
      height: "auto",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      mb:10,
      borderRadius: 4,
      background: "#fff", // Card-like container
      boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
      fontFamily: '"Zen Kaku Gothic Antique", sans-serif',
      textAlign: "center",
    }}
  >
        <Typography
      variant="h4"
      gutterBottom
      sx={{
        fontWeight: "bold",
        color: "#333",
        fontSize: "1.75rem",
      }}
    >
      Forget Password?
    </Typography>
    <Typography
      variant="body1"
      gutterBottom
      sx={{
        textAlign: "center",
        width: "100%",
        fontSize: "1rem",
        color: "#555",
        fontWeight: 400,
        paddingTop: 2,
      }}
    >
          Enter Mail ID
        </Typography>
        <FormControl fullWidth error={!!emailError} sx={{ marginTop: 3 }}>
      <Input
        type="email"
        value={email}
        onChange={handleEmailChange}
        aria-describedby="email-error-text"
        sx={{
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          fontSize: "1rem",
          "&:focus": {
            borderColor: "#0D6EFD",
            outline: "none",
          },
        }}
      />
          {emailError && (
        <FormHelperText id="email-error-text" sx={{ color: "#d32f2f" }}>
          {emailError}
        </FormHelperText>
      )}
    </FormControl>
    <Box
      sx={{
        display: "flex",
        marginTop: 4,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    ><Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer"}}
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
    variant="contained"
    onClick={handleSubmit}
    fullWidth
    sx={{
      backgroundColor: "#0D6EFD",
      maxWidth: 100,
      marginTop: 5,
      alignSelf: "flex-end",
      borderRadius: 20,
      px: 2,
      py: 1,
      "&:hover": {
        background: "linear-gradient(90deg, #2575FC 0%, #6A11CB 100%)", // Reverse gradient on hover
      transform: "scale(1.05)", // Slightly enlarges the button
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)", // Enhanced shadow on hover
      },
    }}
  >
    VERIFY
  </Button>
</Box>
</Box>
</Box>
  );
};

export default ForgetPasswordPage;
