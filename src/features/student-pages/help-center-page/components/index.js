import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  IconButton,
  Tabs,
  Tab,
  InputAdornment,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Clear as ClearIcon,
  ArrowForward as ArrowForwardIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import StudentHelpView from "./helpView";
import StudentMailTab from "./tap-pages/mailTab";
import Client from "../../../../api/index";

// Styles
const useStyles = makeStyles(() => ({
  root: {
    borderBottom: "none",
  },
  tab: {
    height: "40px",
    borderRadius: "47px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 400,
    minWidth: "auto",
    margin: "0 5px",
    backgroundColor: "transparent", // Default background for inactive tabs
    color: "#A5A5A5", // Default text color for inactive tabs
    "&:hover": {
      backgroundColor: "#D8EBFF", // Light blue background on hover
    },
  },
  activeTab: {
    backgroundColor: "#ADD8E6", // Light blue background for active tab
    color: "#FFFFFF", // White text for active tab
  },
}));

const tabList = [
  "Mail",
  "Profile",
  "Classes",
  "Password",
  "Attendance",
  "Payment",
  "Login & SignUp",
];

const StudentHelpCenter = () => {
  const classes = useStyles(); // Use the styles
  const navigate = useNavigate();

  const [faqCategories, setFaqCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [isView, setIsView] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isTabClicked, setIsTabClicked] = useState(false); // Track if Classes/Password tabs are clicked

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

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);

    // If "Classes" (index 2) or "Password" (index 3) tab is clicked, set the state to true
    if (newValue === 2 || newValue === 3) {
      setIsTabClicked(true);
    } else {
      setIsTabClicked(false);
    }
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSetView = (query) => {
    setSelectedQuery(query);
    setIsView(true);
  };

  const handleBackClick = () => {
    // Check if history length is greater than 1, if so, navigate back
    if (window.history.length > 1) {
      navigate(-1);  // Go back to the previous page
    } else {
      navigate("/");  // If no history, go to the home page or fallback page
    }
  };

  const filteredData = faqCategories.filter(
    (item) =>
      item.category === tabList[selectedTab] &&
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Conditionally Render Header Section */}
      {!isTabClicked && !isView && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {/*<IconButton
            onClick={handleBackClick}
            sx={{
              color: "#321658",
              borderRadius: "50%",
              backgroundColor: "#fff",
              "&:hover": { backgroundColor: "#F0F0F0" },
              marginRight: "8px",
            }}
          >
            <ArrowBackIcon />
          </IconButton>*/}
          <Box display="flex" alignItems="center" gap="10px">
            <Typography fontSize="14px" fontWeight={500}>
              Help Centre
            </Typography>
          </Box>
        </Box>
      )}

      {/* Tabs Section */}
      { !isView && (
        <Box mt={3}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{
              "& .MuiTabs-indicator": {
                display: "none", // Removes the underline
              },
            }}
          >
            {tabList.map((label, index) => (
              <Tab
                key={index}
                label={label}
                className={
                  selectedTab === index
                    ? `${classes.tab} ${classes.activeTab}`
                    : classes.tab
                }
              />
            ))}
          </Tabs>
        </Box>
      )}

      {/* Conditionally Render Search Section */}
      { !isView && (
        <Box display="flex" justifyContent="center" mt={10} gap="10px">
          <TextField
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  {searchQuery && (
                    <IconButton onClick={handleClearSearch}>
                      <ClearIcon />
                    </IconButton>
                  )}
                  <IconButton>
                    <ArrowForwardIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            fullWidth
            variant="outlined"
          />
        </Box>
      )}

      {/* Main Content Section */}
      <Grid container spacing={2} mt={2}>
        {!isView ? (
          <StudentMailTab
            category={filteredData}
            setView={handleSetView}
            SelectedQuery={selectedQuery?.category}
          />
        ) : (
          <StudentHelpView
            categories={faqCategories}
            category={selectedQuery}
            id={selectedQuery?.category}
            setIsView={setIsView}
            isView={isView}
          />
        )}
      </Grid>
    </Box>
  );
};

export default StudentHelpCenter;


