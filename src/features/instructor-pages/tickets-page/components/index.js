import React, { useState } from 'react';
import { Box, Typography, Tab, Tabs, Button, Grid,Modal } from '@mui/material';
import CreateTicketForm from './createTicketForm';
import { TicketBg } from 'utils/images';
import TicketCard from './TicketCard';
import TicketView from './TicketView';
import { useTabResponsive } from 'utils/tabResponsive';

const InstructorTicketsPage = () => {
  const [value, setValue] = useState('1');
  const [open, setOpen] = useState(false);
  const [ticketView,setTicketView] = useState(false)
  const { tabView } = useTabResponsive()


  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTicketViewOpen = () => setTicketView(true)
  const handleTicketViewClose = () => setTicketView(false)

  const tab_list = [
    { id: '1', title: 'All' },
    { id: '2', title: 'Open' },
    { id: '3', title: 'Close' },
  ];

  const tickets = [
    {
      ticketNumber: '123456789011',
      issue: 'Attendance Issue',
      description: 'Concerns have been raised regarding attendance inconsistencies, requiring attention for resolution.',
      status: 'Opened',
      date: 'March 20',
      ticketId: '01',
    },
    {
      ticketNumber: '123456789012',
      issue: 'Grade Issue',
      description: 'There is a discrepancy in the reported grades that needs to be addressed.',
      status: 'Closed',
      date: 'March 21',
      ticketId: '02',
    },
    {
      ticketNumber: '123456789013',
      issue: 'Course Material',
      description: 'Some course materials are missing from the repository.',
      status: 'Opened',
      date: 'March 22',
      ticketId: '03',
    },
    {
      ticketNumber: '123456789014',
      issue: 'Technical Support',
      description: 'Issues with accessing the online portal have been reported.',
      status: 'In Progress',
      date: 'March 23',
      ticketId: '04',
    },
    {
      ticketNumber: '123456789015',
      issue: 'Feedback',
      description: 'Student feedback has been overwhelmingly positive.',
      status: 'Closed',
      date: 'March 24',
      ticketId: '05',
    },
    {
      ticketNumber: '123456789016',
      issue: 'Assignment Submission',
      description: 'Some students are unable to submit their assignments.',
      status: 'Opened',
      date: 'March 25',
      ticketId: '06',
    },
  ];

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${TicketBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          height: '100vh',
          overflow : "auto"
        }}
      >
        <Box sx={{ p: tabView ?'62px 40px 20px 38px' : "62px 40px 20px 80px" }}>
         {
            open || ticketView ? open ?  <CreateTicketForm handleClose={handleClose} /> : <TicketView handleTicketViewClose={handleTicketViewClose} />
            :
         <>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', gap: '40px' }}>
              <Typography sx={{ color: '#000', fontSize: '24px', fontWeight: '700', lineHeight: '22px' }}>Ticket</Typography>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ cursor: 'pointer', '& .MuiTabs-indicator': { backgroundColor: '#5611B1' }, color: '#5611B1' }}
                textColor="secondary"
                indicatorColor="primary"
                aria-label="secondary tabs example"
              >
                {tab_list.map((i) => (
                  <Tab key={i.id} label={i.title} value={i.id} />
                ))}
              </Tabs>
            </Box>
            <Box>
              <Button
                onClick={handleOpen}
                variant="contained"
                sx={{
                  color: 'white',
                  backgroundColor: '#5611B1',
                  borderRadius: '8px',
                  boxShadow: '0px 6px 34px -8px #0D6EFD',
                  padding: '9px 24px',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '22px',
                }}
              >
                Create Ticket
              </Button>
            </Box>
          </Box>

          <Grid container spacing={ tabView ? 4 : 10} sx={{ pt: '40px', }}>
            {tickets.map((ticket, index) => (
              <Grid item xs={ tabView ? 6 : 4 } key={index}>
                <TicketCard {...ticket} handleTicketViewOpen={handleTicketViewOpen} handleTicketViewClose={handleTicketViewClose} />
              </Grid>
            ))}
          </Grid>
          </>         
         }
       </Box>
       </Box>
    </>
  );
};

export default InstructorTicketsPage;
