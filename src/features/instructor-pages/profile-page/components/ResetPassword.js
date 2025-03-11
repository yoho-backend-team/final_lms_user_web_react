import React, { useState } from 'react';
import { Grid, InputAdornment, IconButton, FormControl, InputLabel, OutlinedInput, Box, Typography, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSpinner } from 'context/SpinnerProvider';
import { changeInstructorPassword } from '../services';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const PasswordReset = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { showSpinner, hideSpinner } = useSpinner();

  const validationSchema = Yup.object().shape({
    current_password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Current Password is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('New Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Re-type New Password is required'),
  });

  const handleUpdatePassword = async (values, { resetForm }) => {
    try {
      showSpinner();
      const data = { oldPassword: values.current_password, newPassword: values?.confirmPassword };
      const response = await changeInstructorPassword(data);
      toast.success('Password changed successfully');
      resetForm();
    } catch (error) {
      toast.error(error.message || 'Failed to change password');
    } finally {
      hideSpinner();
    }
  };

  return (
    <Box sx={{ maxWidth: '1000px', margin: '0 auto', p: 3}}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 6 }}>
        <Typography variant="h4" sx={{ fontWeight: '600', color: '#2d3748' }}>
          Change Password
        </Typography>
      </Box>

      <Formik
        initialValues={{ password: '', confirmPassword: '', current_password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleUpdatePassword}
      >
        {({ errors, touched, handleChange, values }) => (
          <Form>
            <Box sx={{ 
              backgroundColor: '#f8f9fa', 
              borderRadius: '12px', 
              p: 4,
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
            }}>
              <Grid container spacing={3}>
                {/* Current Password */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={touched.current_password && Boolean(errors.current_password)}>
                    <InputLabel htmlFor="current-password" sx={{ color: '#4a5568' }}>Current Password</InputLabel>
                    <OutlinedInput
                      id="current-password"
                      name="current_password"
                      type={showCurrentPassword ? 'text' : 'password'}
                      placeholder="Enter current password"
                      sx={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e2e8f0',
                        }
                      }}
                      value={values.current_password}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle current password visibility"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            edge="end"
                            sx={{ color: '#718096' }}
                          >
                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Current Password"
                    />
                    {touched.current_password && errors.current_password && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.current_password}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* New Password */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={touched.password && Boolean(errors.password)}>
                    <InputLabel htmlFor="new-password" sx={{ color: '#4a5568' }}>New Password</InputLabel>
                    <OutlinedInput
                      id="new-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter new password"
                      sx={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e2e8f0',
                        }
                      }}
                      value={values.password}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            sx={{ color: '#718096' }}
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                    />
                    {touched.password && errors.password && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.password}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Confirm Password */}
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined" error={touched.confirmPassword && Boolean(errors.confirmPassword)}>
                    <InputLabel htmlFor="confirm-password" sx={{ color: '#4a5568' }}>Confirm New Password</InputLabel>
                    <OutlinedInput
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm new password"
                      sx={{ 
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#e2e8f0',
                        }
                      }}
                      value={values.confirmPassword}
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle confirm password visibility"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            edge="end"
                            sx={{ color: '#718096' }}
                          >
                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm New Password"
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                        {errors.confirmPassword}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>

                {/* Submit Button */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button
                      variant="contained"
                      type="submit"
                      sx={{
                        px: 6,
                        py: 1.5,
                        borderRadius: '8px',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: '600',
                        background: 'linear-gradient(45deg, #3b82f6 30%, #2563eb 90%)',
                        boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #2563eb 30%, #3b82f6 90%)',
                          boxShadow: '0 6px 8px -1px rgba(59, 130, 246, 0.4)'
                        }
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PasswordReset;