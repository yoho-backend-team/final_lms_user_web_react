import { Box, Divider, Tabs, Tab , IconButton, Popover, Typography, Button, List, ListItem, ListItemText} from "@mui/material";
import { useState } from "react";
import LaunchSharpIcon from '@mui/icons-material/LaunchSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import {Avatar} from "@mui/material";
import { borderRadius, height, width } from "@mui/system";
import { Link } from "react-router-dom";
import { getImageUrl } from "utils/common/imageUtlils";
import { profilePlaceholder } from "utils/placeholders";


const NotificationListView = ({handleSelectNotification,id,anchorE2,isOpen,setClose,notifications}) => {
    const [ tabValue,setTabValue ] = useState(0)

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const filteredNotifications = notifications?.filter((notification) => {
        if (tabValue === 0) return true;
        if (tabValue === 1) return notification.status === "read";
        if (tabValue === 2) return notification.status === "unread";
        return true;
      });

    return(
           <Popover 
           id={id}
           open={isOpen} 
           onClose={setClose}
           anchorEl={anchorE2}
           anchor="right"
           anchorOrigin={{
            vertical : "bottom",
            horizontal : "right"
           }}
           transformOrigin={{
            vertical : "top",
            horizontal : "right"
           }}
           sx={{
            marginTop : "50px"
           }}
           >
             <Box
             sx={{
                width : "492px",
                height : "500px",
                border : "1px solid #DEE2E6",
                borderRadius : "8px"
             }}
             >
                  <Box 
                   sx={{
                    display: 'flex',
                    justifyContent : "space-between",
                    padding : "24px",
                   }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "center"}} >
                     <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 500, lineHeight: "32px"}} >Notifications</Typography>
                     <Typography sx={{ color: "#495057", fontSize: "24px", fontWeight: 700, lineHeight: "32px"}} >(1)</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: "flex-start",gap:"20px"}} >
                        <IconButton sx={{ width: "19px", height: "19px"}} onClick={setClose} component={Link} to={"/instructor/notifications"} >
                           <LaunchSharpIcon sx={{ height: "19px", width: "19px", color: "#000000"}} /> 
                        </IconButton>
                        <IconButton sx={{ width: "11px", height: "11px"}} onClick={setClose} >
                            <CloseSharpIcon sx={{ color: "#6C757D"}}  />
                        </IconButton>
                    </Box>
                  </Box>
                  <Divider />
                  <Box 
                  sx={{ 
                    px : "24px",
                    display: "flex",
                    justifyContent: "flex-start"
                  }}
                  >
                 <Tabs 
                   value={tabValue} 
                   onChange={handleTabChange}
                 >
                   <Tab 
                     label="All" 
                     sx={{
                       color: tabValue === 0 ? '#5611B1' : '#6C757D',
                       fontSize: '14px',
                       fontWeight: 500,
                       lineHeight: '22px',
                       borderBottom: tabValue === 0 ? '2px solid #5611B1' : 'none'
                     }}
                   />
                   <Tab 
                     label="Read" 
                     sx={{
                       color: tabValue === 1 ? '#5611B1' : '#6C757D',
                       fontSize: '14px',
                       fontWeight: 500,
                       lineHeight: '22px',
                       borderBottom: tabValue === 1 ? '2px solid #5611B1' : 'none'
                     }}
                   />
                   <Tab 
                     label="Unread" 
                     sx={{
                       color: tabValue === 2 ? '#5611B1' : '#6C757D',
                       fontSize: '14px',
                       fontWeight: 500,
                       lineHeight: '22px',
                       borderBottom: tabValue === 2 ? '2px solid #5611B1' : 'none'
                     }}
                   />
                 </Tabs>
                </Box>
                <Box key={"notification_list"}  sx={{ height: "39vh", overflow: 'auto'}} >
                <Box >
                  {
                    filteredNotifications?.map((notifi,index)=>(
                        <>
                        <Box key={notifi?._id} onClick={() => handleSelectNotification(notifi)} sx={{ padding: "13px 24px", display: 'flex', justifyContent: "space-between", cursor : "pointer"}} >
                            <Box>
                               <Avatar
                               src={notifi?.staff?.image ? getImageUrl(notifi?.staff?.image) : profilePlaceholder}
                               sx={{
                                width: "48px",
                                height : "48px",
                               }}
                               />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: "space-between", flexDirection: 'column',maxWidth:"300px"}} >
                                <Typography sx={{ color: "#343A40", fontSize: "16px", fontWeight: 500}} >{notifi?.title}</Typography>
                                <Typography sx={{ color: "#6C757D", fontSize: "12px", fontWeight: 300}} >{notifi?.body}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "end"}} >
                                <Typography sx={{ display: "inline-flex", color: "#86929D", fontSize: "9px",fontWeight:700}} >33 Minutes Ago</Typography>
                            </Box>
                        </Box>
                        <Divider />
                        </>
                    ))
                  }
                </Box>
                </Box>
                <Divider />
                <Box sx={{ display: "flex", justifyContent: "end",p:"20px 16px 20px 20px"}} >
                     <Button onClick={setClose} component={Link} to={"/instructor/notifications"} sx={{ color: "#FBFBFB",backgroundColor:"#5611B1",borderRadius:"8px",boxShadow:"0px 6px 34px -8px #0D6EFD",padding:"9px 24px",":hover":{ backgroundColor:"#5611B1" }}} >
                       View all Notifications
                     </Button>
                </Box>
             </Box>
           </Popover>
    )
}

export default NotificationListView