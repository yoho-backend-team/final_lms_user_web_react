import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useInstructorLogin } from "../services";
import { useTabResponsive } from "utils/tabResponsive";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { useAtom } from "jotai";
import { instructorLoginStepAtom } from "store/atoms/authAtoms";
import { ForgetPassword_Step } from "lib/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const validationSchema = yup.object({
  email: yup.string("Enter your email").email("Enter a valid email").required("Email is required"),
  password: yup.string("Enter your password").min(8, "Password should be at least 8 characters").required("Password is required"),
});

const InstructorLoginForm = () => {
  const theme = useTheme();
  const instructorLogin = useInstructorLogin();
  const navigate = useNavigate();
  const { showSpinner, hideSpinner } = useSpinner();
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "teacher@gmail.com",
      password: "Wecandoit@2024",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        showSpinner();
        const response = await instructorLogin(values);
        toast[response.success ? "success" : "error"](response?.message);
        if (response.success) navigate("/instructor/home");
      } catch (error) {
        toast.error(error?.message);
      } finally {
        hideSpinner();
      }
    },
  });

  const handleForgetPassword = (e) => {
    e.preventDefault();
    showSpinner();
    setLoginStep(ForgetPassword_Step);
    hideSpinner();
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" px={3}>
      <Typography variant="h2" textAlign="center" mb={4} fontWeight={600} color={theme.palette.primary.main}>
        Join & Connect the Fastest Growing Online Community
      </Typography>
      <Box component="form" noValidate autoComplete="off" onSubmit={formik.handleSubmit} width={{ xs: "100%", sm: "400px" }}>
        <FormControl fullWidth margin="normal" error={formik.touched.email && Boolean(formik.errors.email)}>
          <InputLabel>Email</InputLabel>
          <Input name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} required />
          <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
        </FormControl>

        <FormControl fullWidth margin="normal" error={formik.touched.password && Boolean(formik.errors.password)}>
          <InputLabel>Password</InputLabel>
          <Input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <Visibility /> : <VisibilityOff />}</IconButton>
              </InputAdornment>
            }
            required
          />
          <FormHelperText>{formik.touched.password && formik.errors.password}</FormHelperText>
        </FormControl>

        
         <Box display="flex" justifyContent="space-between" alignItems="center" mt={2} p={1} borderRadius={1} bgcolor="#f3f4f6">
          <Typography fontSize={14} color="textSecondary" fontWeight={100}>Forgot Password?</Typography>
          <Link to="#" onClick={handleForgetPassword} style={{ fontSize: 14, color: "#666cff", textDecoration: "underline", fontWeight: 600 }}>
            Reset it
          </Link>
        </Box>

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 5, py: 1.5, borderRadius: 8, fontWeight: 600, backgroundColor: "#5611B1", ":hover": { backgroundColor: "#3e0e8e" } }}
          type="submit"
        >
          Sign in
        </Button>

        <Box display="flex" alignItems="center" gap={1} mt={3}>
          <InfoIcon fontSize="small" />
          <Typography fontSize={14} color="textSecondary">
            Enter the email & password provided by LMS
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorLoginForm;