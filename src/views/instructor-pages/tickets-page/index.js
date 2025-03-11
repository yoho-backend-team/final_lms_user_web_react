// import React, { useState, useEffect } from "react";
// import { Box, Typography, Tab, Tabs, Button, Grid } from "@mui/material";
// import CreateTicketForm from "features/instructor-pages/tickets-page/components/createTicketForm";
// import TicketCard from "features/instructor-pages/tickets-page/components/TicketCard";
// import TicketView from "features/instructor-pages/tickets-page/components/TicketView";
// import TicketLoader from "components/ui/loaders/ticketLoader";
// import { TicketBg } from "utils/images";
// import { useTabResponsive } from "utils/tabResponsive";
// import { useDispatch, useSelector } from "react-redux";
// import { selectInstructorTickets, selectLoading } from "features/instructor-pages/tickets-page/redux/selectors";
// import getAllTickets from "features/instructor-pages/tickets-page/redux/thunks";
// import { useSpinner } from "context/SpinnerProvider";
// import toast from "react-hot-toast";
// import { useLocation, useNavigate } from "react-router-dom";

// const TicketsPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate()
//   const searchParams = new URLSearchParams(location.search)
//   const dispatch = useDispatch();
//   const tickets = useSelector(selectInstructorTickets);
//   const loading = useSelector(selectLoading);
//   const [currentType, setCurrentType] = useState(null);
//   const [value, setValue] = useState(searchParams.get("tab") || "1");
//   const [open, setOpen] = useState(searchParams.get("create") ? true : false );
//   const [ticketView, setTicketView] = useState( searchParams.get("view") ? true : false);
//   const [selectedTicket, setSelectedTicket] = useState(null);
//   const { tabView } = useTabResponsive();
//   const { showSpinner, hideSpinner } = useSpinner();

//   const status = {
//     1: null,
//     2: "opened",
//     3: "closed",
//   };

//   const tab_list = [
//     { id: "1", title: "All" },
//     { id: "2", title: "Open" },
//     { id: "3", title: "Close" },
//   ];

//   const getTicketsList = (query) => {
//     try {
//       showSpinner();
//       dispatch(getAllTickets(query));
//     } catch (error) {
//       toast.error(error?.message);
//     } finally {
//       hideSpinner();
//     }
//   };

//   useEffect(() => {
//   const create = searchParams.get("create")
//   if(create){
//     navigate(`?create=true`)
//     setOpen(true)
//   }
//   },[location.search])

//   useEffect(() => {
//     const data = { status: currentType };
//     getTicketsList(data);
//   }, [dispatch, currentType]);

//   useEffect(() => {
//     if(tickets){
//       const findTicket = tickets?.filter((ticket) => ticket?._id === searchParams.get("view"))
//       setSelectedTicket(findTicket?.[0])
//     }
//   },[ticketView,tickets])

//   const handleTicketRefetch = (type) => {
//     setCurrentType(type);
//     const data = { status: type };
//     getTicketsList(data);
//   };

//   const handleChange = (e, newValue) => {
//     setValue(newValue);
//     const statusValue = status[newValue];
//     handleTicketRefetch(statusValue);
//     navigate(`?tab=${newValue}`)
//   };

//   const handleOpen = () => {
//     setOpen(true)
//     navigate(`?create=true`)
//   }
//   const handleClose = () =>{
//     setOpen(false)
//     navigate(`?tab=${value}`)
//   } 

//   const handleTicketViewOpen = (ticket) => {
//     showSpinner();
//     setTicketView(true);
//     navigate(`?view=${ticket?._id}`)
//     setSelectedTicket(ticket);
//     hideSpinner();
//   };

//   const handleTicketViewClose = () => {
//     setSelectedTicket(null);
//     setTicketView(false);
//     navigate(`?tab=${value}`)
//   };

