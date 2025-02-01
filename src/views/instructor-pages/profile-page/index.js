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
import PasswordReset from "features/instructor-pages/profile-page/components/ResetPassword";
import { fileUpload } from "features/common/upload"; // Ensure this path is correct

const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [view, setView] = useState("personalInfo"); // State to manage the view
  const { showSpinner, hideSpinner } = useSpinner();
  const navigate = useNavigate();

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

  const handleUpdateProfile = async () => {
    try {
      showSpinner();
      const response = await updateInstructorProfile(instructor);
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

  return (
    <Box sx={{ display: 'flex', height: '100vh', padding: '70px' }}>
      <Box
        sx={{
          width: '300px',
          background: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          margin: 2,
          height: 'auto',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          paddingTop: 4,
          paddingBottom: 4,
          marginTop: '140px',
          marginBottom: '70px',
          marginLeft: '60px',
          marginRight: '20px',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: 'black' }}>Profile Sections</Typography>
        <Button
          variant="contained"
          onClick={() => setView("personalInfo")}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: view === "personalInfo" ? '#0D6EFD' : 'white',
            color: view === "personalInfo" ? 'white' : 'black',
            borderRadius: '0px', // No curve for sidebar button
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: view === "personalInfo" ? '#0A58CA' : '#f0f0f0',
            },
          }}
        >
          Personal Info
        </Button>
        <Button
          variant="contained"
          onClick={() => setView("changePassword")}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: view === "changePassword" ? '#0D6EFD' : 'white',
            color: view === "changePassword" ? 'white' : 'black',
            borderRadius: '0px', // No curve for sidebar button
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: view === "changePassword" ? '#0A58CA' : '#f0f0f0',
            },
          }}
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          onClick={handleBack}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: '#0D6EFD',
            color: 'white',
            borderRadius: '0px', // No curve for sidebar button
            padding: '10px 20px',
            '&:hover': {
              backgroundColor: '#0A58CA',
            },
          }}
        >
          Go Back
        </Button>
      </Box>
      <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', padding: 2, marginLeft: '250px', mt: 2, mb: 2 }}>
        <Grid container xs={12} spacing={2}>
          <Grid item xs={12}>
            <Card
              sx={{
                backgroundColor: "white",
                overflow: "auto",
                padding: "20px",
                height: '90%',
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Enhanced shadow
                width: 'calc(100% - 80px)', // Adjusted width to match sidebar
                marginLeft: '80px', // Align with sidebar
                borderRadius: '15px', // Increased border radius for better aesthetics
                position: 'relative', // Added for positioning the edit button
              }}
            >
              {view === "personalInfo" && (
                <>
                  <Button
                    variant="outlined"
                    onClick={isEditMode ? handleUpdateProfile : () => setIsEditMode(true)}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      borderColor: isEditMode ? '#0D6EFD' : '#ccc',
                      color: isEditMode ? '#0D6EFD' : '#000',
                      backgroundColor: isEditMode ? '#E0E0E0' : 'transparent', // Dark color for edit button
                      '&:hover': {
                        borderColor: '#0A58CA',
                        backgroundColor: '#D0D0D0',
                      },
                    }}
                  >
                    {isEditMode ? "Save" : "Edit"}
                  </Button>
                  {isEditMode && (
                    <Button variant="outlined" onClick={() => setIsEditMode(false)} sx={{ ml: 2, position: 'absolute', top: 16, right: 100 }}>
                      Cancel
                    </Button>
                  )}
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={4}>
                        <Avatar
                          alt="user"
                          src={instructor?.image ? getImageUrl(instructor?.image) : imagePlaceholder}
                          sx={{ width: 175, height: 175, ml: 15, mb: 2, border: '2px solid #0D6EFD' }}
                        />
                        {isEditMode && (
                          <Button onClick={handleButtonClick} startIcon={<FileUploadOutlinedIcon />} sx={{ mt: 2 }}>
                            Upload Photo
                          </Button>
                        )}
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                        />
                      </Grid>
                      <Grid item xs={8}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Personal Information</Typography>
                        <Grid container spacing={2}>
                          {[
                            ['Name', 'full_name'],
                            ['Gender', 'gender'],
                            ['Qualification', 'qualification'],
                          ].map(([label, key], index) => (
                            <Grid item xs={12} md={6} key={index}>
                              <FormControl fullWidth>
                                <FormLabel sx={{ fontWeight: 'bold' }}>{label}</FormLabel>
                                {key === 'gender' ? (
                                  <Select
                                    value={instructor?.[key] || ''}
                                    onChange={(e) => setInstructor((prev) => ({ ...prev, [key]: e.target.value }))}
                                    disabled={!isEditMode}
                                    sx={{ borderRadius: '10px' }} // Rounded corners for select
                                  >
                                    <MenuItem value={"Male"}>Male</MenuItem>
                                    <MenuItem value={"Female"}>Female</MenuItem>
                                    <MenuItem value={"Other"}>Other</MenuItem>
                                  </Select>
                                ) : (
                                  <OutlinedInput
                                    readOnly={!isEditMode}
                                    value={instructor?.[key] || ''}
                                    onChange={(e) => setInstructor((prev) => ({ ...prev, [key]: e.target.value }))}
                                    sx={{ borderRadius: '10px' }} // Rounded corners for input
                                  />
                                )}
                              </FormControl>
                            </Grid>
                          ))}
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="h6" mt={4} sx={{ fontWeight: 'bold' }}>Contact Information</Typography>
                      <Grid container spacing={2}>
                        {[
                          ['Contact Number', 'phone_number'],
                          ['Alternate Number', 'alternate_phone_number'],
                          ['Email', 'email'],
                          ['Address Line 1', 'address1'],
                          ['Address Line 2', 'address2'],
                          ['City', 'city'],
                          ['State', 'state'],
                          ['Pin code', 'pincode']
                        ].map(([label, key], index) => (
                          <Grid item xs={12} md={4} key={index}>
                            <FormControl fullWidth>
                              <FormLabel sx={{ fontWeight: 'bold' }}>{label}</FormLabel>
                              <OutlinedInput
                                readOnly={!isEditMode}
                                value={instructor?.contact_info?.[key] || instructor?.[key] || ''}
                                disabled={key === "email" && isEditMode}
                                onChange={(e) => setInstructor((prev) => ({ ...prev, contact_info: { ...prev.contact_info, [key]: e.target.value } }))}
                                sx={{ borderRadius: '10px' }} // Rounded corners for input
                              />
                            </FormControl>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  </CardContent>
                </>
              )}
              {view === "changePassword" && (
                <CardContent>
                  <PasswordReset />
                </CardContent>
              )}
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProfilePage;