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

  const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
};

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    });
}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  let subscription;
  navigator.serviceWorker.ready
    .then(async (registration) => {
      const sub = await registration.pushManager.getSubscription();
      if (sub) {
        subscription = sub; // Use existing subscription
      } else {
        // Subscribe for push notifications
        return await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array("BPuKg5TjyllZIaWn1l2KlrrBJAixq3QytV1dCHRQ_Q2ct2zF-UsX1wI450TzKVykD5yGmzKpGyl59VrZhlD58lU")
        });
      }
    })
    .then(async () => {
      // Backend API endpoint
      const endPoint = `${process.env.REACT_APP_BACK_END_URL}notification/subscribe`;
      const user2 = getStudentDetails(); // Get student details
      const user = getInstructorDetails(); // Get instructor details

      if (user2) {
        await axios.post(endPoint, { subscription, user: user2._id }); // Send subscription to backend
      }
      if (user) {
        await axios.post(endPoint, { subscription, user: user._id }); // Send subscription to backend
      }
    })
    .catch((error) => console.error('Error subscribing to push notifications', error));
}


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
