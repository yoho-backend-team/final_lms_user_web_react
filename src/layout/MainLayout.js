import NavBar from "features/common/Navbar";
import Footer from "features/common/footer/footer";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { getInstructorDetails, getStudentDetails } from "store/atoms/authorized-atom";
import axios from "axios";

const MainLayout = () => {
    const user2 = getStudentDetails();
     const user = getInstructorDetails();
  //  let Dates = localStorage.getItem('LastRunDate')
  //  let LastRunDate;
  //  if (typeof Dates == 'string') {
  //   LastRunDate = Dates.split('T')[0]
  //  }else{
  //   LastRunDate = undefined
  //  }
    // const DateNow = new Date().toISOString().split('T')[0]
  function liveupdated(status){
    if(user && status){
       axios.post(`${process.env.REACT_APP_URL}/online`,{user})
    }else{
       axios.post(`${process.env.REACT_APP_URL}/offline`,{user})
    }
   if(user2 && status){
       axios.post(`${process.env.REACT_APP_URL}/online`,{user2})
    }else{
       axios.post(`${process.env.REACT_APP_URL}/offline`,{user2})
    }
  }

  window.addEventListener("online", () => { 
     liveupdated(true);
  });

  window.addEventListener("offline", () => {
      liveupdated(false);
  });




  useEffect(()=>{
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

// if(DateNow != LastRunDate || LastRunDate == undefined){

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    let subscription;
    // const LastRuns = new Date().toISOString();
    navigator.serviceWorker.ready
      .then(async (registration) => {
        const sub = await registration.pushManager.getSubscription();
        if (sub) {
          subscription = sub; 
        } else {
          return await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array("BPuKg5TjyllZIaWn1l2KlrrBJAixq3QytV1dCHRQ_Q2ct2zF-UsX1wI450TzKVykD5yGmzKpGyl59VrZhlD58lU")
          });
        }
        // localStorage.setItem('LastRunDate',LastRuns)
      })
      .then(async (sub) => {
        const endPoint = `${process.env.REACT_APP_BACK_END_URL}notification/subscribe`;
        const subs =  sub || subscription
        
        if (user2) {
          await axios.post(endPoint, { subscription:subs, user: user2._id }); 
        }
        if (user) {
          await axios.post(endPoint, { subscription:subs, user: user._id }); 
        }
      })
      .catch((error) => console.error('Error subscribing to push notifications', error));
  }
// }
  },[])

  
  return (
    <div className="App">
      <header className="header">
        <NavBar />
      </header>
      <main className="main" style={{ overflow: "auto" }}>
        <Outlet />
      </main>
      <footer className="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;
