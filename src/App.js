import { useSelector } from "react-redux";
import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, StyledEngineProvider } from "@mui/material";
import "./App.css";
import axios from "axios";
// routing
import Routes from "./routes";

// defaultTheme
import themes from "./themes";

// project imports
import NavigationScroll from "layout/NavigationScroll";
import { onMessageListener, requestForToken } from "./firebase";
import { regSw, subscribe } from "helpers";
import { checkSubscriptionStatus, checkUserLoggedIn,checkUserLoggedInForSub, getInstituteDetails, getInstructorDetails, getStudentDetails } from "store/atoms/authorized-atom";
import { instructorDetails, Student } from "lib/constants";
import { useSocket } from "context/instructorSocket";

// ==============================|| APP ||============================== //


const App = () => {
  const customization = useSelector((state) => state.customization);
  const socket = useSocket()


  
  useEffect(() => {
    // const setupServiceWorkerAndRegisterFunction = async (role,userId,user) => {
    //   try {
    //   const registration = await regSw()  
     
    //   if(registration){
    //     await subscribe(registration,role,userId,user)
    //   }
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
    const notifiConnect = (user) => {
     socket.emit("joinNotification",{userId:user?._id},(error) => {
      console.log(error,"error")
     })
    }

    if(checkUserLoggedIn(instructorDetails)&&socket){
      const user = getInstructorDetails()
      notifiConnect(user)
    }else if(checkUserLoggedIn(Student)&&socket){
      const user = getStudentDetails()
      notifiConnect(user)
    }
    // if(checkUserLoggedIn(instructorDetails)&&!checkSubscriptionStatus(instructorDetails+"subscription")){
    //    const user = getInstructorDetails()
    //    setupServiceWorkerAndRegisterFunction(user?.role,user?._id,instructorDetails)   
    // }else if(checkUserLoggedIn(Student)&&!checkSubscriptionStatus(Student+"subscription")){
    //   const user = getStudentDetails()
    //   setupServiceWorkerAndRegisterFunction(user?.role,user?._id,Student) 
    // }
  },[socket])





  // onMessageListener()
  //   .then((payload) => {
  //     console.log(payload);
  //   })
  //   .catch((err) => console.log("failed: ", err));

  // useEffect(() => {
  //   requestForToken();
  // }, []);


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
