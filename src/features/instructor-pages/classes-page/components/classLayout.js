import React from 'react';
import { Grid } from '@mui/material';
import { ClassBg } from 'utils/images';

const ClassLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        background: `url(${ClassBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        padding: 4,
        overflow : "auto"
      }}
    >
      {children}
    </Grid>
  );
};

export default ClassLayout;
