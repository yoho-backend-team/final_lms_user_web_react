import React, { useEffect, useState } from "react";
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

const ClassesPage = () => {
  const [value, setValue] = useState("upcoming");
  const [classType, setClassType] = useState("online");
  const dispatch = useDispatch();
  const classes = useSelector(selectClasses);
  const loading = useSelector(selectLoading);

  const tabs = [
    { id: "1", title: "Upcoming Classes", value: "upcoming" },
    { id: "2", title: "Completed Classes", value: "completed" },
    { id: "3", title: "Class History", value: "history" },
    { id: "4", title: "Live Class", value: "live" },
  ];

  const renderComponents = {
    upcoming: <UpcomingClassList data={classes} classType={classType} />,
    completed: <CompletedClassList data={classes} classType={classType} />,
    history: <ClassHistory data={classes} classType={classType} />,
    live: <LiveClassList data={classes} classType={classType} />,
  };

  const classTypes = [
    { id: "1", title: "online class", value: "online" },
    { id: "2", title: "offline class", value: "offline" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const data = { userType: classType, classType: value };
      await dispatch(getAllClasses(data));
    };

    fetchData();
  }, [dispatch, classType]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const data = { userType: classType, classType: newValue };
    dispatch(getAllClasses(data));
  };

  const handleClassTypeChange = (event) => {
    setClassType(event.target.value);
    const filter = { userType: event.target.value, classType: value };
    dispatch(getAllClasses(filter));
  };

  return (
    <ClassLayout>
      <Box sx={{ display: "flex", flexDirection: "column", width: "100vw" }}>
        <Box>
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
        <Card>
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
      </Box>
    </ClassLayout>
  );
};

export default ClassesPage;
