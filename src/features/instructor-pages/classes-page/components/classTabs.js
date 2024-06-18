import React from 'react';
import { Box, Card, Tabs, Tab } from '@mui/material';

const ClassTabs = ({ tabs, value, handleChange }) => {
  return (
    <Card elevation={3} sx={{ height: '100%', pl: '40px', boxShadow: 'none' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        sx={{ cursor: 'pointer', '& .MuiTabs-indicator': { backgroundColor: '#5611B1' }, color: '#5611B1' }}
        textColor="secondary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        {tabs.map((tab) => (
          <Tab key={tab.id} label={tab.title} value={tab.id} />
        ))}
      </Tabs>
    </Card>
  );
};

export default ClassTabs;
