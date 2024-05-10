import { useTheme } from "@emotion/react";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  Input,
  Typography,
} from "@mui/material";

import logo from "assets/images/logo.png";
import { Link } from "react-router-dom/dist";

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Grid container sx={{display:{xs:'block',sm:'flex'}}}>
      <Grid
        item
        xs={12} sm={8}
        sx={{ backgroundColor: theme.palette.secondary.main,width:'100%' }}
      >
        <Box>
          <Box>
            <img src={logo} alt="logo" height={90} />
          </Box>
          <Box
            sx={{
              px:{sm:20,xs:5},
              py:{xs:5,sm:10},
              flexWrap: "wrap",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography
              fontFamily="poppins"
              variant="h1"
              color={theme.palette.common.white}
              sx={{ fontSize:{xs:'2em',sm:'4em'}, lineHeight:{sm:'5rem'}}}
            >
              "Embark on a learning odyssey let your aspirations guide you"
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12} sm={4}
        sx={{
          backgroundColor: theme.palette.common.white,
          height:{xs:'100%',sm:'100vh'},
          p:{xs:1,sm:5},
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Box>
          <Box sx={{ px:{sm:5,xs:1}, mt:{sm:'15vh',xs:5} }}>
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
                sx={{ alignItems: "center", display: "flex", gap: 3, mt: 2,justifyContent:'center' }}
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
      </Grid>
    </Grid>
  );
};

export default LoginPage;
