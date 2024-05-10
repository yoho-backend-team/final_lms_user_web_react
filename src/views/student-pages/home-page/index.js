import React, { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { blue } from "@mui/material/colors";
import Grid from "@mui/system/Unstable_Grid/Grid";
import { display, fontSize } from "@mui/system";
import Button from "@mui/material/Button";

function AccountMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        <Tooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ mt: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Typography
          variant="h5"
          sx={{
            minWidth: 100,
            color: "black",
            fontSize: "20px",
            paddingLeft: "10px",
          }}
        >
          Notification (1)
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            indicator={<Box sx={{ bgcolor: "secondary.main", height: 2 }} />}
          >
            <Tab value="one" label="ALL" />
            <Tab value="two" label="Read" />
            <Tab value="three" label="Unread" />
          </Tabs>
        </Box>
        <Divider />
        <MenuItem sx={{ padding: 0 }} onClick={handleClose}>
      <Grid container >
      <Grid item xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: 300,
                  
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                  style={{ width: "40px", height: "40px" }}
                />
                <Grid item >
                  <Typography variant="h5" sx={{ color: "black" }}>
                    Michael Just purchased
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "black",display:'block' }} noWrap lineHeight={2}>
                    Michael Just purchased view in idjdoijoko mjojokoko
                  </Typography>
                </Grid>
                
              </Box>
              <Box
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    bgcolor: blue[500],
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  <Typography sx={{ color: "white", fontSize: "10px" }}>
                    3
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: "8px", mt: 1 }}>
                  33 Minutes Ago
                </Typography>
              </Box>
            </Grid>
      </Grid>
            
          
        </MenuItem>
        <MenuItem sx={{ padding: 0 }} onClick={handleClose}>
      <Grid container >
      <Grid item xs={12}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 2,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  maxWidth: 300,
                  
                }}
              >
                <Avatar
                  alt="Remy Sharp"
                  src="https://cdn-icons-png.flaticon.com/128/4140/4140037.png"
                  style={{ width: "40px", height: "40px" }}
                />
                <Grid item >
                  <Typography variant="h5" sx={{ color: "black" }}>
                    Michael Just purchased
                  </Typography>
                  <Typography variant="subtitle2" sx={{ color: "black",display:'block' }} noWrap lineHeight={2}>
                    Michael Just purchased view in idjdoijoko mjojokoko
                  </Typography>
                </Grid>
                
              </Box>
              {/* <Box
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                }}
              >
                <Box
                  sx={{
                    bgcolor: blue[500],
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  alt="Remy Sharp"
                  src="/broken-image.jpg"
                >
                  <Typography sx={{ color: "white", fontSize: "10px" }}>
                    3
                  </Typography>
                </Box> */}
                <Typography sx={{ fontSize: "8px", mt: 2.5 }}>
                  33 Minutes Ago
                </Typography>
            </Grid>
      </Grid>
          
        </MenuItem>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            paddingRight: "15px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            sx={{
              borderRadius: "8px",
              backgroundColor: blue[500],
              "&:hover": {
                backgroundColor: "darkblue",
              },
            }}
          >
            View all Notifications
          </Button>
        </div>
      </Menu>
    </React.Fragment>
  );
}

export default AccountMenu;
