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
      }}
    >
      <Box
        sx={{
          width: "360.428px",
          height: "220.021px",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 3,
          borderRadius: 2,
          fontFamily: '"Zen Kaku Gothic Antique"',
          fontSize: "12.8px",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "14.873px",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#242424", fontSize: "1.5rem" }}
        >
          Forget Password?
        </Typography>
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            textAlign: "left",
            width: "100%",
            fontSize: "12.80px",
            color: "black",
            fontWeight: 100,
            paddingTop: 5,
          }}
        >
          Enter Mail ID
        </Typography>
        <FormControl fullWidth  error={!!emailError}>
          <Input
            type="email"
            value={email}
            onChange={handleEmailChange}
            aria-describedby="email-error-text"
          />
          {emailError && (
            <FormHelperText id="email-error-text">{emailError}</FormHelperText>
          )}
        </FormControl>
        <Box sx={{ display: 'flex',mt:"40px", width: "100%", justifyContent: "space-between", alignItems: "center"}} >
          <Typography onClick={handleBack} sx={{ textDecoration: "underline", cursor: "pointer"}} >Back to Login</Typography>
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
                backgroundColor: "#0D6EFD",
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
