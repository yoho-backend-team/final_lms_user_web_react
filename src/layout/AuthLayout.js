import { Grid } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <Grid>
        <Outlet/>
    </Grid>
  )
}

export default AuthLayout   