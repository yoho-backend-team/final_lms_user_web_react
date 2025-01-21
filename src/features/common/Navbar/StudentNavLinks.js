import Icon from "../../../components/icon";
import { Grid, Box, Typography, Avatar, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import {
  NavBg,
  NavMobileBg,
  NavSelectedImage,
  NavMobileSelectedImage,
  NavReplace
} from "utils/images";

const StudentNavLinks = ({ student }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { tabView } = useTabResponsive();

  const nav_selected_image = require("../../../assets/images/pages/nav_selected.png");
  const nav_back_image = require("../../../assets/images/pages/nav_back.png");

  const isSmallScreen = useMediaQuery('(max-width: 900px)');

  // Initialize selected state with a default value
  const [selected, setSelected] = useState(null);

  const nav_items = [
    {
      id: 1,
      name: "Dashboard",
      icon: "material-symbols:dashboard-outline",
      to: "/student/home",
    },
    {
      id: 2,
      name: "Classes",
      icon: "material-symbols:book-outline",
      to: "/student/classes",
    },
    {
      id: 3,
      name: "Attendance",
      icon: "uil:calender",
      to: "/student/attendances",
    },
    {
      id: 4,
      name: "Courses",
      icon: "mdi:academic-cap-outline",
      to: "/student/courses",
    },
    {
      id: 5,
      name: "Payments",
      icon: "material-symbols-light:payments-outline-rounded",
      to: "/student/payments",
    },
    {
      id: 6,
      name: "Community",
      icon: "iconoir:community",
      to: "/student/community",
    },
  ];

  useEffect(() => {
    const current = nav_items.find((item) => item.to === currentPath);
    if (current) {
      setSelected(current?.id); // Update selected state with current id
    }
    return () => {
      setSelected(null); // Reset selected state when component unmounts
    };
  }, [currentPath, nav_items]);

  return (
    <Grid
      item
      md={4}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        mt: tabView ? 10 : 0,
      }}
    >
      <Box sx={{ position: "absolute" }}>
        <img
         src={tabView ? NavMobileBg : NavReplace}
          style={{
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            marginTop: isSmallScreen ? "-64px" : "18px"

          }}
          alt="nav background"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          gap: tabView ? 2 : 10,
          position: "relative",
          padding: tabView ? "25px 45px 45px 45px" : 7,
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,  
          marginTop:  "55px",       
          
        }}
      >
        {nav_items.map((item) => (
          <Box
            key={item?.id}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              marginTop: -13.3,
              pt: 8,
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                "& .hover-target": {
                  color: "#0D6EFD",
                  fontWeight: "bold",
                },
              },
            }}
            component={Link}
            to={item.to}
            onClick={() => {
              setSelected(item?.id); // Update selected state on click
            }}
          >
            <Box sx={{ textAlign: "center", 
            pt: 5, 
            transition: "color 0.3s ease",
            color: selected === item.id ? "#0D6EFD" : "#6C757D", 
            }}
            className="hover-target">
              <Icon
                icon={item.icon}
                className="hover-target"
                sx={{
                  transition: "color 0.3s ease",
                  ":hover" : {
                    color: "#0D6EFD",
                  }
                }}
              />
            </Box>
            <Typography
              variant="h5"
              className="hover-target"
              sx={{
                textDecoration: "none",
                textAlign: "center",
                fontWeight: "500",
                color: selected === item?.id ? "#0D6EFD" : "#6C757D",
                fontSize: tabView ? "12px" : "14px",
                fontFamily: "poppins",
                lineHeight: "22px",
                transition: "color 0.3s ease",
              }}
            >
              {item.name}
            </Typography>
            {item?.id === selected && (
              <img
                src={nav_selected_image}
                style={{ marginTop: -44,height: 50,}}
                alt="nav selected"
              />
            )}
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default StudentNavLinks;
