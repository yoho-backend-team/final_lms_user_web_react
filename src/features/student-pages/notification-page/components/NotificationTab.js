import React, { useState, useMemo } from 'react';
import { Avatar, Box, IconButton, Input, Tab, Tabs, Typography, InputAdornment, Grid } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { profilePlaceholder } from "utils/placeholders";
import { getImageUrl } from "utils/common/imageUtlils";

const NotificationTab = ({ tabValue, handleTabChange, notifications, handleNotificationChange,closeTab, selectedNotification }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const readCount = notifications?.filter((i) => i.status === "read").length;
    const unreadCount = notifications?.filter((i) => i.status === "unread").length;

    
    const filteredNotifications = useMemo(() => {
        return notifications?.filter((notification) => {
            const matchesTab = tabValue === 0 ||
                               (tabValue === 1 && notification.status === "read") ||
                               (tabValue === 2 && notification.status === "unread");
            
            const matchesSearch = searchQuery === '' || 
                                  notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  notification.body.toLowerCase().includes(searchQuery.toLowerCase());

            return matchesTab && matchesSearch;
        });
    }, [notifications, tabValue, searchQuery]);

    const handleClickNotification = (notification) => {
      handleNotificationChange(notification);
      closeTab();
  };

    return (
        <Box sx={{ height: "90vh", backgroundColor: "#FFF", color: "#0000001a", borderLeft: "0.776px solid #F8FAFC" }}>
            <Box sx={{ padding: "19px 13px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <Box>
                    <Typography sx={{ fontSize: "25px", fontWeight: 500 }}>Notification</Typography>
                    <Typography sx={{ fontSize: "11px", color: "#7F7F7F" }}>{readCount} messages, {unreadCount} Unread</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: "13px", width: "100%", justifyContent: 'space-between' }}>
                    <Input
                        placeholder="Search"
                        variant="outlined"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        sx={{
                            backgroundColor: "#DFDFDF",
                            border: "1px solid #DFDFDF",
                            padding: "9.3px 6.2px",
                            borderRadius: "6px",
                            width: "290px",
                            height: "37px",
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                ":focus": {
                                    border: "none"
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
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <Tabs value={tabValue} onChange={handleTabChange}>
                        <Tab label="All" />
                        <Tab label="Read" />
                        <Tab label="Unread" />
                    </Tabs>
                    <Box sx={{ overflow: "auto", height: "50vh" }}>
                        {filteredNotifications?.map((notifi) => (
                            <Grid item xs={12} key={notifi._id} sx={{
                                display: 'flex',
                                gap: "13px",
                                padding: "18.5px",
                                cursor: "pointer",
                                backgroundColor: notifi?._id === selectedNotification?._id && "#E2E2E2",
                                border: notifi?._id === selectedNotification?._id && "0.776px solid #7f7f7f33",
                                borderRadius: notifi?._id === selectedNotification?._id && "6.205px"
                            }} onClick={() => handleClickNotification(notifi)}>
                                <Grid item xs={2} sx={{ display: 'flex', justifyContent: "flex-start" }}>
                                    <Avatar
                                        alt="profile"
                                        src={notifi?.student?.image ? getImageUrl(notifi?.student?.image) : profilePlaceholder}
                                        sx={{ width: "38px", height: "38px" }}
                                    />
                                </Grid>
                                <Grid item xs={10} sx={{ display: 'flex', flexDirection: "column", gap: "8px" }}>
                                    <Grid container justifyContent="space-between">
                                        <Grid item xs={9}>
                                            <Typography sx={{ color: '#000000', fontSize: "14px", fontWeight: 400 }}>{notifi?.title}</Typography>
                                        </Grid>
                                        <Grid item xs={3} sx={{ display: 'flex', flexDirection: 'column', gap: "4px" }}>
                                            <Typography sx={{ color: '#7F7F7F', fontSize: "9.3px", fontWeight: 400 }}>3:13 PM</Typography>
                                            {notifi?.status === "unread" && <Typography sx={{ width: "6.5px", height: "6.5px", borderRadius: "3.5px", backgroundColor: "#006AD4" }}>.</Typography>}
                                        </Grid>
                                    </Grid>
                                    <Box>
                                        <Typography sx={{ color: "#7F7F7F", fontSize: "10px", fontWeight: 400 }}>
                                            {notifi?.body}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotificationTab;


// import { Avatar, Box, IconButton, Input, Tab, Tabs, Typography, InputAdornment } from "@mui/material"
// import SearchIcon from '@mui/icons-material/Search';
// import { imagePlaceholder, profilePlaceholder } from "utils/placeholders";
// import { getImageUrl } from "utils/common/imageUtlils";

// const NotificationTab = ({tabValue,handleTabChange,notifications,handleNotificationChange}) => {
//     const readCount = notifications?.filter((i) => i.status === "read").length
//     const unreadCount = notifications?.filter((i) => i.status === "unread").length

//     const filteredNotifications = notifications?.filter((notification) => {
//       if(tabValue === 0) return true;
//       if(tabValue === 1) return notification.status === "read";
//       if(tabValue === 2) return notification.status === "unread"
//       return true
//     })

//     console.log(filteredNotifications,"filteredNotifications")
    
//     return(
//            <Box sx={{ height: "90vh", backgroundColor: "#FFF",color:"0px 0px 64px 0px #0000001a", borderLeft:"0.776px solid #F8FAFC"}} >
//              <Box
//              sx={{
//                 padding : "19px 13px",
//                 display : "flex",
//                 flexDirection : "column",
//                 gap: "20px"
//              }}
//              >
//               <Box>
//                  <Typography sx={{ fontSize: "25px", fontWeight:500}} >Notification</Typography>
//                  <Typography sx={{ fontSize: "11px",color:"#7F7F7F"}} >{readCount} messages, {unreadCount} Unread</Typography>
//               </Box>
//               <Box sx={{ display: 'flex', gap: "13px",width:"100%", justifyContent: 'space-between'}} >   
//               <Input
//                placeholder="Search"
//                variant="outlined"
//                sx={{
//                  backgroundColor: "#DFDFDF",
//                  border: "1px solid #DFDFDF",
//                  padding : "9.3px 6.2px",
//                  borderRadius: "6px",
//                  width : "290px",
//                  height : "37px",
//                  '& .MuiOutlinedInput-root': {
//                     '& fieldset': {
//                       border: 'none',
//                     },
//                     ":focus":{
//                         border : "none"
//                     }
//                   },
//                  "::placeholder": {
//                    color: '#7F7F7F',
//                    fontSize: "11px",
//                    fontWeight: "510px"
//                  }
//                }}
//                startAdornment={
//                  <InputAdornment position="start">
//                    <SearchIcon sx={{ color: "#7F7F7F" }} />
//                  </InputAdornment>
//                }
//               />
//                  <IconButton sx={{ backgroundColor: "#5611B1", padding: "9px", width: "37px",height:"37px"}} >
//                     <SearchIcon sx={{ color: "white", width: "19px", height: "19px"}} />
//                  </IconButton>
//               </Box>
//               <Box>
//                  <Box>
//                      <Tabs value={tabValue} onChange={handleTabChange} >
//                         <Tab label="All" />
//                         <Tab label="Read" />
//                         <Tab label="Unread" />
//                      </Tabs>
//                  </Box>
//                  {
//                   filteredNotifications?.map((notifi) =>(
//                      <Box sx={{ display: 'flex', gap: "13px",padding: "18.5px", cursor: "pointer" }} onClick={()=>handleNotificationChange(notifi)} >
//                      <Box sx={{ display: 'flex', justifyContent: "flex-start", flexDirection: "column"}} >
//                        <Avatar 
//                         alt="profile"
//                         src={notifi?.student?.image ? getImageUrl(notifi?.student?.image):profilePlaceholder}
//                         sx={{
//                             width: "38px",
//                             height : "38px"
//                         }}
//                        />
//                      </Box>
//                      <Box sx={{ display: 'flex', flexDirection: "column",gap:"8px"}} >
//                         <Box sx={{
//                             display: 'flex',
//                             flexDirection: "row",
//                             justifyContent: 'space-between'
//                         }} >
//                           <Box sx={{ display: 'flex', flexDirection: 'column',gap:"4px"}} >
//                              <Typography sx={{ color : '#000000', fontSize: "14px",fontWeight:400}} >{notifi?.title}</Typography>
//                              <Typography sx={{ color : "#0D6EFD",fontSize: '10.8px',fontWeight:400,}} >Starts @2:50pm</Typography>
//                           </Box>
//                           <Box sx={{ display: 'flex', flexDirection: 'column', gap: "4px"}} >
//                               <Typography sx={{ color: '#7F7F7F',fontSize: "9.3px", fontWeight: 400 }} >3:13 PM</Typography>
//                               <Typography sx={{ width: "6.5px",height: "6.5px", borderRadius: "3.5px", backgroundColor: "#006AD4"}} >.</Typography>
//                           </Box>
//                         </Box>
//                         <Box>
//                            <Typography sx={{ color: "#7F7F7F", fontSize: "10px", fontWeight: "400"}} >
//                            {notifi?.body}
//                            </Typography>
//                         </Box>
//                      </Box>
//                      </Box>
//                      ))
//                      }
//               </Box>
//              </Box>
//            </Box>
//     )
// }

// export default NotificationTab