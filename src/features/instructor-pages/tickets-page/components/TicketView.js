import React, { useEffect, useRef, useState } from "react";
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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { formatDate, formatTime } from "utils/formatDate";
import PdfViewer from "./pdfViewer";
import socket from "utils/socket";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/common/error";
import { getInstructorDetails } from "store/atoms/authorized-atom";

function TicketView({ selectedTicket, handleTicketViewClose, setSelectedTicket }) {
  const [fileView, setFileView] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const instructor = getInstructorDetails();
  const endOfMessageRef = useRef(null);

  const statusColor = {
    opened: "#008375",
    closed: "#EBA13A",
  };

  const handleFileOpen = (file) => {
    setFile(file);
    setFileView(true);
  };

  const handleFileViewClose = () => {
    setFile(null);
    setFileView(false);
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("joinTicket", selectedTicket?.uuid);
    });

    socket.on("receiveTeacherTicketMessage", (new_message) => {
      setSelectedTicket((prev) => ({
        ...prev,
        messages: [...prev.messages, new_message],
      }));
    });
    return () => {
      socket.disconnect();
      socket.off("receiveTeacherTicketMessage");
    };
  }, [selectedTicket]);

  useEffect(() => {
    if (endOfMessageRef.current) {
      endOfMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedTicket]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const new_message = {
        ticket_id: selectedTicket?.uuid,
        text: message,
        senderType: "Instituteuserlist",
        user: instructor?._id,
      };
      socket.emit('sendTeacherTicketMessage', new_message);
      setMessage('');
    } else {
      toast.error("Message can't be empty", { position: "top-center" });
    }
  };

  const MessageBox = () => (
    <>
      {selectedTicket?.messages?.map((message, index) => {
        const currentUser = instructor?._id === message?.sender;
        return (
          <Box key={message?._id + index} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: currentUser ? 'row' : 'row',
                justifyContent: currentUser ? 'flex-end' : 'flex-start',
              }}
            >
              <Box
                sx={{
                  maxWidth: '70%', // Limit the width of messages
                  backgroundColor: currentUser ? '#E1FFC7' : '#DFC7FF',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: currentUser ? '0px 0px 8px rgba(0, 200, 83, 0.5)' : '0px 0px 8px rgba(223, 199, 255, 0.5)',
                  marginBottom: '20px',
                  minWidth: "250px",
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: '2px' }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700 }}>{currentUser ? `${instructor?.full_name}` : "Oliver Smith"}</Typography>
                  <Typography sx={{ color: currentUser ? '#005700' : '#051732', fontSize: '10px' }}>
                    {formatDate(message?.createdAt)}
                  </Typography>
                </Box>
                <Typography sx={{ color: currentUser ? '#2A2A2A' : '#72767D', fontSize: '12px' }}>
                  {message?.content}
                </Typography>
              </Box>
            </Box>
            {currentUser && index + 1 === selectedTicket?.messages.length && !selectedTicket?.resolved && selectedTicket?.status !== "closed" && (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
                {/* <Button variant="outlined" sx={{ border: "1.5px solid #FF0000", borderRadius: "7px", padding: "10px", color: "red", background: "white" }}>Solved</Button>
                 */}
                <Button
                  variant="outlined"
                  sx={{
                    border: "1.5px solid #FF0000",
                    borderRadius: "7px",
                    padding: "10px",
                    color: "red",
                    background: "white",
                    "&:hover": {
                      borderColor: "#FF4D4D", // Change border color on hover
                      backgroundColor: "#FF4D4D", // Change background color on hover
                      color: "#FFF", // Change text color to white on hover
                      transform: "scale(1.05)", // Slightly scale the button on hover
                    },
                    transition: "all 0.3s ease", // Smooth transition for hover effects
                  }}
                >
                  Solved
                </Button>

                {/* <Button variant="contained" sx={{ backgroundColor: "#0D6EFD", color: "white", borderRadius: "7px", padding: "10px" }}>No Related</Button> */}
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#0D6EFD",
                    color: "white",
                    borderRadius: "7px",
                    padding: "10px",
                    mr: "10px",
                    "&:hover": {
                      backgroundColor: "#0056b3", // Darker shade of blue on hover
                      transform: "scale(1.05)", // Slight scaling effect on hover
                    },
                    transition: "all 0.3s ease", // Smooth transition for hover effect
                  }}
                >
                  No Related
                </Button>

              </Box>
            )}
          </Box>
        );
      })}
      <div ref={endOfMessageRef} />
    </>
  );

  return (
    <>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton onClick={handleTicketViewClose}>
            <ArrowBackIcon sx={{ color: "#000000", mb: "20px" }} />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: "20px", }}>
            <Box sx={{ display: "inline-flex", alignItems: "center", gap: "20px", }}>
              <Typography sx={{ fontSize: "30px", fontWeight: 700 }}>Ticket</Typography>
              <Typography variant="h6" sx={{ color: "#595959", fontSize: "18px" }}>
                Ticket ID: Ticket #{selectedTicket?._id}
              </Typography>
            </Box>
            {/* <Button variant="contained" sx={{ backgroundColor: "#008375", color: "white", borderRadius: "8px", padding: "9px 24px", fontSize: "14px",mb:"30px" }}>
              Request For Close
            </Button> */}
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#008375",
                color: "white",
                borderRadius: "8px",
                padding: "9px 24px",
                fontSize: "14px",

                transition: "all 0.3s ease", // Add smooth transition for hover effect
                "&:hover": {
                  backgroundColor: "#006a56", // Darker color on hover
                  transform: "scale(1.05)", // Add scaling effect on hover
                  boxShadow: "0px 6px 15px rgba(0, 131, 117, 0.3)", // Add box shadow for emphasis
                },
                "&:active": {
                  transform: "scale(0.98)", // Shrink effect when the button is clicked
                }
              }}
            >
              Request For Close
            </Button>

          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", }}>
          <Card sx={{ width: "100%" }}>
            <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="body1" sx={{ color: "#000000", fontSize: "20px", fontWeight: "700", mt: "2px", ml: "10px", pb: "20px", pt: "20px" }}>
                #{selectedTicket?.id} {selectedTicket?.query}
              </Typography>
              <Typography sx={{ color: "black", fontSize: "25px", fontWeight: "700", mt: "10px", }}>Show activates</Typography>
              {/* <Button size="small" sx={{ color: "black", backgroundColor: "#DADADA", padding: "10px", fontSize: "14px",mt:"10px", }}>Close ticket</Button> */}
              <Button
                size="small"
                sx={{
                  color: "black",
                  backgroundColor: "#DADADA",
                  padding: "10px",
                  fontSize: "14px",
                  mt: "10px",
                  transition: "all 0.3s ease", // Smooth transition for hover effects
                  "&:hover": {
                    backgroundColor: "#FFA500", // Change to orange color on hover
                    transform: "scale(1.05)", // Adds a subtle zoom effect
                    boxShadow: "0px 6px 15px rgba(255, 165, 0, 0.4)", // Orange shadow on hover
                  },
                  "&:active": {
                    transform: "scale(0.98)", // Slightly shrink when clicked for a "press" effect
                  }
                }}
              >
                Close ticket
              </Button>

              <Box sx={{ display: 'flex', gap: "21px" }}>
                <Typography sx={{ fontSize: "18px", color: "#495057", fontWeight: 700, mt: "10px" }}>Raised Date & time:</Typography>
                {/* <Typography sx={{ color: "#5611B1", fontSize: "16px", fontWeight: "600",mt:"10px",mr:"10px" }}>
                  {formatDate(selectedTicket?.createdAt)} {formatTime(selectedTicket?.createdAt)}
                </Typography> */}
                <Typography
                  sx={{
                    color: "#5611B1",
                    fontSize: "16px",
                    fontWeight: "600",
                    mt: "10px",
                    mr: "10px",
                    position: "relative",
                    "&:hover::after": {
                      content: '""',
                      position: "absolute",
                      left: 0,
                      bottom: 0, // Position at the bottom of the text
                      height: "2px", // Thickness of the underline
                      width: "100%", // Full width of the text
                      backgroundColor: "#5611B1", // Highlight color
                    },
                  }}
                >
                  {formatDate(selectedTicket?.createdAt)} {formatTime(selectedTicket?.createdAt)}
                </Typography>


              </Box>
            </Box>

            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                    <Box sx={{ height: "245px", overflowY: "scroll" }}>
                      {MessageBox()}
                    </Box>
                    {selectedTicket?.status === "opened" && (
                      <Box sx={{ display: "flex", alignItems: "end", paddingTop: "10px", paddingBottom: "10px", marginBottom: "10px", }}>
                        <TextField
                          variant="outlined"
                          fullWidth
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          sx={{ backgroundColor: "#E8E8E8", px: "24px", mr: "10px", borderRadius: "30px" }}
                          placeholder="Say Something..."
                          InputProps={{
                            endAdornment: <AttachFileIcon sx={{ color: "#78787C", rotate: "35deg" }} />
                          }}
                        />
                     
                        <Box sx={{ display: "flex", justifyContent: "flex-end", pl: "20px" }}>
                          {/* <IconButton onClick={handleSendMessage}>
                            <SendIcon sx={{ color: "black" }} />
                          </IconButton> */}
                          <IconButton
                            onClick={handleSendMessage}
                            sx={{
                              "&:hover": {
                                backgroundColor: "#E0E0E0", // Light grey background on hover
                                color: "#0D6EFD", // Change the icon color on hover (blue)
                              },
                              transition: "all 0.3s ease", // Smooth transition for hover effect
                            }}
                          >
                            <SendIcon sx={{ color: "black" }} />
                          </IconButton>

                        </Box>
                      </Box>
                    )}
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: "40px" }}>
                    <Box>
                      <Typography sx={{ fontSize: "15px", fontWeight: 800 }}>Issue Description:</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#6C757D", mt: "5px" }}>
                        {selectedTicket?.description}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", fontWeight: 800, }}>Issue Category:</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#6C757D", mt: "5px" }}>
                        {selectedTicket?.category}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", fontWeight: 800, }}>Attachments:</Typography>
                      <Typography sx={{ fontSize: "14px", fontWeight: "600", color: "#6C757D", mt: "5px" }}>
                        {selectedTicket?.file?.split("/")[2]}
                      </Typography>
                      <Typography onClick={() => handleFileOpen(selectedTicket)} sx={{ color: "#5611B1", fontSize: "15px", cursor: "pointer" }}>
                        View
                      </Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: "15px", fontWeight: 800 }}>Status:</Typography>
                      {/* <Button size="small" sx={{ color: "black", backgroundColor: statusColor[selectedTicket?.status], borderRadius: "8px", fontSize: "16px",mt:"10px" }}>  */}
                      <Button
                        size="small"
                        sx={{
                          color: "black",
                          backgroundColor: statusColor[selectedTicket?.status],
                          borderRadius: "8px",
                          fontSize: "16px",
                          mt: "10px",
                          "&:hover": {
                            backgroundColor: "yourHoverColorHere", // Replace with your desired hover color
                          },
                        }}
                      >
                        {selectedTicket?.status}
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </Box>
      <PdfViewer open={fileView} pdf={file} handleViewClose={handleFileViewClose} />
    </>
  );
}

export default TicketView;
