import React, { useState } from 'react';
import { ListItem, ListItemText, Collapse, IconButton, Typography, Box } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const FAQItem = ({ faq }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };


  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText
          primary={
            <Typography variant="h5" color="primary" style={{ fontSize: "20px", fontFamily: "Poppins" }}>
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
              <Typography variant="body1" color="black" style={{ fontSize: "15px", fontFamily: "Poppins" }}>
                {faq.description}
              </Typography>
            }
          />
        </ListItem>
      </Collapse>
    </>
  );
};

export default FAQItem;
