import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Divider,
  Paper,
  IconButton,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSpinner } from "context/SpinnerProvider";
import {
  changeInstructorPassword,
  getInstructorProfile,
  updateInstructorProfile,
} from "features/instructor-pages/profile-page/services";
import toast from "react-hot-toast";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import PasswordReset from "features/instructor-pages/profile-page/components/ResetPassword";
import { fileUpload } from "features/common/upload";
import BackgroundImage from 'assets/images/background/instructor.png';

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [view, setView] = useState("personalInfo");
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const updateProfile = async () => {
    try {
      showSpinner();
      const response = await getInstructorProfile();
      setInstructor(response);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  useEffect(() => {
    updateProfile();
  }, []);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    try {
      showSpinner();
      const file = e.target.files[0];
      const form_data = new FormData();
      form_data.append("file", file);
      const response = await fileUpload(form_data);
      setInstructor((prev) => ({ ...prev, image: response?.file }));
      toast.success("Profile image updated successfully");
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  // Function to format phone number according to the required pattern
  const formatPhoneNumber = (phoneNumber) => {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');
    
    // Format as: +91 XXXXXXXXXX
    if (cleaned.length >= 10) {
      const countryCode = cleaned.length > 10 ? cleaned.slice(0, cleaned.length - 10) : "91";
      const number = cleaned.slice(cleaned.length - 10);
      
      return `+${countryCode} ${number}`;
    }
    
    return phoneNumber;
  };

  const validatePhoneNumbers = () => {
    const phoneRegex = /^\+\d{2,3}\s\d{10}$/;
    const newErrors = {};
    
    // Validate main phone number
    const mainPhone = instructor?.contact_info?.phone_number || "";
    if (mainPhone && !phoneRegex.test(mainPhone)) {
      newErrors.phone_number = "Invalid phone format. Use: +91 9874563210";
    }
    
    // Validate alternate phone number
    const altPhone = instructor?.contact_info?.alternate_phone_number || "";
    if (altPhone && !phoneRegex.test(altPhone)) {
      newErrors.alternate_phone_number = "Invalid phone format. Use: +91 9874563210";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePhoneChange = (e, key) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setInstructor((prev) => ({
      ...prev,
      contact_info: { ...prev.contact_info, [key]: formattedPhone },
    }));
  };

  const handleUpdateProfile = async () => {
    try {
      if (!validatePhoneNumbers()) {
        toast.error("Please fix the phone number formats");
        return;
      }
      
      showSpinner();
      await updateInstructorProfile(instructor);
      await updateProfile();
      toast.success("Profile updated successfully");
      setIsEditMode(false);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideSpinner();
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  // Define reduced height for sidebar while keeping content panel the same
  const sidebarHeight = "78vh";// Reduced height for sidebar
  const contentPanelHeight = "calc(100vh - 60px)"; // Original height for content panel

  return (
    <Box
      sx={{
        backgroundImage: `url(${BackgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        padding: "40px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box sx={{ maxWidth: "1400px", width: "100%" }}>
        <Grid container spacing={3}>
          {/* Sidebar with reduced height */}
          <Grid item xs={12} md={3}>
          <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                height: sidebarHeight, // Using the reduced height variable
                display: "flex",
                flexDirection: "column",
                mr: 5,
                position: "fixed",
                width: "calc(25% - 30px)", // Adjust width to maintain grid layout
                maxWidth: "310px",
              }}
            >
              {/* Profile Info */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "25px 20px", // Slightly reduced padding
                  background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                  color: "white",
                  overflow: "hidden",
                }}
              >
                <Avatar
                  alt={instructor?.full_name || "User"}
                  src={instructor?.image ? getImageUrl(instructor?.image) : imagePlaceholder}
                  sx={{
                    width: 90, // Slightly reduced
                    height: 90, // Slightly reduced
                    border: "4px solid white",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                  }}
                />
                <Typography variant="h6" sx={{ mt: 2, fontWeight: 600 }}>
                  {instructor?.full_name || "Instructor Name"}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  {instructor?.qualification || "Qualification"}
                </Typography>
              </Box>

              {/* Navigation */}
              <Box 
                sx={{ 
                  padding: "8px", // Slightly reduced
                  flexGrow: 1,
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "4px",
                  },
                  "&::-webkit-scrollbar-track": {
                    backgroundColor: "#f1f1f1",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#c1c1c1",
                    borderRadius: "4px",
                  },
                }}
              >
                <Box
                  onClick={() => setView("personalInfo")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px", // Slightly reduced
                    margin: "3px 0", // Slightly reduced
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: view === "personalInfo" ? "#e3f2fd" : "transparent",
                    color: view === "personalInfo" ? "#1976d2" : "#5f6368",
                    "&:hover": {
                      backgroundColor: view === "personalInfo" ? "#e3f2fd" : "#f5f5f5",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <PersonOutlineOutlinedIcon sx={{ mr: 2 }} />
                  <Typography sx={{ fontWeight: 500 }}>Personal Information</Typography>
                </Box>

                <Box
                  onClick={() => setView("changePassword")}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    padding: "10px 16px", // Slightly reduced
                    margin: "3px 0", // Slightly reduced
                    borderRadius: "8px",
                    cursor: "pointer",
                    backgroundColor: view === "changePassword" ? "#e3f2fd" : "transparent",
                    color: view === "changePassword" ? "#1976d2" : "#5f6368",
                    "&:hover": {
                      backgroundColor: view === "changePassword" ? "#e3f2fd" : "#f5f5f5",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <LockOutlinedIcon sx={{ mr: 2 }} />
                  <Typography sx={{ fontWeight: 500 }}>Change Password</Typography>
                </Box>
              </Box>

              {/* Footer Button */}
              <Box sx={{ padding: "16px" }}> {/* Slightly reduced padding */}
                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<ArrowBackIosNewOutlinedIcon />}
                  onClick={handleBack}
                  sx={{
                    borderRadius: "8px",
                    padding: "8px", // Slightly reduced
                    borderColor: "#d32f2f",
                    color: "#d32f2f",
                    "&:hover": {
                      borderColor: "#b71c1c",
                      backgroundColor: "rgba(211, 47, 47, 0.04)",
                    },
                  }}
                >
                  Go Back
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Main Content - Offset to account for fixed sidebar */}
          <Grid item xs={12} md={9} sx={{ marginLeft: { xs: 0, md: "25%" } }}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: "12px",
                overflow: "hidden",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                height: contentPanelHeight, // Using the original height for content panel
                display: "flex",
                flexDirection: "column",
              }}
            >
              {view === "personalInfo" && (
                <>
                  {/* Header */}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 30px",
                      borderBottom: "1px solid #e0e0e0",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#1976d2" }}>
                      Personal Information
                    </Typography>
                    <Box>
                      {isEditMode ? (
                        <>
                          <Button
                            variant="contained"
                            startIcon={<SaveOutlinedIcon />}
                            onClick={handleUpdateProfile}
                            sx={{
                              mr: 2,
                              borderRadius: "8px",
                              boxShadow: "none",
                              backgroundColor: "#1976d2",
                              "&:hover": { backgroundColor: "#1565c0" },
                            }}
                          >
                            Save Changes
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<CancelOutlinedIcon />}
                            onClick={() => setIsEditMode(false)}
                            sx={{
                              borderRadius: "8px",
                              borderColor: "#9e9e9e",
                              color: "#616161",
                              "&:hover": {
                                borderColor: "#757575",
                                backgroundColor: "rgba(97, 97, 97, 0.04)",
                              },
                            }}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="contained"
                          startIcon={<EditOutlinedIcon />}
                          onClick={() => setIsEditMode(true)}
                          sx={{
                            borderRadius: "8px",
                            boxShadow: "none",
                            background: "linear-gradient(135deg, #2196f3 0%, #1976d2 100%)",
                            "&:hover": { backgroundColor: "#1565c0" },
                          }}
                        >
                          Edit Profile
                        </Button>
                      )}
                    </Box>
                  </Box>

                  {/* Scrollable Content */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      overflowY: "auto",
                      backgroundColor: "#fff",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        backgroundColor: "#f1f1f1",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#c1c1c1",
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: "#a8a8a8",
                        },
                      },
                    }}
                  >
                    <CardContent sx={{ padding: "30px" }}>
                      <Grid container spacing={4}>
                        {/* Profile Image Section */}
                        <Grid item xs={12} md={4}>
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              padding: "20px",
                            }}
                          >
                            <Avatar
                              alt={instructor?.full_name || "User"}
                              src={instructor?.image ? getImageUrl(instructor?.image) : imagePlaceholder}
                              sx={{
                                width: 180,
                                height: 180,
                                borderRadius: "12px",
                                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                              }}
                            />
                            {isEditMode && (
                              <Button
                                variant="outlined"
                                startIcon={<FileUploadOutlinedIcon />}
                                onClick={handleButtonClick}
                                sx={{
                                  mt: 3,
                                  borderRadius: "8px",
                                  borderColor: "#1976d2",
                                  color: "#1976d2",
                                  "&:hover": {
                                    borderColor: "#1565c0",
                                    backgroundColor: "rgba(25, 118, 210, 0.04)",
                                  },
                                }}
                              >
                                Upload Photo
                              </Button>
                            )}
                            <input
                              type="file"
                              ref={fileInputRef}
                              style={{ display: "none" }}
                              onChange={handleFileChange}
                            />
                          </Box>
                        </Grid>

                        {/* Basic Info Section */}
                        <Grid item xs={12} md={8}>
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 3,
                              pb: 1,
                              position: "relative",
                              "&:after": {
                                content: '""',
                                position: "absolute",
                                width: "60px",
                                height: "3px",
                                backgroundColor: "#1976d2",
                                bottom: 0,
                                left: 0,
                              },
                            }}
                          >
                            Basic Information
                          </Typography>

                          <Grid container spacing={3}>
                            {[
                              ["Full Name", "full_name"],
                              ["Gender", "gender"],
                              ["Qualification", "qualification"],
                            ].map(([label, key], index) => (
                              <Grid item xs={12} md={6} key={index}>
                                <FormControl fullWidth>
                                  <FormLabel
                                    sx={{
                                      fontWeight: 500,
                                      color: "#5f6368",
                                      marginBottom: "6px",
                                    }}
                                  >
                                    {label}
                                  </FormLabel>
                                  {key === "gender" ? (
                                    <Select
                                      value={instructor?.[key] || ""}
                                      onChange={(e) =>
                                        setInstructor((prev) => ({ ...prev, [key]: e.target.value }))
                                      }
                                      disabled={!isEditMode}
                                      sx={{
                                        borderRadius: "8px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e0e0e0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                          borderColor: isEditMode ? "#1976d2" : "#e0e0e0",
                                        },
                                        "& .MuiInputBase-input": {
                                          padding: "12px 14px",
                                        },
                                        backgroundColor: isEditMode ? "white" : "#f5f8fa",
                                      }}
                                    >
                                      <MenuItem value={"Male"}>Male</MenuItem>
                                      <MenuItem value={"Female"}>Female</MenuItem>
                                      <MenuItem value={"Other"}>Other</MenuItem>
                                    </Select>
                                  ) : (
                                    <OutlinedInput
                                      readOnly={!isEditMode}
                                      value={instructor?.[key] || ""}
                                      onChange={(e) =>
                                        setInstructor((prev) => ({ ...prev, [key]: e.target.value }))
                                      }
                                      sx={{
                                        borderRadius: "8px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e0e0e0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                          borderColor: isEditMode ? "#1976d2" : "#e0e0e0",
                                        },
                                        "& .MuiInputBase-input": {
                                          padding: "12px 14px",
                                        },
                                        backgroundColor: isEditMode ? "white" : "#f5f8fa",
                                      }}
                                    />
                                  )}
                                </FormControl>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>

                        <Grid item xs={12}>
                          <Divider sx={{ my: 2 }} />
                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 600,
                              mb: 3,
                              pb: 1,
                              position: "relative",
                              "&:after": {
                                content: '""',
                                position: "absolute",
                                width: "60px",
                                height: "3px",
                                backgroundColor: "#1976d2",
                                bottom: 0,
                                left: 0,
                              },
                            }}
                          >
                            Contact Information
                          </Typography>

                          <Grid container spacing={3}>
                            {[
                              ["Contact Number", "phone_number"],
                              ["Alternate Number", "alternate_phone_number"],
                              ["Email", "email"],
                              ["Address Line 1", "address1"],
                              ["Address Line 2", "address2"],
                              ["City", "city"],
                              ["State", "state"],
                              ["Pin code", "pincode"],
                            ].map(([label, key], index) => (
                              <Grid item xs={12} md={4} key={index}>
                                <FormControl fullWidth error={errors[key] ? true : false}>
                                  <FormLabel
                                    sx={{
                                      fontWeight: 500,
                                      color: "#5f6368",
                                      marginBottom: "6px",
                                    }}
                                  >
                                    {label}
                                  </FormLabel>
                                  {key === "phone_number" || key === "alternate_phone_number" ? (
                                    <>
                                      <OutlinedInput
                                        readOnly={!isEditMode}
                                        value={instructor?.contact_info?.[key] || ""}
                                        onChange={(e) => handlePhoneChange(e, key)}
                                        placeholder="+91 9874563210"
                                        sx={{
                                          borderRadius: "8px",
                                          "& .MuiOutlinedInput-notchedOutline": {
                                            borderColor: errors[key] ? "#d32f2f" : "#e0e0e0",
                                          },
                                          "&:hover .MuiOutlinedInput-notchedOutline": {
                                            borderColor: isEditMode ? (errors[key] ? "#d32f2f" : "#1976d2") : "#e0e0e0",
                                          },
                                          "& .MuiInputBase-input": {
                                            padding: "12px 14px",
                                          },
                                          backgroundColor: isEditMode ? "white" : "#f5f8fa",
                                        }}
                                      />
                                      {errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
                                    </>
                                  ) : (
                                    <OutlinedInput
                                      readOnly={!isEditMode || key === "email"}
                                      value={instructor?.contact_info?.[key] || instructor?.[key] || ""}
                                      onChange={(e) =>
                                        setInstructor((prev) => ({
                                          ...prev,
                                          contact_info: { ...prev.contact_info, [key]: e.target.value },
                                        }))
                                      }
                                      sx={{
                                        borderRadius: "8px",
                                        "& .MuiOutlinedInput-notchedOutline": {
                                          borderColor: "#e0e0e0",
                                        },
                                        "&:hover .MuiOutlinedInput-notchedOutline": {
                                          borderColor: isEditMode && key !== "email" ? "#1976d2" : "#e0e0e0",
                                        },
                                        "& .MuiInputBase-input": {
                                          padding: "12px 14px",
                                        },
                                        backgroundColor: isEditMode && key !== "email" ? "white" : "#f5f8fa",
                                      }}
                                    />
                                  )}
                                </FormControl>
                              </Grid>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Box>
                </>
              )}

              {view === "changePassword" && (
                <Box
                  sx={{
                    flexGrow: 1,
                    overflowY: "auto",
                    height: "100%", // Ensure it takes full height
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "20px 30px",
                      borderBottom: "1px solid #e0e0e0",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 600, color: "#1976d2" }}>
                      Change Password
                    </Typography>
                  </Box>
                  <CardContent sx={{ height: "calc(100% - 76px)" }}> {/* Subtract header height */}
                    <PasswordReset />
                  </CardContent>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;