import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  Paper,
  IconButton,
  InputBase,
  Divider,
  Tabs,
  Tab,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ChatIcon from "assets/icons/help-center/ChatIcon";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { makeStyles } from "@mui/styles";
import { InputAdornment } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import StudentHelpView from "./helpView";
import StudentMailTab from "./tap-pages/mailTab";
import Client from "../../../../api/index";
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from "react-router-dom";


const useStyles = makeStyles(() => ({
  root: {
    borderBottom: "none",
  },
}));

const tab_list = [
  'Mail',
  'Profile',
  'Classes',
  'Password',
  'Attendance',
  'Payment',
  "Login&SignUp"
  ]

const StudentHelpCenter = () => {
  const [faqCategories, setFaqCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("0");
  const [value, setValue] = useState(0);
  const [isView, setView] = useState(false);
  const [selectedQuery,setSelectedQuery] = useState(null)
  const [filteredData, setFilteredData] = useState(faqCategories);
  const classes = useStyles();
  const navigate = useNavigate();


  useEffect(() => {
    const fetchFaqCategories = async () => {
      try {
        const response = await Client.Student.help.get();
        setFaqCategories(response?.data || []);
      } catch (error) {
        console.error("Error fetching FAQ categories:", error.message);
      }
    };
  
    fetchFaqCategories();
  }, []);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSetView = (query) => {
    setSelectedQuery(query);
    setView(true);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query) {
      const results = faqCategories.filter((i) =>
        i.question.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredData(results);
    } else {
      setFilteredData(faqCategories);
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredData(faqCategories);
  };

  console.log(selectedQuery,"SelectedQuery")

  console.log(faqCategories,"faqCategories")


 const filterData = faqCategories?.filter((i) =>{
  const categoryMatches = i.category === tab_list[value]
 const searchMatches = i.question.toLowerCase().includes(searchQuery.toLowerCase());
 return categoryMatches && searchMatches;
});

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
        <IconButton
            onClick={() => navigate(-1)}
            sx={{ color: "black", cursor: "pointer" }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Box>
        <Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <HelpOutlineOutlinedIcon />
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, lineHeight: "24px" }}
            >
              Help Centre
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <Typography
              sx={{
                color: "#000000",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Suggestions
            </Typography>
            <Typography
              sx={{
                color: "#636363",
                fontSize: "12px",
                fontWeight: "400",
                lineHeight: "24px",
              }}
            >
              ( choose your option to know information ? )
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              height: "46px",
              padding: "3px 5px",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              borderRadius: "42px",
              backgroundColor: "#E8E8E8",
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              classes={classes.root}
              sx={{
                minHeight: "0",
                cursor:'no-drop',
                borderBottom: "none",
                "& .MuiTabs-indicator": {
                  display: "none",
                },
                //     '&.css-1du2xoi-MuiTabs-root:not(.MuiTabs-vertical)': {
                //      borderBottom: 'none',
                //    },
                "&.MuiTabs-root": {
                  borderBottom: "none",
                  textTransform: "none",
                },
                "&..MuiTabs-vertical": {
                  borderBottom: "none",
                },
              }}
            >
              {tab_list.map((label, index) => (
                <Tab
                  key={index}
                  label={label}
                  disabled={isView}
                  sx={{
                    display: "inline-flex",
                    height: "40px",
                    padding: "10px",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "10px",
                    flexShrink: 0,
                    borderRadius: "47px",
                    backgroundColor:
                      value === index ? "#5611B1" : "transparent",
                    color: value === index ? "#FFF" : "#A5A5A5",
                    fontFamily: "Poppins",
                    fontSize: "14px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "24px",
                    minHeight: "0",
                    minWidth: "0",
                    margin: "0 5px",
                    "&.Mui-selected": {
                      color: "#FFF",
                      backgroundColor: "#5611B1",
                      
                    },
                  }}
                />
              ))}
            </Tabs>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "23px" }}>
          <Box>
            <Typography
              sx={{
                color: "#000000",
                fontSize: "14px",
                fontWeight: 500,
                lineHeight: "24px",
              }}
            >
              Try other Option ?
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: "40px" }}>
          <a href="https://wa.me/1234567890" style={{ textDecoration: 'none', color: 'inherit' }} target="_blank" rel="noopener noreferrer">

            <Box sx={{ display: "inline-flex", gap: "5px", cursor:"pointer" }}>
              <ChatIcon />
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Chat
              </Typography>
            </Box>
            </a>
            <a href= {faqCategories?.institute_id?.contact_info?.phone_no} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: "inline-flex", gap: "5px" ,cursor: "pointer"}}>
              <CallOutlinedIcon />
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Call
              </Typography>
            </Box>
            </a>
            <a href={faqCategories?.institute_id?.email} style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: "inline-flex", gap: "5px",cursor: "pointer" }}>
              <EmailOutlinedIcon />
              <Typography
                sx={{
                  color: "#000000",
                  fontSize: "14px",
                  fontWeight: 500,
                  lineHeight: "24px",
                }}
              >
                Mail
              </Typography>
            </Box>
            </a>
          </Box>
        </Box>
      </Box>
      {!isView && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "30px",
            alignItems: "center",
            gap: "10px",
            width: "75%",
          }}
        >
          <Typography
            sx={{
              color: "#000000",
              fontSize: "12px",
              fontWeight: 500,
              lineHeight: "24px",
            }}
          >
            Select your Question that's helps your problem or search instaed
          </Typography>
          <TextField
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: "#5611B1" }} />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {searchQuery && (
                <IconButton
                  onClick={handleClearSearch}
                  sx={{
                    backgroundColor: "#5611B1",
                    color: "white",
                    padding: "3px",
                    marginRight: "8px"
                  
                  }}
                >
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton
                onClick={() => {
                  // This can be used for additional actions on click
                }}
                sx={{
                  backgroundColor: "#5611B1",
                  color: "white",
                  padding: "3px",
                }}
              >
                <ArrowForwardIcon />
              </IconButton>
            </InputAdornment>
          ),
          sx: {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#5611B1",
            },
            height: "40px",
            padding: "5px 7px 5.924px 10.573px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            borderRadius: "29.076px",
            backgroundColor: "#E9ECEF",
          },
        }}
        sx={{
          width: "100%",
          maxWidth: 400,
          borderRadius: "30px",
          backgroundColor: "#E9ECEF",
          border: "transparent",
          "::placeholder": {
            color: "#5611B1",
          },
        }}
      />
        </Box>
      )}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        { !isView && <StudentMailTab category = {filterData} setView={handleSetView} SelectedQuery={selectedQuery?.category} />}
      </Grid>
      {isView && <StudentHelpView categories = {faqCategories} category={selectedQuery} id={selectedQuery?.category
} />}
    </>
  );
};

export default StudentHelpCenter;
