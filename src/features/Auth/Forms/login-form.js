import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import { useTheme } from "@emotion/react";
import { Email as EmailIcon } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Input,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
  Grid,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import { useAtom } from "jotai";
import { studentLoginStepAtom } from "store/atoms/authAtoms";
import { Link } from "react-router-dom/dist";
import * as yup from "yup";
import { useFormik } from "formik";
import { useStudentLogin } from "../services";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/common/error";
import LZString from "lz-string";
import { ForgetPassword_Step, Login_Step, Otp_Step } from "lib/constants";
import { useSpinner } from "context/SpinnerProvider";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";

// Validation schema
const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
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
  const { showSpinner, hideSpinner } = useSpinner();
  const [showPassword, setShowPassword] = useState(false);

  // Formik hook for handling form state
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        showSpinner();
        const response = await studentLogin(values);
        if (response.success) {
          navigate("/student/home");
        }
      } catch (error) {
        hideSpinner();
        toast.error(getErrorMessage(error));
      } finally {
        hideSpinner();
      }
    },
  });

  const handleForgetPassword = (e) => {
    e.preventDefault();
    setLoginStep(ForgetPassword_Step);
  };

  return (
    <Container maxWidth="xs">
      <Paper sx={{ padding: 9, borderRadius: 6, boxShadow: 4 }}>
        <Box mb={4} textAlign="center">
          <Typography variant="h4" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: theme.palette.text.secondary, mt: 1 }}>
            Join & Connect with the Fastest Growing Online Community
          </Typography>
        </Box>

        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
          {/* Email input */}
          <Box mb={3}>
  <FormControl
    fullWidth
    error={formik.touched.email && formik.errors.email}
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: theme.palette.background.default,
        borderRadius: "12px",
        border: `2px solid ${formik.touched.email && formik.errors.email ? theme.palette.error.main : theme.palette.divider}`,
        padding: "12px 16px",
        transition: "all 0.3s ease-in-out",
        position: "relative",
        "&:hover": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
        },
        "&:focus-within": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.1)`,
        },
        "& .MuiInput-underline": {
          display: "none", // Remove underline
        },
      },
    }}
  >
    <InputLabel htmlFor="email" sx={{ fontSize: "14px", color: theme.palette.text.primary, fontWeight: 600 }}>

    </InputLabel>
    <Input
      id="email"
      name="email"
      value={formik.values.email}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <IconButton
            sx={{
              color: theme.palette.text.secondary,
              pointerEvents: "none",
            }}
          >
            <EmailIcon />
          </IconButton>
        </InputAdornment>
      }
    />
    {formik.touched.email && formik.errors.email && (
      <FormHelperText
        sx={{
          color: theme.palette.error.main,
          fontSize: "12px",
          marginTop: "4px",
          fontWeight: 500,
        }}
      >
        {formik.errors.email}
      </FormHelperText>
    )}
  </FormControl>
</Box>


          {/* Password input */}
          <Box mb={3}>
  <FormControl
    fullWidth
    error={formik.touched.password && formik.errors.password}
    sx={{
      "& .MuiInputBase-root": {
        backgroundColor: theme.palette.background.paper,
        borderRadius: "10px", // Slightly more rounded corners
        border: `1px solid ${formik.touched.password && formik.errors.password ? theme.palette.error.main : theme.palette.divider}`,
        padding: "12px 16px", // Increased padding for a more spacious feel
        transition: "all 0.3s ease-in-out",
        position: "relative",
        boxShadow: formik.touched.password && formik.errors.password ? `0 4px 12px rgba(255, 0, 0, 0.3)` : `0 4px 10px rgba(0, 0, 0, 0.1)`, // Subtle shadow
        "&:hover": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 4px 12px rgba(0, 0, 0, 0.2)`, // Shadow on hover
        },
        "&:focus-within": {
          borderColor: theme.palette.primary.main,
          boxShadow: `0 0 8px 2px ${theme.palette.primary.light}`,
        },
        "& .MuiInput-underline": {
          display: "none", // Remove the underline
        },
      },
    }}
  >
    <InputLabel htmlFor="password" sx={{ fontSize: "14px", fontWeight: 600, color: theme.palette.text.primary }}>
      Password
    </InputLabel>
    <Input
      type={showPassword ? "text" : "password"}
      id="password"
      name="password"
      value={formik.values.password}
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      required
      fullWidth
      endAdornment={
        <InputAdornment position="end">
          <IconButton
            onClick={() => setShowPassword(!showPassword)}
            edge="end"
            sx={{
              color: theme.palette.text.secondary,
              transition: "color 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.main, // Smooth hover effect
              },
            }}
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </InputAdornment>
      }
    />
    {formik.touched.password && formik.errors.password && (
      <FormHelperText
        sx={{
          color: theme.palette.error.main,
          fontSize: "12px",
          marginTop: "6px",
          fontWeight: 500, // Make error message text more readable
        }}
      >
        {formik.errors.password}
      </FormHelperText>
    )}
  </FormControl>
</Box>



          {/* Submit button */}
          <Box mb={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              sx={{
                borderRadius: "25px",
                padding: "12px",
                boxShadow: 3,
                ":hover": {
                  backgroundColor: "orangered",
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              Sign in
            </Button>
          </Box>

          {/* Forgot password */}
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Typography sx={{ fontSize: 14, color: "#6c757d" }}>Forgot your password?</Typography>
            <Link
              onClick={handleForgetPassword}
              to="#"
              sx={{
                fontSize: 14,
                color: theme.palette.primary.main,
                textDecoration: "none",
                marginLeft: 1,
                ":hover": {
                  textDecoration: "underline",
                  color: theme.palette.primary.dark,
                  transform: "scale(1.05)",
                  transition: "all 0.3s ease-in-out",
                },
              }}
            >
              Get it
            </Link>
          </Box>

          {/* Information notice */}
          <Divider sx={{ my: 3 }} />
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
            <InfoIcon sx={{ fontSize: 16, color: "#6c757d", marginRight: 1 }} />
            <Typography sx={{ color: "#6c757d" }}>
              Enter the email ID & password provided by LMS.
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginForm;

