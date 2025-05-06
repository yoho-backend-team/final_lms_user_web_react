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
  Paper,
  Container,
  Breadcrumbs,
  Link,
  Chip,
  Fade,
  Avatar,
  Divider
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
  Clear as ClearIcon,
  ArrowForward as ArrowForwardIcon,
  Help as HelpIcon,
  Home as HomeIcon,
  QuestionAnswer as QuestionAnswerIcon
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import StudentHelpView from "./helpView";
import StudentMailTab from "./tap-pages/mailTab";
import Client from "../../../../api/index";

// Custom styles
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    backgroundColor: "#ffffff",
  },
  pageTitle: {
    fontWeight: 600,
    marginBottom: "16px",
    color: "#333333",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  tabsContainer: {
    marginBottom: "24px",
    borderRadius: "8px",
    padding: "4px",
    backgroundColor: "#f5f8ff",
  },
  tab: {
    height: "40px",
    borderRadius: "20px",
    textTransform: "none",
    fontSize: "15px",
    fontWeight: 500,
    minWidth: "auto",
    margin: "0 5px",
    transition: "all 0.3s ease",
    backgroundColor: "transparent",
    color: "#666666",
    "&:hover": {
      backgroundColor: "#e1ecff",
      color: "#1a73e8",
    },
  },
  activeTab: {
    backgroundColor: "#1a73e8",
    color: "#FFFFFF",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(26, 115, 232, 0.3)",
  },
  searchField: {
    "& .MuiOutlinedInput-root": {
      borderRadius: "30px",
      backgroundColor: "#f9f9f9",
      transition: "all 0.3s ease",
      "&:hover": {
        backgroundColor: "#f2f2f2",
      },
      "&.Mui-focused": {
        backgroundColor: "#ffffff",
        boxShadow: "0 0 0 2px #e1ecff",
      },
    },
  },
  breadcrumb: {
    margin: "12px 0 20px 0",
    "& .MuiBreadcrumbs-ol": {
      alignItems: "center",
    },
    "& .MuiBreadcrumbs-li": {
      display: "flex", 
      alignItems: "center",
    },
  },
  helpCount: {
    fontSize: "13px",
    color: "#666",
    marginTop: "4px",
  },
  placeholderIcon: {
    backgroundColor: "#e1ecff",
    color: "#1a73e8",
  },
  backButton: {
    borderRadius: "50%",
    padding: "8px",
    backgroundColor: "#f5f8ff",
    "&:hover": {
      backgroundColor: "#e1ecff",
    },
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
  const classes = useStyles();
  const navigate = useNavigate();

  const [faqCategories, setFaqCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState(0);
  const [isView, setIsView] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [isTabClicked, setIsTabClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFaqCategories = async () => {
      setIsLoading(true);
      try {
        const response = await Client.Student.help.get();
        setFaqCategories(response?.data || []);
      } catch (error) {
        console.error("Error fetching FAQ categories:", error.message);
      } finally {
        setIsLoading(false);
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
    // Reset search when changing tabs
    setSearchQuery("");
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
    // Scroll to top when viewing details
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackClick = () => {
    if (isView) {
      setIsView(false);
      setSelectedQuery(null);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const filteredData = faqCategories.filter(
    (item) =>
      item.category === tabList[selectedTab] &&
      item.question.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentTabCount = faqCategories.filter(
    (item) => item.category === tabList[selectedTab]
  ).length;

  return (
    <Container maxWidth="xxl" sx={{ mt: 4, mb: 8 }}>
      <Paper className={classes.root} elevation={0}>
        {/* Header Section with Breadcrumbs */}
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="space-between"
          mb={2}
        >
          <Box>
            <Typography variant="h5" className={classes.pageTitle}>
              <HelpIcon fontSize="large" color="primary" />
              Help Center
            </Typography>
            
            <Breadcrumbs aria-label="breadcrumb" className={classes.breadcrumb}>
              <Link 
                color="inherit" 
                href="/" 
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
                sx={{ display: "flex", alignItems: "center" }}
              >
                <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                Home
              </Link>
              {isView ? (
                <>
                  <Link
                    color="inherit"
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsView(false);
                    }}
                  >
                    Help Center
                  </Link>
                  <Typography color="text.primary">
                    {selectedQuery?.question}
                  </Typography>
                </>
              ) : (
                <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
                  <QuestionAnswerIcon fontSize="small" sx={{ mr: 0.5 }} />
                  Help Center
                </Typography>
              )}
            </Breadcrumbs>
          </Box>
          
          {isView && (
            <IconButton 
              onClick={handleBackClick}
              className={classes.backButton}
              aria-label="back to list"
            >
              <ArrowBackIcon />
            </IconButton>
          )}
        </Box>

        {/* Tabs Section */}
        {!isView && (
          <Fade in={!isView}>
            <Box className={classes.tabsContainer}>
              <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                variant="scrollable"
                scrollButtons="auto"
                allowScrollButtonsMobile
                sx={{
                  "& .MuiTabs-indicator": {
                    display: "none",
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
                    icon={
                      <Chip 
                        size="small" 
                        label={faqCategories.filter(item => item.category === label).length || 0}
                        sx={{ 
                          height: "20px", 
                          fontSize: "11px",
                          backgroundColor: selectedTab === index ? "#ffffff" : "#e0e0e0",
                          color: selectedTab === index ? "#1a73e8" : "#666666",
                          ml: 1
                        }}
                      />
                    }
                    iconPosition="end"
                  />
                ))}
              </Tabs>
            </Box>
          </Fade>
        )}

        {/* Search Section */}
        {!isView && (
          <Fade in={!isView}>
            <Box mb={3} mt={2}>
              <TextField
                placeholder="Search help topics..."
                value={searchQuery}
                onChange={handleSearchChange}
                fullWidth
                variant="outlined"
                className={classes.searchField}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: searchQuery && (
                    <InputAdornment position="end">
                      <IconButton 
                        onClick={handleClearSearch} 
                        size="small"
                        aria-label="clear search"
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {!isLoading && (
                <Typography className={classes.helpCount}>
                  {filteredData.length} help topics available in {tabList[selectedTab]}
                </Typography>
              )}
            </Box>
          </Fade>
        )}

        {/* Main Content Section */}
        <Grid container spacing={2}>
          {!isView ? (
            <Fade in={!isView}>
              <Grid item xs={12}>
                <StudentMailTab
                  category={filteredData}
                  setView={handleSetView}
                  SelectedQuery={selectedQuery?.category}
                  isLoading={isLoading}
                />
              </Grid>
            </Fade>
          ) : (
            <Fade in={isView}>
              <Grid item xs={12}>
                <StudentHelpView
                  categories={faqCategories}
                  category={selectedQuery}
                  id={selectedQuery?.category}
                  setIsView={setIsView}
                  isView={isView}
                />
              </Grid>
            </Fade>
          )}
        </Grid>
      </Paper>

      {/* Quick Help Section */}
      {!isView && (
        <Box mt={4}>
          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              borderRadius: "12px", 
              backgroundColor: "#f5f8ff",
              border: "1px solid #e1ecff"
            }}
          >
            <Typography variant="h6" fontWeight={600} mb={2} color="primary">
              Popular Help Topics
            </Typography>
            <Grid container spacing={2}>
              {[
                "How to reset password",
                "Class enrollment issues",
                "Payment methods",
                "Attendance tracking",
                "Email notifications"
              ].map((topic, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper 
                    elevation={0}
                    sx={{ 
                      p: 2, 
                      borderRadius: "8px", 
                      display: "flex", 
                      alignItems: "center",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      "&:hover": {
                        backgroundColor: "#ffffff",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
                      }
                    }}
                  >
                    <Avatar className={classes.placeholderIcon}>
                      <QuestionAnswerIcon fontSize="small" />
                    </Avatar>
                    <Typography ml={2} fontWeight={500}>
                      {topic}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Box>
      )}
    </Container>
  );
};

export default StudentHelpCenter;
 