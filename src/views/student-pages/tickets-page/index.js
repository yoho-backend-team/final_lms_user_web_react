import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import TicketsCard from "features/student-pages/tickets-page/components/TicketsCard";

const TicketsPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{m:4}}>
    <Grid container spacing={3} sx={{p:2,alignItems:'flex-start'}}>
      <Grid item md={1} xs={12} sx={{mt:2}}>
        <Typography variant="h2">Ticket</Typography>
      </Grid>
      <Grid item md={9} xs={12}>
        {/* <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}> */}
          <Grid sx={{  typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="All" value="1" />
                <Tab label="Open" value="2" />
                <Tab label="Close" value="3" />
              </TabList>
            </Box>
            <TabPanel value="1"><TicketsCard/></TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
          </Grid>

         
        {/* </Box> */}
      </Grid>
      <Grid item md={2} xs={12} >
          <Button variant="contained">Create Ticket</Button>
          </Grid>
    </Grid>
    </Box>
  );
};

export default TicketsPage;
