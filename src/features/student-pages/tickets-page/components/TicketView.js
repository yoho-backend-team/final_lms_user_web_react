import React, { useEffect, useState, } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { formatDate, formatTime } from "utils/formatDate";
import { getImageUrl } from "utils/common/imageUtlils";
import CloseIcon from "@mui/icons-material/Close";
import { PDFViewer } from "react-view-pdf";


function StudentTicketView({ tickets, handleTicketViewClose }) {
  const [openPdfViewer, setOpenPdfViewer] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [message, setMessage] = useState('');
  const [ticketst, setTickets] = useState(tickets);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  

  const [selectedTicketId, setSelectedTicketId] = useState(null);
 

  const handleCloseClick = () => {
    console.log("Close button clicked");
  };

 
  
  const handleClickOpen = (pdfUrl) => {
    const url = getImageUrl(pdfUrl);
    console.log("PDF URL:", url);
    setPdfUrl(url);
    setOpenPdfViewer(true);
  };

  const handleClose = () => {
    setOpenPdfViewer(false);
    window.history.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: Math.floor(Math.random() * 1000), // Generate a temporary unique ID
        user: {
          full_name:"name", // Replace with the actual sender's name logic
        },
        description: message, // Use the current message state
        updatedAt: new Date().toISOString(), // Use current timestamp
      };

      // Update the tickets state with the new message
      setTickets((prevTickets) =>
        prevTickets.map((ticketss) =>
          ticketss.id === selectedTicketId
            ? {
                ...ticketss,
                messages: [...ticketss.messages, newMessage],
              }
            : ticketss
        )
      );

      // Clear the message input field after sending
      setMessage("");
    }
  };



  const handleSolved = () => {
    setName('');
    setDescription('');
  };


  console.log(ticketst, "tickets");
  return (
    <>
      <Box>
        {ticketst?.map((ticket) => (
          <>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <IconButton onClick={handleTicketViewClose}>
                  <ArrowBackIcon sx={{ color: "#000000" }} />
                </IconButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Box
                  sx={{ display: "inline-flex", alignItems: "center", gap: "37px" }}
                >
                  <Typography
                    sx={{ fontSize: "24px", lineHeight: "22px", fontWeight: 700 }}
                  >
                    Ticket
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#595959",
                      fontSize: "16px",
                      fontWeight: 700,
                      lineHeight: "24px",
                    }}
                  >
                    Ticket ID: {ticket.id}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#008375",
                      color: "white",
                      borderRadius: "8px",
                      boxShadow: "0px 6px 34px -8px #0D6EFD",
                      padding: "9px 24px",
                      fontSize: "14px",
                      ":hover": {
                        backgroundColor: "#008375",
                      },
                      fontWeight: 500,
                    }}
                  >
                    Request For Close
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ width: "100%" }}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#000000",
                      fontSize: "17px",
                      fontWeight: "700",
                      lineHeight: "24px",
                    }}
                  >
                    {ticket.query}
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "12px",
                      fontWeight: "700",
                      lineHeight: "24px",
                    }}
                  >
                    Show activates
                  </Typography>
                  <Button
                    size="small"
                    sx={{
                      color: "black",
                      backgroundColor: "#DADADA",
                      padding: "10px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                    
                  >
                    Close ticket
                  </Button>
                  <Box>
                    <Typography
                      sx={{ fontSize: "14px", color: "#495057", fontWeight: 700 }}
                    >
                      Raised Date & time:
                    </Typography>
                    <Typography
                      sx={{
                        color: "#5611B1",
                        fontSize: "15px",
                        fontWeight: "600",
                        lineHeight: "14px",
                      }}
                    >
                      {formatDate(ticket.updatedAt)} {formatTime(ticket.updatedAt)}
                    </Typography>
                  </Box>
                </Box>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                      <Paper sx={{ p: 2, mb: 2 }}>
                        <Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                pb: "15px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#000",
                                  fontfamily: "Nunito Sans",
                                  fontSize: "14px",
                                  fontstyle: "normal",
                                  fontWeight: 700,
                                  lineHeight: "24px",
                                }}
                              >
                                {ticket.user.first_name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: "10px",
                                  fontWeight: 400,
                                  lineHeight: "15px",
                                }}
                              >
                                {formatDate(ticket.updatedAt)} {formatTime(ticket.updatedAt)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  color: "#898989",
                                  fontfamily: "Poppins",
                                  fontSize: "12px",
                                  fontstyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "15px",
                                  pb: "40px",
                                }}
                              >
                                {ticket.description}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                backgroundColor: "#DFC7FF",
                                borderRadius: "8px",
                                padding: "18px 13px 18px 30px",
                                mb: "40px",
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  pb: "15px",
                                }}
                              >
                                <Typography
                                  sx={{
                                    color: "#051732",
                                  fontfamily: "Nunito Sans",
                                  fontSize: "14px",
                                  fontstyle: "normal",
                                  fontWeight: 700,
                                  lineHeight: "24px",
                                  }}
                                >
                                  {ticket.user.full_name}
                                </Typography>
                                <Typography
                                  sx={{
                                    color: "#051732",
                                    fontSize: "10px",
                                    fontWeight: 400,
                                    lineHeight: "15px",
                                  }}
                                >
                                  {formatDate(ticket.updatedAt)} {formatTime(ticket.updatedAt)}
                                </Typography>
                              </Box>
                              <Typography
                                sx={{
                                  color: "#72767D",
                                  fontSize: "12px",
                                  fontfamily: "Poppins",
                                  fontstyle: "normal",
                                  fontWeight: "500",
                                  lineHeight: "15px",
                                }}
                              >
                                {ticket.query}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                        <Box>
                          <Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                pb: "15px",
                              }}
                            >
                              <Typography
                                sx={{
                                  color: "#051732",
                                  fontfamily: "Nunito Sans",
                                  fontSize: "14px",
                                  fontstyle: "normal",
                                  fontWeight: 700,
                                  lineHeight: "24px",
                                }}
                              >
                                {ticket.user.full_name}
                              </Typography>
                              <Typography
                                sx={{
                                  color: "black",
                                  fontSize: "10px",
                                  fontWeight: 400,
                                  lineHeight: "15px",
                                }}
                              >
                                {formatDate(ticket.updatedAt)} {formatTime(ticket.updatedAt)}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography
                                sx={{
                                  color: "#898989",
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  lineHeight: "15px",
                                  pb: "40px",
                                }}
                              >
                                {ticket.description}
                              </Typography>
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "flex-start",
                                gap: "20px",
                              }}
                            >
                              <Button
                                variant="outlined"
                                sx={{
                                  border: "1.5px solid #FF0000",
                                  borderRadius: "7px",
                                  padding: "10px",
                                  color: "red",
                                  background: "white",
                                }}
                                onClick={handleSolved}
                              >
                                Solved
                              </Button>
                              <Button
                                variant="contained"
                                sx={{
                                  backgroundColor: "#0D6EFD",
                                  color: "white",
                                  borderRadius: "7px",
                                  padding: "10px",
                                }}
                              >
                                No Related
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "end",
                            paddingTop: "80px",
                          }}
                        >
                          <Box>
                            <AddBoxOutlinedIcon
                              sx={{
                                color: "#0D6EFD",
                                "& path:first-of-type": {
                                  color: "#130F26",
                                },
                              }}
                            />
                          </Box>
                          <TextField
                            variant="outlined"
                            value={message}
                          onChange={(e) => setMessage(e.target.value)}
                            fullWidth
                            sx={{
                              backgroundColor: "#E8E8E8",
                              px: "24px",
                              mr: "10px",
                              borderRadius: "24px",
                              "& .MuiOutlinedInput-root": {
                                "& fieldset": {
                                  borderColor: "transparent",
                                },
                                "&:hover fieldset": {
                                  borderColor: "transparent",
                                },
                                "&.Mui-focused fieldset": {
                                  borderColor: "transparent",
                                },
                              },
                            }}
                            placeholder="Say Something..."
                            InputProps={{
                              endAdornment: (
                                <AttachFileIcon
                                  sx={{ color: "#78787C", rotate: "35deg" }}
                                />
                              ),
                            }}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              pl: "20px",
                            }}
                          >
                            <IconButton onClick={handleSendMessage}>
                              <SendIcon sx={{ color: "black" }} />
                            </IconButton>
                            
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: "40px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              lineHeight: "24px",
                            }}
                          >
                            Issue Description:
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              color: "#6C757D",
                              minWidth: "400px",
                            }}
                          >
                            {ticket.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              lineHeight: "24px",
                            }}
                          >
                            Issue Category:{" "}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              color: "#6C757D",
                            }}
                          >
                            {ticket.query}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              lineHeight: "24px",
                            }}
                          >
                            Attachments:
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                fontWeight: "600",
                                lineHeight: "22px",
                                color: "#6C757D",
                              }}
                            >
                              {ticket.file_upload}
                            </Typography>
                            {ticket.file_upload && ticket.file_upload.endsWith(".pdf") && (
                              <Button variant="contained" onClick={() => handleClickOpen(ticket.file_upload)}>
                                View PDF
                              </Button>
                            )}
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              lineHeight: "24px",
                            }}
                          >
                            Status:
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              color: "#6C757D",
                            }}
                          >
                            <Button
                              size="small"
                              sx={{
                                color: "white",
                                backgroundColor: "#F6AB3A",
                                border: "1px solid #DEE2E6",
                                borderRadius: "8px",
                                fontSize: "16px",
                                fontWeight: 700,
                                lineHeight: "22px",
                                padding: "9px 24px",
                              }}
                            >
                              {ticket.status}
                            </Button>
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: 800,
                              lineHeight: "24px",
                            }}
                          >
                            Attempt:
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              fontWeight: "600",
                              lineHeight: "22px",
                              color: "#6C757D",
                            }}
                          >
                            1
                          </Typography>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Box>
          </>
        ))}
      </Box>
      <Dialog fullScreen open={openPdfViewer} onClose={handleClose}>
        <DialogContent>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pb: 2 }}>
            <IconButton onClick={handleClose} sx={{ color: '#000000' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <PDFViewer url={pdfUrl} />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentTicketView;