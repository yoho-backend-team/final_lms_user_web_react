import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import ClassLayout from "../../../features/instructor-pages/classes-page/components/classLayout";
import { OfflineClassIcon } from "utils/images";
import ClassTabs from "../../../features/instructor-pages/classes-page/components/classTabs";
import UpcomingClassList from "features/instructor-pages/classes-page/components/upcommingClass";
import CompletedClassList from "features/instructor-pages/classes-page/components/completedClass";
import LiveClassList from "features/instructor-pages/classes-page/components/liveClass";
import ClassHistory from "features/instructor-pages/classes-page/components/classHistory";
import { useDispatch, useSelector } from "react-redux";
import { getAllClasses } from "features/instructor-pages/classes-page/redux/thunks";
import {
  selectClasses,
  selectLoading,
} from "features/instructor-pages/classes-page/redux/selectors";
import ClassLoader from "components/ui/loaders/classLoading";
import { InstructorCompletedClass, InstructorHistoryClass, InstructorLiveClass, InstructorUpcommingImage } from "utils/images";
import { useSpinner } from "context/SpinnerProvider";

const ClassesPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const [value, setValue] = useState(queryParams.get("tab") || "upcoming");
  const [classType, setClassType] = useState(queryParams.get("classType") || "online");
  const [page, setPage] = useState(Number(queryParams.get("page")) || 1);
  const dispatch = useDispatch();
  const { showSpinner, hideSpinner } = useSpinner()
  const classes = useSelector(selectClasses);
  const loading = useSelector(selectLoading);
  

  const tabs = [
    { id: "1", title: "Upcoming Classes", value: "upcoming" },
    { id: "2", title: "Completed Classes", value: "completed" },
    { id: "3", title: "Class History", value: "history" },
    // { id: "4", title: "Live Class", value: "live" },
  ];

  const renderComponents = {
    upcoming: <UpcomingClassList data={classes?.data} classType={classType} group={"upcoming"} image={InstructorUpcommingImage} />,
    completed: <CompletedClassList data={classes?.data} classType={classType} group={"completed"} image={InstructorCompletedClass} />,
    history: <ClassHistory data={classes?.data} classType={classType} group={"history"} image={InstructorHistoryClass} />,
    // live: <LiveClassList data={classes?.data} classType={classType} group={"live"} image={InstructorLiveClass} />,
  };

  const classTypes = [
    { id: "1", title: "live class", value: "online" },
    { id: "2", title: "offline class", value: "offline" },
  ];

  const fetchData = async () => {
    showSpinner()
    const data = { userType: classType, classType: value, page: page };
    await dispatch(getAllClasses(data));
    hideSpinner()
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, classType, value, page]);

  const handleChange = (event, newValue) => {
    setPage(1);
    setValue(newValue);
    navigate(`?tab=${newValue}&classType=${classType}&page=1`);
  };

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
    navigate(`?tab=${value}&classType=${event.target.value}&page=1`);
  };

  const handleNextChange = () => {
    setPage(page + 1);
    navigate(`?tab=${value}&classType=${classType}&page=${page + 1}`);
  };

  const handlePrevious = () => {
    setPage(page - 1);
    navigate(`?tab=${value}&classType=${classType}&page=${page - 1}`);
  };

  // navigator.geolocation.getCurrentPosition(
  //   async (position) => {
  //     const { latitude, longitude } = position.coords;

      
  //     const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
  //     const data = await response.json();
  //   },
  //   (error) => {
  //     console.error('Error getting location:', error.message);
  //   }
  // );
  
  return (
    <ClassLayout>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
        <Box sx={{ position: "sticky", top: "0px", overflow: "hidden"}} >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 28,
              color: "#484848",
              mb: "4px",
              pl: "40px",
            }}
          >
            Classes
          </Typography>
        </Box>
        <Card sx={{ position: "sticky", top: "0px", overflow: "hidden"}} >
          <Grid container sx={{ height: "auto", width: "100%" }}>
            <Grid
              item
              xs={8}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  px: "40px",
                  py: "20px",
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 500,
                    lineHeight: "32px",
                    color: "#495057",
                  }}
                >
                  {classType === "online"
                    ? "Online Classes"
                    : "Offline Classes"}
                </Typography>
                <img src={OfflineClassIcon} alt="online class" />
              </Box>
              <Box>
                <ClassTabs
                  tabs={tabs}
                  value={value}
                  handleChange={handleChange}
                />
              </Box>
            </Grid>

            <Grid
              item
              xs={4}
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "end",
                px: "20px",
                alignItems: "center",
              }}
            >
              <Box>
                <FormControl>
                  <Select value={classType} onChange={handleClassTypeChange}>
                    {classTypes.map((list) => (
                      <MenuItem key={list.id} value={list.value}>
                        {list.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </Card>
        
        {loading ? <ClassLoader /> : renderComponents[value]}
        {classes?.last_page !== 1 && classes.last_page !== 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              py: "40px",
            }}
          >
            <Box sx={{ display: "flex", gap: "40px", alignItems: "center" }}>
              <Typography
                onClick={page === 1 ? null : handlePrevious}
                sx={{
                  color: page === 1 ? "#B0B0B0" : "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                }}
              >
                Previous
              </Typography>
              <Typography
                onClick={page === classes?.last_page ? null : handleNextChange}
                sx={{
                  color: page === classes?.last_page ? "#B0B0B0" : "#000000",
                  fontSize: "15px",
                  fontWeight: 700,
                  lineHeight: "24px",
                  cursor: page === classes?.last_page ? "not-allowed" : "pointer",
                }}
              >
                Next
              </Typography>
              <Box sx={{ display: "inline-flex", gap: "4px" }}>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  {page}
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  of
                </Typography>
                <Typography
                  sx={{
                    color: "#000000",
                    fontSize: "15px",
                    fontWeight: 700,
                    lineHeight: "24px",
                  }}
                >
                  {classes?.last_page}
                </Typography>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </ClassLayout>
  );
};

export default ClassesPage;
