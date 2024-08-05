import React, { useState } from "react";
import { Box, Typography, Tab, Tabs, Button, Grid, Pagination,styled, IconButton} from "@mui/material";
import CreateTicketForm from "./createTicketForm";
import { TicketBg, TicketDownbg } from "utils/images";
import { useTabResponsive } from "utils/tabResponsive";
import TicketLoader from "components/ui/loaders/ticketLoader";
import { useSpinner } from "context/SpinnerProvider";
import TicketView from "./TicketView";
import TicketCard from "./TicketsCard";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";




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

  console.log(data,"data")
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${TicketBg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          width: '100%', // Adjust as needed
          position: 'relative', // Ensure proper stacking if needed
        }}
      >
        
        <Box
        sx={{
          backgroundImage: `url(${TicketDownbg})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'bottom center',
          height: '35vh',
          width: '100%', 
          position: 'absolute', 
          bottom: 0,
        }}
      >
        </Box>
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

              <Grid container spacing={tabView ? 4 : 10} sx={{ pt: "40px" }}>
                {loading ? (
                  <TicketLoader />
                ) : (
                  data.tickets.map((ticket, index) => (
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
              
              <Box sx={{ display: 'flex',justifyContent: 'flex-end', mt: 4,gap:"40px", cursor:"pointer" }}>
      <Typography sx={{color:"#A6A6A6",fontsize:"15px",fontWeight:700,fontFamily:"Nunito Sans",lineheight:"24px"}}
        onClick={() => handlePageChange(null, Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </Typography>
      
      {/* <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        sx={{ mx: 2 }}
      /> */}
      
      <Typography
      sx={{color:"#A6A6A6",fontsize:"15px", fontWeight:700,fontFamily:"Nunito Sans",lineheight:"24px"}}
        onClick={() => handlePageChange(null, Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
             Next
      </Typography>

      <Box sx={{ ml: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{color:"#9F9F9F",fontsize:"14px", fontWeight:700,fontFamily:"Figtree",lineheight:"24px"}}>
          {currentPage} of {totalPages}
        </Typography>
      </Box>
    </Box>
            </>

          )}
        </Box>
      </Box>
      
    </>
  );
};

export default StudentTicketsPage;
