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
  FormHelperText,
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
import { ForgetPassword_Step } from "lib/constants";


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

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await studentLogin(values);
        if (response.success) {
          navigate("/student/home");
        }
      } catch (error) {
        toast.error(getErrorMessage(error));
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
          sx={{
            fontFamily: "poppins",
            textAlign: "justify",
            fontSize: 22,
            color: theme.palette.dark.main,
          }}
        >
          Join & Connect the Fastest Growing Online Community
        </Typography>
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          <Box mt={2}>
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
          <Box mt={2}>
            <FormControl
              fullWidth
              error={formik.errors.password && formik.errors.password}
            >
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
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
              mt: 2,
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
              sx={{ borderRadius: 20, px: 2, py: 1 }}
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography>Forget Password?</Typography>
            <Link onClick={handleForgetPassword} to="#">Get it</Link>
          </Box>
          <Box sx={{ mt: 8, justifyContent: "center", display: "flex" }}>
            <Typography sx={{ fontSize: 12 }}>
              Enter the mail ID & Password that given by LMS
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default LoginForm;
