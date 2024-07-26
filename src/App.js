import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "./App.css";
// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { onMessageListener, requestForToken } from "./firebase";
import { regSw, subscribe } from "helpers";
import { checkSubscriptionStatus, checkUserLoggedIn, getInstituteDetails, getInstructorDetails, getStudentDetails } from "store/atoms/authorized-atom";
import { instructorDetails, Student } from "lib/constants";
// ==============================|| APP ||============================== //


const App = () => {
  const customization = useSelector((state) => state.customization);
  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  // useEffect(() => {
  //   requestForToken();
  // }, []);

  useEffect(() => {
    const setupServiceWorkerAndRegisterFunction = async (role,userId,user) => {
      try {
      const registration = await regSw()  
      console.log("service worker register",registration,registration.active)
     
      if(registration){
        await subscribe(registration,role,userId,user)
      }
      } catch (error) {
        console.log(error)
      }
    }
    console.log(checkUserLoggedIn(instructorDetails),checkUserLoggedIn(Student),checkUserLoggedIn(Student)&&!checkSubscriptionStatus(Student+"subscription"))
    if(checkUserLoggedIn(instructorDetails)&&!checkSubscriptionStatus(instructorDetails+"subscription")){
       const user = getInstructorDetails()
       setupServiceWorkerAndRegisterFunction(user?.role,user?._id,instructorDetails)
    }else if(checkUserLoggedIn(Student)&&!checkSubscriptionStatus(Student+"subscription")){
      const user = getStudentDetails()
      setupServiceWorkerAndRegisterFunction(user?.role,user?._id,Student)
    }
  },[])

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes />
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );  
};

export default App;
