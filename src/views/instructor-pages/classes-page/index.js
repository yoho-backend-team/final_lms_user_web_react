import React, { useState } from 'react';
import { Box, Typography, Card, Grid, Tabs, Tab,FormControl,Select,MenuItem } from '@mui/material';
import ClassLayout from "../../../features/instructor-pages/classes-page/components/classLayout";
import { OfflineClassIcon } from 'utils/images';

const ClassesPage = () => {
  const [value, setValue] = useState('1');
  const [class_type,setClassType] = useState("online class")

  const tabs = [
    { id: '1', title: 'Upcoming Classes' },
    { id: '2', title: 'Completed Classes' },
    { id: '3', title: 'Class History' },
    { id: '4', title: 'Live Class' }
  ];

  const class_types = [
    {id:"1",title:"online class"},
    {id:"1",title:"offline class"}
  ]

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ClassLayout>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              color: '#484848',
              mb:"4px",
              pl:"40px"
            }}
          >
            Classes
          </Typography>
        </Box>
        <Card>
        <Grid container sx={{ height: 'auto', width: '100%' }}>
          <Grid item xs={8} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Box sx={{px:"40px",py:"20px",display:"flex",flexDirection:"row",gap:2}}  >
              <Typography variant="h6" sx={{fontSize:"20px",fontWeight:500,lineHeight:"32px",color:"#495057"}} >Online Classes</Typography>
              <img src={OfflineClassIcon} alt='online class' />
            </Box>
            <Box>
            <Card elevation={3} sx={{ height: '100%',pl:"40px",boxShadow:"none" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                sx={{ cursor: 'pointer','& .MuiTabs-indicator': {backgroundColor: '#5611B1'},color:"#5611B1" }}
                textColor="secondary"
                indicatorColor="#5611B1"
                aria-label="secondary tabs example"
              >
                {tabs.map((tab) => (
                  <Tab key={tab.id} label={tab.title} value={tab.id} />
                ))}
              </Tabs>
            </Card>
            </Box>
          </Grid>

          <Grid item xs={4} sx={{display:"flex",flexDirection:"row",justifyContent:"end",px:"20px",alignItems:"center" }}>
            <Box >
               <FormControl>
                 <Select defaultValue={class_type}>
                  {class_types.map((list)=>(
                   <MenuItem key={list.title} value={list.title} >{list.title}</MenuItem>
                  ))}
                 </Select>
               </FormControl>
            </Box>
          </Grid>
        </Grid>
        </Card>
      </Box>
    </ClassLayout>
  );
};

export default ClassesPage;
