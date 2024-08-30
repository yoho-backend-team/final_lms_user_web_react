import React, { useRef, useState } from 'react';
import {
  Grid,
  Button,
  FormControl,
  FormLabel,
  OutlinedInput,
  Select,
  MenuItem,
  Box,
  Typography
} from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';

const UserProfile = ({isEditMode,setIsEditMode,instructor,setInstructor,fileInputRef,handleButtonClick,handleFileChange}) => {
  

  return (
    <Grid container spacing={3} sx={{ p: 3 }}>
      {/* File Upload Button */}
      <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Button
          sx={{
            position: 'fixed',
            background: '#0D6EFD',
            borderRadius: '0px 0px 10px 10px',
            color: '#FFFFFF',
            width: '232px',
            height: '48px',
            marginTop: '-48px',
            ':hover': {
              backgroundColor: '#0D6EFD'
            }
          }}
          onClick={handleButtonClick}
          startIcon={<FileUploadOutlinedIcon sx={{ height: '24px', width: '24px' }} />}
        >
          Upload Photo
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
      </Grid>

      {/* User Details */}
      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {/* Personal Info */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" sx={{ mb: 2 }}>Personal Info</Typography>
            <FormControl fullWidth margin="normal">
              <FormLabel>Name</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                size="small"
                value={instructor.full_name}
                onChange={(e) => setInstructor(prev => ({ ...prev, full_name: e.target.value }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Gender</FormLabel>
              {isEditMode ? (
                <Select
                  value={instructor.gender}
                  onChange={(e) => setInstructor(prev => ({ ...prev, gender: e.target.value }))}
                  sx={{
                    borderRadius: '8px',
                    background: isEditMode ? '#FFFFFF' : '',
                    padding: isEditMode ? '10px 16px' : '',
                    color: '#000000',
                    fontSize: '16px',
                    maxHeight: '40px'
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              ) : (
                <OutlinedInput
                  readOnly
                  value={instructor.gender}
                  sx={{
                    border: isEditMode ? '1px solid #D9D9D9' : '',
                    borderRadius: '8px',
                    background: isEditMode ? '#FFFFFF' : '',
                    padding: isEditMode ? '10px 16px' : '',
                    color: '#000000',
                    fontSize: '16px',
                    maxHeight: '40px'
                  }}
                />
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Contact Number</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.phone_number}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, phone_number: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Qualification</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.qualification}
                onChange={(e) => setInstructor(prev => ({ ...prev, qualification: e.target.value }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
          </Grid>

          {/* Address Info */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" sx={{ mb: 2 }}>Address Info</Typography>
            <FormControl fullWidth margin="normal">
              <FormLabel>Address Line 1</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.address1}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, address1: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Address Line 2</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.address2}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, address2: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>City</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.city}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, city: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>State</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.state}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, state: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Pin code </FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.pincode}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, pincode: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <FormLabel>Alternate Phone Number</FormLabel>
              <OutlinedInput
                readOnly={!isEditMode}
                value={instructor.contact_info.alternate_phone_number}
                onChange={(e) => setInstructor(prev => ({
                  ...prev,
                  contact_info: { ...prev.contact_info, alternate_phone_number: e.target.value }
                }))}
                sx={{
                  border: isEditMode ? '1px solid #D9D9D9' : '',
                  borderRadius: '8px',
                  background: isEditMode ? '#FFFFFF' : '',
                  padding: isEditMode ? '10px 16px' : '',
                  color: '#000000',
                  fontSize: '16px',
                  maxHeight: '40px'
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserProfile;

