import React from 'react';
import { Container, Grid } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container
      disableGutters
      maxWidth={false}
      sx={{
        backgroundColor: "#e1e8ed",
        paddingTop: "120px",
        paddingBottom: "120px",
        minHeight: "100vh",
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
