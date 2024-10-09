import React, { useState, useEffect } from "react";
import { Grid, Box, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useTabResponsive } from "utils/tabResponsive";
import {
  NavBg,
  NavMobileBg,
  NavSelectedImage,
  NavReplace
} from "utils/images";
import Icon from "../../../components/icon";

const InstructorNavLinks = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  const { tabView } = useTabResponsive();
  const [selected, setSelected] = useState(1);

  const nav_items = [
    {
      id: 1,
      name: "Dashboard",
      icon: "material-symbols:dashboard-outline",
      to: "/instructor/home",
    },
    {
      id: 2,
      name: "Classes",
      icon: "material-symbols:book-outline",
      to: "/instructor/classes",
    },
    {
      id: 3,
      name: "Attendance",
      icon: "uil:calender",
      to: "/instructor/attendances",
    },
    {
      id: 4,
      name: "Courses",
      icon: "mdi:academic-cap-outline",
      to: "/instructor/courses",
    },
    {
      id: 5,
      name: "Payments",
      icon: "material-symbols-light:payments-outline-rounded",
      to: "/instructor/payments",
    },
    {
      id: 6,
      name: "Community",
      icon: "iconoir:community",
      to: "/instructor/community",
    },
  ];

  useEffect(() => {
    const current = nav_items.find((item) => currentPath.startsWith(item.to));
    setSelected(current?.id);
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
            filter: "drop-shadow(0px 0px 12px rgba(0, 0, 0, 0.14))",
          }}
          alt="nav background"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: tabView ? 2 : 5,
          position: "relative",
          padding: tabView ? "25px 45px 45px 45px" : 0,
          borderBottomLeftRadius: 80,
          borderBottomRightRadius: 80,
        }}
      >
        {nav_items.map((item) => (
          <Box
            key={item.to}
            sx={{
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              marginTop: -13.3,
              pt: 5,
              transition: "transform 0.3s ease, color 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                color: "#5611B1",
              },
            }}
            component={Link}
            to={item.to}
            onClick={() => setSelected(item.id)}
          >
            <Box
              sx={{
                textAlign: "center",
                pt: "80px",
                transition: "color 0.3s ease",
                color: selected === item.id ? "#5611B1" : "#6C757D",
                
              }}
            >
              <Icon
                icon={item.icon}
                color={selected === item.id ? "#5611B1" : "#6C757D"}
                sx={{
                  transition: "color 0.3s ease"
                }}
              />
            </Box>
            <Typography
              variant="h5"
              sx={{
                textDecoration: "none",
                textAlign: "center",
                fontWeight: "500",
                color: selected === item.id ? "#5611B1" : "#6C757D",
                fontSize: tabView ? "12px" : "14px",
                fontFamily: "Poppins",
                lineHeight: "22px",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#5611B1",
                  fontWeight : "bold"
                },
              }}
            >
              {item.name}
            </Typography>
            {item.id === selected && (
              <img
                src={tabView ? NavSelectedImage : NavSelectedImage}
                style={{ marginTop: -50, height: 50, transition: "opacity 0.3s ease" }}
                alt="nav selected"
              />
            )}
          </Box>
        ))}
      </Box>
    </Grid>
  );
};

export default InstructorNavLinks;
