import React from 'react';
import { Box } from "@mui/material";
import { HelpCenterBg } from "utils/images";

const HelpCenterLayout = ({children}) => {
    return (
        <Box
            sx={{
                position: 'relative',
                width: '100vw',
                height: '100vh',
                backgroundImage: `url(${HelpCenterBg})`,
                backgroundPosition: 'bottom center',
                backgroundAttachment : "fixed",
                backgroundRepeat: 'no-repeat',
                display: 'flex',
            }}
        >
            <Box
                sx={{
                    width: '100vw',
                    padding: '70px 70px 10px 70px', 
                    borderRadius: '8px',
                    mb: '20px'
                }}
            >
                {children}
            </Box>
        </Box>
    );
}

export default HelpCenterLayout;
