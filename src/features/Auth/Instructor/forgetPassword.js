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
import {
  instructorLoginStepAtom,
  instructorOtpAtom,
} from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import axios from "axios";
import { useInstructorforgetPassword } from "../services";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const forgetPassword = useInstructorforgetPassword();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [, setOtpAtom] = useAtom(instructorOtpAtom);

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
    console.log("Sending reset password email to:", email);
    try {
      const response = await forgetPassword(email);
      console.log(response, "response");
      if (response.status === "success") {
        const { token } = response.data;
        setOtpAtom({ email, token });
        console.log("Hello Broo")
        setLoginStep("forgetPassword_Otp");
      } else {
        setEmailError("Email not found");
      }
    } catch (error) {
      console.log(error, "error");
      toast.error(error?.message || "An error occurred");
    }
  };

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
        <FormControl fullWidth sx={{ maxWidth: 250 }} error={!!emailError}>
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
  );
};

export default ForgetPasswordPage;
