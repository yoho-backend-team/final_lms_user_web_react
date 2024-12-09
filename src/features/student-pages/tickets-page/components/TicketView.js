import React, { useState,useRef, useEffect  } from "react";
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
import SendIconMessage from "assets/icons/SendIconMessage";
import MenuKebab from "assets/icons/MenuKebab";
import { getStudentDetails } from "store/atoms/authorized-atom";
import toast from "react-hot-toast";
import { getErrorMessage } from "utils/common/error";
import socket from "utils/socket";

function TicketView({ selectedTicket,handleTicketViewClose,setSelectedTicket }) {
  const [fileView,setFileView] = useState(false)
  const [file,setFile] = useState(null)
  const fileInputRef = useRef(null);
  const student = getStudentDetails()
  const endOfMessageRef = useRef(null)
  const [message,setMessage] = useState('')


  const statusColor = {
    opened: "#F6AB3A",
    closed: "#008375",
  };

  const handleFileOpen = (file) => {
    setFile(file)
    setFileView(true)
  }

  const handleFileViewClose = () => {
    setFile(null)
    setFileView(false)
  }

  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {      
      setFile(file);
      handleFileOpen(file);
    }
  };

  useEffect(() => {
    socket.connect()
    socket.on("connect",() => {
      socket.emit("joinTicket",selectedTicket?.uuid)
    })
    
    socket.on("receiveStudentTicketMessage",(new_message) => {
      setSelectedTicket((prev) => ({...prev,messages:[...prev.messages,new_message]}))
    })
    return () => {
      socket.disconnect()
      socket.off("receiveStudentTicketMessage")
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
        user: student?._id
      }
      console.log(new_message)
      socket.emit('sendStudentTicketMessage',new_message)
      setMessage('')
    }else{
      toast.error("Message can't be empty",{ position: "top-center"})
    }
    } catch (error) {
      toast.error(getErrorMessage(error))
    }
  }
  console.log(selectedTicket,"selectedTicket")
  const MessageBox = () => {
    return (
      <>
        {selectedTicket?.messages?.map((message, index) => {
          const currentUser = student?._id === message?.sender;
         
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
                      {currentUser ? `${student?.full_name}` : "Oliver Smith"}
                    </Typography>
                    <Typography
                      sx={{
                        color: currentUser ? '#005700' : '#051732',
                        fontSize: '10px',
                        fontWeight: 400,
                        lineHeight: '15px',
                      }}
                    >
                      {formatDate(message?.createdAt)} 
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

  return (
    <>
    <Box>
      <Box sx={{ display: "flex", alignItems: "center"}}>
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
              sx={{ fontSize: "24px", lineHeight: "22px", fontWeight: 700,fontFamily:"Nunito Sans" }}
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
                fontFamily:"Nunito Sans"
              }}
            >
              Ticket ID: Ticket #{selectedTicket?.ticket_id}
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
            {selectedTicket?.status === "opened" && (
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
            )}
          </Box>
        </Box>
      </Box>

      <Box sx={{ display:"flex",justifyContent:"center",p:5,paddingTop:2}}>
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
                fontFamily:"Nunito Sans"
              }}
            >
              #{selectedTicket?.ticket_id} {selectedTicket?.query}
            </Typography>
            <Typography
              sx={{
                color: "black",
                fontSize: "12px",
                fontWeight: "700",
                lineHeight: "24px",
                fontFamily:"Nunito Sans"
              }}
            >
              Show activates
            </Typography>
            <Button
              size="small"
              sx={{
                color: "#000",
                backgroundColor: "#DADADA",
                padding: "10px",
                fontSize: "12px",
                fontWeight: 700,
                lineHeight:"14px",
                fontFamily:"Nunito Sans"
              }}
            >
              Close ticket
            </Button>
            <Typography>
              <MenuKebab/>
            </Typography>
            <Box sx={{ display: 'flex', gap: "21px"}} >
              <Typography
                sx={{ fontSize: "14px", color: "#495057", fontWeight: 700,fontFamily:"Nunito Sans" }}
              >
                Raised Date & time:
              </Typography>
              <Typography
                sx={{
                  color: "#0D6EFD",
                  fontSize: "15px",
                  fontWeight: "600",
                  lineHeight: "14px",
                  fontFamily:"Nunito Sans"
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
                      display: 'flex',
                     
                      padding:"12px 24px",
                      justifyContent: 'center',
                      gap:"10px",
                      alignItems:"center"
                    }}
                    >
                       <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={handleFileChange}
                        />
                      
                      <AddBoxOutlinedIcon
                        sx={{
                          color: "#0D6EFD",
                          "& path:first-of-type": {
                            color: "#130F26",
                            display:"flex",
                            width: '24px',
                            height:"24px",
                            padding:"2px",
                            alignItems:"center",
                            justifyContent: 'center'
                          },
                        }}
                      />
                    </Box>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value ={ message}
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
                            sx={{ color: "#78787C", rotate: "35deg" , cursor:"pointer"}}
                            onClick={handleAttachClick}
                          />
                        ),
                      }}
                    />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        pl: "20px",
                        alignItems: 'center'
                      }}
                    >
                      <IconButton onClick={hanldeSendMessage} >
                        <SendIconMessage sx={{ color: "black" }} />
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
                        color:'#000',
                        fontFamily:"Nunito Sans"
                      }}
                    >
                      Issue Description:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: 600,
                        lineHeight: "22px",
                        color: "#6C757D",
                        fontFamily:"Nunito Sans",
                       
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
                        color:'#000',
                        fontFamily:"Nunito Sans"
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
                        fontFamily:"Nunito Sans"
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
                        color:'#000',
                        fontFamily:"Nunito Sans"
                      }}
                    >
                      Attachments:
                    </Typography>
                    <Box 
                    sx={{
                      color : "#6C757D",
                      fontSize : "15px",
                      fontWeight : 600,
                      display:"flex",
                       gap: "8px"
                    }}
                    >
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        color: "#6C757D",
                        fontFamily:"Nunito Sans"
                      }}
                    >
                      {selectedTicket?.file?.split("/")[2]}
                    </Typography>
                    <Typography onClick={()=>handleFileOpen(selectedTicket)} sx={{ color: "#0051C8", fontSize: "15px",fontWeight:600,cursor:"pointer",textDecorationLine:"underline"}} >
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
                        color:'#000',
                        fontFamily:"Nunito Sans"
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
                        color:'#000',
                        fontFamily:"Nunito Sans"
                      }}
                    >
                      Attempt:
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "24px",
                        color: "#000",
                        fontFamily:"Nunito Sans"
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
