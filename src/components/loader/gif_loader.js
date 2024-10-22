import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import gif_image from "assets/gifs/bird_with_flower.gif"


const LoaderContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  width: '100%',
  height: '100vh',
  zIndex: 999999,
  overflow: 'visible',
  opacity: 0.7,
  background: `#fff url('${gif_image}') no-repeat center center`, // Adjust the image path as necessary
}));

const Gif_Loader = () => {
  return <LoaderContainer />;
};

export default Gif_Loader;
