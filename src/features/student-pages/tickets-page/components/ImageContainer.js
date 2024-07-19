import React from 'react';
import { Box, styled } from '@mui/material';
import { TicketBg2, TicketMain } from 'utils/images';

const BackgroundContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundImage: `url(${TicketBg2})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  width: "100vw",
  height: "100vh",
  padding: 4,
  overflow: "auto",
}));

const CenteredImage = styled('img')(({ theme }) => ({
  position: 'absolute',
  bottom: '10px', 
  left: '50%',
  transform: 'translateX(-50%)',
  width: '400px', 
}));

const ImageContainer = ({children}) => {
  return (
    <BackgroundContainer>
      <CenteredImage src=  {TicketMain} alt="Centered Image" />
      {children}
    </BackgroundContainer>
  );
};

export default ImageContainer;
