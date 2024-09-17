import React, { useState } from 'react';
import { ListItem, ListItemText, Collapse, IconButton, Typography, Box, Paper } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <>
     <Paper sx={{
        marginBottom: '8px', 
        backgroundColor: '#e8eaf6', 
        borderRadius: '8px', // Optional: Add rounded corners
        padding: '8px', // Optional: Add some padding
      }}>
      <ListItem button onClick={handleClick}>
       
        <ListItemText
          primary={
            <Typography variant="h5" color="#1a237e" style={{ fontSize: "20px", fontFamily: "Poppins" }}>
              {faq.title}
            </Typography>
          }
        />
        <IconButton edge="end" onClick={handleClick}>
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <ListItem>
          <ListItemText
            secondary={
              <Typography variant="body1" color="#212121" style={{ fontSize: "15px", fontFamily: "Poppins" ,fontWeight:600}}>
                {faq.description}
              </Typography>
            }
          />
        </ListItem>
       
      </Collapse>
      </Paper>
    </>
  );
};

export default FAQItem;
