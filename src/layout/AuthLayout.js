import React from "react";
import AuthFrame from "assets/images/auth/AuthFrame.png";
import { Grid, Box, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import { useTabResponsive } from "utils/tabResponsive";
import logo from "assets/images/logo.png";

const AuthLayout = ({ children }) => {
  const theme = useTheme();
  const { tabView } = useTabResponsive();

  return (
    <Grid
      sx={{
        display: { xs: "block", sm: "flex" },
        flexDirection: tabView ? "column" : "row",
      }}
    >
      <Grid
        item
        xs={1}
        sm={8}
        sx={{
          backgroundImage: `url(${AuthFrame})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: { xs: "center" },
          overflow: "hidden",
          width: "100%",
          height: tabView ? "597px" : "100vh",
        }}
      >
        <Box>
          <Box sx={{ px: { sm: 10, xs: 2 }, display: tabView && "none" }}>
            <img
              src={logo}
              alt="logo"
              style={{ bottom: 0, position: "absolute", paddingLeft: "8.5%" }}
            />
          </Box>
          <Box
            sx={{
              px: { sm: 20, xs: 5 },
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
                lineHeight: tabView ? "4rem" : "5rem",
                display: "flex",
                pt: { sm: "15%" },
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
          height: tabView ? "597px" : "100vh",
          p: tabView ? 1 : 5,
          justifyContent: "center",
          display: "flex",
        }}
      >
        {children}
      </Grid>
    </Grid>
  );
};

export default AuthLayout;
