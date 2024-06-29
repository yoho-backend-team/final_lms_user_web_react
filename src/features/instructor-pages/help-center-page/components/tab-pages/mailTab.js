import React from 'react';
import { Grid } from '@mui/material';
import HelpCard from '../helpCard';

const MailData = [
    { section: 'Mail', title: 'Explaining design to someone who doesn’t understand what it is', id: 1 },
    { section: 'Mail', title: 'Another mail topic', id: 2 },
    { section: 'Mail', title: 'Mail topic 3', id: 3 },
    { section: 'Mail', title: 'Mail topic 4', id: 4 },
    { section: 'Mail', title: 'Mail topic 5', id: 5 },
    { section: 'Mail', title: 'Mail topic 6', id: 6 },
  ];

const MailTab = ({setView}) => {
  return (
    <Grid container spacing={2}>
      {MailData.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.id}>
          <HelpCard section={item.section} title={item.title} setView={setView} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MailTab;
