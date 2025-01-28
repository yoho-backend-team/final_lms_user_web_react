import axios from 'axios';
import Cookies from 'js-cookie';

async function regSw() {
  if ('serviceWorker' in navigator) {
    const url = `${process.env.PUBLIC_URL}/sw.js`;
    const reg = await navigator.serviceWorker.register(url, { scope: '/' });
    return reg;
  }
  throw new Error('Service worker not supported');
}

async function subscribe(serviceWorker,role,userId,user) {
  let subscription = await serviceWorker.pushManager.getSubscription();

  // if (subscription === null) {
     subscription = await serviceWorker.pushManager.subscribe({
       userVisibleOnly: true,
       applicationServerKey: urlBase64ToUint8Array('BJFWPqfGs7DoTQTkLe7MdCdCv6N0wGofV9WSd4HKQVHn8nR2X-pOg2cT1VIWG9QN-jyELRZDYWLuo6cRwPJixMg')
     });

    //  const endPoint = `${process.env.REACT_APP_BACK_END_URL}notification/subscribe`
     
    //  await axios.post(endPoint, {subscription,user:userId,role:role});
     const expiryDate = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
     Cookies.set(user+"subscription",true,{expires:expiryDate})
  // }
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export { regSw, subscribe };
