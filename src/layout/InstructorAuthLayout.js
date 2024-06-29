import { Grid } from '@mui/material'
import React from 'react'
import logo from "assets/images/logo.png";
import AuthFrame from "assets/images/auth/AuthFrame.png";
import {Box,Typography,} from '@mui/material';
import { useTheme } from '@emotion/react';
import InstructorLogin from 'features/Auth/instructorLogin';
import { Outlet } from 'react-router-dom';
import { InstructorLoginBg } from 'utils/images';
import { InstructorLoginGroups, MobileLoginInstructorBg } from 'utils/images';
import objects from "assets/instructor/login/objects.png"
import { useTabResponsive } from 'utils/tabResponsive';

const InstructorAuthLayout = ({children}) => {
  const theme = useTheme()
  const { tabView } = useTabResponsive()
  return (
    <Grid  sx={{ display: { xs: "block", sm: "flex" }, flexDirection: tabView ? "column" : "row" }}>
      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          backgroundImage: `url(${ tabView ? MobileLoginInstructorBg : InstructorLoginGroups})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: { xs: "center" },
          overflow: "hidden",
          width: "100%",
          height: tabView ? "597px" :"100vh",
        }}
      >
        <Box>
          <Box  sx={{  px: { sm: 10, xs: 2 }, display : tabView&&"none"}}>
            <img 
            src={objects} 
            alt="logo" 
            style={{bottom:0,position:"absolute",paddingLeft:"8.5%"}}
            />
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
                fontSize: tabView ? "2em" : "4em",
                lineHeight: tabView ? "4rem" :"5rem",
                display: "flex",
                pt:{sm:"15%"}
              }}
            >
              "
              <span style={{ textAlign: "left", display: "flex" }}>
              Teaching is the Art of Guiding, Learning is the Journey. Let's Begin. "
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
          height: tabView ? "597px" : "100vh" ,
          p: tabView ? 1 : 5,
          justifyContent: "center",
          display: "flex",
        }}
      >
        {children}
      </Grid>
    </Grid>
  )
}

export default InstructorAuthLayout   