import axios from 'axios';
import { checkSubscriptionStatus, checkUserLoggedIn, getInstituteDetails, getInstructorDetails, getStudentDetails } from "store/atoms/authorized-atom";
import { instructorDetails, Student } from "lib/constants";

export async function usePushSubscription(){

  let subscription;
  let user;
  if(checkUserLoggedIn(instructorDetails)&&!checkSubscriptionStatus(instructorDetails+"subscription")){
         user = getInstructorDetails()
      }else if(checkUserLoggedIn(Student)&&!checkSubscriptionStatus(Student+"subscription")){
         user = getStudentDetails()     
    }
  
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready
        .then(async (registration) => {
          const sub = await registration.pushManager.getSubscription();
            if (sub) {
                subscription = sub;
            } else {
                return await registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array("BPuKg5TjyllZIaWn1l2KlrrBJAixq3QytV1dCHRQ_Q2ct2zF-UsX1wI450TzKVykD5yGmzKpGyl59VrZhlD58lU") // VAPID public key
                });
            }
        })
        .then((sub) => {
          //  subscription = sub;
           console.log(subscription,"subcrip")
    
          // fetch(`${process.env.REACT_APP_PUBLIC_API_URL}/api/notification/institute/subscribe`, {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ subscription: subscription })
          // });

    const endPoint = `${process.env.REACT_APP_BACK_END_URL}notification/subscribe`
     
    axios.post(endPoint, {subscription,user:user._id,role:user.role});
        })
        .catch((error) => console.error('Error subscribing to push notifications', error));
    }


  return subscription;
};


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

