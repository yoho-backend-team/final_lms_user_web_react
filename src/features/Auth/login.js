import React from "react";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Typography,
} from "@mui/material";
import AuthLayout from "layout/AuthLayout";
import { useAtom } from "jotai";
import { studentLoginStepAtom, studentOtpAtom } from "store/atoms/authAtoms";

import { Link } from "react-router-dom/dist";
import LoginForm from "./Forms/login-form";
import OTPInput from "./Forms/otp-form.js";
import ForgetPasswordPage from "./Forms/forgetPassword.js";
import ForgetPasswordOTPInput from "./Forms/forgetpassword-otp.js"
import EnterNewPasswordPage from "./Forms/newPassword.js"
const Login = () => {
  const theme = useTheme();
  const [loginStep, setLoginStep] = useAtom(studentLoginStepAtom);

  const map_to_form = {
    login: LoginForm,
    otp: OTPInput,
    forgetPassword: ForgetPasswordPage,
    forgetPassword_Otp: ForgetPasswordOTPInput,
    enterNewPassword: EnterNewPasswordPage

  };

  const Component = map_to_form[loginStep];
  
  return (
    <AuthLayout>
      <Component />
    </AuthLayout>
  );
};

export default Login;
