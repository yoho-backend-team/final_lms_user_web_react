import React from 'react';
import { useTheme } from '@emotion/react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  Input,
  Typography,
  FormHelperText,
} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { Link } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import {useInstructorLogin} from '../services';
import { useNavigate } from 'react-router-dom';
import { useTabResponsive } from 'utils/tabResponsive';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const InstructorLoginForm = () => {
  const theme = useTheme();
  const instructorLogin = useInstructorLogin();
  const navigate = useNavigate()
  const { tabView } = useTabResponsive()


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
        const response = await instructorLogin(values)
        console.log(response,"response")
        if(response.success){
           navigate("/instructor/home")
        }
    },
    
  });

  return (
    <Box>
      <Box sx={{ px: { sm: 5, xs: 1 }, mt: { sm: "15vh", xs: 5 }, display: "flex", flexDirection: "column", alignItems: 'center' }}>
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
        <form noValidate autoComplete="off" onSubmit={formik.handleSubmit} style={{ minWidth:"380px",maxWidth:"400px"}} >
          <Box mt={2}>
            <FormControl fullWidth error={formik.touched.email && Boolean(formik.errors.email)}>
              <InputLabel>Email or Username</InputLabel>
              <Input
                id="user-name"
                name='email'
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
            <FormControl fullWidth error={formik.touched.password && Boolean(formik.errors.password)}>
              <InputLabel>Password</InputLabel>
              <Input
                type="password"
                name='password'
                id="password"
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
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ alignItems: "center", display: "flex" }}>
              <Checkbox
                sx={{
                  color: "#E5D2FF",
                  '&.Mui-checked': {
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
              sx={{ borderRadius: 56, backgroundColor: "#5611B1" }}
              type="submit"
            >
              Sign in
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography>Forget Password?</Typography>
            <Link to="#">Get it</Link>
          </Box>
          <Box sx={{ mt: 8, display: "flex", alignItems: "center", gap: 1 }}>
            <span><InfoIcon /></span>
            <Typography sx={{ fontSize: 12, color: "#828282", fontWeight: 400, lineHeight: "32px" }}>
              Enter the mail ID & Password that given by LMS
            </Typography>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default InstructorLoginForm;
