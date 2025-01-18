import React, { useState } from "react";
import { Box, Typography, Tab, Tabs, Button, Grid, styled, useMediaQuery } from "@mui/material";
import CreateTicketForm from "./createTicketForm";
import { TicketBg, TicketDownbg } from "utils/images";
import { useTabResponsive } from "utils/tabResponsive";
import TicketLoader from "components/ui/loaders/ticketLoader";
import { useSpinner } from "context/SpinnerProvider";
import TicketView from "./TicketView";
import TicketCard from "./TicketsCard";
import { useNavigate } from "react-router-dom";

// Styles for the scrollable container
const ScrollableContainer = styled(Box)({
  overflowY: 'auto',
  maxHeight: 'calc(96vh - 200px)',
  padding: '10px',
  marginTop: '55px', // Add margin to prevent overlap
});

// Styles for the fixed tabs
const FixedTabsContainer = styled(Box)({
  position: 'fixed',
  top: 70,
  left: 0,
  right: 0,
  zIndex: 10,
  padding: '20px',
});

const tab_list = [
  { id: "1", title: "All" },
  { id: "2", title: "Open" },
  { id: "3", title: "Close" },
];

const StudentTicketsPage = ({
  data,
  setCurrentType,
  handleTicketRefetch,
  loading,
  currentPage,
  totalPages,
  handlePageChange,
}) => {
  const [value, setValue] = useState("1");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [ticketView, setTicketView] = useState(false);
  const { tabView } = useTabResponsive();
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { showSpinner, hideSpinner } = useSpinner();

  // Media query to check screen width
  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleOpen = () => {
    setOpen(true);
    navigate(`?create=true`);
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`?tab=${value}`);
  };

  const handleTicketViewOpen = (ticket) => {
    showSpinner();
    setTicketView(true);
    setSelectedTicket(ticket);
    hideSpinner();
  };

  const handleTicketViewClose = () => {
    setSelectedTicket(null);
    setTicketView(false);
  };



  const tabStyle = {
    fontSize: isSmallScreen ? "12px" : "14px",
    fontWeight: 600,
    fontFamily: "Poppins",
  };

  const status = {
    1: null,
    2: "opened",
    3: "closed",
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    const statusValue = status[newValue];
    handleTicketRefetch(statusValue);
  };

  const handleNextChange = () => {
    const nextPage = Math.min(data.currentPage + 1, data.totalPages);
    handlePageChange(null, nextPage);
    navigate(`?tab=${value}&page=${nextPage}`);
  };

  const handlePreviousChange = () => {
    const prevPage = Math.max(data.currentPage - 1, 1);
    handlePageChange(null, prevPage);
    navigate(`?tab=${value}&page=${prevPage}`);
  };
  return (
    <Box
      sx={{
        backgroundImage: `url(${TicketBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        width: '100%',
        position: 'relative',
        minHeight: '100vh',
        paddingTop: '80px', // Adjust padding to make space for the fixed tabs
      }}
    >
      {/* Fixed Tabs */}
      <FixedTabsContainer>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box sx={{ display: "flex", gap: "40px" }}>
            <Typography
              sx={{
                color: "#000",
                fontSize: "24px",
                fontWeight: "700",
                lineHeight: "22px",
                fontFamily: "Nunito Sans",
              }}
            >
              Ticket
            </Typography>
            <Tabs
              value={value}
              onChange={handleChange}
              sx={{
                cursor: "pointer",
                "& .MuiTabs-indicator": { backgroundColor: "#0D6EFD" },
                color: "#0D6EFD",
              }}
              textColor="secondary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
            >
              {tab_list?.map((i) => (
                <Tab key={i.id} label={i.title} value={i.id} sx={tabStyle} />
              ))}
            </Tabs>
          </Box>
          <Box>
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                color: "white",
                borderRadius: "8px",
                padding: "9px 24px",
                fontWeight: 500,
                fontSize: "14px",
                lineHeight: "22px",
                border: "1px solid var(--Blue-500, #0D6EFD)",
                background: "var(--Blue-500, #0D6EFD)",
                boxShadow: "0px 6px 34px -8px #0D6EFD",
              }}
            >
              Create Ticket
            </Button>
          </Box>
        </Box>
      </FixedTabsContainer>

      {/* Main Content */}
      <Box
        sx={{
          p: tabView ? "62px 40px 20px 38px" : "62px 40px 20px 80px",
          position: 'relative',
        }}
      >
        {open || ticketView ? (
          open ? (
            <CreateTicketForm handleClose={handleClose} />
          ) : (
            <TicketView
              selectedTicket={selectedTicket}
              setSelectedTicket={setSelectedTicket}
              handleTicketViewClose={handleTicketViewClose}
            />
          )
        ) : (
          <ScrollableContainer>
            <Grid container spacing={tabView ? 4 : 10} sx={{ pt: "40px" }}>
              {loading ? (
                <TicketLoader />
              ) : (
                data?.tickets?.map((ticket, index) => (
                  <Grid item xs={tabView ? 6 : 4} key={index}>
                    <TicketCard
                      ticket={ticket}
                      handleTicketViewOpen={handleTicketViewOpen}
                      handleTicketViewClose={handleTicketViewClose}
                    />
                  </Grid>
                ))
              )}
            </Grid>
            {value === "1" && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: "40px" }}>
                <Typography
                  sx={{
                    color: currentPage > 1 ? "#A6A6A6" : "#B0B0B0",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "Nunito Sans",
                    lineHeight: "24px",
                    cursor: currentPage > 1 ? "pointer" : "not-allowed",
                    "&:hover": {
                      color: currentPage > 1 ? "#0D6EFD" : "#B0B0B0",
                    },
                  }}
                  onClick={handlePreviousChange}
                >
                  Previous
                </Typography>
                <Typography
                  sx={{
                    color: currentPage < totalPages ? "#A6A6A6" : "#B0B0B0",
                    fontSize: "15px",
                    fontWeight: 700,
                    fontFamily: "Nunito Sans",
                    lineHeight: "24px",
                    cursor: currentPage < totalPages ? "not-allowed" : "pointer",
                    "&:hover": {
                      color: currentPage < totalPages ? "#B0B0B0" : "#0D6EFD",
                    },
                  }}
                  onClick={handleNextChange}
                >
                  Next
                </Typography>
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      color: "#9F9F9F",
                      fontSize: "14px",
                      fontWeight: 700,
                      fontFamily: "Figtree",
                      lineHeight: "24px",
                    }}
                  >
                    {data.currentPage} of {data.totalPages}
                  </Typography>
                </Box>
              </Box>
            )}
          </ScrollableContainer>
        )}
      </Box>
    </Box>
  );
};

export default StudentTicketsPage;