//   return (
//     <Box
//       sx={{
//         backgroundImage: `url(${TicketBg})`,
//         backgroundRepeat: "no-repeat",
//         backgroundSize: "cover",
//         backgroundAttachment : "fixed",
//         height: "calc(100vh - 113px)",
//         overflow: "auto",
//       }}
//     >
//       <Box sx={{ p: tabView ? "62px 40px 20px 38px" : "62px 40px 20px 80px" }}>
//         {open || ticketView ? (
//           open ? (
//             <CreateTicketForm handleClose={handleClose} />
//           ) : (
//             <TicketView selectedTicket={selectedTicket} handleTicketViewClose={handleTicketViewClose} setSelectedTicket={setSelectedTicket} />
//           )
//         ) : (
//           <>
//             <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: "63px",zIndex:1000, overflow: "hidden" }}>
//               <Box sx={{ display: "flex", gap: "40px" }}>
//                 <Typography
//                   sx={{
//                     color: "#000",
//                     fontSize: "34px",
//                     fontWeight: "800",
//                     lineHeight: "28px",
//                     mb:"10px",
//                   }}
//                 >
//                   Ticket
//                 </Typography>
//                 <Tabs
//                   value={value}
//                   onChange={handleChange}
//                   sx={{
//                     cursor: "pointer",
//                     "& .MuiTabs-indicator": { backgroundColor: "#5611B1", color : "#5611B1", fontSize: "14px", fontWeight: 600, lineHeight: "22px" },
//                     color: "#5611B1",
//                     "& .Mui-selected" :  {
//                       color : "#5611B1",
//                       fontSize : "14px",
//                       fontWeight : 600,
//                       lineHeight : "22px"
//                     }
//                   }}
//                   // textColor="secondary"
//                   indicatorColor="primary"
//                   aria-label="secondary tabs example"
//                 >
//                   {tab_list?.map((i) => (
//                     <Tab key={i.id} label={i.title} value={i.id} />
//                   ))}
//                 </Tabs>
//               </Box>
//               {/* <Button
//                 onClick={handleOpen}
//                 variant="contained"
//                 sx={{
//                   color: "white",
//                   backgroundColor: "#5611B1",
//                   borderRadius: "8px",
//                   boxShadow: "0px 6px 34px -8px #0D6EFD",
//                   padding: "9px 24px",
//                   fontWeight: 500,
//                   fontSize: "14px",
//                   lineHeight: "22px",
//                 }}
//               >
//                 Create Ticket
//               </Button> */}
//              <Button
//   onClick={handleOpen}
//   variant="contained"
//   sx={{
//     color: "white",
//     backgroundColor: "#5611B1",
//     borderRadius: "8px",
//     boxShadow: "0px 6px 34px -8px #0D6EFD",
//     padding: "9px 24px",
//     fontWeight: 500,
//     fontSize: "18px",
//     lineHeight: "22px",
//     transition: "all 0.3s ease", // Smooth transition for hover and active effects
//     mr: "10px",
    
//     "&:hover": {
//       backgroundColor: "#450E99", // Slightly darker shade on hover
//       transform: "scale(1.1)", // Adds a more prominent zoom effect on hover (Boom effect)
//       boxShadow: "0px 8px 40px -6px rgba(13, 110, 253, 0.6)", // Elevated shadow on hover
//     },
//     "&:active": {
//       transform: "scale(0.98)", // Slightly shrink when clicked for a "press" effect
//     },
//   }}
// >
//   Create Ticket
// </Button>


//             </Box>

//             <Grid container spacing={5} sx={{ mt: "40px", height: "calc(100vh - 250px)", overflowY: "auto" }}>
//               {loading ? (
//                 <TicketLoader />
//               ) : (
//                 tickets?.map((ticket, index) => (
//                   <Grid item xs={tabView ? 6 : 4} key={index}>
//                     <TicketCard
//                       ticket={ticket}
//                       handleTicketViewOpen={handleTicketViewOpen}
//                       handleTicketViewClose={handleTicketViewClose}
//                     />
//                   </Grid>
//                 ))
//               )}
//             </Grid>
//           </>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default TicketsPage;
import React, { useState, useEffect } from "react";
import { Box, Typography, Tab, Tabs, Button, Grid } from "@mui/material";
import Joyride from "react-joyride";  // Import guided tour
import CreateTicketForm from "features/instructor-pages/tickets-page/components/createTicketForm";
import TicketCard from "features/instructor-pages/tickets-page/components/TicketCard";
import TicketView from "features/instructor-pages/tickets-page/components/TicketView";
import TicketLoader from "components/ui/loaders/ticketLoader";
import { TicketBg } from "utils/images";
import { useTabResponsive } from "utils/tabResponsive";
import { useDispatch, useSelector } from "react-redux";
import { selectInstructorTickets, selectLoading } from "features/instructor-pages/tickets-page/redux/selectors";
import getAllTickets from "features/instructor-pages/tickets-page/redux/thunks";
import { useSpinner } from "context/SpinnerProvider";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

const TicketsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const dispatch = useDispatch();
  const tickets = useSelector(selectInstructorTickets);
  const loading = useSelector(selectLoading);
  const [currentType, setCurrentType] = useState(null);
  const [value, setValue] = useState(searchParams.get("tab") || "1");
  const [open, setOpen] = useState(searchParams.get("create") ? true : false);
  const [ticketView, setTicketView] = useState(searchParams.get("view") ? true : false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const { tabView } = useTabResponsive();
  const { showSpinner, hideSpinner } = useSpinner();

  // Guided Tour Steps
  const [tourActive, setTourActive] = useState(true); 
  const tourSteps = [
    {
      target: "body",
      content: "Welcome to the Ticket Management page! Here, you can manage your tickets and requests.",
      placement: "center",
    },
    {
      target: ".ticket-tabs",
      content: "Use these tabs to filter tickets based on their status.",
      placement: "bottom",
    },
    {
      target: ".create-ticket-btn",
      content: "Click here to create a new support ticket.",
      placement: "left",
    },
    {
      target: ".ticket-card",
      content: "Click on any ticket to view its details and responses.",
      placement: "top",
    },
    {
      target: ".ticket-view",
      content: "This is where you can see ticket details and respond to queries.",
      placement: "right",
    },
  ];

  const status = {
    1: null,
    2: "opened",
    3: "closed",
  };

  const tab_list = [
    { id: "1", title: "All" },
    { id: "2", title: "Open" },
    { id: "3", title: "Close" },
  ];

  const getTicketsList = (query) => {
    try {
      showSpinner();
      dispatch(getAllTickets(query));
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    const create = searchParams.get("create");
    if (create) {
      navigate(`?create=true`);
      setOpen(true);
    }
  }, [location.search]);

  useEffect(() => {
    const data = { status: currentType };
    getTicketsList(data);
  }, [dispatch, currentType]);

  useEffect(() => {
    if (tickets) {
      const findTicket = tickets?.filter((ticket) => ticket?._id === searchParams.get("view"));
      setSelectedTicket(findTicket?.[0]);
    }
  }, [ticketView, tickets]);

  const handleTicketRefetch = (type) => {
    setCurrentType(type);
    const data = { status: type };
    getTicketsList(data);
  };

  const handleChange = (e, newValue) => {
    setValue(newValue);
    const statusValue = status[newValue];
    handleTicketRefetch(statusValue);
    navigate(`?tab=${newValue}`);
  };

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
    navigate(`?view=${ticket?._id}`);
    setSelectedTicket(ticket);
    hideSpinner();
  };

  const handleTicketViewClose = () => {
    setSelectedTicket(null);
    setTicketView(false);
    navigate(`?tab=${value}`);
  };

  return (
    <Box
      sx={{
        backgroundImage: `url(${TicketBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        height: "calc(100vh - 113px)",
        overflow: "auto",
      }}
    >
      {/* Guided Tour Component */}
      {/* <Joyride
        steps={tourSteps}
        run={tourActive}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        styles={{
          tooltip: { fontSize: "16px" },
          buttonClose: { display: "none" },
          buttonBack: { marginRight: 10 },
        }}
      /> */}

      <Box sx={{ p: tabView ? "62px 40px 20px 38px" : "62px 40px 20px 80px" }}>
        {open || ticketView ? (
          open ? (
            <CreateTicketForm handleClose={handleClose} />
          ) : (
            <TicketView selectedTicket={selectedTicket} handleTicketViewClose={handleTicketViewClose} setSelectedTicket={setSelectedTicket} className="ticket-view" />
          )
        ) : (
          <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: "63px", zIndex: 1000 }}>
              <Box sx={{ display: "flex", gap: "40px" }} className="ticket-tabs">
                <Typography sx={{ color: "#000", fontSize: "34px", fontWeight: "800" }}>
                  Ticket
                </Typography>
                <Tabs value={value} onChange={handleChange}>
                  {tab_list.map((i) => (
                    <Tab key={i.id} label={i.title} value={i.id} />
                  ))}
                </Tabs>
              </Box>
              <Button className="create-ticket-btn" onClick={handleOpen} variant="contained" sx={{ backgroundColor: "#5611B1", color: "white" }}>
                Create Ticket
              </Button>
            </Box>

            <Grid container spacing={5} sx={{ mt: "40px", height: "calc(100vh - 250px)", overflowY: "auto" }}>
              {loading ? (
                <TicketLoader />
              ) : (
                tickets?.map((ticket, index) => (
                  <Grid item xs={tabView ? 6 : 4} key={index}>
                    <TicketCard ticket={ticket} handleTicketViewOpen={handleTicketViewOpen} className="ticket-card" />
                  </Grid>
                ))
              )}
            </Grid>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TicketsPage;
