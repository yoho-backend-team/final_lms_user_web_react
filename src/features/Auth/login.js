import React from 'react'
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,

  Input,
  Typography,
} from "@mui/material";
import AuthLayout from 'layout/AuthLayout';
import { useAtom } from 'jotai';
import { studentLoginStepAtom } from 'store/atoms/authAtoms';


import { Link } from "react-router-dom/dist";
import LoginForm from './Forms/login-form';
import OTPInput from "./Forms/otp-form"

const Login = () => {
  const theme = useTheme()
  const [loginStep,setLoginStep] = useAtom(studentLoginStepAtom)

  const map_to_form = {
    login : LoginForm,
    otp : OTPInput
  }
  const Component = map_to_form[loginStep]
  return (
  <AuthLayout>
      <Component />
  </AuthLayout>
  )
}

export default Login