import Icon from '../../../components/icon'
import { Grid, Box, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const StudentNavLinks = () => {

    const location = useLocation();
    const currentPath = location.pathname;


    const nav_selected_image = require('../../../assets/images/pages/nav_selected.png')
    const nav_back_image = require('../../../assets/images/pages/nav_back.png')


    const [selected, setSelected] = useState(1);

    const nav_items = [

        {
            id: 1,
            name: 'Dashboard',
            icon: "material-symbols:dashboard-outline", to: '/student/home'
        },
        {
            id: 2,
            name: 'Classes',
            icon: "material-symbols:book-outline",
            to: '/student/classes'
        },
        {
            id: 3,
            name: 'Attendance',
            icon: "uil:calender",
            to: '/student/attendances'
        },
        {
            id: 4,
            name: 'Courses',
            icon: "mdi:academic-cap-outline",
            to: '/student/course'
        },
        {
            id: 5,
            name: 'Payments',
            icon: "material-symbols-light:payments-outline-rounded",
            to: '/student/payments'
        },
        {
            id: 6,
            name: 'Community',
            icon: "iconoir:community",
            to: '/student/community'
        },
    ]

    useEffect(() => {
        const current = nav_items.find(item => item.to == currentPath)
        setSelected(current?.id)
    }, [currentPath, nav_items])



    return (


        <Grid
            item
            md={4}
            sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
                mt: 12

            }}
        >
            <Box sx={{ position: 'absolute' }}>

                <img src={nav_back_image} style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', }} />
            </Box>



            <Box
                sx={{
                    display: "flex",
                    gap: 5,
                    position: 'relative',
                    display: { xs: "none", sm: "flex" },
                    padding: 7, borderBottomLeftRadius: 80, borderBottomRightRadius: 80,
                }}
            >
                {
                    nav_items?.map((item, index) => (

                        <Box sx={{ alignItems: 'center', justifyContent: 'center', textDecoration: "none", marginTop: -13.3, pt: 5 }} component={Link}
                            to={item.to} onClick={() => {
                                setSelected(item.id)

                            }}>

                            <Box sx={{ textAlign: 'center', pt: 5 }}>

                                <Icon icon={item.icon} color={selected == item.id ? '#0D6EFD' : '#6C757D'} />
                            </Box>


                            <Typography
                                variant='h5'

                                sx={{ textDecoration: "none", textAlign: 'center', fontWeight: '500', color: selected == item.id ? '#0D6EFD' : '#6C757D', fontSize: '14px', fontFamily: "poppins", lineHeight: '22px' }}
                            >
                                {item.name}
                            </Typography>
                            {
                                item.id == selected && (

                                    <img src={nav_selected_image} style={{ marginTop: -34, height: 50, }} />
                                )
                            }

                        </Box>
                    ))
                }

            </Box>
        </Grid>




    )
}

export default StudentNavLinks