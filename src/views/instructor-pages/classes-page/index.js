import React, { useState } from 'react';
import { Box, Typography, Card, Grid, FormControl, Select, MenuItem } from '@mui/material';
import ClassLayout from '../../../features/instructor-pages/classes-page/components/classLayout';
import { OfflineClassIcon } from 'utils/images';
import ClassTabs from '../../../features/instructor-pages/classes-page/components/classTabs';
import UpcomingClassList from 'features/instructor-pages/classes-page/components/upcommingClass';
import CompletedClassList from 'features/instructor-pages/classes-page/components/completedClass';
import LiveClassList from 'features/instructor-pages/classes-page/components/liveClass';
import ClassHistory from 'features/instructor-pages/classes-page/components/classHistory';

const ClassesPage = () => {
  const [value, setValue] = useState('1');
  const [classType, setClassType] = useState('online class');

  const tabs = [
    { id: '1', title: 'Upcoming Classes' },
    { id: '2', title: 'Completed Classes' },
    { id: '3', title: 'Class History' },
    { id: '4', title: 'Live Class' },
  ];

  const renderComponents = {
    "1" : <UpcomingClassList />,
    "2" : <CompletedClassList />,
    "3" : <ClassHistory />,
    "4" : <LiveClassList />
  }

  const classTypes = [
    { id: '1', title: 'online class' },
    { id: '2', title: 'offline class' },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
  };

  return (
    <ClassLayout>
      <Box sx={{ display: 'flex', flexDirection: 'column', width: '100vw' }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              color: '#484848',
              mb: '4px',
              pl: '40px',
            }}
          >
            Classes
          </Typography>
        </Box>
        <Card>
          <Grid container sx={{ height: 'auto', width: '100%' }}>
            <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Box sx={{ px: '40px', py: '20px', display: 'flex', flexDirection: 'row', gap: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '20px', fontWeight: 500, lineHeight: '32px', color: '#495057' }}>
                  Online Classes
                </Typography>
                <img src={OfflineClassIcon} alt="online class" />
              </Box>
              <Box>
                <ClassTabs tabs={tabs} value={value} handleChange={handleChange} />
              </Box>
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'end', px: '20px', alignItems: 'center' }}>
              <Box>
                <FormControl>
                  <Select value={classType} onChange={handleClassTypeChange}>
                    {classTypes.map((list) => (
                      <MenuItem key={list.id} value={list.title}>
                        {list.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Card>

        {renderComponents[value]}
      </Box>
    </ClassLayout>
  );
};

export default ClassesPage;
