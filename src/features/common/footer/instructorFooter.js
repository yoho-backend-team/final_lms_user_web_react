import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";


const InstructorFooter = () => {
    return(
        <Box
        sx={{ width: "100%"}}
        >
            <Box
            component={"footer"} square={true}  variant={"outlined"}
            >
               <Box 
               sx={{
                display : "flex",
                justifyContent : 'space-between',
                ml : 2,
                mr : 2,
               }}>
                 <Link to={"/instructor/help-center"} style={{ textDecoration: "none"}} >Help Center</Link>
                 <Box sx={{ display: 'flex', gap: 2 }} >
                    <Link to={"/instructor/activity-logs"} style={{ textDecoration: "none"}} >Activity Log</Link>
                    <Link to={"/instructor/tickets"} style={{ textDecoration: "none"}} >Ticket</Link>
                 </Box>
               </Box>
            </Box>
        </Box>
    )
}

export default InstructorFooter