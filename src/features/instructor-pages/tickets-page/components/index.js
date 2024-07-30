import React, { useState } from "react";
import { Box, Typography, Tab, Tabs, Button, Grid } from "@mui/material";
import CreateTicketForm from "./createTicketForm";
import { TicketBg } from "utils/images";
import TicketCard from "./TicketCard";
import TicketView from "./TicketView";
import { useTabResponsive } from "utils/tabResponsive";
import TicketLoader from "components/ui/loaders/ticketLoader";
import { useSpinner } from "context/SpinnerProvider";

const InstructorTicketsPage = ({
  data,
  setCurrentType,
  handleTicketRefetch,
  loading,
}) => {
  const [value, setValue] = useState("1");
  const [open, setOpen] = useState(false);
  const [ticketView, setTicketView] = useState(false);
  const { tabView } = useTabResponsive();
  const [selectedTicket,setSelectedTicket] = useState(null)
  const { showSpinner,hideSpinner} = useSpinner()

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTicketViewOpen = (ticket) => {
    showSpinner()
    setTicketView(true)
    setSelectedTicket(ticket)
    hideSpinner()
  }

  const handleTicketViewClose = () => {
    setSelectedTicket(null)
    setTicketView(false);
  }

  const tab_list = [
    { id: "1", title: "All" },
    { id: "2", title: "Open" },
    { id: "3", title: "Close" },
  ]

  const status = {
    1: null,
    2: "opened",
    3: "closed",
  }

  const handleChange = (e, newValue) => {
    setValue(newValue);
    const statusValue = status[newValue];
    handleTicketRefetch(statusValue);
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${TicketBg})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{ p: tabView ? "62px 40px 20px 38px" : "62px 40px 20px 80px" }}
        >
          {open || ticketView ? (
            open ? (
              <CreateTicketForm handleClose={handleClose} />
            ) : (
              <TicketView selectedTicket={selectedTicket} handleTicketViewClose={handleTicketViewClose} />
            )
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box sx={{ display: "flex", gap: "40px" }}>
                  <Typography
                    sx={{
                      color: "#000",
                      fontSize: "24px",
                      fontWeight: "700",
                      lineHeight: "22px",
                    }}
                  >
                    Ticket
                  </Typography>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    sx={{
                      cursor: "pointer",
                      "& .MuiTabs-indicator": { backgroundColor: "#5611B1" },
                      color: "#5611B1",
                    }}
                    textColor="secondary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                  >
                    {tab_list.map((i) => (
                      <Tab key={i.id} label={i.title} value={i.id} />
                    ))}
                  </Tabs>
                </Box>
                <Box>
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    sx={{
                      color: "white",
                      backgroundColor: "#5611B1",
                      borderRadius: "8px",
                      boxShadow: "0px 6px 34px -8px #0D6EFD",
                      padding: "9px 24px",
                      fontWeight: 500,
                      fontSize: "14px",
                      lineHeight: "22px",
                    }}
                  >
                    Create Ticket
                  </Button>
                </Box>
              </Box>

              <Grid container spacing={tabView ? 4 : 10} sx={{ pt: "40px" }}>
                {loading ? (
                  <TicketLoader />
                ) : (
                  data.map((ticket, index) => (
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
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default InstructorTicketsPage;
