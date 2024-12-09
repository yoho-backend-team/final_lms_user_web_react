import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Typography,
  FormHelperText, InputAdornment, IconButton
} from "@mui/material";
import { useAtom } from "jotai";
import { studentLoginStepAtom } from "store/atoms/authAtoms";
import { Link } from "react-router-dom/dist";
import * as yup from "yup";
import { useFormik } from "formik";
import { useStudentLogin } from "../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { getErrorMessage } from "utils/common/error";
import LZString from "lz-string"
import { ForgetPassword_Step, Login_Step, Otp_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider"
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";


const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const LoginForm = () => {
  const theme = useTheme();
  const studentLogin = useStudentLogin();
  const navigate = useNavigate();
  const [, setLoginStep] = useAtom(studentLoginStepAtom);
  const { showSpinner, hideSpinner} = useSpinner()
  const [showPassword,setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        showSpinner()
        const response = await studentLogin(values);
        if (response.success) {
          navigate("/student/home");
        }
      } catch (error) {
        hideSpinner()
        toast.error(getErrorMessage(error));
      }finally{
        hideSpinner()
      }
    },
  });

  const handleForgetPassword = (e) => {
        e.preventDefault();
        setLoginStep(ForgetPassword_Step);
  }
  

  return (
    <Box>
      <Box sx={{ px: { sm: 5, xs: 1 }, mt: { sm: "15vh", xs: 5 } }}>
        <Typography
          variant="h4"
          onClick={() => setLoginStep(Otp_Step)}
          sx={{
            fontFamily: "poppins",
            textAlign: "justify",
            fontSize: 22,
            color: theme.palette.dark.main,
            textAlign: "center",
            mb: 5
          }}
        >
          Join & Connect the Fastest Growing Online Community
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box mb={5}>
            <FormControl
              fullWidth
              error={formik.touched.email && formik.errors.email}
            > 
              <InputLabel>Email or Username</InputLabel>
              <Input
                id="user-name"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                required
              />
              {formik.touched.email && formik.errors.email && (
                <FormHelperText>{formik.errors.email}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box mb={5}>
            <FormControl
              fullWidth
              error={formik.errors.password && formik.errors.password}
            >
              <InputLabel>Password</InputLabel>
              <Input
                type={ showPassword ?  "text" : "password"}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                endAdornment={
                  <InputAdornment position="end" >
                    <IconButton onClick={() => setShowPassword(!showPassword)} >
                       {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
                required
              />
              {formik.touched.password && formik.errors.password && (
                <FormHelperText>{formik.errors.password}</FormHelperText>
              )}
            </FormControl>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              gap: 3,
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ alignItems: "center", display: "none" }}>
              <Checkbox />
              <Typography sx={{ fontSize: 12 }}>
                I accept the terms & conditions
              </Typography>
            </Box>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{ borderRadius: 56, my: "20px" }}
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: "5px" }}>
            <Typography sx={{ fontSize: "0.9375rem",fontWeight: 500,lineHeight: 1.375, color: "#676b7b"}}>Forget Password? </Typography>
            <Link style={{ fontSize: "0.9375", fontWeight: 500, lineHeight: 1.375, color: "#666cff",textDecoration: "none"}} onClick={handleForgetPassword} to="#"> Get it</Link>
          </Box>
          <Box sx={{ mt: 8, display: "flex", alignItems: "center", gap: 1 }}>
            <span>
              <InfoIcon />
            </span>
            <Typography
              sx={{
                fontSize: 12,
                color: "#828282",
                fontWeight: 400,
                lineHeight: "32px",
              }}
            >
              Enter the mail ID & Password that given by LMS
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
