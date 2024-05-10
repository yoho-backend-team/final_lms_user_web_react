import { Grid } from '@mui/material'
import { height } from '@mui/system'
import NavBar from 'features/common/Navbar'
import Footer from 'features/common/footer/footer'
import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Grid>
      <NavBar />
      <div style={{ height: '86vh' }}>

        <Outlet />
      </div>
      <Footer />
    </Grid>
  )
}

export default MainLayout