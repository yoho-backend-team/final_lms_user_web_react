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

function TicketView({ selectedTicket,handleTicketViewClose,setSelectedTicket }) {
  const [fileView,setFileView] = useState(false)
  const [file,setFile] = useState(null)
  const [message,setMessage] = useState('')
  const instructor = getInstructorDetails()
  const endOfMessageRef = useRef(null)

  const statusColor = {
    opened: "#008375",
    closed: "#EBA13A",
  };

  const handleFileOpen = (file) => {
    setFile(file)
    setFileView(true)
  }

  const handleFileViewClose = () => {
    setFile(null)
    setFileView(false)
  }

  useEffect(() => {
    socket.connect()
    socket.on("connect",() => {
      socket.emit("joinTicket",selectedTicket?.uuid)
    })
    
    socket.on("receiveTeacherTicketMessage",(new_message) => {
      console.log(new_message,"message")
      setSelectedTicket((prev) => ({...prev,messages:[...prev.messages,new_message]}))
    })
    return () => {
      socket.disconnect()
      socket.off("receiveTeacherTicketMessage")
    }
  },[selectedTicket])

  useEffect(() => {
    if(endOfMessageRef.current){
     endOfMessageRef.current.scrollIntoView({ behavior: 'smooth' })
    }
   },[selectedTicket])

  const hanldeSendMessage = () => {
    try {
    if(message.trim()){
      const new_message = {
        ticket_id : selectedTicket?.uuid,
        text: message,
        senderType: "Instituteuserlist",
        user: instructor?._id
      }
      console.log(new_message)
      socket.emit('sendTeacherTicketMessage',new_message)
      setMessage('')
    }else{
      toast.error("Message can't be empty",{ position: "top-center"})
    }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }

  const MessageBox = () => {
    return (
      <>
        {selectedTicket?.messages?.map((message, index) => {
          const currentUser = instructor?._id === message?.sender;
         
          return (
            <Box key={message?._id + index} sx={{ mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: currentUser ? 'row' : 'row',
                  justifyContent: currentUser ? 'flex-end' : 'flex-start'
                }}
              >
                <Box
                  sx={{
                    maxWidth: '70%', // Limit the width of messages
                    backgroundColor: currentUser ? '#E1FFC7' : '#DFC7FF',
                    borderRadius: '8px',
                    padding: '16px',
                    boxShadow: currentUser ? '0px 0px 8px rgba(0, 200, 83, 0.5)' : '0px 0px 8px rgba(223, 199, 255, 0.5)',
                    marginBottom: '10px',
                    minWidth: "250px"
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      pb: '5px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: '14px',
                        color: currentUser ? '#005700' : '#051732',
                        fontWeight: 700,
                        lineHeight: '24px',
                      }}
                    >
                      {currentUser ? `${instructor?.full_name}` : "Oliver Smith"}
                    </Typography>
                    <Typography
                      sx={{
                        color: currentUser ? '#005700' : '#051732',
                        fontSize: '10px',
                        fontWeight: 400,
                        lineHeight: '15px',
                      }}
                    >
                      {formatDate(message?.createdAt)} {/* Using your existing date formatting function */}
                    </Typography>
                  </Box>
                  <Typography
                    sx={{
                      color: currentUser ? '#2A2A2A' : '#72767D',
                      fontSize: '12px',
                      fontWeight: 500,
                      lineHeight: '15px',
                    }}
                  >
                    {message?.content}
                  </Typography>
                </Box>
              </Box>
              { currentUser && index + 1 === selectedTicket?.messages.length && !selectedTicket?.resolved && selectedTicket?.status !== "closed" &&
              <Box
               sx={{
                 display: "flex",
                 justifyContent: "flex-end",
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
              }
            </Box>
          );
        })}
        <div ref={endOfMessageRef} />
      </>
    );
  };

  console.log(selectedTicket,instructor)
  return (
    <>
      <Box>
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
                Ticket ID: Ticket #{selectedTicket?._id}
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
          <Card sx={{ width: "100%"}}>
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
                #{selectedTicket?.id} {selectedTicket?.query}
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
              <Box sx={{ display: 'flex', gap: "21px"}} >
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
                  {formatDate(selectedTicket?.createdAt)}{" "}{formatTime(selectedTicket?.createdAt)}
                </Typography>
              </Box>
            </Box>

            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={8}>
                  <Paper sx={{ p: 2, mb: 2 }}>
                  <Box sx={{ height: "300px", overflowY: "scroll"}}>
                      {MessageBox()}
                    </Box>
                    {
                    selectedTicket?.status === "opened" &&<Box
                      sx={{
                        display: "flex",
                        alignItems: "end",
                        paddingTop: "80px",
                      }}
                    >
                      <Box
                      sx={{
                        display : "none"
                      }}
                      >
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
                        fullWidth
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
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
                        <IconButton onClick={hanldeSendMessage}>
                          <SendIcon sx={{ color: "black" }} />
                        </IconButton>
                      </Box>
                    </Box>
                    }
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
                        }}
                      >
                      {selectedTicket?.description}
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
                        {selectedTicket?.category}
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
                      <Box 
                      sx={{
                        color : "#6C757D",
                        fontSize : "15px",
                        fontWeight : 600
                      }}
                      >
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: "600",
                          lineHeight: "22px",
                          color: "#6C757D",
                        }}
                      >
                        {selectedTicket?.file?.split("/")[2]}
                      </Typography>
                      <Typography onClick={()=>handleFileOpen(selectedTicket)} sx={{ color: "#5611B1", fontSize: "15px",fontWeight:600,cursor:"pointer"}} >
                        View
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
                            backgroundColor: statusColor[selectedTicket?.status],
                            border: "1px solid #DEE2E6",
                            borderRadius: "8px",
                            fontSize: "16px",
                            fontWeight: 700,
                            lineHeight: "22px",
                            padding: "9px 24px",
                          }}
                        >
                          {selectedTicket?.status}
                        </Button>
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "none",
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
      </Box>
      <PdfViewer open={fileView} pdf={file} handleViewClose={handleFileViewClose} />
    </>
  );
}

export default TicketView;
