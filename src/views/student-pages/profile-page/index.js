import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import StudyMaterialIcon from "assets/icons/study-material-icon";
import EllipseImage from "../../../assets/Ellipse 1928.png";
import { useNavigate } from "react-router-dom";
import IdCardImage from "../../../Id_card.png";
import CircularProgress from "@mui/material/CircularProgress";
import VirtualIDCard from "./VirtualIDCard";

const ProfilePage = () => {
  const [isEditMode, setEditMode] = useState(false);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "Janu",
    lastName: "Janu",
    email: "janu@design.com",
    gender: "Female",
    contact: "9876543210",
    address: "20/1 Km street, mm nagar chengalpattu",
    pincode: "897653",
  });

  const [documents, setDocuments] = useState([
    "10th Mark sheet",
    "12th Mark sheet",
    "Aadhar Card",
    "School TC",
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({
      ...personalInfo,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleDocumentDelete = (index) => {
    setDocuments(documents.filter((_, i) => i !== index));
  };

  const handleDocumentUpload = () => {
    setDocuments([...documents, "New Document"]);
  };

  return (
    <Box sx={{ padding: "20px 50px", backgroundColor: "#F4F4F6" }}>
      <Box
        sx={{ display: "flex", pt: "60px" }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            startIcon={<ArrowBackIcon />}
            color="primary"
            sx={{
              boxShadow: "none",
              ":hover": {
                boxShadow: "none",
                backgroundColor: "none",
                color: "#000",
              },
            }}
            onClick={() => navigate("/dashboard")}
          />
          <Typography sx={{ color: "#000", ml: 1 }}>
            Back to Dashboard
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            borderRadius: 2,
            cursor: "pointer",
            color: "white",
            borderRadius: "8px",
            backgroundColor: "#0d6efd",
            boxShadow: "0px 6px 34px -8px #0d6efd",
          }}
          onClick={() => {
            setEditMode(!isEditMode);
            console.log("clicked");
          }}
        >
          {isEditMode ? "Save" : "Edit"}
        </Button>
      </Box>

      <Grid container xs={12} spacing={5}>
        <Grid item xs={9}>
          {/* Personal Info */}
          <Card
            sx={{
              backgroundColor: "#FFF",
              borderRadius: 2,
              border: "1px solid var(--Gray-300, #DEE2E6)",
              boxShadow: 2,
              mb: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  width: "137px",
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "19px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "32px",
                }}
              >
                Personal Info
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    First Name
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="firstName"
                      value={personalInfo.firstName}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.firstName}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Last Name
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="lastName"
                      value={personalInfo.lastName}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.lastName}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Email ID
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="email"
                      value={personalInfo.email}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.email}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Gender
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="gender"
                      value={personalInfo.gender}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.gender}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      cwidth: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                      minWidth: "200px",
                    }}
                  >
                    Contact
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="contact"
                      value={personalInfo.contact}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.contact}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: "60px", pt: "40px" }}>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Address
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="address"
                      value={personalInfo.address}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.address}
                    </Typography>
                  )}
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Pincode
                  </Typography>
                  {isEditMode ? (
                    <TextField
                      name="pincode"
                      value={personalInfo.pincode}
                      onChange={handleInputChange}
                      variant="outlined"
                      size="small"
                    />
                  ) : (
                    <Typography
                      variant="body2"
                      sx={{
                        color: "#495057",
                        fontFamily: "Poppins",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "16px",
                      }}
                    >
                      {personalInfo.pincode}
                    </Typography>
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Academic Info */}
          <Card
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: 2,
              boxShadow: 2,
              mb: 2,
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  width: "137px",
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "19px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "32px",
                }}
              >
                Academics Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Department
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Design Development
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Course
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    UI / UX Design
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Batch
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    Batch "A"
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "15px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Roll Number
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    100099
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography
                    variant="body1"
                    sx={{
                      width: "94px",
                      color: "var(--Gray-700, #495057)",
                      fontFamily: "Poppins",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "32px",
                    }}
                  >
                    Student ID
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "#495057",
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "16px",
                    }}
                  >
                    9niudwybutv7
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card
            sx={{ backgroundColor: "#FFFFFF", borderRadius: 2, boxShadow: 2 }}
          >
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  width: "137px",
                  color: "#000",
                  fontFamily: "Poppins",
                  fontSize: "20px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "32px",
                }}
              >
                Documents
              </Typography>
              <Grid container spacing={2}>
                {documents.map((document, index) => (
                  <Grid item xs={6} md={3} key={index}>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <Box display="flex" alignItems="center">
                        <StudyMaterialIcon />
                        <Typography sx={{ ml: 1 }}>{document}</Typography>
                      </Box>
                      {isEditMode && (
                        <IconButton
                          onClick={() => handleDocumentDelete(index)}
                          size="small"
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                ))}
                {isEditMode && (
                  <Grid item xs={6} md={3}>
                    <Button
                      variant="outlined"
                      startIcon={<AddIcon />}
                      onClick={handleDocumentUpload}
                      size="small"
                      sx={{ marginTop: 1 }}
                    >
                      Upload
                    </Button>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={3}>
          {/* Virtual ID
          <Card sx={{ 
            backgroundColor: '#FFFFFF', 
            borderRadius: 2, 
            boxShadow: 2, 
            mb: 2, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: 3,
            border: '1px solid #dee2e6',
            width: '300px', // Width for ID card
            height: '350px', // Height for ID card
          }}>
            <Typography variant="h5" gutterBottom sx={{ width: '137px',color: '#000',fontFamily: 'Poppins',fontSize: '20px',fontStyle: 'normal',fontWeight: 700,lineHeight: '32px' }}>
              Virtual ID
            </Typography>
            <Avatar alt="Jimmy" src= {IdCardImage} sx={{ width: 100, height: 100, mb: 2 }} />
            <Typography variant="body1" sx={{ fontWeight: 'bold', mb: 1 }}>Jimmy</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Student ID: 9niudwybutv7</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Batch: A</Typography>
          </Card>
        <Box sx={{ display:"flex", flexDirection:"row", justifyContent:"center",alignItems:"center"}} >
          <Box sx={{ textAlign: 'left',  minWidth: 250, mr: 2 }}>
      
        <Typography variant="h6" gutterBottom sx={{ color: '#000',fontFamily: 'Lato',fontSize: '20px',fontStyle: 'normal',fontWeight: 700,lineHeight: 'normal', textAlign: 'left', mt: 0 }}>
          Course Status
          </Typography>
         <CircularProgress 
         variant="determinate"
         sx={{ rotate:"180deg"}}
         size={"196px"}
         value={75}
         />
        <Typography variant="body1">Course Ends at: 29 May 2024</Typography>
      
    </Box>
    </Box> */}
          <VirtualIDCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
