import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  IconButton,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  Divider,
  Paper,
  Fade,
  Container,
  Tooltip,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeIcon from "@mui/icons-material/Home";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BoySharpIcon from "@mui/icons-material/BoySharp";
import Groups2Icon from "@mui/icons-material/Groups2";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import LockIcon from "@mui/icons-material/Lock";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import BackgroundImage from 'assets/images/background/student.png';
import studentheaderpic from "../../../assets/images/background/studentprofile.svg";
import { FaIdCard } from "react-icons/fa";
import { FiShield } from "react-icons/fi";
import { MdOutlineVerifiedUser } from "react-icons/md";

import {
  getprofilewithId,
  UpdateprofilewithId,
  changePassword,
} from "features/student-pages/Profile-page/services";
import { getImageUrl } from "utils/common/imageUtlils";
import { fileUpload } from "features/common/upload";
import toast from "react-hot-toast";
import { useSpinner } from "context/SpinnerProvider";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const ProfilePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const { showSpinner, hideSpinner } = useSpinner();

  const [personalInfo, setPersonalInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    gender: "",
    image: "",
    dob: "",
    contact_info: {
      phone_number: "",
      address1: "",
      address2: "",
      pincode: "",
    },
    userDetail: {
      id: "",
      course: {
        course_name: "",
      },
    },
  });

  const [editing, setEditing] = useState(false);
  const [editedPersonalInfo, setEditedPersonalInfo] = useState({});
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getProfile = async () => {
    try {
      showSpinner();
      setLoading(true);
      const response = await getprofilewithId();
      setPersonalInfo({
        ...response,
        contact: response.contact_info.phone_number,
        address1: response.contact_info.address1,
        address2: response.contact_info.address2,
        pincode: response.contact_info.pincode,
      });
      setEditedPersonalInfo({
        ...response,
        contact: response.contact_info.phone_number,
        address1: response.contact_info.address1,
        address2: response.contact_info.address2,
        pincode: response.contact_info.pincode,
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile data");
    } finally {
      hideSpinner();
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const editProfile = async () => {
    try {
      showSpinner();
      setLoading(true);
      
      // Fix: Ensure we're sending the correct structure expected by the API
      // Make sure all required fields are present and match the API's expected format
      const data = {
        first_name: editedPersonalInfo.first_name || personalInfo.first_name,
        last_name: editedPersonalInfo.last_name || personalInfo.last_name,
        email: editedPersonalInfo.email || personalInfo.email,
        gender: editedPersonalInfo.gender || personalInfo.gender,
        contact_info: {
          phone_number: editedPersonalInfo.contact || personalInfo.contact_info.phone_number,
          alternate_phone_number: "+91-1234567890",
          address1: editedPersonalInfo.address1 || personalInfo.contact_info.address1,
          address2: editedPersonalInfo.address2 || personalInfo.contact_info.address2,
          pincode: editedPersonalInfo.pincode || personalInfo.contact_info.pincode,
        },
        // Only include image if it exists
        ...(editedPersonalInfo.image && { image: editedPersonalInfo.image }),
      };

      const updatedData = await UpdateprofilewithId(data);
      
      // Update state with the returned data
      setPersonalInfo({
        ...updatedData,
        contact: updatedData.contact_info.phone_number,
        address1: updatedData.contact_info.address1,
        address2: updatedData.contact_info.address2,
        pincode: updatedData.contact_info.pincode,
      });
      
      setEditing(false);
      toast.success("Profile Updated Successfully", {
        style: {
          background: "#4CAF50",
          color: "white",
        },
        icon: "🎉",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      hideSpinner();
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditedPersonalInfo((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const fileEditHandler = async (e) => {
    try {
      showSpinner();
      const file = e.target.files[0];
      if (!file) return;

      // File size validation (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size too large. Please select a file under 5MB");
        hideSpinner();
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      const imageUrl = await fileUpload(formData);
      
      setPersonalInfo({
        ...personalInfo,
        image: imageUrl.file,
      });

      setEditedPersonalInfo({
        ...editedPersonalInfo,
        image: imageUrl?.file,
      });

      toast.success("Profile picture updated successfully", {
        style: {
          background: "#3f51b5",
          color: "white",
        },
        icon: "📸",
      });
    } catch (error) {
      toast.error(error?.message || "Error uploading file");
    } finally {
      hideSpinner();
    }
  };

  const handleNavigateBack = () => {
    navigate("/");
  };

  const handleCancelEdit = () => {
    setEditedPersonalInfo({
      ...personalInfo,
    });
    setEditing(false);
  };

  const handleUpdatePassword = async (values, { resetForm }) => {
    try {
      showSpinner();
      setLoading(true);
      const response = await changePassword({
        oldPassword: values.current_password,
        newPassword: values.password,
        email: personalInfo.email,
        confirmPassword: values.confirmPassword,
      });

      if (response.status === "success") {
        toast.success("Password updated successfully! Please log in again.", {
          duration: 6000,
          style: {
            background: "#4CAF50",
            color: "white",
          },
          icon: "🔒",
        });
        
        // Reset form values
        resetForm();
        
        // Redirect after a short delay
        setTimeout(() => {
          navigate("/student/login");
        }, 2000);
      } else {
        toast.error(response.message || "Error updating password");
      }
    } catch (error) {
      toast.error(error.message || "Error updating password");
    } finally {
      hideSpinner();
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .required("Current Password is required")
      .min(6, "Password must be at least 6 characters"),
    password: Yup.string()
      .required("New Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const infoItems = [
    {
      icon: <MailOutlineIcon color="primary" />,
      label: "Mail Address",
      value: personalInfo.email,
    },
    {
      icon: <PersonIcon color="primary" />,
      label: "Name",
      value: `${personalInfo.first_name || ""} ${personalInfo.last_name || ""}`,
    },
    {
      icon: personalInfo.gender === "male" ? <MaleIcon color="primary" /> : <FemaleIcon color="primary" />,
      label: "Gender",
      value: personalInfo.gender,
    },
    {
      icon: <PhoneIcon color="primary" />,
      label: "Contact Number",
      value: personalInfo?.contact_info?.phone_number,
    },
    {
      icon: <CalendarTodayIcon color="primary" />,
      label: "Date of Birth",
      value: personalInfo.dob,
    },
    {
      icon: <LocationOnIcon color="primary" />,
      label: "Pin Code",
      value: personalInfo?.contact_info?.pincode,
    },
    {
      icon: <HomeIcon color="primary" />,
      label: "Address",
      value: `${personalInfo?.contact_info?.address1 || ""}, ${personalInfo?.contact_info?.address2 || ""}`,
    },
  ];

  const instituteInfoItems = [
    {
      icon: <AutoStoriesIcon color="primary" />,
      label: "Course",
      value: personalInfo?.userDetail?.course?.course_name,
    },
    {
      icon: <Groups2Icon color="primary" />,
      label: "Batch",
      value: personalInfo?.userDetail?.course?.course_name,
    },
    {
      icon: <BoySharpIcon color="primary" />,
      label: "Roll Number",
      value: personalInfo?.userDetail?.id,
    },
    {
      icon: <FaIdCard style={{ fontSize: "23px", color: theme.palette.primary.main }} />,
      label: "Student ID",
      value: personalInfo?.userDetail?.id,
    },
  ];

  const renderSidebarMenu = () => (
    <Paper
      elevation={3}
      sx={{
        width: isMobile ? "100%" : "280px",
        background: "white",
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
        paddingTop: 4,
        paddingBottom: 4,
        height: "fit-content",
        position: isMobile ? "relative" : "fixed",
        top: isMobile ? "auto" : 140,
        zIndex: 1,
        ml:10,
        height: "70vh",
        width: "300px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Avatar
          alt="userimage"
          src={getImageUrl(personalInfo.image)}
          sx={{ 
            width: 100, 
            height: 100, 
            mb: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        />
        <Typography variant="h6" fontWeight="bold">
          {`${personalInfo.first_name || ""} ${personalInfo.last_name || ""}`}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {personalInfo.email}
        </Typography>
        <Divider sx={{ width: "100%", my: 2 }} />
      </Box>
      
      {/* Menu options directly below the divider */}
      <Box sx={{ width: "100%", mt: 0 }}>
        <Box
          onClick={() => setActiveSection("personalInfo")}
          sx={{
            padding: "16px",
            marginBottom: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "personalInfo"
                ? "linear-gradient(90deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 110, 253, 0.05) 100%)"
                : "transparent",
            "&:hover": {
              background: "rgba(13, 110, 253, 0.05)",
            },
            borderLeft:
              activeSection === "personalInfo" ? "4px solid #0D6EFD" : "none",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <PersonIcon sx={{ mr: 2, color: activeSection === "personalInfo" ? "#0D6EFD" : "#666" }} />
          <Typography
            sx={{
              fontWeight: 600,
              color: activeSection === "personalInfo" ? "#0D6EFD" : "#666",
              fontSize: "16px",
            }}
          >
            Profile Info
          </Typography>
        </Box>
        <Box
          onClick={() => setActiveSection("security")}
          sx={{
            padding: "16px",
            marginBottom: "8px",
            borderRadius: "8px",
            cursor: "pointer",
            background:
              activeSection === "security"
                ? "linear-gradient(90deg, rgba(13, 110, 253, 0.1) 0%, rgba(13, 110, 253, 0.05) 100%)"
                : "transparent",
            "&:hover": {
              background: "rgba(13, 110, 253, 0.05)",
            },
            borderLeft:
              activeSection === "security" ? "4px solid #0D6EFD" : "none",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
          }}
        >
          <FiShield style={{ marginRight: 16, color: activeSection === "security" ? "#0D6EFD" : "#666" }} />
          <Typography
            sx={{
              fontWeight: 600,
              color: activeSection === "security" ? "#0D6EFD" : "#666",
              fontSize: "16px",
            }}
          >
            Security
          </Typography>
        </Box>
      </Box>

      {/* Spacer to push the back button to the bottom */}
      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleNavigateBack}
          fullWidth
          sx={{
            p: 1.5,
            borderRadius: "8px",
            textTransform: "none",
            fontSize: "16px",
            fontWeight: 600,
            color: "#f44336",
            borderColor: "#f44336",
            "&:hover": {
              borderColor: "#d32f2f",
              backgroundColor: "rgba(244, 67, 54, 0.04)",
            },
          }}
        >
          Go Back
        </Button>
      </Box>
    </Paper>
  );

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        pt: 8,
        pb: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid item xs={12} md={3} lg={3}>
            {renderSidebarMenu()}
          </Grid>

          {/* Main Content */}
          <Grid item xs={12} md={9} lg={9}>
            <Fade in={!loading} timeout={500}>
              <Card
                elevation={3}
                sx={{
                  borderRadius: "16px",
                  overflow: "visible",
                  height: "100%",
                  position: "relative",
                  mt:7,
                }}
              >
                {activeSection === "personalInfo" && (
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        height: "160px",
                        background: "linear-gradient(135deg, #2196F3 0%, #3f51b5 100%)",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={studentheaderpic}
                        alt="Background"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 0.7,
                        }}
                      />
                      
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(to right, rgba(33, 150, 243, 0.6), rgba(63, 81, 181, 0.6))",
                        }}
                      />
                    </Box>
                    
                    <Avatar
                      alt="userimage"
                      src={getImageUrl(personalInfo.image)}
                      sx={{
                        width: 130,
                        height: 130,
                        position: "absolute",
                        top: 90,
                        left: {
                          xs: "50%",
                          sm: 40
                        },
                        transform: {
                          xs: "translateX(-50%)",
                          sm: "none"
                        },
                        border: "5px solid white",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        backgroundColor: "#f5f5f5",
                      }}
                    />
                    
                    {editing && (
                      <>
                        <input
                          accept="image/*"
                          style={{ display: "none" }}
                          id="avatar-upload"
                          type="file"
                          onChange={fileEditHandler}
                        />
                        <label htmlFor="avatar-upload">
                          <Tooltip title="Upload new photo" placement="right" arrow>
                            <Button
                              variant="contained"
                              component="span"
                              sx={{
                                position: "absolute",
                                top: 180,
                                left: {
                                  xs: "50%",
                                  sm: 40
                                },
                                transform: {
                                  xs: "translateX(-50%)",
                                  sm: "none"
                                },
                                backgroundColor: "rgba(13, 110, 253, 0.8)",
                                color: "white",
                                width: 130,
                                borderRadius: "0 0 8px 8px",
                                "&:hover": {
                                  backgroundColor: "rgba(13, 110, 253, 0.9)",
                                },
                              }}
                            >
                              <FileUploadOutlinedIcon style={{ marginRight: 8, fontSize: "16px" }} />
                              Upload Photo
                            </Button>
                          </Tooltip>
                        </label>
                      </>
                    )}
                    
                    <Box
                      sx={{
                        display: "flex",
                        position: "absolute",
                        top: {
                          xs: 220,
                          sm: 100
                        },
                        right: 24,
                      }}
                    >
                      {editing ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={handleCancelEdit}
                            startIcon={<CancelIcon />}
                            sx={{
                              borderRadius: "8px",
                              borderColor: "#f44336",
                              color: "#f44336",
                              mr: 2,
                              "&:hover": {
                                borderColor: "#d32f2f",
                                backgroundColor: "rgba(244, 67, 54, 0.04)",
                              },
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            onClick={editProfile}
                            startIcon={<SaveIcon />}
                            sx={{
                              borderRadius: "8px",
                              background: "linear-gradient(45deg, #4CAF50 30%, #2E7D32 90%)",
                              boxShadow: "0 3px 5px 2px rgba(76, 175, 80, .3)",
                              "&:hover": {
                                background: "linear-gradient(45deg, #2E7D32 30%, #4CAF50 90%)",
                              },
                            }}
                          >
                            Save Profile
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={() => setEditing(true)}
                          startIcon={<EditIcon />}
                          sx={{
                            borderRadius: "8px",
                            background: "linear-gradient(45deg, #2196F3 30%, #1976D2 90%)",
                            boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
                            },
                          }}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Box>
                  </Box>
                )}

                <CardContent sx={{ mt: activeSection === "personalInfo" ? 12 : 3, px: 4, pb: 4 }}>
                  {activeSection === "personalInfo" ? (
                    <>
                      <Typography
                        variant="h5"
                        sx={{
                          mb: 3,
                          color: "#000000",
                          fontWeight: 700,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <MdOutlineVerifiedUser 
                          style={{ 
                            marginRight: 12, 
                            color: theme.palette.primary.main,
                            fontSize: 28
                          }} 
                        />
                        Personal Information
                      </Typography>
                      <Paper
                        elevation={1}
                        sx={{
                          p: 3,
                          mb: 4,
                          borderRadius: "12px",
                          background: "white",
                          transition: "transform 0.3s, box-shadow 0.3s",
                          "&:hover": {
                            transform: "translateY(-2px)",
                            boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                          },
                        }}
                      >
                        <Grid container spacing={3} justifyContent="space-between">
                          {editing ? (
                            <>
                              <Grid item xs={12}>
                                <TextField
                                  label="Email"
                                  variant="outlined"
                                  value={editedPersonalInfo.email || ""}
                                  disabled
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <MailOutlineIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="First Name"
                                  variant="outlined"
                                  value={editedPersonalInfo.first_name || ""}
                                  onChange={(e) =>
                                    handleInputChange("first_name", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} sm={6}>
                                <TextField
                                  label="Last Name"
                                  variant="outlined"
                                  value={editedPersonalInfo.last_name || ""}
                                  onChange={(e) =>
                                    handleInputChange("last_name", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PersonIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Gender"
                                  variant="outlined"
                                  value={editedPersonalInfo.gender || ""}
                                  disabled
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        {personalInfo.gender === "male" ? <MaleIcon /> : <FemaleIcon />}
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Contact Number"
                                  variant="outlined"
                                  value={editedPersonalInfo.contact || ""}
                                  onChange={(e) =>
                                    handleInputChange("contact", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <PhoneIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Address Line 1"
                                  variant="outlined"
                                  value={editedPersonalInfo.address1 || ""}
                                  onChange={(e) =>
                                    handleInputChange("address1", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <HomeIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Address Line 2"
                                  variant="outlined"
                                  value={editedPersonalInfo.address2 || ""}
                                  onChange={(e) =>
                                    handleInputChange("address2", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <HomeIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  label="Pincode"
                                  variant="outlined"
                                  value={editedPersonalInfo.pincode || ""}
                                  onChange={(e) =>
                                    handleInputChange("pincode", e.target.value)
                                  }
                                  fullWidth
                                  InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <LocationOnIcon />
                                      </InputAdornment>
                                    ),
                                  }}
                                  sx={{
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: "8px",
                                    },
                                  }}
                                  />
                                </Grid>
                              </>
                            ) : (
                              <>
                                {infoItems.map((item, index) => (
                                  <Grid item xs={12} md={6} key={index}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        py: 1,
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          width: 40,
                                          height: 40,
                                          borderRadius: "10px",
                                          backgroundColor: "rgba(33, 150, 243, 0.1)",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                          mr: 2,
                                        }}
                                      >
                                        {item.icon}
                                      </Box>
                                      <Box>
                                        <Typography variant="body2" color="text.secondary">
                                          {item.label}
                                        </Typography>
                                        <Typography
                                          variant="subtitle1"
                                          fontWeight="medium"
                                          sx={{ mt: 0.5 }}
                                        >
                                          {item.value || "Not provided"}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </Grid>
                                ))}
                              </>
                            )}
                          </Grid>
                        </Paper>
  
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 3,
                            color: "#000000",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <AutoStoriesIcon 
                            style={{ 
                              marginRight: 12, 
                              color: theme.palette.primary.main,
                              fontSize: 28
                            }} 
                          />
                          Institute Information
                        </Typography>
                        <Paper
                          elevation={1}
                          sx={{
                            p: 3,
                            borderRadius: "12px",
                            background: "white",
                            transition: "transform 0.3s, box-shadow 0.3s",
                            "&:hover": {
                              transform: "translateY(-2px)",
                              boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                            },
                          }}
                        >
                          <Grid container spacing={3}>
                            {instituteInfoItems.map((item, index) => (
                              <Grid item xs={12} md={6} key={index}>
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    py: 1,
                                  }}
                                >
                                  <Box
                                    sx={{
                                      width: 40,
                                      height: 40,
                                      borderRadius: "10px",
                                      backgroundColor: "rgba(33, 150, 243, 0.1)",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      mr: 2,
                                    }}
                                  >
                                    {item.icon}
                                  </Box>
                                  <Box>
                                    <Typography variant="body2" color="text.secondary">
                                      {item.label}
                                    </Typography>
                                    <Typography
                                      variant="subtitle1"
                                      fontWeight="medium"
                                      sx={{ mt: 0.5 }}
                                    >
                                      {item.value || "Not provided"}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Grid>
                            ))}
                          </Grid>
                        </Paper>
                      </>
                    ) : (
                      <>
                        <Typography
                          variant="h5"
                          sx={{
                            mb: 3,
                            color: "#000000",
                            fontWeight: 700,
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <LockIcon 
                            style={{ 
                              marginRight: 12, 
                              color: theme.palette.primary.main,
                              fontSize: 28
                            }} 
                          />
                          Change Password
                        </Typography>
                        <Paper
                          // elevation={1}
                          // sx={{
                          //   p: 3,
                          //   borderRadius: "12px",
                          //   background: "white",
                          //   transition: "transform 0.3s, box-shadow 0.3s",
                          //   "&:hover": {
                          //     transform: "translateY(-2px)",
                          //     boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                          //   },
                          // }}
                        >
                          <Formik
                            initialValues={{
                              current_password: "",
                              password: "",
                              confirmPassword: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleUpdatePassword}
                          >
                            {({ errors, touched, handleChange, handleBlur, values }) => (
                              <Form>
                                <Grid container spacing={3}>
                                  <Grid item xs={12}>
                                    <FormControl
                                      fullWidth
                                      variant="outlined"
                                      error={touched.current_password && Boolean(errors.current_password)}
                                    >
                                      <InputLabel htmlFor="current-password">Current Password</InputLabel>
                                      <OutlinedInput
                                        id="current-password"
                                        type={showCurrentPassword ? "text" : "password"}
                                        value={values.current_password}
                                        onChange={handleChange("current_password")}
                                        onBlur={handleBlur("current_password")}
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                              edge="end"
                                            >
                                              {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        label="Current Password"
                                      />
                                      {touched.current_password && errors.current_password && (
                                        <Typography color="error" variant="caption">
                                          {errors.current_password}
                                        </Typography>
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <FormControl
                                      fullWidth
                                      variant="outlined"
                                      error={touched.password && Boolean(errors.password)}
                                    >
                                      <InputLabel htmlFor="new-password">New Password</InputLabel>
                                      <OutlinedInput
                                        id="new-password"
                                        type={showNewPassword ? "text" : "password"}
                                        value={values.password}
                                        onChange={handleChange("password")}
                                        onBlur={handleBlur("password")}
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={() => setShowNewPassword(!showNewPassword)}
                                              edge="end"
                                            >
                                              {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        label="New Password"
                                      />
                                      {touched.password && errors.password && (
                                        <Typography color="error" variant="caption">
                                          {errors.password}
                                        </Typography>
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <FormControl
                                      fullWidth
                                      variant="outlined"
                                      error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                    >
                                      <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
                                      <OutlinedInput
                                        id="confirm-password"
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={values.confirmPassword}
                                        onChange={handleChange("confirmPassword")}
                                        onBlur={handleBlur("confirmPassword")}
                                        endAdornment={
                                          <InputAdornment position="end">
                                            <IconButton
                                              aria-label="toggle password visibility"
                                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                              edge="end"
                                            >
                                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                          </InputAdornment>
                                        }
                                        label="Confirm Password"
                                      />
                                      {touched.confirmPassword && errors.confirmPassword && (
                                        <Typography color="error" variant="caption">
                                          {errors.confirmPassword}
                                        </Typography>
                                      )}
                                    </FormControl>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Button
                                      type="submit"
                                      variant="contained"
                                      fullWidth
                                      disabled={loading}
                                      sx={{
                                        mt: 2,
                                        py: 1.5,
                                        background: "linear-gradient(45deg, #2196F3 30%, #1976D2 90%)",
                                        boxShadow: "0 3px 5px 2px rgba(33, 150, 243, .3)",
                                        "&:hover": {
                                          background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
                                        },
                                        borderRadius: "8px",
                                        fontSize: "16px",
                                        fontWeight: 600,
                                      }}
                                    >
                                      Update Password
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Form>
                            )}
                          </Formik>
                        </Paper>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default ProfilePage;