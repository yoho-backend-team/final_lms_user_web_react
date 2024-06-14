import { Grid } from '@mui/material'
import React from 'react'
import logo from "assets/images/logo.png";
import AuthFrame from "assets/images/auth/AuthFrame.png";
import {Box,Typography,} from '@mui/material';
import { useTheme } from '@emotion/react';
import Login from 'features/Auth/login';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  const theme = useTheme()
  return (
    <Grid container sx={{ display: { xs: "block", sm: "flex" } }}>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          backgroundImage: `url(${AuthFrame})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: { xs: "center" },
          overflow: "hidden",
          width: "100%",
          height: { xs: "50vh", sm: "100vh" },
        }}
      >
        <Box>
          <Box sx={{ px: { sm: 10, xs: 2 } }}>
            <img src={logo} alt="logo" height={100} />
          </Box>
          <Box
            sx={{
              px: { sm: 20, xs: 5 },
              // py: { xs: 5, sm: 10 },
              // flexWrap: "wrap",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Typography
              fontFamily="poppins"
              variant="h1"
              color={theme.palette.common.white}
              sx={{
                fontSize: { xs: "2em", sm: "4em" },
                lineHeight: { sm: "5rem" },
                display: "flex",
              }}
            >
              "
              <span style={{ textAlign: "left", display: "flex" }}>
                Embark on a learning odyssey let your aspirations guide you "
              </span>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={4}
        sx={{
          // backgroundColor: theme.palette.common.white,
          height: { xs: "100%", sm: "100vh" },
          p: { xs: 1, sm: 5 },
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Login/>
      </Grid>
    </Grid>
  )
}

export default AuthLayout   