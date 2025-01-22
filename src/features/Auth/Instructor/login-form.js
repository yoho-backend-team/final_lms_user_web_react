import React, { useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
  InputAdornment,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { useInstructorLogin } from "../services";
import { useNavigate } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { useAtom } from "jotai";
import {instructorLoginStepAtom} from "store/atoms/authAtoms";
import { ForgetPassword_Step } from "lib/constants";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { InstructorOtp } from "lib/constants";



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

const InstructorLoginForm = () => {
  const theme = useTheme();
  const instructorLogin = useInstructorLogin();
  const navigate = useNavigate();
  const { tabView } = useTabResponsive();
  const { showSpinner,hideSpinner} = useSpinner()
  const [, setLoginStep] = useAtom(instructorLoginStepAtom);
  const [showPassword,setShowPassword] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: "teacher@gmail.com",
      password: "Wecandoit@2024",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      showSpinner()
      const response = await instructorLogin(values);
      if (response.success) {
        toast.success(response?.message)
        navigate("/instructor/home");
      }else{
        toast.success(response?.message)
      }  
      } catch (error) {
       toast.error(error?.message) 
      }finally{
       hideSpinner()
      }
    },
  });

  const  handleForgetPassword=(e)=>{
      showSpinner()
      e.preventDefault();
      setLoginStep(ForgetPassword_Step);
      hideSpinner()
  }


  return (
    <Box>
      <Box
        sx={{
          px: { sm: 5, xs: 1 },
          mt: { sm: "15vh", xs: 5 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontFamily: "poppins",
            textAlign: "justify",
            fontSize: 22,
            mb: 15,
            color: theme.palette.dark.main,
            textAlign : "center",
          }}
        >
          Join & Connect the Fastest Growing Online Community
        </Typography>
        <form
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          style={{ minWidth: "380px", maxWidth: "400px" }}
        >
          <Box mb={5}>
            <FormControl
              fullWidth
              error={formik.touched.email && Boolean(formik.errors.email)}
            >
              <InputLabel>Email or Username</InputLabel>
              <Input
                id="user-name"
                name="email"
                placeholder="Enter your email"
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
              error={formik.touched.password && Boolean(formik.errors.password)}
            >
              <InputLabel>Password</InputLabel>
              <Input
                variant={"filled"}
                type={ showPassword ?  "text" : "password"}
                name="password"
                id="password"
                placeholder=".........."
                sx={{ minWidth: "300px"}}
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
              mt: 2,
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ alignItems: "center", display: "none" }}>
              <Checkbox
                sx={{
                  color: "#E5D2FF",
                  "&.Mui-checked": {
                    color: "#5611B1",
                  },
                }}
              />
              <Typography sx={{ fontSize: 12, color: "#757575" }}>
                I accept the terms & conditions
              </Typography>
            </Box>
            <Button
  variant="contained"
  size="large"
  sx={{
    borderRadius: 56,
    backgroundColor: "#5611B1",
    my: "20px",
    ":hover": {
      backgroundColor: "#5611B1", // Keep the background color same
      transform: "scale(1.1)", // Boom effect: make the button grow
      transition: "transform 0.3s ease-in-out", // Smooth transition for the scaling effect
    },
    ":active": {
      transform: "scale(1)", // Shrinks back after click (boom effect)
    },
  }}
  type="submit"
>
  Sign in
</Button>

          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2, gap: "5px" }}>
            <Typography sx={{ fontSize: "0.9375rem",fontWeight: 500,lineHeight: 1.375, color: "#676b7b" }} >Forget Password?</Typography>
            {/* <Link  to="#" style={{ fontSize: "0.9375", fontWeight: 500, lineHeight: 1.375, color: "#666cff",textDecoration: "none"}} onClick={handleForgetPassword}>Get it</Link> */}
            <Link
  to="#"
  style={{
    fontSize: "0.9375rem",
    fontWeight: 500,
    lineHeight: 1.375,
    color: "#666cff",
    textDecoration: "none",
    transition: "color 0.3s ease, text-decoration 0.3s ease",
  }}
  onClick={handleForgetPassword}
  onMouseEnter={(e) => {
    e.target.style.color = "#3f51b5"; // Change color on hover
    e.target.style.textDecoration = "underline"; // Underline on hover
  }}
  onMouseLeave={(e) => {
    e.target.style.color = "#666cff"; // Revert to original color
    e.target.style.textDecoration = "none"; // Remove underline
  }}
>
  Get it
</Link>

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

export default InstructorLoginForm;