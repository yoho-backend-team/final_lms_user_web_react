import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import SubWayPinIcon from "assets/icons/subWayPinIcon";
import { formatDate, formatDateandmonth } from "utils/formatDate";

const TicketCard = ({
  ticket,handleTicketViewOpen,handleTicketViewClose
}) => {
  const statusColor = {
    opened: "#F6AB3A",
    closed: "#008375",
  };

  const convertDate = (iosString) => {
    const new_date = new Date(iosString);
    return new_date.toLocaleDateString("en-US");
  };

  

  return (
    <Grid
      item
      xs={12}
      sx={{
        display: "flex",
        flexDirection: "column",
        background: "#FFF",
        borderRadius: "16px",
        p: "16px",
        boxShadow: "0px 2.4px 25px 0px rgba(160, 170, 255, 0.24)",
        
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Typography
            sx={{
              color: "#495057",
              fontSize: "16px",
              fontWeight: 700,
              lineHeight: "24px",
              fontfamily: 'Poppins'
            }}
          >
            Ticket #{ticket?.ticket_id}
          </Typography>
        </Box>
        <Box
        sx={{
          color: "#5611B1",
          borderRadius: "8px",
          border: "1px solid var(--Blue-500, #0D6EFD)",
          background: "var(--Blue-100, #CFE2FF)",
          padding: "9px 24px",
        }}        
        >
          <Typography sx={{ color: "#5611B1" }}>{formatDateandmonth(ticket?.date)}</Typography>
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            color: "#495057",
            fontWeight: 700,
            lineHeight: "24px",
            fontSize: "14px",
            fontfamily: 'Poppins'
          }}
        >
          {ticket?.query}
        </Typography>
      </Box>

      <Box
        sx={{
          pt: "13px",
          display: "flex",
          justifyContent: "flex-start",
          width: "296px",
          maxHeight: "60px",
        }}
      >
        <Typography
          sx={{
            color: "#6C757D",
            fontSize: "14px",
            lineHeight: "22px",
            fontWeight: "500",
            height: "66px",
            maxHeight: "60px",
            fontfamily: 'Poppins',
            overflow: "auto",
          }}
        >
          {ticket?.description}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", pt: "21px" }}
      >
        <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
          <SubWayPinIcon color={"black"} />
          <Typography
            sx={{
              fontSize: "15px",
              fontWeight: "400",
              lineHeight: "14px",
              color: "#020202",
            }}
          >
            {ticket?.id}
          </Typography>
        </Box>
        <Box>
          <Button
            onClick={() => handleTicketViewOpen(ticket)}
            variant="contained"
            sx={{
              color: "white",
              borderRadius: "8px",
              backgroundColor: statusColor[ticket?.status],
              padding: "9px 24px",
              width: '122px'
            }}
          >
            {ticket?.status}
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};

export default TicketCard;
