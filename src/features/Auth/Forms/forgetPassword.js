import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { studentOtpAtom, studentLoginStepAtom } from "store/atoms/authAtoms";
import { useAtom } from "jotai";
import axios from "axios"; // Import axios
import { useStudentforgetPassword } from "../services";
import toast from "react-hot-toast";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const forgetPassword = useStudentforgetPassword();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const [, setOtpAtom] = useAtom(studentOtpAtom);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await forgetPassword(email);
      if (response.status === "success") {
        const { token } = response.data;
        setOtpAtom({ email, token });
        setLoginStep("forgetPassword_Otp");
      }
    } catch (error) {
      toast.error(error?.message);
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
          width: "303.428px",
          height: "210.021px",
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
        <FormControl fullWidth sx={{ maxWidth: 250 }}>
          <Input type="email" value={email} onChange={handleEmailChange} />
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
