import React from 'react';
import { Container, Grid } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#e1e8ed",
        backgroundImage: "url(https://ssl.gstatic.com/support/content/images/static/homepage_header_background_v2.svg)",
        backgroundPosition: "50%",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        height: "50rem", // Increased height for the background image
        paddingTop: "120px",
        paddingBottom: "120px",
        minHeight: "130vh",
        width: "100%",
      }}
    >
      <Grid container spacing={-2}>
        {children}
      </Grid>
    </Container>
  );
};

export default Layout;