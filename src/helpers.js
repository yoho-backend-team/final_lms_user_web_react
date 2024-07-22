import axios from "axios";

async function regSw(){
    if( "serviceWorker" in navigator){
       let url = process.env.PUBLIC_URL + "/sw.js"
       const reg = await navigator.serviceWorker.register(url,{scope:"/"})
       console.log("service config is ",{reg})
       return reg
    }
    throw Error("serviceworker not supported")
}

async function subscribe(serviceWorkerBg){
    let subscription = await serviceWorkerBg.pushManager.getSubscription()
    console.log(subscription)
    if(subscription === null){
    subscription = await serviceWorkerBg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: "BOBc9xb8qvLCEgI6xf7OoY7_q6CvrAVvhl1_nrG9WFMkV28Oyiwj_OrjMWYsM85b9oGs5QjI2WuHuST0caFgsTU"
    })
    }
}


export {regSw,subscribe}