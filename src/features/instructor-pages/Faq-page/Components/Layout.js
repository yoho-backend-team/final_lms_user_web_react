import React from 'react';
import { Container, Grid } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Container sx={{padding:"100px"}}>
      <Grid container spacing={3}>
        {children}
      </Grid>
    </Container>
  );
};

export default Layout;
