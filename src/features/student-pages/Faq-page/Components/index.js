import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Divider, Paper, Grid, Box, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const faqs = [
  {
    category: 'General inquiries',
    items: [
      'What is ZenHub?',
      'Is ZenHub available on browsers other than Chrome?',
      'How do I know that ZenHub is installed?',
      'I use Chrome and Firefox. Do I have to download ZenHub twice?',
      'How do I know if I have the latest version?',
      'What happens if I am on a computer without ZenHub installed?',
      'How do I invite others to use ZenHub on my repo?'
    ],
  },
  {
    category: 'ZenHub Features',
    items: [
      'How do I submit a feature request?',
      'How do I connect several repos in one Task Board?',
      'What happens if I am on a computer without ZenHub installed?',
      'How do I invite others to use ZenHub on my repo?'
    ],
  },
  {
    category: 'Permissions & Privacy',
    items: [
      'Why can’t I see my organization on the ZenHub dashboard?',
      'How secure is my data in ZenHub?',
      'What are the details of ZenHub’s GitHub access permissions?',
      'How do ZenHub permissions work?'
    ],
  },
  {
    category: 'Pricing & Plans',
    items: [
      'Who needs to pay for ZenHub?',
      'Can I pay yearly for a discount?',
      'How does your pricing work?',
      'How do I pay for ZenHub?',
      'Can I pay for a subset of team members?',
      'What forms of payment do you accept?',
      'How do trials activate? What if we need another one?',
      'Who can make a payment on the Dashboard?',
      'What if we start with five users, but grow beyond that?',
      'How do I add an admin for my organization?'
    ],
  },
  {
    category: 'ZenHub Enterprise',
    items: [
      'How is ZenHub Enterprise different from ZenHub?',
      'How secure is ZenHub Enterprise?',
      'Can my organization trial ZenHub Enterprise?'
    ],
  }
];

const FaqStudent = () => {
  const [expanded, setExpanded] = useState(null);

  const handleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Frequently Asked Questions
      </Typography>
      <Grid container spacing={3}>
        {faqs.map((faq, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={3}>
              <Box p={2}>
                <Typography variant="h6">{faq.category}</Typography>
                <List>
                  {faq.items.map((item, i) => (
                    <div key={i}>
                      <ListItem button onClick={() => handleExpand(i)}>
                        <ListItemText primary={item} />
                        {expanded === i ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                      </ListItem>
                      {expanded === i && (
                        <ListItem>
                          <Typography variant="body2">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                          </Typography>
                        </ListItem>
                      )}
                      <Divider />
                    </div>
                  ))}
                </List>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Box mt={5} textAlign="center">
        <Paper elevation={3}>
          <Box p={5} bgcolor="primary.dark" color="white">
            <Typography variant="h5" gutterBottom>
              Questions? We have answers.
            </Typography>
            <Button variant="contained" color="secondary">
              Learn More
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default FaqStudent;


