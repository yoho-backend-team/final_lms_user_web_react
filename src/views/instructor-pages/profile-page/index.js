import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid, Avatar, TextField, FormControl, FormLabel, OutlinedInput, Select, MenuItem } from "@mui/material";
import ProfileLayout from "features/instructor-pages/profile-page/components/layout";
import { useSpinner } from "context/SpinnerProvider";
import { getInstructorProfile, updateInstructorProfile } from "features/instructor-pages/profile-page/services";
import toast from "react-hot-toast";
import { getImageUrl } from "utils/common/imageUtlils";
import { imagePlaceholder } from "utils/placeholders";
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { fileUpload } from "features/common/upload";
import PasswordReset from "features/instructor-pages/profile-page/components/ResetPassword";
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';


const ProfilePage = () => {
  const fileInputRef = useRef(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [instructor, setInstructor] = useState(null);
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
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
    <ProfileLayout handleBack={handleBack}>
      <Box sx={{ padding: "24px 61px 31px 61px" }}>
        <Box sx={{ display: 'flex', justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems:"center"}} >
          <Box sx={{ py: "10px",px:"8px", zIndex: "1000",ml:"-40px"}} onClick={handleBack} >
            <KeyboardBackspaceOutlinedIcon sx={{ height: '24px', width: "24px", cursor: "pointer"}}  />
          </Box>
            <Typography sx={{ color: "#000000", fontSize: "16px", fontWeight: "700", lineHeight: "32px" }}>
              Personal info
            </Typography>
          </Box>
          {
            isEditMode ? 
            <>
              <Box sx={{ display: "flex", gap: "20px" }}>
                <Button variant="outlined" sx={{ color: "red" }} onClick={() => setIsEditMode(false)} >Cancel</Button>
                <Button
                  sx={{
                    backgroundColor: "#5611B1",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                    padding: "10px",
                    fontSize: "10px",
                    fontWeight: 600,
                    border: "1px solid #D9D9D9"
                  }}
                  onClick={handleUpdateProfile}
                >
                  Save profile
                </Button>
              </Box>
            </>
            :
            <Button
              endIcon={<EditOutlinedIcon />}
              sx={{
                backgroundColor: "#5611B1",
                color: "#FFFFFF",
                borderRadius: "5px",
                padding: "11px 20px",
                // fontSize: "10px",
                verticalAlign: "middle",
                fontWeight: 500
              }}
              onClick={() => setIsEditMode(!isEditMode)}
            >
              Edit 
            </Button>
          }
        </Box>
        <Grid container spacing={2} sx={{ my: "16px" }}>
          <Grid  item xs={4} md={2.5}>
          <Typography variant="h3" sx={{ fontSize: "18px", fontWeight: "600", mb: 2 }}>Profile</Typography>
            <Avatar
              alt="user"
              src={instructor?.image ? getImageUrl(instructor?.image) : imagePlaceholder}
              sx={{  width: '232px', height: "264px", borderRadius: "10px", minHeight: '264px', maxWidth: "232px" }}
            />
            {isEditMode && 
              <Button
                sx={{
                  position: "relative",
                  background: "#0D6EFD",
                  borderRadius: "0px 0px 10px 10px",
                  color: "#FFFFFF",
                  width: "232px",
                  height: "48px",
                  marginTop: "-48px",
                  ":hover": {
                    backgroundColor: "#0D6EFD"
                  }
                }}
                onClick={handleButtonClick}
                startIcon={
                  <FileUploadOutlinedIcon sx={{ height: "24px", width: "24px" }} />
                }
              >
                Upload Photo
              </Button>
            }
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Grid>
          <Grid item xs={9.5}>
                <Typography variant="h3" sx={{ fontSize: "18px", fontWeight: "600", mb: 2 }}>Personal Information</Typography>
                <Box sx={{ backgroundColor: "#eef1f7", padding: "40px", mb: 2 }}>
                  <Grid container spacing={2}>
                    {[['Name', 'full_name'], ['Gender', 'gender'],['Qualification', 'qualification'],].map(([label, key], index) => (
                      <Grid item xs={12} md={6} key={index}>
                        <FormControl fullWidth margin="normal">
                          <FormLabel sx={{ color: "#001931", fontSize: "14px", fontWeight: 700 }}>{label}</FormLabel>
                          {key === 'gender' ? (
                            <Select
                              value={instructor?.[key] || ''}
                              onChange={(e) => setInstructor((prev) => ({ ...prev, [key]: e.target.value }))}
                              sx={{
                                borderRadius: "8px",
                                background: isEditMode ? "#FFFFFF" : "#FFFFFF",
                                padding: isEditMode ? "10px 16px" : "",
                                color: "#000000",
                                fontSize: "16px",
                                width: "100%",
                                fontWeight: 400,
                                maxHeight: "40px"
                              }}
                              disabled={!isEditMode}
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
                              sx={{
                                borderRadius: "4px",
                                background: isEditMode ? "#FFFFFF" : "#FFFFFF",
                                padding: isEditMode ? "10px 16px" : "",
                                border : "1px solid #dbe0e9",
                                color: "#001931",
                                fontSize: "14px",
                                width: "100%",
                                fontWeight: 400,
                                maxHeight: "40px"
                              }}
                            />
                          )}
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
        </Grid>
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {/* Grouping Contact Information */}
              <Grid item xs={12}>
                <Typography variant="h3" sx={{ fontSize: "18px", fontWeight: "600", mb: 2 }}>Contact Information</Typography>
                <Box sx={{ backgroundColor: "#eef1f7", padding: "40px", mb: 2 }}>
                  <Grid container spacing={5}>
                    {[['Contact Number', 'phone_number'], ['Alternate Number', 'alternate_phone_number'],  ['Email', 'email'], ['Address Line 1', 'address1'],  ['Address Line 2', 'address2'],  ['City', 'city'],['State', 'state'], ['Pin code', 'pincode']].map(([label, key], index) => (
                      <Grid item xs={12} md={4} key={index}>
                        <FormControl fullWidth margin="normal">
                          <FormLabel sx={{ color: "#001931", fontSize: "14px", fontWeight: 700 }}>{label}</FormLabel>
                          <OutlinedInput
                            readOnly={!isEditMode}
                            value={instructor?.contact_info?.[key] || instructor?.[key] || ''}
                            onChange={(e) => setInstructor((prev) => ({ ...prev, contact_info: { ...prev.contact_info, [key]: e.target.value } }))}
                            sx={{
                              borderRadius: "4px",
                              background: isEditMode ? "#FFFFFF" : "#FFFFFF",
                              padding: isEditMode ? "10px 16px" : "",
                              color: "#001931",
                              fontSize: "14px",
                              width: "100%",
                              fontWeight: 400,
                              maxHeight: "40px"
                            }}
                          />
                        </FormControl>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>

              <Grid item xs={12} >
                <PasswordReset />
              </Grid>
            </Grid>
          </Grid>
        {/* </Grid> */}
      </Box>
    </ProfileLayout>
  );
};

export default ProfilePage;

