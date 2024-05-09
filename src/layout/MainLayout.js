import { Grid } from '@mui/material'
import NavBar from 'features/common/Navbar'
import Footer from 'features/common/footer/footer'
import React from 'react'
import { Outlet } from 'react-router'

const MainLayout = () => {
  return (
    <Grid>
        <NavBar/>
        <Outlet/>
        <Footer/>
    </Grid>
  )
}

export default MainLayout