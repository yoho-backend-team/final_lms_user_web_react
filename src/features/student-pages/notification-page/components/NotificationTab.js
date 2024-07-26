import { Avatar, Box, IconButton, Input, Tab, Tabs, Typography, InputAdornment, Grid } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';
import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";

const NotificationTab = ({tabValue,handleTabChange,notifications,handleNotificationChange,selectedNotification={selectedNotification}}) => {
    const readCount = notifications?.filter((i) => i.status === "read").length
    const unreadCount = notifications?.filter((i) => i.status === "unread").length

    const filteredNotifications = notifications?.filter((notification) => {
      if(tabValue === 0) return true;
      if(tabValue === 1) return notification.status === "read";
      if(tabValue === 2) return notification.status === "unread"
      return true
    })
    console.log(filteredNotifications,"filter")
    return(
           <Box sx={{ height: "90vh", backgroundColor: "#FFF",color:"0px 0px 64px 0px #0000001a", borderLeft:"0.776px solid #F8FAFC"}} >
             <Box
             sx={{
                padding : "19px 13px",
                display : "flex",
                flexDirection : "column",
                gap: "20px"
             }}
             >
              <Box>
                 <Typography sx={{ fontSize: "25px", fontWeight:500}} >Notification</Typography>
                 <Typography sx={{ fontSize: "11px",color:"#7F7F7F"}} >{readCount} messages, {unreadCount} Unread</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: "13px",width:"100%", justifyContent: 'space-between'}} >   
              <Input
               placeholder="Search"
               variant="outlined"
               sx={{
                 backgroundColor: "#DFDFDF",
                 border: "1px solid #DFDFDF",
                 padding : "9.3px 6.2px",
                 borderRadius: "6px",
                 width : "290px",
                 height : "37px",
                 '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      border: 'none',
                    },
                    ":focus":{
                        border : "none"
                    }
                  },
                 "::placeholder": {
                   color: '#7F7F7F',
                   fontSize: "11px",
                   fontWeight: "510px"
                 }
               }}
               startAdornment={
                 <InputAdornment position="start">
                   <SearchIcon sx={{ color: "#7F7F7F" }} />
                 </InputAdornment>
               }
              />
                 <IconButton sx={{ backgroundColor: "#5611B1", padding: "9px", width: "37px",height:"37px"}} >
                    <SearchIcon sx={{ color: "white", width: "19px", height: "19px"}} />
                 </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection : "column", gap: "5px"}} >
                 <Box>
                     <Tabs value={tabValue} onChange={handleTabChange} >
                        <Tab label="All" />
                        <Tab label="Read" />
                        <Tab label="Unread" />
                     </Tabs>
                 </Box>
                 <Box sx={{ overflow: "auto", height : "50vh"}} >
                 {
                  filteredNotifications?.map((notifi) =>(
                     <Grid xs={12} sx={{ display: 'flex', gap: "13px",padding: "18.5px", cursor: "pointer",
                      backgroundColor : notifi?._id === selectedNotification?._id && "#E2E2E2" ,
                      border : notifi?._id === selectedNotification?._id && "0.776px solid #7f7f7f33",
                      borderRadius : notifi?._id === selectedNotification?._id && "6.205px"}} onClick={()=>handleNotificationChange(notifi)} >
                     <Grid xs={2} sx={{ display: 'flex', justifyContent: "flex-start", flexDirection: "column"}} >
                       <Avatar 
                        alt="profile"
                        src={notifi?.student?.image ? getImageUrl(notifi?.student?.image):profilePlaceholder}
                        sx={{
                            width: "38px",
                            height : "38px"
                        }}
                       />
                     </Grid>
                     <Grid xs={7} sx={{ display: 'flex', flexDirection: "column",gap:"8px"}} >
                        <Grid xs={12} sx={{
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: 'space-between'
                        }} >
                          <Grid xs={9} sx={{ display: 'flex', flexDirection: 'column',gap:"4px"}} >
                             <Typography sx={{ color : '#000000', fontSize: "14px",fontWeight:400}} >{notifi?.title}</Typography>
                             {/* <Typography sx={{ color : "#0D6EFD",fontSize: '10.8px',fontWeight:400,}} >Starts @2:50pm</Typography> */}
                          </Grid>
                          <Grid xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: "4px"}} >
                              <Typography sx={{ color: '#7F7F7F',fontSize: "9.3px", fontWeight: 400 }} >3:13 PM</Typography>
                              {notifi?.status === "unread" && <Typography sx={{ width: "6.5px",height: "6.5px", borderRadius: "3.5px", backgroundColor: "#006AD4"}} >.</Typography>}
                          </Grid>
                        </Grid>
                        <Box>
                           <Typography sx={{ color: "#7F7F7F", fontSize: "10px", fontWeight: "400"}} >
                           {notifi?.body}
                           </Typography>
                        </Box>
                     </Grid>
                     </Grid>
                     ))
                     }
                     </Box>
              </Box>
             </Box>
           </Box>
    )
}

export default NotificationTab