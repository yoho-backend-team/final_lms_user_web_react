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


import { Link } from "react-router-dom/dist";

const Login = () => {
  const theme = useTheme()
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
            <form noValidate autoComplete="off">
              <Box mt={2}>
                <FormControl fullWidth>
                  <InputLabel>Email or Username</InputLabel>
                  <Input id="user-name" />
                </FormControl>
              </Box>
              <Box mt={2}>
                <FormControl fullWidth>
                  <InputLabel>Password</InputLabel>
                  <Input type="password" id="password" />
                </FormControl>
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  gap: 3,
                  mt: 2,
                  justifyContent: "center",
                }}
              >
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <Checkbox />
                  <Typography sx={{ fontSize: 12 }}>
                    I accept the terms & conditions
                  </Typography>
                </Box>
                <Button
                  href="/student/home"
                  variant="contained"
                  sx={{ borderRadius: 20, px: 2, py: 1 }}
                >
                  Sign in
                </Button>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
                <Typography>Forget Password?</Typography>
                <Link to="#">Get it</Link>
              </Box>
              <Box sx={{ mt: 8, justifyContent: "center", display: "flex" }}>
                <Typography sx={{ fontSize: 12 }}>
                  Enter the mail ID & Password that given by LMS
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
  )
}

export default Login